import React from "react";

export default function Select({ label, name, value, onChange, options = [], className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-sm text-slate-600 mb-1">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
