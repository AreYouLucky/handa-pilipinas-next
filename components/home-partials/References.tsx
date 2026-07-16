import type { ReactElement } from "react";
import { LuArrowUpRight, LuBookOpen, LuLibraryBig } from "react-icons/lu";

import ImageLoader from "@/components/common/ImageLoader";
import { data } from "@/data/sample";

type ReferenceMaterial = (typeof data)[number];

function getDocumentUrl(reference: ReferenceMaterial): string | null {
  const sourceUrl = reference.source_url?.trim();

  if (sourceUrl) {
    return sourceUrl;
  }

  if ("filename" in reference && typeof reference.filename === "string") {
    const filename = reference.filename.trim();

    return filename ? `/pdf/${encodeURIComponent(filename)}` : null;
  }

  return null;
}

export default function References(): ReactElement | null {
  const references = data.filter((item) => item.filter_type === 3);

  if (references.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="references-heading"
      className="relative isolate overflow-hidden bg-linear-to-br from-[#ED1E24] via-[#EF3E23] to-[#F47421] px-5 py-14 sm:px-8 sm:py-18 lg:py-20"
    >
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FFCC49]/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-9 max-w-2xl text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-sm">
            <LuLibraryBig aria-hidden="true" />
            Preparedness library
          </span>
          <h2
            id="references-heading"
            className="mt-4 font-montserrat text-2xl font-extrabold tracking-tight sm:text-3xl"
          >
            References &amp; Learning Materials
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
            Practical guides and trusted resources for building safer, more
            resilient communities.
          </p>
        </header>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
          {references.map((reference) => {
            const thumbnail = reference.thumbnail?.trim();
            const documentUrl = getDocumentUrl(reference);
            const card = (
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/25 bg-white shadow-xl shadow-red-950/15 transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
                  {thumbnail ? (
                    <ImageLoader
                      src={`/assets/images/thumbnails/${thumbnail}`}
                      alt={reference.title}
                      width={900}
                      height={675}
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-linear-to-br from-orange-100 via-white to-red-100"
                      aria-hidden="true"
                    />
                  )}

                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                    <LuBookOpen className="text-[#FFCC49]" aria-hidden="true" />
                    Learning material
                  </span>
                </div>

                <div className="flex flex-1 items-center justify-between gap-4 p-5 sm:p-6">
                  <h3 className="font-montserrat text-base font-extrabold leading-6 text-slate-900 sm:text-lg">
                    {reference.title}
                  </h3>

                  {documentUrl ? (
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#ED1E24] to-[#F47421] text-white shadow-sm transition-transform group-hover:translate-x-0.5">
                      <LuArrowUpRight aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              </article>
            );

            return documentUrl ? (
              <a
                key={`${reference.slug}-${reference.title}`}
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`Open ${reference.title}`}
              >
                {card}
              </a>
            ) : (
              <div key={`${reference.slug}-${reference.title}`}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
