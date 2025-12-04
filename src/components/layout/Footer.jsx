import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-slate-500">
        © {new Date().getFullYear()} AI RFP Management · Built with ❤️
      </div>
    </footer>
  );
}
