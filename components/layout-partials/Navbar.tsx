'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactElement } from 'react';
import { BsFillThreadsFill } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiActivity, FiChevronDown, FiCloudRain, FiInfo, FiUsers } from 'react-icons/fi';
import {  BiCategory} from "react-icons/bi";
import { GrTechnology } from 'react-icons/gr';
import { IoHomeOutline } from 'react-icons/io5';
import type { IconType } from 'react-icons';
import NavLinks from '../common/NavLinks';
import { Sidebar } from './Sidebar';

const navigationItems = [
  { href: '/', label: 'HOME', Icon: IoHomeOutline },
  { href: '/about', label: 'ABOUT', Icon: FiInfo },
] satisfies ReadonlyArray<{ href: string; label: string; Icon: IconType }>;

const featuredTechnologyItem = {
  href: '/technology',
  label: 'FEATURED TECHNOLOGIES',
  Icon: GrTechnology,
};

const categoryLinks = [
  {
    href: '/categories/disaster-preparedness',
    label: 'Disaster Preparedness',
    description: 'Plans, tools, and readiness guides',
    Icon: BiCategory,
  },
  {
    href: '/categories/climate-resilience',
    label: 'Climate Resilience',
    description: 'Adaptation and risk-reduction solutions',
    Icon: FiCloudRain,
  },
  {
    href: '/categories/emergency-response',
    label: 'Emergency Response',
    description: 'Rapid response systems and resources',
    Icon: FiActivity,
  },
  {
    href: '/categories/community-innovation',
    label: 'Community Innovation',
    description: 'Locally developed resilient solutions',
    Icon: FiUsers,
  },
] satisfies ReadonlyArray<{
  href: string;
  label: string;
  description: string;
  Icon: IconType;
}>;

const socialLinks = [
  {
    href: 'https://www.facebook.com/DOSTph/',
    label: 'DOST on Facebook',
    Icon: FaFacebook,
    colorClass: 'text-[#1877F2]',
    hoverClass: 'hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600',
  },
  {
    href: 'https://x.com/dostphl?lang=en',
    label: 'DOST on X',
    Icon: FaXTwitter,
    colorClass: 'text-slate-950',
    hoverClass: 'hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950',
  },
  {
    href: 'https://www.instagram.com/dost.ph/?hl=en',
    label: 'DOST on Instagram',
    Icon: FaInstagram,
    colorClass: 'text-[#E4405F]',
    hoverClass: 'hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600',
  },
  {
    href: 'https://www.threads.com/@dost.ph',
    label: 'DOST on Threads',
    Icon: BsFillThreadsFill,
    colorClass: 'text-slate-950',
    hoverClass: 'hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950',
  },
  {
    href: 'https://www.youtube.com/channel/UCu3ZUWLIGcwy-XM1uJVkIuA',
    label: 'DOST on YouTube',
    Icon: FaYoutube,
    colorClass: 'text-[#FF0000]',
    hoverClass: 'hover:border-red-200 hover:bg-red-50 hover:text-red-600',
  },
] satisfies ReadonlyArray<{
  href: string;
  label: string;
  Icon: IconType;
  colorClass: string;
  hoverClass: string;
}>;

export function Navbar(): ReactElement {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isCategoryActive = pathname.startsWith('/categories');

  useEffect(() => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${isScrolled
            ? 'border-white/15 bg-linear-to-r from-[#ED1E24]/95 to-[#F47421]/95 shadow-[0_14px_35px_-20px_rgba(127,29,29,0.7)] backdrop-blur-xl'
            : 'border-transparent bg-transparent shadow-none'
          }`}
      >
        <div className="mx-auto grid h-20  grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link
            href="/"
            aria-label="Handa Pilipinas home"
            className="group flex shrink-0 items-center justify-self-start rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1E24]"
          >
            <Image
              src="/assets/images/logos/handa.png"
              alt="Handa Pilipinas"
              width={300}
              height={68}
              priority
              className={`rounded-full object-contain transition-all duration-300 ${isScrolled ? 'drop-shadow-[0_5px_12px_rgba(92,17,17,0.3)]' : ''
                }`}
            />
          </Link>

          <div className="hidden justify-self-center lg:block">
            <div
              className={`flex items-center rounded-full  p-1 transition-colors duration-300`}
            >
              {navigationItems.map((item) => (
                <NavLinks key={item.href} {...item} isInverted={isScrolled} />
              ))}

              <details className="group relative">
                <summary
                  className={`flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-2 text-[12.4px] font-semibold tracking-[0.08em] transition-all duration-200 [&::-webkit-details-marker]:hidden ${
                    isScrolled
                      ? isCategoryActive
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-white/90 hover:bg-white/12 hover:text-white'
                      : isCategoryActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-accent hover:bg-white/70 hover:text-slate-950'
                  }`}
                >
                  <BiCategory className="text-sm" aria-hidden="true" />
                  <span>CATEGORIES</span>
                  <FiChevronDown
                    className="text-sm transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <div className="absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)]">
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[10px] font-bold tracking-[0.18em] text-slate-400">EXPLORE BY CATEGORY</p>
                  </div>
                  {categoryLinks.map(({ href, label, description, Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`group/item flex items-start gap-3 rounded-xl px-3 py-3 transition-colors ${
                        pathname === href ? 'bg-red-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-[#ED1E24] transition-colors group-hover/item:bg-[#ED1E24] group-hover/item:text-white">
                        <Icon aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">{label}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-slate-500">{description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </details>

              <NavLinks {...featuredTechnologyItem} isInverted={isScrolled} />
            </div>
          </div>

          <div className="hidden items-center gap-2 justify-self-end xl:flex">
            {socialLinks.map(({ href, label, Icon, colorClass, hoverClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={`grid size-9 place-items-center rounded-full border shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 ${isScrolled
                    ? 'border-white/25 bg-white/12 text-white focus-visible:outline-white'
                    : `border-slate-200 bg-white/80 focus-visible:outline-[#ED1E24] ${colorClass} ${hoverClass}`
                  }`}
              >
                <Icon className="text-[15px]" aria-hidden="true" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className={`grid size-11 place-items-center justify-self-end rounded-full border shadow-xs transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden ${isScrolled
                ? 'border-white/25 bg-white/12 text-white focus-visible:outline-white'
                : 'border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white focus-visible:outline-[#ED1E24]'
              }`}
            aria-label="Open navigation menu"
            aria-expanded={isSidebarOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        <div
          className={`h-0.5 bg-linear-to-r from-[#ED1E24] via-[#F47421] to-[#FFCC49] transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
        />
      </nav>

      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <div className='flex justify-between flex-col h-full'>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLinks key={item.href} {...item} isMobile onClick={() => setIsSidebarOpen(false)} />
            ))}

            <details className="group">
              <summary
                className={`flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors [&::-webkit-details-marker]:hidden ${
                  isCategoryActive ? 'bg-red-50 text-[#ED1E24]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <span className="flex items-center gap-3">
                  <BiCategory className="text-lg" aria-hidden="true" />
                  Categories
                </span>
                <FiChevronDown className="transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-4">
                {categoryLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      pathname === href
                        ? 'bg-red-50 text-[#ED1E24]'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </Link>
                ))}
              </div>
            </details>

            <NavLinks
              {...featuredTechnologyItem}
              isMobile
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 px-5">
            <p className="mb-3 text-[10px] font-bold tracking-[0.18em] text-slate-400">FOLLOW DOST</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ href, label, Icon, colorClass, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid size-10 place-items-center rounded-full border border-slate-200 bg-white transition-colors ${colorClass} ${hoverClass}`}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
