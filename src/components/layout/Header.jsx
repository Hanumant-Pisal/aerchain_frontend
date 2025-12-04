import React from "react";

/**
 * Small page header with title and optional actions area
 */
export default function Header({ title, subtitle, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2">{children}</div>
      </div>
    </div>
  );
}
