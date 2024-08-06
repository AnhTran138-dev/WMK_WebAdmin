import React from "react";
import { WeeklyPlanRequest } from "../../../models/requests";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WeeklyPlanRequestSchema } from "../../../schemas/weeklyplan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Response } from "../../../models/responses";
import { weeklyPlanApi } from "../../../features/weekly_plan.api";
import GeneralForm from "../forms/GeneralForm";
import RecipeForm from "../forms/RecipeForm";

interface WeeklyPlanFormProps {
  onClose: () => void;
  onToast: (success: boolean, description: string) => void;
  refetch: () => void;
  weeklyplan: WeeklyPlanRequest | null;
}

const WeeklyPlanForm: React.FC<WeeklyPlanFormProps> = ({
  onClose,
  onToast,
  refetch,
  weeklyplan,
}) => {
  const [active, setActive] = React.useState<string>("general");
  const form = useForm<z.infer<typeof WeeklyPlanRequestSchema>>({
    resolver: zodResolver(WeeklyPlanRequestSchema),
    defaultValues: {
      title: "" || weeklyplan?.title,
      description: "" || weeklyplan?.description,
      urlImage: "" || weeklyplan?.urlImage,
      beginDate: "" || weeklyplan?.beginDate,
      endDate: "" || weeklyplan?.endDate,
      recipeIds:
        weeklyplan?.recipeIds.map((recipe) => ({
          recipeId: recipe.recipeId || "",
          quantity: recipe.quantity || 0,
          dayInWeek: recipe.dayInWeek || 0,
          mealInDay: recipe.mealInDay || 0,
        })) || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof WeeklyPlanRequestSchema>) => {
    let response: Response<null>;
    if (weeklyplan) {
      const updatedValues: WeeklyPlanRequest = {
        ...values,
        recipeIds: values.recipeIds.map((recipe) => ({
          recipeId: recipe.recipeId || "",
          quantity: recipe.quantity || 0,
          dayInWeek: recipe.dayInWeek || 0,
          mealInDay: recipe.mealInDay || 0,
        })),
      };

      response = await weeklyPlanApi.updateWeeklyPlan(
        weeklyplan.id ?? "",
        updatedValues
      );
    } else {
      const newValues: WeeklyPlanRequest = {
        ...values,
        recipeIds: values.recipeIds.map((recipe) => ({
          recipeId: recipe.recipeId || "",
          quantity: recipe.quantity || 0,
          dayInWeek: recipe.dayInWeek || 0,
          mealInDay: recipe.mealInDay || 0,
        })),
      };
      response = await weeklyPlanApi.createWeeklyPlan(newValues);
    }
    if (response.statusCode === 200) {
      onToast(true, response.message);
      refetch();
      onClose();
    }
    if (response.statusCode !== 200) {
      onToast(false, response.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={active} onValueChange={setActive} className="w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {weeklyplan ? "Update Weekly Plan" : "Create Weekly Plan"}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
              </TabsList>
            </div>
            <AlertDialogDescription>
              <TabsContent value="general">
                <GeneralForm />
              </TabsContent>
              <TabsContent value="recipes">
                <RecipeForm />
              </TabsContent>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">
                {weeklyplan ? "Save Changes" : "Create"}
              </Button>
            </AlertDialogFooter>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default WeeklyPlanForm;
