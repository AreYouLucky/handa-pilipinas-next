import ExploreSection from "@/components/home-partials/ExploreSection";
import Partners from "@/components/home-partials/Partners";
import References from "@/components/home-partials/References";
import ArticleSection from "@/components/home-partials/articles/ArticleSection";
export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col bg-white font-inter">
      <ExploreSection />
      <ArticleSection />
      <References />
      <Partners />
    </div>
  );
}
