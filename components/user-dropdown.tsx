"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

import { RiLogoutBoxLine } from "@remixicon/react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

export default function UserDropdown() {
  const [isPending, startTransition] = useTransition();
  const { data: session } = authClient.useSession();

  function onLogout() {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("You have been successfully logged out");
            redirect("/sign-in");
          },
          onError: (error) => {
            toast.success(
              error.error.message ??
                "Unexpected error happen during logging out"
            );
          },
        },
      });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-8">
            <AvatarImage
              src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/user_sam4wh.png"
              width={32}
              height={32}
              alt="Profile image"
            />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground mb-1">
            {session ? (
              session.user.name
            ) : (
              <Skeleton className="h-5 w-full rounded-full" />
            )}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {session ? (
              session.user.email
            ) : (
              <Skeleton className="h-4 w-full rounded-full" />
            )}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isPending} onClick={onLogout}>
          <RiLogoutBoxLine
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
          {isPending ? (
            <>
              <Loader2 className="animate-spin ml-1" size={16} /> Logging out...
            </>
          ) : (
            <>
              <span>Sign Out</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
