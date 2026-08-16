import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight, LogIn } from "lucide-react";
import { dashboardPathForRole } from "@/lib/roles";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt={"Doctor space logo"}
                width={153}
                height={57}
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={
                session ? dashboardPathForRole(session.user.role) : "/sign-in"
              }
            >
              <Button>
                {session ? session.user.name : "Sign in"}{" "}
                {session ? (
                  <>
                    <ArrowRight className="size-4" />{" "}
                  </>
                ) : (
                  <>
                    <LogIn className="size-4" />{" "}
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
