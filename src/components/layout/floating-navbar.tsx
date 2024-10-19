import { FloatingNavbarMobile } from "./floating-navbar-mobile";
import { FloatingNavbarPc } from "./floating-navbar-pc";

export const FloatingNavbar = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <div className="flex items-center w-full justify-center fixed bottom-10 left-[50%] translate-x-[-50%]">
      <FloatingNavbarPc items={items} className={desktopClassName} />
      <FloatingNavbarMobile items={items} className={mobileClassName} />
    </div>
  );
};
