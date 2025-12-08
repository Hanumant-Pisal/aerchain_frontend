import React from "react";


export default function Card({ title, children, footer, className = "" }) {
  return (
    <div className={`bg-white shadow-sm rounded-md overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b bg-white">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="px-4 py-3 border-t bg-white">{footer}</div>}
    </div>
  );
}
