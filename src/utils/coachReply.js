const LABELS = ['Score', 'What worked', 'What to improve', 'What to say instead', 'What to say', 'Why interviewers ask this', 'Next question'];

// Split the coach reply into labelled parts so each kind of feedback shows separately.
export function parseCoachReply(text) {
  const re = new RegExp(`^(${LABELS.join('|')}):\\s*`, 'gim');
  const marks = [...text.matchAll(re)];
  if (!marks.length) return [{ label: '', body: text.trim() }];
  const parts = [];
  const lead = text.slice(0, marks[0].index).trim();
  if (lead) parts.push({ label: '', body: lead });
  marks.forEach((m, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].index : text.length;
    const label = LABELS.find((l) => l.toLowerCase() === m[1].toLowerCase()) || m[1];
    parts.push({ label, body: text.slice(m.index + m[0].length, end).trim() });
  });
  return parts;
}

