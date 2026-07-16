import Image from "next/image";
import type { ReactElement } from "react";
import { FaConnectdevelop } from "react-icons/fa";
import { LuArrowUpRight, LuBadgeCheck } from "react-icons/lu";

type Partner = {
  acronym: string;
  title: string;
  description: string;
  logo: string;
  website: string;
};

const partners: Partner[] = [
  {
    acronym: "OCD",
    title: "Office of Civil Defense",
    description:
      "The implementing arm of the National Disaster Risk Reduction and Management Council, leading coordinated efforts to protect communities and strengthen national disaster resilience.",
    logo: "/assets/images/logos/OCD.png",
    website: "https://ocd.gov.ph/",
  },
  {
    acronym: "DILG",
    title: "Department of the Interior and Local Government",
    description:
      "The national agency advancing peace and order, public safety, and capable local governance for responsive and resilient communities across the Philippines.",
    logo: "/assets/images/logos/DILG.svg",
    website: "https://www.dilg.gov.ph/",
  },
];

export default function Partners(): ReactElement {
  return (
    <section
      aria-labelledby="partners-heading"
      className="relative overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-18 lg:py-20"
    >
      <div
        className="absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 bg-linear-to-r from-transparent via-[#F47421]/40 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-9 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#ED1E24]">
            <FaConnectdevelop aria-hidden="true" />
            Working together
          </span>
          <h2
            id="partners-heading"
            className="mt-4 font-montserrat text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
          >
            Our Partners
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Building safer and more resilient communities through strong
            government collaboration.
          </p>
        </header>

        <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {partners.map((partner) => (
            <li key={partner.acronym}>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F47421]/35 hover:shadow-xl hover:shadow-orange-950/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1E24] sm:p-8"
                aria-label={`Visit the ${partner.title} website`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#ED1E24] to-[#F47421] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:h-28 sm:w-28">
                    <Image
                      src={partner.logo}
                      width={112}
                      height={112}
                      alt={`${partner.title} logo`}
                      unoptimized={partner.logo.endsWith(".svg")}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-[#ED1E24] group-hover:bg-[#ED1E24] group-hover:text-white">
                    <LuArrowUpRight aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F47421]">
                    <LuBadgeCheck aria-hidden="true" />
                    Government partner · {partner.acronym}
                  </div>
                  <h3 className="mt-3 font-montserrat text-xl font-extrabold leading-tight text-slate-950 transition-colors group-hover:text-[#ED1E24] sm:text-2xl">
                    {partner.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {partner.description}
                  </p>

                  <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-800 transition-colors group-hover:text-[#ED1E24]">
                    Visit official website
                    <LuArrowUpRight
                      className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
