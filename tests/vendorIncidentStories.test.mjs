/**
 * Vendor incident brief acceptance tests.
 *
 * The style rules here are not cosmetic. These strings get pasted into
 * newsletters under the user's name and shipped to publishers, so a stray em
 * dash or a hallucinated figure is a real defect. The checks below are cheap
 * and run with no new dependencies.
 *
 * Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  VENDOR_INCIDENT_STORIES, COMPOSITE, REAL,
  FIELD_LABELS, NEWSLETTER_CADENCE_DAYS, TEASER_MIN, TEASER_MAX,
  storiesOfKind, storyAt, storyToPlainText, storyToMarkdown,
} from '../src/data/vendorIncidentStories.js';

const EM_DASH = '\u2014';
const EN_DASH = '\u2013';

/** Words that read as machine written in editorial copy. */
const AI_TELLS = [
  'delve', 'leverage', 'leveraging', 'robust', 'seamless', 'seamlessly',
  'testament to', "it's important to note", 'it is important to note',
  "today's fast", 'fast-moving world', 'fast moving world', 'landscape',
  'navigate the complexities', 'game-chang', 'unlock the', 'empower',
  'in conclusion', 'it goes without saying', 'paradigm', 'synergy',
];

const allText = (s) => JSON.stringify(s);

test('corpus is populated and both kinds exist', () => {
  assert.ok(VENDOR_INCIDENT_STORIES.length >= 12, 'expected at least 12 stories');
  assert.ok(storiesOfKind(COMPOSITE).length >= 6, 'expected at least 6 composite scenarios');
  assert.ok(storiesOfKind(REAL).length >= 5, 'expected at least 5 curated incidents');
});

test('no em dashes or en dashes anywhere in the corpus', () => {
  for (const s of VENDOR_INCIDENT_STORIES) {
    const blob = allText(s);
    assert.ok(!blob.includes(EM_DASH), `${s.id} contains an em dash`);
    assert.ok(!blob.includes(EN_DASH), `${s.id} contains an en dash`);
  }
});

test('no machine written vocabulary in any story string', () => {
  for (const s of VENDOR_INCIDENT_STORIES) {
    const blob = allText(s).toLowerCase();
    for (const tell of AI_TELLS) {
      assert.ok(!blob.includes(tell), `${s.id} contains AI tell "${tell}"`);
    }
  }
});

test('every teaser fits the newsletter slot', () => {
  for (const s of VENDOR_INCIDENT_STORIES) {
    assert.ok(
      s.teaser.length >= TEASER_MIN && s.teaser.length <= TEASER_MAX,
      `${s.id} teaser is ${s.teaser.length} chars, want ${TEASER_MIN}-${TEASER_MAX}`
    );
    assert.ok(s.teaser.trim() === s.teaser, `${s.id} teaser has stray whitespace`);
  }
});

test('every field the UI renders is populated', () => {
  for (const s of VENDOR_INCIDENT_STORIES) {
    for (const f of FIELD_LABELS) {
      const v = s[f.key];
      assert.ok(typeof v === 'string' && v.trim().length > 20, `${s.id}.${f.key} is empty or too short`);
    }
    for (const k of ['id', 'title', 'sector', 'tier', 'accent', 'teaser']) {
      assert.ok(typeof s[k] === 'string' && s[k].trim(), `${s.id}.${k} missing`);
    }
    assert.ok(Array.isArray(s.stats) && s.stats.length >= 3, `${s.id} needs at least 3 poster stats`);
    for (const st of s.stats) {
      assert.ok(st && st.k && st.v, `${s.id} has a malformed stat`);
    }
  }
});

test('real incidents carry a source link, composites do not fake one', () => {
  for (const s of VENDOR_INCIDENT_STORIES) {
    if (s.kind === REAL) {
      assert.ok(Array.isArray(s.sources) && s.sources.length >= 1, `${s.id} is real but has no source`);
      for (const src of s.sources) {
        assert.ok(src.label && src.url, `${s.id} has a malformed source`);
        assert.match(src.url, /^https:\/\//, `${s.id} source must be https`);
      }
    }
  }
});

test('ids are unique', () => {
  const ids = VENDOR_INCIDENT_STORIES.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate story id');
});

test('storyAt is deterministic and wraps cleanly', () => {
  const a = storyAt(COMPOSITE, 0);
  const b = storyAt(COMPOSITE, 0);
  assert.equal(a.id, b.id, 'same cursor returned different stories');
  const last = storyAt(COMPOSITE, storiesOfKind(COMPOSITE).length);
  assert.equal(last.id, storyAt(COMPOSITE, 0).id, 'cursor past the end did not wrap');
  const neg = storyAt(COMPOSITE, -3);
  assert.ok(neg && neg.kind === COMPOSITE, 'negative cursor failed');
});

test('plain text and markdown exports are complete and dash free', () => {
  for (const s of VENDOR_INCIDENT_STORIES) {
    const plain = storyToPlainText(s);
    const md = storyToMarkdown(s);
    for (const [name, out] of [['plain', plain], ['markdown', md]]) {
      assert.ok(!out.includes(EM_DASH), `${name} export of ${s.id} has an em dash`);
      assert.ok(out.includes(s.title), `${name} export of ${s.id} lost the title`);
      assert.ok(out.includes(s.teaser), `${name} export of ${s.id} lost the teaser`);
      for (const f of FIELD_LABELS) {
        assert.ok(out.includes(s[f.key]), `${name} export of ${s.id} lost ${f.key}`);
      }
    }
    if (s.kind === REAL) {
      assert.ok(plain.includes(s.sources[0].url), 'plain export lost the source url');
      assert.ok(md.includes(s.sources[0].url), 'markdown export lost the source url');
    }
  }
});

test('cadence is the 15 day window the newsletter targets', () => {
  assert.equal(NEWSLETTER_CADENCE_DAYS, 15);
});
