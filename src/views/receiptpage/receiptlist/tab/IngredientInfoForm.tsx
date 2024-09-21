import DialogCustom from "@/components/common/dialog";
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
} from "@/components/ui";
import { useDebounce } from "@/hooks";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import { IngredientsList, Response } from "@/models/responses";
import { recipeSchema } from "@/schemas/recipe";
import IngredientForm from "@/views/ingredientpage/ingredientlist/dialog/ingredient_form";
import React, { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface IngredientInfoFormProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpen: boolean;
}

const IngredientInfoForm: React.FC<IngredientInfoFormProps> = ({
  setIsDialogOpen,
  isDialogOpen,
}) => {
  const { register, watch, setValue, control } =
    useFormContext<RecipeFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipeIngredientsList",
  });
  const [search, setSearch] = React.useState<string>("");
  const searchDebounce = useDebounce(search, 500);

  const options = useMemo(() => {
    const params: { [key: string]: string } = {};
    if (searchDebounce) {
      params.Name = searchDebounce;
    }
    return { params };
  }, [searchDebounce]);

  const { data: ingredients, refetch } = useFetch<Response<IngredientsList[]>>(
    "/api/ingredients/get-all",
    options
  );

  const recipeIngredientsList = watch("recipeIngredientsList") || [];

  const handleCheckboxChange = (ingredientId: string, checked: boolean) => {
    if (checked) {
      const ingredientExists = recipeIngredientsList.some(
        (item) => item.ingredientId === ingredientId
      );
      if (!ingredientExists) {
        append({ ingredientId, amount: 0 });
      }
    } else {
      const ingredientIndex = recipeIngredientsList.findIndex(
        (item) => item.ingredientId === ingredientId
      );
      if (ingredientIndex !== -1) {
        remove(ingredientIndex);
      }
    }
  };

  const handleAmountChange = (ingredientId: string, amount: number) => {
    const updatedIngredients = recipeIngredientsList.map((item) =>
      item.ingredientId === ingredientId ? { ...item, amount } : item
    );
    setValue("recipeIngredientsList", updatedIngredients);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
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
          {ingredients?.data?.map((ingredient) => {
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
                      `recipeIngredientsList.${fields.findIndex(
                        (field) => field.ingredientId === ingredient.id
                      )}.amount` as const
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
                                `recipeIngredientsList.${fields.findIndex(
                                  (field) =>
                                    field.ingredientId === ingredient.id
                                )}.ingredientId` as const
                              )}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {ingredient.name} - ({ingredient.unit})
                          </FormLabel>
                        </div>

                        <FormControl className="w-24">
                          <Input
                            type="number"
                            value={amount}
                            min={0}
                            onChange={(e) =>
                              handleAmountChange(
                                ingredient.id,
                                parseFloat(e.target.value)
                              )
                            }
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
        </div>
      </ScrollArea>
      <FormMessage />
      <DialogCustom
        className="max-w-5xl p-6"
        onClose={handleDialogClose}
        isOpen={isDialogOpen}
        children={
          <IngredientForm onClose={handleDialogClose} reFresh={refetch} />
        }
      />
    </div>
  );
};

export default IngredientInfoForm;
