// Free voice features built on the browser's own speech APIs.
import { useCallback, useEffect, useRef, useState } from 'react';

const Recognition = () => (typeof window === 'undefined' ? null : window.SpeechRecognition || window.webkitSpeechRecognition || null);
export const canListen = () => !!Recognition();
export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
export const VOICE_NOTICE = 'Your browser may send audio to its speech service. Do not speak client or personal data.';

// Browsers ship several voices; the default is often the most robotic one.
// Pick the most natural English voice available on this device. Neural and natural voices
// (Edge "Online (Natural)", Chrome "Google", Apple "Siri"/"Samantha") sound far more human.
const PREFERRED = [/natural/i, /neural/i, /online/i, /siri/i, /google uk english female/i, /google us english/i, /google/i, /samantha|karen|daniel|serena|moira|tessa/i, /zira|aria|jenny|sonia|libby|neerja/i];
let cachedVoice = null;
function pickVoice(lang) {
  const voices = window.speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
  if (!voices.length) return null;
  const score = (v) => {
    let s = 0;
    const i = PREFERRED.findIndex((re) => re.test(v.name));
    if (i >= 0) s += 100 - i * 5;
    if (v.lang === lang) s += 8; else if (/en-(GB|US|AU|IN)/i.test(v.lang)) s += 4;
    if (/espeak|robot|compact/i.test(v.name)) s -= 50;
    if (!v.localService) s += 3; // network voices are usually the neural ones
    return s;
  };
  return voices.sort((a, b) => score(b) - score(a))[0];
}
if (canSpeak()) {
  window.speechSynthesis.onvoiceschanged = () => { cachedVoice = null; };
}

export function speak(text, lang = 'en-IN') {
  if (!canSpeak() || !text) return;
  window.speechSynthesis.cancel();
  // Read symbols the way a person would say them.
  const clean = String(text).replace(/→/g, ', then ').replace(/&/g, ' and ').replace(/[*_#`]/g, '').replace(/\s+/g, ' ').replace(/ ,/g, ',');
  const u = new SpeechSynthesisUtterance(clean);
  cachedVoice = cachedVoice || pickVoice(lang);
  if (cachedVoice) { u.voice = cachedVoice; u.lang = cachedVoice.lang; } else u.lang = lang;
  u.rate = 0.95;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}
export const stopSpeaking = () => { if (canSpeak()) window.speechSynthesis.cancel(); };

const ERRORS = { 'not-allowed': 'Microphone access is blocked. Allow it in your browser settings.', 'no-speech': 'No speech was heard. Please try again.', network: 'The speech service could not be reached.' };

/** Speech to text. Shows words as they are spoken (interim results) and returns the full text when listening ends.
 * In continuous mode the browser can stop on its own after a pause; we restart it straight away until the user presses Stop. */
export function useSpeechInput({ lang = 'en-IN', continuous = false, onFinal } = {}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const rec = useRef(null);
  const userStopped = useRef(false);
  const finalCb = useRef(onFinal);
  finalCb.current = onFinal;
  const stop = useCallback(() => { userStopped.current = true; rec.current?.stop(); }, []);
  const start = useCallback(() => {
    const R = Recognition();
    if (!R) { setError('Voice input is not supported in this browser. Try Chrome or Edge.'); return; }
    stopSpeaking();
    userStopped.current = false;
    let committed = '';
    let done = false;
    const finish = () => { if (done) return; done = true; setListening(false); const t = committed.trim(); if (t) finalCb.current?.(t); };
    const run = () => {
      const r = new R();
      r.lang = lang; r.continuous = continuous; r.interimResults = true; r.maxAlternatives = 1;
      let sessionFinal = '';
      let ended = false;
      r.onresult = (e) => {
        let interim = '';
        sessionFinal = '';
        for (let i = 0; i < e.results.length; i += 1) {
          const piece = e.results[i][0].transcript;
          if (e.results[i].isFinal) sessionFinal += `${piece} `; else interim += piece;
        }
        setTranscript(`${committed}${sessionFinal}${interim}`.replace(/\s+/g, ' ').trimStart());
      };
      r.onerror = (e) => { if (e.error !== 'no-speech' || !continuous) setError(ERRORS[e.error] || 'Voice input stopped. Please try again.'); if (e.error === 'not-allowed') userStopped.current = true; };
      r.onend = () => {
        if (ended || rec.current !== r) return; // ignore duplicate or stale end events
        ended = true;
        committed += sessionFinal;
        if (continuous && !userStopped.current) { try { run(); return; } catch { /* fall through */ } }
        finish();
      };
      rec.current = r;
      r.start();
    };
    setError(''); setTranscript(''); setListening(true);
    run();
  }, [lang, continuous]);
  useEffect(() => () => { userStopped.current = true; rec.current?.abort(); }, []);
  return { listening, transcript, error, start, stop, setTranscript };
}
