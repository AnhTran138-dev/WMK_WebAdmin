import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { recipeSchema } from "@/schemas/recipe";
import {
  FormField,
  FormLabel,
  FormControl,
  Input,
  FormItem,
  Checkbox,
  FormMessage,
  ScrollArea,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { IngredientsList, Response } from "@/models/responses";
import { useDebounce } from "../../../../hooks";
import Show from "../../../../lib/show";

type RecipeFormValues = z.infer<typeof recipeSchema>;

const IngredientInfoForm: React.FC = () => {
  const { register, watch, setValue } = useFormContext<RecipeFormValues>();
  const [search, setSearch] = React.useState<string>("");
  const searchDebounce = useDebounce(search, 500);

  const options = useMemo(() => {
    const params: { [key: string]: string } = {};
    if (searchDebounce) {
      params.Name = searchDebounce;
    }
    return { params };
  }, [searchDebounce]);

  const { data: ingredients } = useFetch<Response<IngredientsList[]>>(
    "/api/ingredients/get-all",
    options
  );

  // Get the sanitized list of ingredients
  const recipeIngredientsList = (watch("recipeIngredientsList") || []).filter(
    (item) =>
      typeof item.amount === "number" && !isNaN(item.amount) && item.amount >= 0
  );

  const handleCheckboxChange = (ingredientId: string, checked: boolean) => {
    if (checked) {
      // Add ingredient if not already present
      const ingredientExists = recipeIngredientsList.some(
        (item) => item.ingredientId === ingredientId
      );
      if (!ingredientExists) {
        setValue("recipeIngredientsList", [
          ...recipeIngredientsList,
          { ingredientId, amount: 0 },
        ]);
      }
    } else {
      // Remove ingredient
      setValue(
        "recipeIngredientsList",
        recipeIngredientsList.filter(
          (item) => item.ingredientId !== ingredientId
        )
      );
    }
  };

  return (
    <div>
      <Input
        placeholder="Search name recipe"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollArea className="h-60">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {ingredients?.data.map((ingredient, index) => {
            const isChecked = recipeIngredientsList.some(
              (item) => item.ingredientId === ingredient.id
            );
            const amount =
              recipeIngredientsList.find(
                (item) => item.ingredientId === ingredient.id
              )?.amount || 0;

            return (
              <Show key={ingredient.id}>
                <Show.When
                  isTrue={ingredient.status.toLowerCase() === "available"}
                >
                  <FormField
                    name={
                      `recipeIngredientsList.${ingredient.id}.amount` as const
                    }
                    render={() => (
                      <FormItem className="flex flex-row items-baseline justify-between">
                        <div className="flex flex-row gap-3">
                          <FormControl>
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  ingredient.id,
                                  Boolean(checked)
                                )
                              }
                              {...register(
                                `recipeIngredientsList.${ingredient.id}.checked`
                              )}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {ingredient.name}
                          </FormLabel>
                        </div>
                        <FormControl className="w-24">
                          <Input
                            type="number"
                            value={amount}
                            {...register(
                              `recipeIngredientsList.${ingredient.id}.amount`,
                              {
                                onChange: (e) => {
                                  const newAmount = parseFloat(e.target.value);
                                  // Update amount in the list
                                  setValue(
                                    "recipeIngredientsList",
                                    recipeIngredientsList.map((item) =>
                                      item.ingredientId === ingredient.id
                                        ? { ...item, amount: newAmount }
                                        : item
                                    )
                                  );
                                },
                              }
                            )}
                            disabled={!isChecked}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Show.When>
              </Show>
            );
          })}
          <FormMessage />
        </div>
      </ScrollArea>
    </div>
  );
};

export default IngredientInfoForm;
