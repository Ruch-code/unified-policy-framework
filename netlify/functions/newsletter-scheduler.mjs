import { connectDb, Newsletter, getSettings } from './_shared/newsletter.js';
import { deliverIssue } from './_shared/mailer.js';
import { buildDigest } from './_shared/digest.js';

// Runs every 15 minutes. What it actually does is controlled from the admin settings:
// - "Pause all sending" stops every send to the list.
// - "Send scheduled issues automatically" off means scheduled issues wait until switched back on.
// - The digest only builds a DRAFT, on the day and time chosen in settings. It never sends to the list.
export default async () => {
  await connectDb();
  const s = await getSettings();
  const log = [];
  if (!s.sendingPaused && s.scheduledSendingEnabled) {
    const now = new Date();
    // Claim due issues one at a time (scheduled -> sending) so two runs cannot both start one.
    for (;;) {
      const issue = await Newsletter.findOneAndUpdate({ status: 'scheduled', scheduledAt: { $lte: now } }, { $set: { status: 'sending' } }, { new: true });
      if (!issue) break;
      log.push(`claimed ${issue._id}`);
    }
    // Continue anything still sending (new claims, or a run that ran out of time).
    for (const issue of await Newsletter.find({ status: 'sending' }).select('_id').lean()) {
      const r = await deliverIssue(issue._id);
      log.push(`issue ${issue._id}: sent ${r.sent}, failed ${r.failed}, done ${r.done}`);
    }
  } else {
    log.push('sending paused or automatic sending off');
  }
  try {
    const d = await buildDigest();
    if (d.created) log.push(`digest draft ${d.id}`);
  } catch (e) { console.warn('digest failed', e.message); }
  console.log('newsletter-scheduler', log.join('; ') || 'nothing to do');
};

export const config = { schedule: '*/15 * * * *' };
