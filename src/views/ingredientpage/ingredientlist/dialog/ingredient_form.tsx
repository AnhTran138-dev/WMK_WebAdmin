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
  useToast,
} from "@/components/ui";
import { IngredientApi } from "@/features";
import { utilApi } from "@/features/util.api";
import { IngredientRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { ingredientSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GeneralInfoForm from "../tabs/GeneralInfoForm";
import NutritionalInfoForm from "../tabs/NutritionalInfoForm";

interface IngredientFormProps {
  reFresh: () => void;
  onClose: () => void;
  ingredient?: IngredientRequest | null;
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  reFresh,
  onClose,
  ingredient,
}) => {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<string>("general");

  const methods = useForm<z.infer<typeof ingredientSchema>>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: ingredient || {
      ingredientCategoryId: "",
      name: "",
      img: "",
      unit: "",
      price: 0,
      packagingMethod: "",
      preservationMethod: "",
      nutrientInfo: {
        calories: 0,
        fat: 0,
        saturatedFat: 0,
        sugar: 0,
        carbonhydrate: 0,
        dietaryFiber: 0,
        protein: 0,
        sodium: 0,
      },
    },
  });

  const validateGeneralInfo = (values: z.infer<typeof ingredientSchema>) => {
    const requiredKeys: Array<keyof typeof values> = [
      "ingredientCategoryId",
      "name",
      "img",
      "unit",
      "price",
      "packagingMethod",
      "preservationMethod",
    ];

    return requiredKeys.every(
      (key) => values[key] !== "" && values[key] !== undefined
    );
  };

  const validateNutritionalInfo = (
    values: z.infer<typeof ingredientSchema>
  ) => {
    return Object.values(values.nutrientInfo).every(
      (value) => value !== undefined
    );
  };

  const onSubmit = async (values: z.infer<typeof ingredientSchema>) => {
    const validationMessage = {
      general: {
        title: "Incomplete General Info",
        description: "Please fill in all general information fields.",
        isValid: validateGeneralInfo(values),
      },
      nutritional: {
        title: "Incomplete Nutritional Info",
        description: "Please fill in all nutritional information fields.",
        isValid: validateNutritionalInfo(values),
      },
    };

    const currentValidation =
      validationMessage[activeTab as keyof typeof validationMessage];
    if (!currentValidation.isValid) {
      toast({
        title: currentValidation.title,
        description: currentValidation.description,
        duration: 5000,
      });
      return;
    }

    if (activeTab === "general") {
      setActiveTab("nutritional");
      return;
    }

    try {
      let imageIngredient: string;
      if (typeof values.img === "string") {
        imageIngredient = values.img;
      } else {
        imageIngredient = await utilApi.uploadFile(values.img);
      }

      const response: Response<null> = ingredient
        ? await IngredientApi.updateIngredient(ingredient.id ?? "", {
            ...values,
            img: imageIngredient,
          })
        : await IngredientApi.createIngredeint({
            ...values,
            img: imageIngredient,
          });

      if (response?.statusCode !== 200) {
        toast({
          title: "Error",
          description: response.message,
          duration: 5000,
        });
        return;
      }

      if (response?.statusCode === 200) {
        reFresh();
        onClose();

        toast({
          title: "Success",
          description: ingredient ? response.message : response.message,
          duration: 10000,
        });
        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 500,
      });
    }
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-4xl mx-auto"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-center">
            {ingredient ? "Edit Ingredient" : "Create Ingredient"}
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
              <TabsTrigger value="nutritional">Nutritional Info</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <GeneralInfoForm />
            </TabsContent>
            <TabsContent value="nutritional">
              <NutritionalInfoForm />
            </TabsContent>
          </Tabs>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-end mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" className="ml-2">
            {ingredient ? "Save Changes" : "Create"}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default IngredientForm;
