import { json } from './_shared/auth.js';

export const config = { path: '/api/market' };

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const TWELVE = 'https://api.twelvedata.com/quote';

let cache = { at: 0, payload: null };
const CACHE_TTL = 15000;

function cached(payload) {
  const now = Date.now();
  if (cache.payload && now - cache.at < CACHE_TTL) return cache.payload;
  cache = { at: now, payload };
  return payload;
}

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

async function fetchNseIndices() {
  const jar = {};
  const cookieHeader = (prefix) =>
    Object.entries(jar)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('; ');
  const setCookies = (headers) => {
    const raw =
      headers.getSetCookie && typeof headers.getSetCookie === 'function'
        ? headers.getSetCookie()
        : headers.get ? headers.getAll('set-cookie') : [];
    for (const c of raw) {
      const [pair] = c.split(';');
      const eq = pair.indexOf('=');
      if (eq > 0) jar[pair.slice(0, eq).trim()] = pair.slice(eq + 1);
    }
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const warm = await fetch('https://www.nseindia.com/', {
        headers: { 'User-Agent': UA, Referer: 'https://www.nseindia.com/' },
      });
      setCookies(warm.headers);

      const api = await fetch('https://www.nseindia.com/api/allIndices', {
        headers: {
          'User-Agent': UA,
          Referer: 'https://www.nseindia.com/market-data/indices',
          Cookie: cookieHeader(),
        },
      });
      if (api.status === 429) {
        if (!warm.ok) await new Promise((r) => setTimeout(r, 800));
        continue;
      }
      if (!api.ok) continue;
      const data = await api.json();
      const rows = (data && data.data) || [];
      const pick = (name) => {
        const row = rows.find((r) => r && r.index === name);
        if (!row) return null;
        const last = num(row.last);
        const prev = num(row.previousClose);
        const open = num(row.open);
        return {
          name: row.index,
          last,
          previousClose: prev,
          change: last != null && prev != null ? +(last - prev).toFixed(2) : null,
          changePercent: num(row.percentChange),
          open,
          high: num(row.high),
          low: num(row.low),
          timestamp: data.timestamp || row.timestamp,
          source: 'nse',
        };
      };
      const out = {
        'NIFTY 50': pick('NIFTY 50'),
        'NIFTY BANK': pick('NIFTY BANK'),
        'INDIA VIX': pick('INDIA VIX'),
      };
      const ok = Object.values(out).filter(Boolean).length;
      if (ok > 0) return { ok: out, source: 'nse' };
    } catch {}
  }
  return { ok: {}, source: 'nse' };
}

async function fetchSensex() {
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey) return null;
  try {
    const url = `${TWELVE}?symbol=BSESN&interval=1day&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) return null;
    const d = await res.json();
    if (d.status === 'error' || d.code) return null;
    const last = num(d.close) ?? num(d.price);
    const prev = num(d.previous_close);
    const open = num(d.open);
    return {
      name: 'SENSEX',
      last,
      previousClose: prev,
      change: last != null && prev != null ? +(last - prev).toFixed(2) : null,
      changePercent: num(d.percent_change),
      open,
      high: num(d.high),
      low: num(d.low),
      timestamp: d.datetime,
      source: 'twelvedata',
    };
  } catch {
    return null;
  }
}

export default async (req) => {
  try {
    const now = Date.now();
    if (cache.payload && now - cache.at < CACHE_TTL) return json(cache.payload);
    const [nse, sensex] = await Promise.all([fetchNseIndices(), fetchSensex()]);
    const data = { ...nse.ok };
    if (sensex) data['SENSEX'] = sensex;

    const rows = Object.values(data).filter(Boolean);
    const okCount = rows.length;
    const quoteTime = rows
      .map((r) => r.timestamp)
      .filter(Boolean)
      .sort()
      .pop();

    return json(cached({
      indices: data,
      updatedAt: quoteTime || new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
      okCount,
      requested: 4,
    }));
  } catch (e) {
    console.error('market function error:', e);
    return json({ message: 'Internal server error.' }, 500);
  }
};
