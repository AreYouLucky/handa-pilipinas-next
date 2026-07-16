import type { ReactElement } from "react";
import { FiArrowUpRight, FiCalendar, FiUser } from "react-icons/fi";
import { LuPlay } from "react-icons/lu";

import ImageLoader from "@/components/common/ImageLoader";
import type { Material } from "@/types/data-types";
import {convertShortDate, stripHtml} from "@/utils/utils";
import Link from "next/link";

type LatestArticleProps = {
  article: Material;
};


export default function LatestArticle({
  article,
}: LatestArticleProps): ReactElement {

  const author = article.author?.trim() || article.agency?.trim();
  const excerpt = article.description?.trim();
  const thumbnail = article.thumbnail?.trim();
  const sourceUrl = article.source_url?.trim();
  const isVideo = article.filter_type === "2";
  const href = isVideo && sourceUrl ? sourceUrl : `/articles/${article.slug}`;

  return (
    <article >
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="relative min-h-50 overflow-hidden bg-slate-100 sm:min-h-80 lg:min-h-60 rounded-2xl border border-amber-400">
          {thumbnail ? (
            <ImageLoader
              src={`/assets/images/thumbnails/${thumbnail}`}
              width={1000}
              height={760}
              sizes="(min-width: 1024px) 52vw, 100vw"
              alt={article.title}
              priority
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
            />
          ) : (
            <div
              className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-orange-100"
              aria-hidden="true"
            />
          )}

          {isVideo ? (
            <>
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-sm">
                <LuPlay fill="currentColor" aria-hidden="true" />
                Video
              </span>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/90 text-slate-950 shadow-xl sm:h-16 sm:w-16">
                  <LuPlay className="ml-1 text-xl" fill="currentColor" aria-hidden="true" />
                </span>
              </span>
            </>
          ) : null}
        </div>

        <div className="flex flex-col justify-center px-2 py-5 sm:px-10 sm:py-4 lg:px-12 lg:py-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-500">
            {article.publish_date ? (
              <span className="inline-flex items-center gap-2">
                <FiCalendar className="text-[#F47421]" aria-hidden="true" />
                <time dateTime={article.publish_date || undefined}>
                  {convertShortDate(new Date(article.publish_date))}
                </time>
              </span>
            ) : null}
            {author ? (
              <span className="inline-flex items-center gap-2">
                <FiUser className="text-[#F47421]" aria-hidden="true" />
                <span>{author}</span>
              </span>
            ) : null}
          </div>

          <h2 className="mt-5 font-montserrat text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl lg:text-2xl">
            {article.title}
          </h2>

          {excerpt ? (
            <p className="mt-5 line-clamp-5 text-[12px] text-justify leading-7 text-slate-600 sm:text-[14px] sm:leading-8">
              {stripHtml(excerpt)}
            </p>
          ) : null}

            <div className="mt-4 sm:mt-8">
              <Link
                href={href}
                target={isVideo && sourceUrl ? "_blank" : undefined}
                rel={isVideo && sourceUrl ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ED1E24] to-[#F47421] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1E24]"
                aria-label={`${isVideo ? "Watch" : "Read"} ${article.title}`}
              >
                {isVideo ? "Watch video" : "Read full article"}
                <FiArrowUpRight className="text-base" aria-hidden="true" />
              </Link>
            </div>
        </div>
      </div>
    </article>
  );
}
