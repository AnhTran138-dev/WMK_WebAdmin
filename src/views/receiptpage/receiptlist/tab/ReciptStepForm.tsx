import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  Button,
  Input,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  ScrollArea,
  Textarea,
  Card,
} from "@/components/ui";
import { CircleMinus, CirclePlus } from "lucide-react";

const ReciptStepForm: React.FC = () => {
  const { control, register, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
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
      <ScrollArea className="border rounded-lg shadow-sm h-96">
        {fields.map((field, index) => {
          const mediaURL = watch(`steps.${index}.mediaURL`);
          let imageLink: string;

          // Function to determine if the URL is a video
          const isVideo = (url: string | undefined) => {
            if (!url) return false;
            const videoExtensions = [".mp4", ".webm", ".ogg"];
            return videoExtensions.some((ext) => url?.endsWith(ext));
          };

          const handleFileChange = async (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (reader.result) {
                  setValue(`steps.${index}.imageLink`, file);
                  imageLink = reader.result as string;
                } else {
                  imageLink = watch(`steps.${index}.imageLink`);
                }
              };
              reader.readAsDataURL(file);
            }
          };

          return (
            <Card
              key={field.id}
              className="px-6 py-4 mt-4 space-y-4 transition-all duration-200 ease-in-out transform hover:shadow-lg"
            >
              {/* Step Index and Remove button */}
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-700">
                  Step {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <CircleMinus className="w-5 h-5 text-red-600 hover:text-red-800" />
                </Button>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 gap-6">
                {/* Row 1: Step Name and Description */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <FormField
                      name={`steps.${index}.name`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Step Name</FormLabel>
                          <FormControl>
                            <Input
                              id={`steps.${index}.name`}
                              placeholder="Step Name"
                              {...register(`steps.${index}.name`)}
                              className="focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <FormField
                      name={`steps.${index}.description`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              id={`steps.${index}.description`}
                              placeholder="Description"
                              rows={4}
                              {...register(`steps.${index}.description`)}
                              className="focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Row 2: Media URL and Image Link */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <FormField
                      name={`steps.${index}.mediaURL`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Media URL</FormLabel>
                          <FormControl>
                            <Input
                              id={`steps.${index}.mediaURL`}
                              type="text"
                              placeholder="Media URL"
                              {...register(`steps.${index}.mediaURL`)}
                              className="focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </FormControl>
                          {mediaURL && isVideo(mediaURL) ? (
                            <div className="mt-2">
                              <video
                                src={mediaURL}
                                controls
                                className="object-cover w-full h-48 rounded-md"
                              />
                            </div>
                          ) : mediaURL ? (
                            <div className="mt-2">
                              <img
                                src={mediaURL}
                                alt={`Media Step ${index + 1}`}
                                className="object-cover w-full h-48 rounded-md"
                              />
                            </div>
                          ) : null}
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <FormField
                      name={`steps.${index}.imageLink`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Image Link</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              id={`steps.${index}.imageLink`}
                              placeholder="Image Link"
                              // {...register(`steps.${index}.imageLink`)}
                              onChange={handleFileChange}
                              className="focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </FormControl>
                          {imageLink && (
                            <div className="mt-2">
                              <img
                                src={imageLink as string}
                                alt={`Image Step ${index + 1}`}
                                className="object-cover w-full h-48 rounded-md"
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </ScrollArea>

      {/* Add Step Button */}
      <div className="flex justify-center">
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
          className="flex items-center space-x-2"
        >
          <CirclePlus className="w-5 h-5" />
          <span>Add Step</span>
        </Button>
      </div>
    </div>
  );
};

export default ReciptStepForm;
