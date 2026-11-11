// Country and EU flags as small images (two-letter codes such as 'us', 'gb', 'eu').
// Images render the same on every platform, unlike flag emoji, which show as letters on Windows.
export const flagSrc = (code, w = 40) => (code ? `https://flagcdn.com/w${w}/${String(code).toLowerCase()}.png` : '');

/** HTML string version for places that build markup as text, such as globe tooltips. */
export function flagImgHtml(code, height = 14) {
  if (!code) return '';
  return `<img src="${flagSrc(code)}" alt="" style="height:${height}px;width:auto;display:inline-block;vertical-align:-2px;border-radius:2px;margin-right:6px" />`;
}

export default function Flag({ code, height = 16, label = '', className = '' }) {
  if (!code) return null;
  return (
    <img
      src={flagSrc(code)}
      srcSet={`${flagSrc(code, 80)} 2x`}
      alt={label ? `${label} flag` : ''}
      height={height}
      style={{ height, width: 'auto' }}
      className={`inline-block align-middle rounded-sm ${className}`}
      loading="lazy"
    />
  );
}
