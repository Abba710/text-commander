import { useTheme } from "@/context/theme";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant={"secondary"}
      className={"bg-background text-foreground hover:bg-muted"}
      onClick={toggleTheme}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
