'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo/Title */}
          <div className="flex-1 md:flex-none ml-4 md:ml-0">
            <h1 className="text-xl font-bold text-slate-900 font-montserrat">Handa Pilipinas</h1>
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden md:block" />

          {/* Right side menu items */}
          <div className="flex items-center gap-4">
            <button className="text-slate-600 hover:text-slate-900">
              Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
