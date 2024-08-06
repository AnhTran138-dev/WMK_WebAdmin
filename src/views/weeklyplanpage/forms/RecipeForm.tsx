import { useFieldArray, useFormContext } from "react-hook-form";
import { DayInWeek, MealInDay } from "../../../models/requests";
import { z } from "zod";
import { WeeklyPlanRequestSchema } from "../../../schemas/weeklyplan";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui";
import useFetch from "../../../hooks/useFetch";
import { RecipeList, Response } from "../../../models/responses";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useEffect } from "react";

const MealInDayList = [
  { id: 1, name: "Breakfast", value: MealInDay.Breakfast },
  { id: 2, name: "Lunch", value: MealInDay.Lunch },
  { id: 3, name: "Dinner", value: MealInDay.Dinner },
];

const DayInWeekList = [
  { id: 1, name: "Monday", DayInWeek: DayInWeek.Monday },
  { id: 2, name: "Tuesday", DayInWeek: DayInWeek.Tuesday },
  { id: 3, name: "Wednesday", DayInWeek: DayInWeek.Wednesday },
  { id: 4, name: "Thursday", DayInWeek: DayInWeek.Thursday },
  { id: 5, name: "Friday", DayInWeek: DayInWeek.Friday },
  { id: 6, name: "Saturday", DayInWeek: DayInWeek.Saturday },
  { id: 7, name: "Sunday", DayInWeek: DayInWeek.Sunday },
];

const RecipeForm = () => {
  const { control, watch, setValue } =
    useFormContext<z.infer<typeof WeeklyPlanRequestSchema>>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipeIds",
  });
  const { data: recipes } = useFetch<Response<RecipeList[]>>(
    "/api/recipes/get-all"
  );

  useEffect(() => {
    if (fields.length === 0) {
      append({
        recipeId: "",
        quantity: undefined,
        dayInWeek: undefined,
        mealInDay: undefined,
      });
    }
  }, [fields, append]);

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto space-y-4">
      <ScrollArea className="h-96">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                name={`recipeIds.${index}.recipeId`}
                render={() => (
                  <FormItem>
                    <FormLabel>Recipe</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={watch(`recipeIds.${index}.recipeId`)}
                        onValueChange={(value) =>
                          setValue(`recipeIds.${index}.recipeId`, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipe" />
                        </SelectTrigger>
                        <SelectContent>
                          {recipes?.data.map((recipe) => (
                            <SelectItem key={recipe.id} value={recipe.id}>
                              {recipe.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`recipeIds.${index}.quantity`}
                render={() => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={watch(`recipeIds.${index}.quantity`) || ""}
                        onChange={(e) => {
                          const numberValue = parseFloat(e.target.value);
                          setValue(`recipeIds.${index}.quantity`, numberValue);
                        }}
                        placeholder="Enter Quantity"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`recipeIds.${index}.dayInWeek`}
                render={() => (
                  <FormItem>
                    <FormLabel>Day In Week</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          const numberValue = parseInt(value, 10);
                          setValue(`recipeIds.${index}.dayInWeek`, numberValue);
                        }}
                        value={
                          watch(`recipeIds.${index}.dayInWeek`)?.toString() ||
                          ""
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Day In Week" />
                        </SelectTrigger>
                        <SelectContent>
                          {DayInWeekList.map((day) => (
                            <SelectItem
                              key={day.id}
                              value={day.DayInWeek.toString()}
                            >
                              {day.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`recipeIds.${index}.mealInDay`}
                render={() => (
                  <FormItem>
                    <FormLabel>Meal In Day</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          const numberValue = parseInt(value, 10);
                          setValue(`recipeIds.${index}.mealInDay`, numberValue);
                        }}
                        value={
                          watch(`recipeIds.${index}.mealInDay`)?.toString() ||
                          ""
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Meal In Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {MealInDayList.map((meal) => (
                            <SelectItem
                              key={meal.id}
                              value={meal.value.toString()}
                            >
                              {meal.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              type="button"
              className="mt-4"
              onClick={() => remove(index)}
            >
              <CircleMinus className="size-12" />
            </Button>
          </div>
        ))}
      </ScrollArea>

      <Button
        variant="outline"
        size="icon"
        type="button"
        className="mt-4"
        onClick={() => {
          append({
            recipeId: "",
            quantity: undefined,
            dayInWeek: undefined,
            mealInDay: undefined,
          });
        }}
      >
        <CirclePlus className="size-12" />
      </Button>
    </div>
  );
};

export default RecipeForm;
