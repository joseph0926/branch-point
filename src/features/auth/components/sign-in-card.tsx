import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignCard } from "./sign-card";

/** SignIn 컴포넌트 */
export function SignInCard() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { createQueryString } = useUpdateSearchParams(searchParams);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <SignCard
      title="Login to continue"
      desc="Use your email or another service to continue"
    >
      <form className="space-y-2.5">
        <Input
          disabled={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          disabled={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />
        <Button type="submit" size="lg" disabled={false} className="w-full">
          Continue
        </Button>
      </form>
      <Separator />
      <div className="flex flex-col gap-y-2.5">
        <Button
          type="button"
          onClick={() => {}}
          variant="outline"
          size="lg"
          disabled={false}
          className="relative"
        >
          <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
          Continue with Google
        </Button>
        <Button
          type="button"
          onClick={() => {}}
          variant="outline"
          size="lg"
          disabled={false}
          className="relative"
        >
          <FaGithub className="size-5 absolute top-2.5 left-2.5" />
          Continue with Github
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <span
          onClick={() =>
            router.push(pathname + "?" + createQueryString("type", "signUp"))
          }
          className="text-sky-700 hover:underline cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </SignCard>
  );
}
