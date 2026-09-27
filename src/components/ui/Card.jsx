import React from 'react';

export default function Card({ title, subtitle, icon: Icon, accent = 'bg-indigo-600', children, className = '', bodyClassName = '' }) {
  return (
    <section className={`grc-card ${className}`}>
      {(title || Icon || subtitle) && (
        <header className="p-6 pb-3 md:p-8 md:pb-4 flex items-start gap-3">
          {Icon && (
            <span className={`w-9 h-9 rounded-xl ${accent} text-white flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </span>
          )}
          <div className="min-w-0">
            {title && <h3 className="grc-card-title text-xl md:text-2xl font-bold leading-snug">{title}</h3>}
            {subtitle && <p className="grc-card-desc text-sm mt-1 leading-relaxed">{subtitle}</p>}
          </div>
        </header>
      )}
      <div className={`p-6 pt-2 md:p-8 md:pt-3 ${bodyClassName}`}>{children}</div>
    </section>
  );
}