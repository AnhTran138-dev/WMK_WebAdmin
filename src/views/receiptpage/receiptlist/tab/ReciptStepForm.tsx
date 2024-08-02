import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { recipeSchema } from "@/schemas/recipe";
import { z } from "zod";
import {
  Button,
  Input,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  Separator,
  ScrollArea,
  Textarea,
} from "@/components/ui";

const ReciptStepForm: React.FC = () => {
  const { control, register } = useFormContext<z.infer<typeof recipeSchema>>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "step",
  });

  // Ensure there is always at least one step initially
  useEffect(() => {
    if (fields.length === 0) {
      append({
        name: "",
        mediaURL: "",
        imageLink: "",
        description: "",
        index: 1,
      });
    }
  }, [fields, append]);

  return (
    <div className="space-y-6">
      <ScrollArea className="h-96">
        {fields.map((field, index) => (
          <div key={field.id} className="px-4 mt-4 space-y-4">
            {/* Step Index and Remove button */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">Step {index + 1}</span>
              <Button type="button" onClick={() => remove(index)}>
                Remove Step
              </Button>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Column 1: Step Name */}
              <FormField
                name={`step.${index}.name`}
                render={() => (
                  <FormItem>
                    <FormLabel>Step Name</FormLabel>
                    <FormControl>
                      <Input
                        id={`step.${index}.name`}
                        placeholder="Step Name"
                        {...register(`step.${index}.name`)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Column 2: Media URL and Image Link */}
              <div className="space-y-4">
                <FormField
                  name={`step.${index}.mediaURL`}
                  render={() => (
                    <FormItem>
                      <FormLabel>Media URL</FormLabel>
                      <FormControl>
                        <Input
                          id={`step.${index}.mediaURL`}
                          placeholder="Media URL"
                          {...register(`step.${index}.mediaURL`)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`step.${index}.imageLink`}
                  render={() => (
                    <FormItem>
                      <FormLabel>Image Link</FormLabel>
                      <FormControl>
                        <Input
                          id={`step.${index}.imageLink`}
                          placeholder="Image Link"
                          {...register(`step.${index}.imageLink`)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Full-width Description */}
              <FormField
                name={`step.${index}.description`}
                render={() => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id={`step.${index}.description`}
                        placeholder="Description"
                        rows={4} // Adjust the height as needed
                        {...register(`step.${index}.description`)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Separator */}
            <Separator />
          </div>
        ))}
      </ScrollArea>

      {/* Add Step Button */}
      <Button
        type="button"
        onClick={() => {
          const nextIndex = fields.length + 1;
          append({
            name: "",
            mediaURL: "",
            imageLink: "",
            description: "",
            index: nextIndex,
          });
        }}
      >
        Add Step
      </Button>
    </div>
  );
};

export default ReciptStepForm;
