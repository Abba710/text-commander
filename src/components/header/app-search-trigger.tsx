import { Search, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchModal } from "@/components/search/app-search-modal";
import { useState, useEffect } from "react";

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.code === "Slash") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <SearchModal isOpen={open} onClose={() => setOpen(false)} />

      <Button
        onClick={() => setOpen(true)}
        className="bg-background flex border-border rounded-[8px] w-86 justify-start text-foreground hover:bg-muted-foreground/5 ml-auto"
      >
        <Search size={16} className="text-muted-foreground"></Search>
        <span className="text-sm text-muted-foreground">Search</span>
        <Separator
          orientation="vertical"
          className={"ml-auto text-muted-foreground"}
        />
        <div className="flex items-center">
          <Keyboard size={16} className="text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">CTRL + /</span>
        </div>
      </Button>
    </>
  );
}
