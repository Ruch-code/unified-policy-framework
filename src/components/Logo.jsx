import React from 'react';

const Logo = ({ size = 40, className = '' }) => {
  const colors = ['#f59e0b', '#1d4ed8', '#059669', '#dc2626', '#7f6b3f'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ fill: color, transition: 'color 0.3s ease' }}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 16l.99-5.45L13 14l-2.01 1.55L9 18l1.99-5.45L7 14l-2 1.55L3 18l1.99 5.45L5 14l2-1.55L9 10l3.99 1.55Z"/>
      <circle cx="12" cy="8" r="3" fill="#fff"/>
      <path d="M12 8v6M8.5 11.5l3-3 3 3M16 11.5l-3-3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  );
};

export default Logo;
