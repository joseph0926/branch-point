import { Book } from "@/components/home/book";
import { Hero } from "@/components/home/hero";
import { Time } from "@/components/home/time";
import { ExpandableCardDemo } from "@/components/ui/expand-card";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="flex justify-center items-center">
        <div className="flex-1">
          <Book />
        </div>
        <div className="flex-1">
          <ExpandableCardDemo />
        </div>
      </div>
      <Time />
    </div>
  );
}
