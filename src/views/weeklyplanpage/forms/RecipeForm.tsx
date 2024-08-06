import { useFormContext } from "react-hook-form";
import { DayInWeek, MealInDay } from "../../../models/requests";
import { z } from "zod";
import { WeeklyPlanRequestSchema } from "../../../schemas/weeklyplan";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
} from "../../../components/ui";
import useFetch from "../../../hooks/useFetch";
import { RecipeList, Response } from "../../../models/responses";
import { useMemo, useState } from "react";
import { useDebounce } from "../../../hooks";
import { AccordionContent } from "@radix-ui/react-accordion";
import Show from "../../../lib/show";

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
  const { register, setValue, watch, control } =
    useFormContext<z.infer<typeof WeeklyPlanRequestSchema>>();
  const [name, setName] = useState<string>("");
  const [selectedRecipes, setSelectedRecipes] = useState<{
    [key: string]: boolean;
  }>({});
  const nameDebounce = useDebounce(name, 500);

  const options = useMemo(() => {
    const params: { [key: string]: string } = {};
    if (nameDebounce) {
      params.Name = nameDebounce;
    }
    return { params };
  }, [nameDebounce]);

  const { data: recipes } = useFetch<Response<RecipeList[]>>(
    "/api/recipes/get-all",
    options
  );

  const toggleRecipeSelection = (recipeId: string) => {
    setSelectedRecipes((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));

    const recipeIndex = Object.keys(selectedRecipes).indexOf(recipeId);
    if (selectedRecipes[recipeId]) {
      setValue(`recipeIds[${recipeIndex}].recipeId`, undefined);
    } else {
      setValue(`recipeIds[${recipeIndex}].recipeId`, recipeId);
    }
  };

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto max-h-4xl">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search recipe name"
        className="mb-4"
      />
      <Accordion type="single" collapsible className="w-full">
        <FormField
          control={control}
          name="recipeIds"
          render={({ field }) => (
            <FormItem className="w-full">
              <ScrollArea className="w-full h-96 ">
                {recipes?.data.map((recipe, index) => (
                  <Show key={index}>
                    <Show.When
                      isTrue={recipe.processStatus.toLowerCase() === "approved"}
                    >
                      <AccordionItem
                        value={recipe.id}
                        className="w-full px-4 bg-slate-100"
                      >
                        <AccordionTrigger className="flex flex-row justify-between w-full hover:no-underline">
                          <div className="flex flex-row items-center justify-start gap-4">
                            <FormField
                              name={`recipeIds[${index}].recipeId`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Checkbox
                                      checked={
                                        selectedRecipes[recipe.id] || false
                                      }
                                      onCheckedChange={() =>
                                        toggleRecipeSelection(recipe.id)
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <img
                              src={recipe.img}
                              alt={recipe.name}
                              className="size-16 rounded-xl"
                            />
                            <div>{recipe.name}</div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex items-center gap-3">
                          <FormField
                            name={`recipeIds[${index}].quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      setValue(
                                        `recipeIds[${index}].quantity`,
                                        parseInt(e.target.value, 10)
                                      )
                                    }
                                    placeholder="Enter Quantity"
                                    className="w-52"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`recipeIds[${index}].dayInWeek`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Select {...field}>
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
                            name={`recipeIds[${index}].mealInDay`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Select {...field}>
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
                        </AccordionContent>
                      </AccordionItem>
                    </Show.When>
                  </Show>
                ))}
              </ScrollArea>
            </FormItem>
          )}
        />
      </Accordion>
    </div>
  );
};

export default RecipeForm;
