"use client";

import { useState, useEffect } from "react";
import { Folder, FileText } from "lucide-react";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useFolderManagement } from "@/hooks/use-folder-management";
import { NotFoundPage } from "@/page";

export function EditFolder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { editFolder, findFolder } = useFolderManagement();

  const existingFolder = id ? findFolder(id) : undefined;

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!existingFolder) return;
    setLabel(existingFolder.label);
    setDescription(existingFolder.description);
  }, [existingFolder]);

  const handleSaveClick = () => {
    if (!id) return;
    editFolder(id, label, description);
    navigate("/");
  };

  if (!id || !existingFolder) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex w-full h-full items-start justify-start px-6">
      <Card className="w-full h-full rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 to-transparent p-6 flex flex-col gap-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shrink-0 shadow-sm">
            <Folder className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-none tracking-tight truncate">
              Edit {existingFolder.label}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set a name and a description for the folder
            </p>
          </div>
          <div className="ml-auto">
            <Button onClick={handleSaveClick} variant="default" size="default">
              Save
            </Button>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Folder className="h-3.5 w-3.5 text-muted-foreground" />
            Label
          </FieldLabel>
          <Input
            required
            value={label}
            placeholder="For example, Work"
            onChange={(e) => setLabel(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Description */}
        <div className="flex max-w-full flex-col gap-1.5 flex-1">
          <div className="flex max-w-full items-center justify-between">
            <FieldLabel className="flex max-w-full items-center gap-1.5 text-sm font-medium text-foreground">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              Description
            </FieldLabel>
            <span className="text-xs text-muted-foreground tabular-nums">
              {description.length} characters
            </span>
          </div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description for this folder..."
            className="min-h-56 max-w-300 resize-none flex-1"
          />
        </div>
      </Card>
    </div>
  );
}
