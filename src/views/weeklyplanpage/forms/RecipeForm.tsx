import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { DayInWeek, MealInDay } from "@/models/requests";
import { RecipeList, Response } from "@/models/responses";
import { WeeklyPlanRequestSchema } from "@/schemas/weeklyplan";
import { CirclePlus, CircleX } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

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
  const { control, getValues, setValue } =
    useFormContext<z.infer<typeof WeeklyPlanRequestSchema>>();
  const { fields, append } = useFieldArray({
    control,
    name: "recipeIds",
  });
  const { data: recipes } = useFetch<Response<RecipeList[]>>(
    "/api/recipes/get-all"
  );

  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealInDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayInWeek | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [openPopover, setOpenPopover] = useState<string | null>(null); // Key to manage which Popover is open

  // useEffect(() => {
  //   if (fields.length === 0) {
  //     append({
  //       recipeId: "",
  //       quantity: undefined,
  //       dayInWeek: undefined,
  //       mealInDay: undefined,
  //     });
  //   }
  // }, [fields, append]);

  const handleAddRecipe = () => {
    if (selectedRecipe && selectedMeal && selectedDay && quantity) {
      const currentRecipes = getValues("recipeIds") || [];
      const existingEntry = currentRecipes.find(
        (r) =>
          r.dayInWeek === selectedDay &&
          r.mealInDay === selectedMeal &&
          r.recipeId === selectedRecipe
      );

      if (existingEntry) {
        return; // Recipe already added for this cell
      }

      if (
        currentRecipes.filter(
          (r) => r.dayInWeek === selectedDay && r.mealInDay === selectedMeal
        ).length >= 4
      ) {
        return; // Limit to 4 recipes per cell
      }

      append({
        recipeId: selectedRecipe,
        quantity,
        dayInWeek: selectedDay,
        mealInDay: selectedMeal,
      });
      setSelectedRecipe(null);
      setSelectedMeal(null);
      setSelectedDay(null);
      setQuantity("");
      setOpenPopover(null); // Close the Popover
    }
  };

  const handleRemoveRecipe = (index: number) => {
    const currentRecipes = getValues("recipeIds") || [];
    const updatedRecipes = currentRecipes.filter((_, i) => i !== index);
    setValue("recipeIds", updatedRecipes);
  };

  const renderRecipesForCell = (day: DayInWeek, meal: MealInDay) => {
    return fields
      .filter((field) => field.dayInWeek === day && field.mealInDay === meal)
      .map((field, index) => (
        <div
          key={field.recipeId}
          className="flex flex-row items-center justify-end "
        >
          <Badge className="mb-1 text-center">
            <Tooltip>
              <TooltipTrigger className="flex">
                <div className="overflow-hidden max-w-32 text-nowrap text-ellipsis">
                  {recipes?.data.find((r) => r.id === field.recipeId)?.name}
                </div>
                <div>( x{field.quantity})</div>
              </TooltipTrigger>
              <TooltipContent>
                {recipes?.data.find((r) => r.id === field.recipeId)?.name}
              </TooltipContent>
            </Tooltip>
          </Badge>
          <Button variant="ghost" onClick={() => handleRemoveRecipe(index)}>
            <CircleX />
          </Button>
        </div>
      ));
  };

  const isAddButtonHidden = (day: DayInWeek, meal: MealInDay) => {
    const currentRecipes = getValues("recipeIds") || [];
    return (
      currentRecipes.filter((r) => r.dayInWeek === day && r.mealInDay === meal)
        .length >= 4
    );
  };

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto space-y-4">
      <table className="min-w-full divide-y divide-gray-200">
        <ScrollArea className="h-96">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left bg-gray-100">Meal/Day</th>
              {MealInDayList.map((meal) => (
                <th key={meal.id} className="px-6 py-3 text-center bg-gray-50">
                  {meal.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DayInWeekList.map((day) => (
              <tr key={day.id}>
                <td className="px-6 py-4 font-medium text-gray-900 bg-gray-100">
                  {day.name}
                </td>
                {MealInDayList.map((meal) => (
                  <td key={meal.id} className="px-6 py-4 ">
                    <div className="flex flex-col items-center justify-center gap-1">
                      {!isAddButtonHidden(day.DayInWeek, meal.value) && (
                        <Popover
                          open={
                            openPopover === `${day.DayInWeek}-${meal.value}`
                          }
                          onOpenChange={(isOpen) => {
                            if (isOpen) {
                              setOpenPopover(`${day.DayInWeek}-${meal.value}`);
                            } else {
                              setOpenPopover(null);
                            }
                          }}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setSelectedMeal(meal.value);
                                setSelectedDay(day.DayInWeek);
                                setOpenPopover(
                                  `${day.DayInWeek}-${meal.value}`
                                );
                              }}
                            >
                              <CirclePlus />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="space-y-5 w-fit"
                            align="start"
                          >
                            <Select
                              value={selectedRecipe || ""}
                              onValueChange={setSelectedRecipe}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a recipe" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Recipes</SelectLabel>
                                  {recipes?.data.map((recipe) => (
                                    <SelectItem
                                      key={recipe.id}
                                      value={recipe.id}
                                    >
                                      {recipe.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            <Input
                              type="number"
                              placeholder="Quantity"
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Number(e.target.value) || "")
                              }
                              className="w-full"
                            />

                            <Button onClick={handleAddRecipe}>Submit</Button>
                          </PopoverContent>
                        </Popover>
                      )}
                      <div className="mt-2">
                        {renderRecipesForCell(day.DayInWeek, meal.value)}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </ScrollArea>
      </table>
    </div>
  );
};

export default RecipeForm;
