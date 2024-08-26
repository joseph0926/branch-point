"use client";

import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AuthType } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export function Auth() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const type = searchParams.get("type") as AuthType;

  const { createQueryString } = useUpdateSearchParams(searchParams);

  useEffect(() => {
    if (!type) {
      router.push(pathname + "?" + createQueryString("type", "signIn"));
    }
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        {type === "signIn" ? <SignInCard /> : <SignUpCard />}
      </div>
    </div>
  );
}
