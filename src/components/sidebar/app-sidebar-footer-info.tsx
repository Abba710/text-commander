"use client";
import GuestIcon from "@/assets/guest.svg?react";
import { ChevronsUpDown, LogOut, BadgeCheck, LogIn } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export function SidebarFooterInfo() {
  const { user, signInWithGoogle, logout } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex w-full items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="lg"
              variant="ghost"
              className="data-[state=open]:bg-foreground w-full flex h-16 p-1 rounded-none data-[state=open]:text-sidebar-accent-foreground"
            ></Button>
          }
        >
          <div className="gap-2 flex w-full items-center justify-center p-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-foreground">
              {user ? (
                <Avatar className="h-8 w-8 rounded-lg text-background">
                  <AvatarImage
                    src={user.metaData.avatar_url}
                    alt={user.metaData.name}
                  />
                </Avatar>
              ) : (
                <GuestIcon className="size-6 text-background" />
              )}
            </div>

            <div className="flex flex-col items-start justify-center text-left text-sm leading-tight">
              {user ? (
                <>
                  <span className="truncate font-semibold text-sm">
                    {user?.metaData.name}
                  </span>
                  <span className="truncate text-xs">{user?.mail}</span>
                </>
              ) : (
                <>
                  <span className="truncate font-semibold text-sm">Guest</span>
                </>
              )}
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={"w-15"}
          side="right"
          align="start"
          sideOffset={8}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <BadgeCheck />
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {user ? (
              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  logout();
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                variant="default"
                onClick={() => {
                  signInWithGoogle();
                }}
              >
                <LogIn />
                Log In
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
