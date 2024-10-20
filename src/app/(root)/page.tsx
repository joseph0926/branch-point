import { Feature } from "@/components/home/feature";
import { Hero } from "@/components/home/hero";
import { Time } from "@/components/home/time";
import { ExpandableCard } from "@/components/ui/expand-card";

export default function HomePage() {
  return (
    <div className="w-full px-10 flex items-center flex-col gap-4">
      <Hero />
      <Feature />
      <div className="w-full mb-6 mt-20">
        <ExpandableCard />
      </div>
      <Time />
    </div>
  );
}
