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

  const onSubmit = async (values: z.infer<typeof recipeSchema>) => {
    if (activeTab === "general") {
      const requiredGeneralKeys: Array<keyof typeof values> = [
        "name",
        "servingSize",
        "cookingTime",
        "difficulty",
        "description",
        "img",
        "categoryIds",
      ];
      if (!validateFields(values, requiredGeneralKeys)) {
        return onToast(false, "Please fill all required fields");
      }
      setActiveTab("ingredient");
      return;
    }

    if (activeTab === "ingredient") {
      if (
        !values.recipeIngredientsList.every((ingredient) =>
          validateFields(ingredient, ["ingredientId", "amount"])
        )
      ) {
        return onToast(false, "Please fill all required fields");
      }
      setActiveTab("step");
      return;
    }

    if (activeTab === "step") {
      if (
        !values.steps.every((step) =>
          validateFields(step, ["name", "description", "mediaURL", "imageLink"])
        )
      ) {
        return onToast(false, "Please fill all required fields");
      }
    }

    try {
      let imgURL = values.img;
      if (imgURL instanceof File) {
        imgURL = await utilApi.uploadFile(imgURL);
      }

      const stepFiles = await Promise.all(
        values.steps.map((step) => {
          if (step.imageLink instanceof File) {
            return utilApi.uploadFile(step.imageLink);
          }
          return step.imageLink;
        })
      );

      const payload = {
        ...values,
        img: imgURL,
        difficulty: values.difficulty,
        steps: values.steps.map((step, index) => ({
          ...step,
          imageLink: stepFiles[index],
        })),
      };

      const response: Response<null> = recipe
        ? await recipeApi.updateRecipe(recipe.id ?? "", payload)
        : await recipeApi.createRecipe(payload);

      if (response.statusCode === 200) {
        onToast(true, response.message);
        refetch();
        onClose();
      } else {
        onToast(false, response.message);
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
                  <div className="space-x-2">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDialogOpen(true);
                      }}
                    >
                      <span className="text-sm">Add New Ingredient</span>
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <span className="text-sm">Check Ingredents</span>
                    </Button>
                  </div>
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
