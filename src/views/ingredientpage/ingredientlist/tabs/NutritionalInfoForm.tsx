import React from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { useFormContext } from "react-hook-form";

const NutritionalInfoForm: React.FC = () => {
  const { register } = useFormContext();

  const nutrientFields = [
    "calories",
    "fat",
    "saturatedFat",
    "sugar",
    "carbonhydrate",
    "dietaryFiber",
    "protein",
    "sodium",
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {nutrientFields.map((field) => (
        <FormField
          key={field}
          name={`nutrientInfo.${field}`}
          render={() => (
            <FormItem>
              <FormLabel>
                {field
                  .replace(/([A-Z])/g, " ")
                  .replace(/^./, (str) => str.toUpperCase())}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder={field
                    .replace(/([A-Z])/g, " ")
                    .replace(/^./, (str) => str.toUpperCase())}
                  {...register(`nutrientInfo.${field}`, {
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default NutritionalInfoForm;
