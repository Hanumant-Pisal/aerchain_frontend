import React from "react";


export default function Modal({ open, title, onClose, children, size = "md" }) {
  if (!open) return null;

  const sizeClass = size === "lg" ? "max-w-3xl" : size === "sm" ? "max-w-md" : "max-w-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative ${sizeClass} w-full bg-white rounded-md shadow-lg overflow-hidden mt-16`}>
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
