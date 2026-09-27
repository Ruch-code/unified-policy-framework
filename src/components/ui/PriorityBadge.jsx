import React from 'react';

const SEVERITY_META = {
  P0: { label: 'P0 Critical', cls: 'grc-badge-p0' },
  P1: { label: 'P1 High', cls: 'grc-badge-p1' },
  P2: { label: 'P2 Medium', cls: 'grc-badge-p2' },
  P3: { label: 'P3 Low', cls: 'grc-badge-p3' },
};

export default function PriorityBadge({ level, children, className = '' }) {
  const meta = SEVERITY_META[String(level || children || '').toUpperCase()] || { label: children, cls: 'grc-pill' };
  return <span className={`grc-badge ${meta.cls} ${className}`}>{meta.label}</span>;
}