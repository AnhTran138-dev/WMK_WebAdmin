import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const GeneralForm: React.FC = () => {
  const { setValue, register, watch } = useFormContext();

  const [imagePreview, setImagePreview] = useState<string>(watch("urlImage"));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("urlImage", file);
    }
  };

  useEffect(() => {
    setImagePreview(watch("urlImage"));
  }, [watch]);

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {/* Image Field */}
        <FormField
          name="urlImage"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-2"
                />
              </FormControl>
              {imagePreview && (
                <img
                  src={imagePreview as string}
                  alt="Selected"
                  className="object-cover w-full mt-2 max-h-60"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title and Description Fields */}
        <div className="flex flex-col gap-6">
          {/* Title Field */}
          <FormField
            name="title"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    {...register("title")}
                    className="block w-full mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            name="description"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    rows={4}
                    {...register("description")}
                    className="block w-full mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralForm;
