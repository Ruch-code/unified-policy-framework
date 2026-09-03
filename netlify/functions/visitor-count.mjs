import { getStore } from '@netlify/blobs';

const STORE = 'visitor-counter';
const KEY = 'total';

export default async (req, context) => {
  try {
    const store = await getStore({ name: STORE, ...context.blobs });
    const current = Number((await store.get(KEY)) || 0);
    const next = current + 1;
    await store.set(KEY, String(next));
    return Response.json({ total: next });
  } catch (err) {
    return Response.json({ total: 0, error: String(err?.message || err) }, { status: 500 });
  }
};

export const config = {
  path: '/api/visit',
};
