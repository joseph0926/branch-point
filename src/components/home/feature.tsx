import {
  IconBook,
  IconCode,
  IconClipboardList,
  IconCube,
  IconUser,
  IconSchool,
} from "@tabler/icons-react";
import { Grid, GridCard } from "@/components/ui/grid";
import Image from "next/image";

const features = [
  {
    Icon: IconBook,
    name: "튜토리얼",
    description: "단계별로 진행되는 상세한 학습 자료를 제공합니다.",
    href: "/tutorials",
    cta: "Learn more",
    background: (
      <Image
        fill
        src="/img/tutorial.jpg"
        className="absolute -right-20 -top-20 brightness-50"
        alt="Tutorial Background"
      />
    ),
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: IconCode,
    name: "인터랙티브 코딩",
    description: "실시간으로 코드를 작성하고 실행할 수 있는 환경을 제공합니다.",
    href: "/interactive-coding",
    cta: "Start coding",
    background: (
      <Image
        fill
        src="/img/coding.jpg"
        className="absolute -right-20 -top-20 brightness-50"
        alt="Interactive Coding Background"
      />
    ),
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: IconClipboardList,
    name: "퀴즈 및 과제",
    description: "학습 내용을 점검할 수 있는 퀴즈와 과제를 제공합니다.",
    href: "/quizzes",
    cta: "Take a quiz",
    background: (
      <Image
        fill
        src="/img/quiz.jpg"
        className="absolute -right-20 -top-20 brightness-50"
        alt="Quiz Background"
      />
    ),
    className: "lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: IconCube,
    name: "프로젝트 기반 학습",
    description: "실제 프로젝트를 통해 학습 내용을 적용해보세요.",
    href: "/projects",
    cta: "View projects",
    background: null,
    className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-3",
  },
  {
    Icon: IconUser,
    name: "커뮤니티 지원",
    description: "질문과 답변을 주고받을 수 있는 활발한 커뮤니티를 제공합니다.",
    href: "/community",
    cta: "Join the community",
    background: (
      <Image
        fill
        src="/img/community.jpg"
        className="absolute -right-20 -top-20 brightness-50"
        alt="Community Background"
      />
    ),
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
  },
  {
    Icon: IconSchool,
    name: "멘토링",
    description:
      "전문가와의 1:1 멘토링 세션을 통해 깊이 있는 학습을 경험하세요.",
    href: "/mentoring",
    cta: "Find a mentor",
    background: (
      <Image
        fill
        src="/img/mento.jpg"
        className="absolute -right-20 -top-20 brightness-50"
        alt="Mentoring Background"
      />
    ),
    className: "lg:row-start-2 lg:row-end-4 lg:col-start-3 lg:col-end-4",
  },
];

export async function Feature() {
  return (
    <Grid className="lg:grid-rows-3">
      {features.map((feature) => (
        <GridCard key={feature.name} {...feature} />
      ))}
    </Grid>
  );
}
