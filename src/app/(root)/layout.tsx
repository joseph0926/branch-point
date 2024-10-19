import { FloatingNavbar } from "@/components/layout/floating-navbar";
import { navItems } from "@/constants/data";
import { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <FloatingNavbar items={navItems} />
    </div>
  );
}
