import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function MainTest() {
  return (
    <div data-debug="main test component" className="flex w-full p-4">
      <Field>
        <FieldLabel htmlFor="textarea-message" className="text-3xl">
          Welcome to Text Commander
        </FieldLabel>
        <FieldDescription>
          You can try out your commands below. Try typing the command "/hi"
        </FieldDescription>
        <Textarea
          id="textarea-message"
          placeholder="Type your message here."
          className="min-h-75"
        />
        <FieldDescription>
          Your commands insert snippets and will work on any website. You can
          also right-click on text boxes to select a snippet from the context
          menu.
        </FieldDescription>
        <div className="flex gap-2 items-center">
          <FieldLabel htmlFor="textarea-message" className="text-xl">
            Create new command now:
          </FieldLabel>
          <Button variant="default" size="xs" className={""}>
            Add command
          </Button>
        </div>
      </Field>
    </div>
  );
}
