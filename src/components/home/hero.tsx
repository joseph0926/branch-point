import { Card, Carousel } from "@/components/ui/carousel";
import { carouselItems } from "@/constants/data";
import Link from "next/link";

export function Hero() {
  const cards = carouselItems.map((card, index) => (
    <Link key={card.src} href={card.href}>
      <Card card={card} index={index} />
    </Link>
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="pl-4 text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        당신의 기술을 역량을 향상시켜보세요!
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
