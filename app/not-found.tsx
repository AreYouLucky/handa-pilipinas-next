import Link from 'next/link';
import type { ReactElement } from 'react';
import { FiArrowRight, FiHome, FiMail } from 'react-icons/fi';

export default function NotFound(): ReactElement {
    return (
        <main className="relative isolate flex min-h-[75svh] w-full items-center overflow-hidden bg-white px-6 py-16 sm:px-10 lg:px-16">
            <div
                className="absolute -left-40 top-10 -z-10 size-96 rounded-full bg-red-100/70 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute -right-40 bottom-0 -z-10 size-96 rounded-full bg-orange-100/80 blur-3xl"
                aria-hidden="true"
            />

            <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
                <section className="order-2 text-center lg:order-1 lg:text-left">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#ED1E24]">
                        Page not found
                    </p>
                    <h1 className="max-w-2xl font-montserrat text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                        We couldn&apos;t find the page you&apos;re looking for.
                    </h1>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
                        The page may have moved, the address may be incorrect, or the
                        content is no longer available.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                        <Link
                            href="/"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#ED1E24] to-[#F47421] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1E24]"
                        >
                            <FiHome aria-hidden="true" />
                            Return home
                            <FiArrowRight aria-hidden="true" />
                        </Link>
                        <a
                            href="mailto:ousec.drrcc@dost.gov.ph"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1E24]"
                        >
                            <FiMail aria-hidden="true" />
                            Contact support
                        </a>
                    </div>
                </section>

                <div className="order-1 mx-auto w-full max-w-md lg:order-2" aria-hidden="true">
                    <div className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-linear-to-br from-red-50 via-white to-orange-50 px-6 py-12 text-center shadow-[0_30px_80px_-35px_rgba(190,24,24,0.35)] sm:px-10 sm:py-16">
                        <div className="absolute inset-x-8 top-8 h-px bg-linear-to-r from-transparent via-red-200 to-transparent" />
                        <p className="bg-linear-to-r from-[#ED1E24] to-[#F47421] bg-clip-text font-montserrat text-[7rem] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[9rem]">
                            404
                        </p>
                        <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-linear-to-r from-[#ED1E24] to-[#F47421]" />
                        <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                            Lost, but never unprepared
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
