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
} from "@/components/ui";
import { WeeklyPlanRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { WeeklyPlanRequestSchema } from "@/schemas/weeklyplan";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GeneralForm from "../forms/GeneralForm";
import RecipeForm from "../forms/RecipeForm";
import { utilApi } from "../../../features/util.api";
import { weeklyPlanApi } from "../../../features/weekly_plan.api";

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
    const image =
      values.urlImage instanceof File
        ? await utilApi.uploadFile(values.urlImage)
        : values.urlImage;

    const newValue: WeeklyPlanRequest = {
      ...values,
      urlImage: image,
      recipeIds: values.recipeIds.map((recipe) => ({
        recipeId: recipe.recipeId || "",
        quantity: recipe.quantity || 0,
        dayInWeek: recipe.dayInWeek || 0,
        mealInDay: recipe.mealInDay || 0,
      })),
    };

    const response: Response<null> = weeklyplan
      ? await weeklyPlanApi.updateWeeklyPlan(weeklyplan?.id ?? "", newValue)
      : await weeklyPlanApi.createWeeklyPlan(newValue);

    if (response.statusCode === 200) {
      onToast(true, response.message);
      refetch();
      onClose();
    } else {
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
                  {weeklyplan ? "Weekly Plan Change" : "New Weekly Plan"}
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
                {weeklyplan ? "Save Changes" : "Create New Weekly Plan"}
              </Button>
            </AlertDialogFooter>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default WeeklyPlanForm;
