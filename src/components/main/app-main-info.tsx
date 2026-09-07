import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function MainInfo() {
  return (
    <div
      data-debug="main info component"
      className="mx-auto flex flex-col gap-2 w-full max-w-xs"
    >
      <Card
        size="sm"
        className="flex flex-col justify-center w-full p-2 transition-shadow hover:shadow-sm"
      >
        <CardHeader className="flex flex-col justify-center w-full gap-1.5">
          <CardTitle className="flex items-center gap-2">
            <Badge>Tip #1</Badge> Smart Commands
          </CardTitle>
          <CardDescription>
            Write messages faster using commands
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>
                Type{" "}
                <code className="rounded border border-border/60 bg-muted px-1 py-0.5 font-mono text-xs">
                  /hi Name
                </code>
                , for example{" "}
                <code className="rounded border border-border/60 bg-muted px-1 py-0.5 font-mono text-xs">
                  /hi Alex
                </code>
                , to insert a personalized greeting for Alex
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>Create custom commands with any number of arguments</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card
        size="sm"
        className="flex flex-col justify-center w-full p-2 transition-shadow hover:shadow-sm"
      >
        <CardHeader className="flex flex-col justify-center w-full gap-1.5">
          <CardTitle className="flex items-center gap-2">
            <Badge>Tip #2</Badge> Shortcuts
          </CardTitle>
          <CardDescription>
            You don't have to remember everything
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>Text Commander works on any website</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>
                Right-click inside a text field to open the list of available
                commands
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>
                Use the context menu to choose a command without having to
                remember its shortcut
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card
        size="sm"
        className="flex flex-col justify-center w-full p-2 border-dashed"
      >
        <CardHeader className="flex flex-col justify-center w-full items-center text-center gap-1.5">
          <CardTitle>
            <span className="text-xl">Want to learn more?</span>
          </CardTitle>
          <CardDescription>
            Discover more tips, guides, and ready-to-use command ideas for
            different situations on our website.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <a
            href="#"
            className={
              buttonVariants({ variant: "secondary", size: "sm" }) + " gap-1.5"
            }
          >
            Visit website
            <ArrowRight className="size-3.5" />
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
