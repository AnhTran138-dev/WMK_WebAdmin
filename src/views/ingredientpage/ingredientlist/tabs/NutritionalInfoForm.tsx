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
    { name: "calories", unit: "kcal" },
    { name: "fat", unit: "g" },
    { name: "saturatedFat", unit: "g" },
    { name: "sugar", unit: "g" },
    { name: "carbonhydrate", unit: "g" },
    { name: "dietaryFiber", unit: "g" },
    { name: "protein", unit: "g" },
    { name: "sodium", unit: "mg" },
  ];

  const formatFieldName = (field: string) => {
    switch (field) {
      case "saturatedFat":
        return "Saturated Fat";
      case "dietaryFiber":
        return "Dietary Fiber";
      default:
        return field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {nutrientFields.map(({ name, unit }) => (
        <FormField
          key={name}
          name={`nutrientInfo.${name}`}
          render={() => {
            const label = formatFieldName(name);
            return (
              <FormItem>
                <FormLabel>
                  {formatFieldName(name)} ({unit})
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step="any"
                    placeholder={label}
                    {...register(`nutrientInfo.${name}`, {
                      valueAsNumber: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      ))}
    </div>
  );
};

export default NutritionalInfoForm;
