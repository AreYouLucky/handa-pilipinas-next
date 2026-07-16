"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { useState, useSyncExternalStore } from "react";
import {
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
  LuNewspaper,
} from "react-icons/lu";

import VerticalArticle from "./partials/VerticalArticle";
import LatestArticle from "./partials/LatestArticle";
import { data } from "@/data/sample";
import type { Material } from "@/types/data-types";

const DESKTOP_NEWS_PER_PAGE = 3;
const COMPACT_NEWS_PER_PAGE = 2;
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

type DataArticle = (typeof data)[number];

function subscribeToDesktopViewport(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopViewportSnapshot(): boolean {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function getServerDesktopViewportSnapshot(): boolean {
  return false;
}

function getPublishTime(article: DataArticle): number {
  const publishDate = article.publish_date || article.publisher_publish_date;
  const publishTime = Date.parse(publishDate);

  return Number.isNaN(publishTime) ? 0 : publishTime;
}

function normalizeArticle(article: DataArticle): Material {
  return {
    ...article,
    filter_type: String(article.filter_type),
    is_publish: article.is_publish === 1,
    is_press_release: article.is_press_release === 1,
    trash: article.trash === 1,
    is_archive: article.is_archive === 1,
  };
}

export default function ArticleSection(): ReactElement | null {
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerDesktopViewportSnapshot,
  );
  const newsPerPage = isDesktop
    ? DESKTOP_NEWS_PER_PAGE
    : COMPACT_NEWS_PER_PAGE;
  const newsArticles = data
    .map((article, index) => ({ article, index }))
    .filter(
      ({ article }) =>
        article.filter_type === 1 || article.filter_type === 2,
    )
    .sort(
      (firstArticle, secondArticle) =>
        getPublishTime(secondArticle.article) -
          getPublishTime(firstArticle.article) ||
        secondArticle.index - firstArticle.index,
    )
    .map(({ article }) => normalizeArticle(article));

  const [latestArticle, ...remainingArticles] = newsArticles;

  if (!latestArticle) {
    return null;
  }

  const pageCount = Math.ceil(remainingArticles.length / newsPerPage);
  const activePage = Math.min(currentPage, Math.max(pageCount, 1));
  const pageStart = (activePage - 1) * newsPerPage;
  const visibleArticles = remainingArticles.slice(
    pageStart,
    pageStart + newsPerPage,
  );

  return (
    <section
      aria-labelledby="latest-articles-heading"
      className="relative isolate overflow-hidden  px-5 pt-8 sm:px-8 sm:pt-20 lg:pt-16 "
    >

      <div className="mx-auto w-full max-w-7xl border-b border-amber-600 pb-8 sm:pb-20 lg:pb-16">
        <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h2
              id="latest-articles-heading"
              className="flex items-center gap-3 text-lg font-extrabold uppercase tracking-[0.16em] text-[#ED1E24]"
            >
              <LuNewspaper aria-hidden="true" />
              
              Recent Stories
            </h2>
          </div>

          <Link
            href="/articles"
            className="group inline-flex w-fit items-center gap-2 rounded-full  px-5 py-2.5 text-sm font-bold text-slate-700  transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ED1E24]/30 hover:text-[#ED1E24]  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1E24]"
          >
            View More
            <LuArrowRight
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </header>

        <LatestArticle article={latestArticle} />

        {visibleArticles.length > 0 ? (
          <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((newsArticle) => (
              <VerticalArticle
                key={`${newsArticle.slug}-${newsArticle.publish_date}`}
                article={newsArticle}
              />
            ))}
          </div>
        ) : null}

        {pageCount > 1 ? (
          <nav
            className="mt-10 flex items-center justify-center gap-3"
            aria-label="News pagination"
          >
            <button
              type="button"
              onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
              disabled={activePage === 1}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#ED1E24]/30 hover:text-[#ED1E24] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1E24]"
            >
              <LuChevronLeft aria-hidden="true" />
              Previous
            </button>

            <span className="min-w-20 text-center text-sm font-semibold text-slate-500">
              {activePage} of {pageCount}
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentPage(Math.min(pageCount, activePage + 1))
              }
              disabled={activePage === pageCount}
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ED1E24] to-[#F47421] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1E24]"
            >
              Next
              <LuChevronRight aria-hidden="true" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
