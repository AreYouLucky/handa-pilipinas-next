'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import type { IconType } from 'react-icons';
import { useState } from 'react'

type NavLinksProps = {
    href: string;
    label: string;
    Icon: IconType;
    isMobile?: boolean;
    isInverted?: boolean;
    onClick?: () => void;
};

export default function NavLinks({
    href,
    label,
    Icon,
    isMobile = false,
    isInverted = false,
    onClick,
}: NavLinksProps): ReactElement {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
    const [active, setActive] = useState(false)
    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            prefetch={active ? null : false}
            onMouseEnter={() => setActive(true)}
            className={
                isMobile
                    ? `group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${isActive
                        ? 'bg-red-50 text-[#ED1E24]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`
                    : `group relative flex items-center gap-2 rounded-xl px-4 py-2 text-[12.4px] font-semibold tracking-[0.01em] transition-all duration-200 ${isInverted
                        ? isActive
                            ? 'bg-white text-primary shadow-sm'
                            : 'text-white/90 hover:bg-white/12 hover:text-white'
                        : isActive
                            ? 'bg-primary text-white shadow-sm ring-1 ring-slate-200/70'
                            : 'text-accent hover:bg-white/70 hover:text-slate-950'
                    }`
            }
        >
            <Icon
                aria-hidden="true"
                className={`shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 ${isMobile ? 'text-lg' : 'text-sm'
                    }`}
            />
            <span>{label}</span>
        </Link>
    );
}
