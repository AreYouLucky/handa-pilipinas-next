'use client';

import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

const LottiePlayer = dynamic(
    () => import('@lottiefiles/react-lottie-player').then(({ Player }) => Player),
    { ssr: false },
);

export default function SearchLottieIcon(): ReactElement {
    return (
        <span
            className="pointer-events-none size-4 sm:size-6 shrink-0 overflow-hidden -mt-0.5 sm:-mt-1"
            aria-hidden="true"
        >
            <LottiePlayer
                src="/assets/lotties/search.json"
                autoplay
                loop
                className="size-full scale-[1.8]"
            />
        </span>
    );
}
