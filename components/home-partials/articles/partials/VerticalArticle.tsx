import Link from "next/link";
import type { ReactElement } from "react";
import { FiUser } from "react-icons/fi";
import { LuPlay } from "react-icons/lu";

import ImageLoader from "@/components/common/ImageLoader";
import type { Material } from "@/types/data-types";
import { convertShortDate, stripHtml } from "@/utils/utils";

type VerticalArticleProps = {
  article: Material;
};

export default function VerticalArticle({
  article,
}: VerticalArticleProps): ReactElement {
  const author = article.author?.trim() || article.agency?.trim();
  const excerpt = article.description_text?.trim() || article.description?.trim();
  const thumbnail = article.thumbnail?.trim();
  const sourceUrl = article.source_url?.trim();
  const isVideo = article.filter_type === "2";
  const href = isVideo && sourceUrl ? sourceUrl : `/articles/${article.slug}`;

  return (
    <Link
      href={href}
      target={isVideo && sourceUrl ? "_blank" : undefined}
      rel={isVideo && sourceUrl ? "noopener noreferrer" : undefined}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1E24]"
      aria-label={`${isVideo ? "Watch" : "Read"} ${article.title}`}
    >
      <article className="flex h-full flex-col overflow-hidden transition-all duration-300 ">
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100 rounded-lg border border-amber-700/40">
          {thumbnail ? (
            <ImageLoader
              src={`/assets/images/thumbnails/${thumbnail}`}
              width={720}
              height={450}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-orange-100"
              aria-hidden="true"
            />
          )}

          {isVideo ? (
            <>
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-md backdrop-blur-sm">
                <LuPlay fill="currentColor" aria-hidden="true" />
                Video
              </span>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-90 transition-transform duration-200 group-hover:scale-105">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/90 text-slate-950 shadow-lg">
                  <LuPlay className="ml-0.5" fill="currentColor" aria-hidden="true" />
                </span>
              </span>
            </>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col py-4 gap-3">

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs font-semibold text-secondary">
            <span className="inline-flex min-w-0 items-center gap-1.5 text-[10.5px]">
              <FiUser className="shrink-0 text-[#F47421]" aria-hidden="true" />
              <span className="truncate">{author || 'Juan Dela Cruz'}</span>
            </span>
            {article.publish_date ? (
              <span className="inline-flex items-center gap-1.5 text-[10.5px]">
                <time dateTime={article.publish_date}>
                  {convertShortDate(article.publish_date)}
                </time>
              </span>
            ) : null}
          </div>
          <h3 className=" line-clamp-2 font-montserrat text-[15px] font-bold  text-slate-950 transition-colors group-hover:text-[#ED1E24]">
            {article.title}
          </h3>


          {excerpt ? (
            <p className="mt-1 line-clamp-3 text-[12.4px] leading-6 text-slate-700">
              {stripHtml(excerpt)}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
