import React from 'react';

function DashboardHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl font-serif font-black uppercase tracking-tight text-[#2B1D14] leading-tight">
          {title}
        </h1>
        <p className="text-xs font-medium opacity-70 mt-1.5 text-[#2B1D14] max-w-xl">
          {subtitle}
        </p>
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

export default React.memo(DashboardHeader);