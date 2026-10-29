import fs from 'node:fs/promises';
import path from 'node:path';
import { authUser, json } from './_shared/auth.js';

// Serves ready-made template files to signed-in users only.
// Files live in netlify/template-files/ (not public) and are bundled via included_files in netlify.toml.
const TYPES = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  json: 'application/json',
};
const CANDIDATE_DIRS = [
  path.join(process.cwd(), 'netlify', 'template-files'),
  path.join(process.env.LAMBDA_TASK_ROOT || '', 'netlify', 'template-files'),
  '/var/task/netlify/template-files',
];

export default async (req, context) => {
  const requested = context.params?.file || new URL(req.url).pathname.split('/').pop();
  // Health check: reports only whether template files are reachable, no content.
  if (requested === 'status') {
    for (const dir of CANDIDATE_DIRS) {
      try { const n = (await fs.readdir(dir)).length; return json({ ok: true, files: n }); } catch { /* next */ }
    }
    return json({ ok: false, files: 0, cwd: process.cwd() }, 500);
  }
  const user = await authUser(req);
  if (!user) return json({ message: 'Please sign in to download templates.' }, 401);
  const name = context.params?.file || new URL(req.url).pathname.split('/').pop();
  if (!/^([a-z0-9-]+\.(docx|xlsx)|previews\.json)$/.test(name)) return json({ message: 'Not found.' }, 404);
  for (const dir of CANDIDATE_DIRS) {
    try {
      const data = await fs.readFile(path.join(dir, name));
      return new Response(data, {
        status: 200,
        headers: {
          'Content-Type': TYPES[name.split('.').pop()],
          ...(name.endsWith('.json') ? {} : { 'Content-Disposition': `attachment; filename="${name}"` }),
          'Cache-Control': 'private, no-store',
        },
      });
    } catch { /* try next location */ }
  }
  return json({ message: 'Not found.' }, 404);
};

export const config = { path: '/api/templates/:file' };
