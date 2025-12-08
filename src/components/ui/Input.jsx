import React from "react";

/**
 * Controlled/uncontrolled input wrapper
 */
export default function Input({ label, name, type = "text", value, onChange, placeholder, className = "", ...rest }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-sm text-slate-600 mb-1">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
}
