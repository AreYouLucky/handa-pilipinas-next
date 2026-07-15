'use client';

import Image from 'next/image';
import { useEffect, type ReactElement, type ReactNode } from 'react';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Sidebar({ open, onClose, children }: SidebarProps): ReactElement {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };

    if (!open) return;

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        onClick={onClose}
        aria-label="Close navigation menu"
        tabIndex={open ? 0 : -1}
      />

      <aside
        id="mobile-navigation"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 w-[min(88vw,360px)] border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div className="flex items-center">
              <Image
                src="/assets/images/logos/handa.png"
                alt="Handa Pilipinas"
                width={300}
                height={68}
                className="rounded-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1E24]"
              aria-label="Close navigation menu"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-6">
            {children}
          </nav>

          <div className="bg-linear-to-r from-[#ED1E24] via-[#F47421] to-[#FFCC49] p-1" />
        </div>
      </aside>
    </>
  );
}
