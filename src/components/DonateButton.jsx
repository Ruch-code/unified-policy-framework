import { useState } from 'react';

const ETH_ADDRESS = '0xdd1e9C99Fa2D42F48f5c5F0c155b48E9b31b9C42';

export default function DonateButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ETH_ADDRESS);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = ETH_ADDRESS;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-600 text-gray-300 hover:text-yellow-400 hover:border-yellow-500 transition-colors text-sm"
      >
        <span className="text-lg leading-none" aria-hidden="true">Ξ</span>
        Donate (Ethereum)
      </button>
      {open && (
        <div className="flex flex-col sm:flex-row items-center gap-2 rounded-xl bg-gray-800 border border-gray-700 px-3 py-2 max-w-full">
          <code className="text-xs text-gray-200 break-all select-all">{ETH_ADDRESS}</code>
          <button
            type="button"
            onClick={copy}
            className="shrink-0 px-2.5 py-1 rounded-md bg-yellow-500 text-gray-900 text-xs font-bold hover:bg-yellow-400 transition-colors"
          >
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>
      )}
      {open && <p className="text-[11px] text-gray-500 max-w-xs text-center">Send only ETH or ERC-20 tokens on the Ethereum network to this address.</p>}
    </div>
  );
}
