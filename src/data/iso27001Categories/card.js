// Shared builder for ISO 27001 Lead Auditor category cards.
// evidence strings start with "S:" (system-generated) or "R:" (document or record).
export const card = (id, title, hours, control, how, check, [grade, statement], evidence, opts = {}) => ({
  id, title, hours, control, how, check,
  nonconformity: { grade, statement },
  evidence: evidence.map((e) => ({ type: e.startsWith('S:') ? 'system' : 'record', text: e.slice(2).trim() })),
  soa: opts.soa || null,
  templates: opts.templates || [],
  toBuild: opts.toBuild || [],
  links: opts.links || [],
  related: opts.related || [],
  soc2: opts.soc2 || '',
});

// verdict: 'Selected', 'Optional' or 'Excluded'. suggested marks a verdict proposed here because
// the page's Annex A reference card has no advisory default for that control.
export const soa = (verdict, rationale = '', suggested = false) => ({ verdict, ...(rationale ? { rationale } : {}), ...(suggested ? { suggested: true } : {}) });
