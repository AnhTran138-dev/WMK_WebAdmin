import React, { useState } from "react";
import { RecipeRequest } from "@/models/requests";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { recipeSchema } from "@/schemas/recipe";
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
import GeneralInfoForm from "./tab/GeneralInfoForm";
import ReciptStepForm from "./tab/ReciptStepForm";
import IngredientInfoForm from "./tab/IngredientInfoForm";

interface RecepiFormProps {
  onClose: () => void;
  refetch: () => void;
  recipe: RecipeRequest | null;
}

const RecepiForm: React.FC<RecepiFormProps> = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const form = useForm<z.infer<typeof recipeSchema>>({
    defaultValues: {
      name: recipe?.name || "",
      servingSize: recipe?.servingSize || 0,
      cookingTime: recipe?.cookingTime || 0,
      difficulty: recipe?.difficulty || 0,
      description: recipe?.description || "",
      img: recipe?.img || "",
      createdBy: recipe?.createdBy || "",
      step: recipe?.steps || [],
      categoryIds: recipe?.categoryIds || [],
      recipeIngredientsList: recipe?.recipeIngredientsList || [],
    },
  });

  console.log("recipe", recipe);

  const onSubmit = async (values: z.infer<typeof recipeSchema>) => {
    console.log(values);
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
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="general">General Info</TabsTrigger>
              <TabsTrigger value="ingredient">Ingredient Info</TabsTrigger>
              <TabsTrigger value="Step">Step Info</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <GeneralInfoForm />
            </TabsContent>
            <TabsContent value="ingredient">
              <IngredientInfoForm />
            </TabsContent>
            <TabsContent value="Step">
              <ReciptStepForm />
            </TabsContent>
          </Tabs>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-end mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" className="ml-2">
            {recipe ? "Save Changes" : "Create"}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default RecepiForm;
