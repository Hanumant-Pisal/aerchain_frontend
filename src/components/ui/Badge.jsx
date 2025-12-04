import React from "react";

export default function Badge({ children, tone = "gray" }) {
  const toneClass = {
    gray: "bg-slate-100 text-slate-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
  }[tone];

  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${toneClass}`}>{children}</span>;
}
