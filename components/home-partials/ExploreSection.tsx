import Image from 'next/image';
import type { ReactElement } from 'react';

import SearchLottieIcon from '@/components/common/SearchLottieIcon';

export default function ExploreSection(): ReactElement {
    return (
        <section
            aria-labelledby="explore-heading"
            className="relative isolate flex min-h-120 w-full items-center overflow-hidden sm:min-h-150 lg:min-h-170"
        >
            <Image
                src="/assets/images/backgrounds/BG.jpg"
                alt="A Philippine coastal community surrounded by mountains at sunrise"
                fill
                priority
                sizes="100vw"
                className="-z-20 object-cover object-center"
            />

            <div className="absolute inset-0 -z-10 bg-[#ED1E24]/10" aria-hidden="true" />
            <div
                className="absolute inset-0 -z-10 bg-linear-to-b from-[#ED1E24]/30 via-[#F47421]/10 to-[#ED1E24]/65"
                aria-hidden="true"
            />
            <div
                className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-[#ED1E24]/35 to-transparent"
                aria-hidden="true"
            />

            <div className="mx-auto w-full max-w-6xl px-5 pb-20 lg:pt-6 sm:pt-5 pt-13 text-center sm:px-8">
                <div className="mx-auto max-w-5xl">

                    <h2
                        id="explore-heading"
                        className="font-montserrat text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl"
                    >
                            Building a safer and more resilient Philippines
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-white/80 sm:text-lg sm:leading-8">
                        Explore science-based technologies, solutions, and resources that help
                        communities prepare for hazards, reduce risks, and respond to disasters.
                    </p>
                    
                </div>

                <form
                    action="/search"
                    method="get"
                    role="search"
                    className="mx-auto mt-5 flex max-w-3xl items-center rounded-2xl border border-white/40 bg-white/95 p-1.5 shadow-[0_24px_70px_-22px_rgba(15,23,42,0.8)] backdrop-blur-md transition focus-within:border-[#F47421] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#F47421]/60 sm:p-2"
                >
                    <label htmlFor="explore-search" className="sr-only">
                        Search Handa Pilipinas
                    </label>
                    <span className="grid size-11 shrink-0 place-items-center text-slate-400 sm:size-12" aria-hidden="true">
                        <svg className="size-5 sm:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m1.35-5.4A6.75 6.75 0 1 1 4.5 11.25a6.75 6.75 0 0 1 13.5 0Z" />
                        </svg>
                    </span>
                    <input
                        id="explore-search"
                        name="q"
                        type="search"
                        placeholder="What would you like to explore?"
                        autoComplete="off"
                        className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-500 sm:px-2 sm:text-base"
                    />
                    <button
                        type="submit"
                        className="flex shrink-0 items-center gap-2 rounded-xl bg-linear-to-br from-[#ED1E24] to-[#F47421] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1E24] sm:px-7 sm:text-base"
                    >
                        <SearchLottieIcon />
                        <span className="hidden sm:inline">Search</span>
                    </button>
                </form>
            </div>
        </section>
    );
}
