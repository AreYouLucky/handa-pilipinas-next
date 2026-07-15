import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { BsFillThreadsFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiArrowUpRight, FiMail, FiMapPin } from 'react-icons/fi';
import type { IconType } from 'react-icons';

import type { FooterCategory } from '@/types/data-types';

const defaultCategories = [
    {
        category_id: 1,
        title: 'Disaster Preparedness',
        slug: 'disaster-preparedness',
    },
    {
        category_id: 2,
        title: 'Climate Resilience',
        slug: 'climate-resilience',
    },
    {
        category_id: 3,
        title: 'Emergency Response',
        slug: 'emergency-response',
    },
    {
        category_id: 4,
        title: 'Community Innovation',
        slug: 'community-innovation',
    },
] satisfies ReadonlyArray<FooterCategory>;

const socialLinks = [
    {
        href: 'https://www.facebook.com/DOSTph/',
        label: 'DOST on Facebook',
        Icon: FaFacebookF,
    },
    {
        href: 'https://x.com/dostphl?lang=en',
        label: 'DOST on X',
        Icon: FaXTwitter,
    },
    {
        href: 'https://www.instagram.com/dost.ph/?hl=en',
        label: 'DOST on Instagram',
        Icon: FaInstagram,
    },
    {
        href: 'https://www.threads.com/@dost.ph',
        label: 'DOST on Threads',
        Icon: BsFillThreadsFill,
    },
    {
        href: 'https://www.youtube.com/channel/UCu3ZUWLIGcwy-XM1uJVkIuA',
        label: 'DOST on YouTube',
        Icon: FaYoutube,
    },
] satisfies ReadonlyArray<{
    href: string;
    label: string;
    Icon: IconType;
}>;

type FooterProps = {
    categories?: ReadonlyArray<FooterCategory>;
};

export default function Footer({
    categories = defaultCategories,
}: FooterProps): ReactElement {
    return (
        <footer className="w-full border-t border-white/20 bg-linear-to-br from-[#ED1E24] to-[#F47421] text-white">
            <div className="w-full px-6 pb-7 pt-12 sm:px-10 lg:px-14 lg:pt-14 xl:px-20 2xl:px-24">
                <div className="grid gap-y-10 border-b border-white/20 pb-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12 lg:gap-x-0">
                    <section
                        className="order-2 lg:col-span-4 lg:border-r lg:border-white/20 lg:px-12"
                        aria-labelledby="footer-contact-heading"
                    >
                        <a
                            href="https://dost.gov.ph/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit the Department of Science and Technology website"
                            className="inline-flex rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            <Image
                                src="/assets/images/logos/DOST.png"
                                alt="Department of Science and Technology"
                                width={300}
                                height={103}
                                className="h-auto w-64 object-contain sm:w-72"
                            />
                        </a>

                        <h2 id="footer-contact-heading" className="sr-only">
                            Contact information
                        </h2>
                        <div className="mt-6 space-y-4 border-t border-white/15 pt-5 text-sm leading-6 text-white/80">
                            <p className="flex items-start gap-3">
                                <FiMapPin
                                    className="mt-1 shrink-0 text-lg text-white"
                                    aria-hidden="true"
                                />
                                <span>
                                    DOST Compound, General Santos Avenue, Central Bicutan,
                                    Taguig, Metro Manila, Philippines
                                </span>
                            </p>
                            <a
                                href="mailto:ousec.drrcc@dost.gov.ph"
                                className="flex w-fit items-center gap-3 rounded-md transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                            >
                                <FiMail className="shrink-0 text-lg text-white" aria-hidden="true" />
                                ousec.drrcc@dost.gov.ph
                            </a>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-2" aria-label="DOST social media links">
                            {socialLinks.map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-lg text-white/80 transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#ED1E24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    <Icon aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </section>
                    <section
                        className="order-1 lg:col-span-3 lg:border-r lg:border-white/20 lg:pr-10"
                        aria-labelledby="footer-categories-heading"
                    >
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/65">
                            Discover
                        </p>
                        <h2
                            id="footer-categories-heading"
                            className="text-xl font-bold tracking-tight text-white"
                        >
                            Explore by category
                        </h2>
                        <nav
                            aria-label="Footer category navigation"
                            className="mt-5 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 md:grid-cols-1"
                        >
                            {categories.map((category) => (
                                <Link
                                    key={category.category_id}
                                    href={`/categories/${category.slug}`}
                                    className="group flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white/85 shadow-sm transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    <span>{category.title}</span>
                                    <FiArrowUpRight
                                        className="shrink-0 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                                        aria-hidden="true"
                                    />
                                </Link>
                            ))}
                        </nav>
                    </section>



                    <section
                        className="order-3 md:col-span-2 lg:col-span-5 lg:pl-12"
                        aria-labelledby="footer-location-heading"
                    >
                        <div className="mb-4 flex items-end justify-between gap-4">
                            <div>
                                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white/95">
                                    Find us
                                </p>
                            </div>
                            <a
                                href="https://maps.google.com/?q=Department+of+Science+and+Technology+Main+Compound+Taguig"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden items-center gap-1 rounded-md text-xs font-semibold text-white/75 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:flex"
                            >
                                Open map <FiArrowUpRight aria-hidden="true" />
                            </a>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-white/25 bg-white/15 p-1.5 shadow-xl shadow-red-950/20">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.90778794198!2d121.04423850774764!3d14.48998271793831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf13c1948447%3A0x510c7e818adcc6ee!2sDepartment%20of%20Science%20and%20Technology%20-%20Main%20Compound!5e0!3m2!1sen!2sph!4v1753766191403!5m2!1sen!2sph"
                                title="Department of Science and Technology main compound location"
                                className="h-60 w-full rounded-xl  lg:h-68"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </section>
                </div>

                <div className="flex flex-col gap-3 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        Copyright &copy; {new Date().getFullYear()} Handa Pilipinas. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link
                            href="/about"
                            className="rounded-sm transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            About Handa Pilipinas
                        </Link>
                        <a
                            href="https://www.stii.dost.gov.ph/transparency/about-us/stii-privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-sm transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
