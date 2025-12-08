import React from "react";


export default function Tabs({ tabs = [], activeId, onChange }) {
  return (
    <div className="border-b bg-white">
      <nav className="-mb-px flex space-x-6 px-4">
        {tabs.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`py-3 px-1 border-b-2 ${active ? "border-blue-600 text-blue-600" : "border-transparent text-slate-600 hover:text-slate-800"}`}
            >
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
