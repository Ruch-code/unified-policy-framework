import { useState } from 'react';
import { X, Mail, Rocket, ShieldCheck, MessagesSquare } from 'lucide-react';
import { AUTHOR } from '../data/author';

export default function AuthorAboutPopup({ open, onClose }) {
  const [tab, setTab] = useState('about');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl relative max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header cover */}
        <div className="h-28 bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#6366f1] relative">
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
          {/* floating badges */}
          <Rocket className="absolute bottom-3 left-4 w-6 h-6 text-white/70" />
          <ShieldCheck className="absolute bottom-3 right-4 w-6 h-6 text-white/70" />
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-14 mb-3">
          <div className="w-28 h-28 rounded-2xl bg-white p-1.5 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
            {AUTHOR.photo ? (
              <img src={AUTHOR.photo} alt={AUTHOR.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6366f1] flex items-center justify-center text-white text-4xl font-bold">
                {AUTHOR.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>

        {/* Name & role */}
        <div className="text-center px-6 pb-4">
          <h2 className="text-2xl font-extrabold text-gray-900">{AUTHOR.name}</h2>
          <p className="text-[#7c3aed] font-semibold text-sm mt-0.5">{AUTHOR.role}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 px-6 mb-4">
          {[
            { id: 'about', label: 'About me' },
            { id: 'why', label: 'Why I built this' },
            { id: 'connect', label: 'Connect' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${tab === t.id ? 'bg-[#7c3aed] text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-6 pb-6 text-sm text-gray-700 leading-relaxed">
          {tab === 'about' && <p>{AUTHOR.bio}</p>}

          {tab === 'why' && (
            <div className="space-y-3">
              <p>
                Compliance doesn't have to be a maze. I kept seeing teams get overwhelmed choosing between ISO, SOC 2, GDPR, HIPAA, and a dozen others — with no clear answer on <strong>what to pursue or in what order</strong>.
              </p>
              <p>
                So I built a framework that maps the overlaps, ranks priorities by your actual profile, and gives a practical roadmap — not a wall of jargon.
              </p>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-indigo-900">
                <span className="inline-flex items-center gap-1.5 font-semibold"><MessagesSquare className="w-4 h-4" /> My goal:</span> make security &amp; privacy achievable for every team, whatever their size.
              </div>
            </div>
          )}

          {tab === 'connect' && (
            <div className="space-y-3">
              <p>Have feedback, or need help applying a framework to your company? I'd love to hear from you.</p>
              {AUTHOR.email && (
                <a href={`mailto:${AUTHOR.email}`} className="flex items-center gap-2 w-full bg-[#7c3aed] text-white font-semibold px-4 py-2.5 rounded-xl justify-center hover:bg-[#6d28d9] transition">
                  <Mail className="w-4 h-4" /> {AUTHOR.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
