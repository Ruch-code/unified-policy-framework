// Free voice features built on the browser's own speech APIs.
import { useCallback, useEffect, useRef, useState } from 'react';

const Recognition = () => (typeof window === 'undefined' ? null : window.SpeechRecognition || window.webkitSpeechRecognition || null);
export const canListen = () => !!Recognition();
export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
export const VOICE_NOTICE = 'Your browser may send audio to its speech service. Do not speak client or personal data.';

export function speak(text, lang = 'en-IN') {
  if (!canSpeak() || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  window.speechSynthesis.speak(u);
}
export const stopSpeaking = () => { if (canSpeak()) window.speechSynthesis.cancel(); };

const ERRORS = { 'not-allowed': 'Microphone access is blocked. Allow it in your browser settings.', 'no-speech': 'No speech was heard. Please try again.', network: 'The speech service could not be reached.' };

/** Speech to text. onFinal receives the transcript when listening ends. */
export function useSpeechInput({ lang = 'en-IN', continuous = false, onFinal } = {}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const rec = useRef(null);
  const finalCb = useRef(onFinal);
  finalCb.current = onFinal;
  const stop = useCallback(() => rec.current?.stop(), []);
  const start = useCallback(() => {
    const R = Recognition();
    if (!R) { setError('Voice input is not supported in this browser. Try Chrome or Edge.'); return; }
    stopSpeaking();
    const r = new R();
    r.lang = lang; r.continuous = continuous; r.interimResults = true;
    let text = '';
    r.onresult = (e) => { text = Array.from(e.results).map((x) => x[0].transcript).join(' '); setTranscript(text); };
    r.onerror = (e) => setError(ERRORS[e.error] || 'Voice input stopped. Please try again.');
    r.onend = () => { setListening(false); if (text.trim()) finalCb.current?.(text.trim()); };
    setError(''); setTranscript(''); setListening(true);
    rec.current = r;
    r.start();
  }, [lang, continuous]);
  useEffect(() => () => rec.current?.abort(), []);
  return { listening, transcript, error, start, stop, setTranscript };
}
