import React from "react";

/**
 * Basic responsive table component
 * columns: [{ key, label, render?(row) }]
 * data: array
 */
export default function Table({ columns = [], data = [], className = "" }) {
  return (
    <div className={`overflow-x-auto bg-white rounded-md shadow-sm ${className}`}>
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr key={row._id || idx} className="hover:bg-slate-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
