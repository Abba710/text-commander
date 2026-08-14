import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function MainInfo() {
  return (
    <div
      data-debug="main info component"
      className=" mx-auto flex flex-col gap-2 w-full max-w-xs"
    >
      <Card size="sm" className="flex flex-col justify-center w-full p-2">
        <CardHeader className="flex flex-col justify-center w-full">
          <CardTitle>
            <Badge>Tip #1</Badge> Smart Commands
          </CardTitle>
          <CardDescription>
            Write messages faster using commands
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              Type <code className="px-1 rounded bg-muted">/hi Name</code>, for
              example <code className="px-1 rounded bg-muted">/hi Alex</code>,
              to insert a personalized greeting for Alex
            </li>
            <li>Create custom commands with any number of arguments</li>
          </ul>
        </CardContent>
      </Card>

      <Card size="sm" className="flex flex-col justify-center w-full p-2">
        <CardHeader className="flex flex-col justify-center w-full">
          <CardTitle>
            <Badge>Tip #2</Badge> Shortcuts
          </CardTitle>
          <CardDescription>
            You don't have to remember everything
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            <li>Text Commander works on any website</li>
            <li>
              Right-click inside a text field to open the list of available
              commands
            </li>
            <li>
              Use the context menu to choose a command without having to
              remember its shortcut
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card size="sm" className="flex flex-col justify-center w-full p-2">
        <CardHeader className="flex flex-col justify-center w-full">
          <CardTitle>
            <span className="text-xl text-center">Want to learn more?</span>
          </CardTitle>
          <CardDescription>
            Discover more tips, guides, and ready-to-use command ideas for
            different situations on our website.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <a
            href="#"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Visit website
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
