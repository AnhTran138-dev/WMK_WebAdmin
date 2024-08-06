import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Textarea,
  Popover,
  Button,
  Calendar,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { CalendarIcon } from "lucide-react";
import { cn, formatFromISOString, FormatType } from "@/lib";
import { z } from "zod";
import { WeeklyPlanRequestSchema } from "../../../schemas/weeklyplan";

const GeneralForm: React.FC = () => {
  const { setValue, register, watch, getValues } =
    useFormContext<z.infer<typeof WeeklyPlanRequestSchema>>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("urlImage", imageUrl);
    }
  };

  useEffect(() => {
    setImagePreview(watch("urlImage"));
  }, [watch("urlImage")]);

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
                  src={imagePreview}
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

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 md:gap-8">
        {/* Begin Date Field */}
        <FormField
          name="beginDate"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="beginDate">Begin Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <span>
                            {formatFromISOString(field.value, FormatType.DATE)}
                          </span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={getValues("beginDate")}
                        onSelect={field.onChange}
                        initialFocus
                        // disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* End Date Field */}
        <FormField
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="endDate">End Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        <span>
                          {formatFromISOString(field.value, FormatType.DATE)}
                        </span>
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default GeneralForm;
