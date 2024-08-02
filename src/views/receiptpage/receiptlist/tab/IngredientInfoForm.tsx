import React, { useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  ScrollArea,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { IngredientsList, Response } from "@/models/responses";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { recipeSchema } from "@/schemas/recipe";

const IngredientInfoForm: React.FC = () => {
  const { register, setValue, watch } =
    useFormContext<z.infer<typeof recipeSchema>>();

  const { data: ingredientData } = useFetch<Response<IngredientsList[]>>(
    "/api/ingredients/get-all"
  );

  // Watch the current values for recipeIngredientsList
  const recipeIngredientsList = watch("recipeIngredientsList");

  useEffect(() => {
    if (ingredientData?.data) {
      // Initialize or synchronize values if needed
      ingredientData.data.forEach((ingredient, index) => {
        const ingredientValue = recipeIngredientsList?.find(
          (item) => item.ingredientId === ingredient.id
        );

        // Set value for each field based on ingredient data
        setValue(
          `recipeIngredientsList.${index}.ingredientId` as `recipeIngredientsList.${number}.ingredientId`,
          ingredientValue?.ingredientId || ingredient.id
        );
        setValue(
          `recipeIngredientsList.${index}.amount` as `recipeIngredientsList.${number}.amount`,
          ingredientValue?.amount || 0
        );
      });
    }
  }, [ingredientData, recipeIngredientsList, setValue]);

  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-3 gap-4 p-4">
        {ingredientData?.data.map((ingredient, index) => {
          // Find the corresponding value for this ingredient
          const ingredientValue = recipeIngredientsList?.find(
            (item) => item.ingredientId === ingredient.id
          );

          return (
            <div
              key={ingredient.id}
              className="flex items-baseline justify-between"
            >
              <FormField
                name={`recipeIngredientsList.${index}.ingredientId`}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        value={ingredient.id}
                        {...register(
                          `recipeIngredientsList.${index}.ingredientId` as `recipeIngredientsList.${number}.ingredientId`,
                          {
                            required: true,
                          }
                        )}
                        defaultChecked={!!ingredientValue?.ingredientId}
                      />
                    </FormControl>
                    <FormLabel>{ingredient.name}</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                name={`recipeIngredientsList.${index}.amount`}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...register(
                          `recipeIngredientsList.${index}.amount` as `recipeIngredientsList.${number}.amount`,
                          {
                            valueAsNumber: true,
                            required: true,
                          }
                        )}
                        defaultValue={ingredientValue?.amount || 0}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default IngredientInfoForm;
