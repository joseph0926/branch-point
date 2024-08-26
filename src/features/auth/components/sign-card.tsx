import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren } from "react";

type SignCardProps = PropsWithChildren<{
  title: string;
  desc: string;
}>;

/** Sign 레이아웃 컴포넌트 */
export function SignCard({ children, title, desc }: SignCardProps) {
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">{children}</CardContent>
    </Card>
  );
}
