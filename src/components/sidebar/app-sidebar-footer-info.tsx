"use client";

import { ChevronsUpDown, LogOut, BadgeCheck, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export function SidebarFooterInfo({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
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
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-start justify-center text-left text-sm leading-tight">
              <span className="truncate font-semibold text-sm">
                {user.name}
              </span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <BadgeCheck />
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                console.log("logout trigger");
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
