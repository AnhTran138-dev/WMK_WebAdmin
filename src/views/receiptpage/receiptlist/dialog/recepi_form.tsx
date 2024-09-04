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
import { recipeApi } from "@/features";
import { utilApi } from "@/features/util.api";
import Show from "@/lib/show";
import { RecipeRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { recipeSchema } from "@/schemas/recipe";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GeneralInfoForm from "../tab/GeneralInfoForm";
import IngredientInfoForm from "../tab/IngredientInfoForm";
import ReciptStepForm from "../tab/ReciptStepForm";

const validateFields = <T,>(values: T, requiredKeys: Array<keyof T>): boolean =>
  requiredKeys.every((key) => values[key] !== "" && values[key] !== undefined);

interface RecepiFormProps {
  onClose: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
  recipe: RecipeRequest | null;
}

const RecepiForm: React.FC<RecepiFormProps> = ({
  recipe,
  onClose,
  refetch,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    if (!isDialogOpen) {
      setActiveTab(value);
    }
  };

  const form = useForm<z.infer<typeof recipeSchema>>({
    defaultValues: {
      name: recipe?.name || "",
      servingSize: recipe?.servingSize || 0,
      cookingTime: recipe?.cookingTime || 0,
      difficulty: recipe?.difficulty || 0,
      description: recipe?.description || "",
      img: recipe?.img || "",
      steps: recipe?.steps || [],
      categoryIds: recipe?.categoryIds || [],
      recipeIngredientsList: recipe?.recipeIngredientsList || [],
    },
  });

  const validateGeneralInfo = (values: z.infer<typeof recipeSchema>) => {
    const requiredGeneralKeys: Array<keyof typeof values> = [
      "name",
      "servingSize",
      "cookingTime",
      "difficulty",
      "description",
      "img",
      "categoryIds",
    ];
    return validateFields(values, requiredGeneralKeys);
  };

  const validateIngredientInfo = (values: z.infer<typeof recipeSchema>) =>
    values.recipeIngredientsList.every((ingredient) =>
      validateFields(ingredient, ["ingredientId", "amount"])
    );

  const validateStepInfo = (values: z.infer<typeof recipeSchema>) =>
    values.steps.every((step) =>
      validateFields(step, ["name", "description", "imageLink"])
    );

  const onSubmit = async (values: z.infer<typeof recipeSchema>) => {
    const tabValidationMap: Record<string, () => boolean> = {
      general: () => validateGeneralInfo(values),
      ingredient: () => validateIngredientInfo(values),
      step: () => validateStepInfo(values),
    };

    if (!tabValidationMap[activeTab]()) {
      return onToast(false, "Please fill all required fields");
    }

    if (activeTab === "general") return setActiveTab("ingredient");
    if (activeTab === "ingredient") return setActiveTab("step");

    try {
      const imgURL =
        values.img instanceof File
          ? await utilApi.uploadFile(values.img)
          : values.img;
      const stepFiles = await Promise.all(
        values.steps.map((step) =>
          step.imageLink instanceof File
            ? utilApi.uploadFile(step.imageLink)
            : step.imageLink
        )
      );
      const payload = {
        ...values,
        img: imgURL,
        steps: values.steps.map((step, index) => ({
          ...step,
          imageLink: stepFiles[index],
        })),
      };
      const response: Response<null> = recipe
        ? await recipeApi.updateRecipe(recipe.id ?? "", payload)
        : await recipeApi.createRecipe(payload);
      onToast(response.statusCode === 200, response.message);
      if (response.statusCode === 200) {
        refetch();
        onClose();
      }
    } catch (error) {
      onToast(false, "An error occurred while processing your request.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-center">
            {recipe ? "Edit Recipe" : "Create Recipe"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-between w-full">
              <TabsList>
                <TabsTrigger value="general">General Info</TabsTrigger>
                <TabsTrigger value="ingredient">Ingredient Info</TabsTrigger>
                <TabsTrigger value="step">Step Info</TabsTrigger>
              </TabsList>
              <Show>
                <Show.When isTrue={activeTab === "ingredient"}>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDialogOpen(true);
                    }}
                  >
                    <span className="text-sm">Add New Ingredient</span>
                  </Button>
                </Show.When>
              </Show>
            </div>
            <TabsContent value="general">
              <GeneralInfoForm />
            </TabsContent>
            <TabsContent value="ingredient">
              <IngredientInfoForm
                setIsDialogOpen={setIsDialogOpen}
                isDialogOpen={isDialogOpen}
              />
            </TabsContent>
            <TabsContent value="step">
              <ReciptStepForm />
            </TabsContent>
          </Tabs>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-end mt-5">
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <Button type="submit" className="ml-2">
            {recipe ? "Save Changes" : "Create"}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default RecepiForm;
