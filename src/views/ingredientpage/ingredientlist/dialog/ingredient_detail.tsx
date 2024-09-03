import DataRender from "@/components/data_render";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Ingredient, Response } from "@/models/responses";
import React from "react";

interface IngredientDetailProps {
  id: string;
}

const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const IngredientDetail: React.FC<IngredientDetailProps> = ({ id }) => {
  const {
    data: ingredientDetail,
    error,
    loading,
  } = useFetch<Response<Ingredient>>(`/api/ingredients/get/${id}`);

  return (
    <DataRender isLoading={loading} error={error}>
      {ingredientDetail && (
        <Card className="overflow-hidden bg-white border rounded-lg shadow-lg dark:bg-card">
          <CardHeader className="text-center bg-gray-100 dark:bg-gray-800">
            <CardTitle className="text-2xl font-bold">
              Ingredient Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <img
                className="object-cover rounded-lg shadow-md max-h-80"
                src={
                  ingredientDetail.data.img || "https://via.placeholder.com/250"
                }
                alt={ingredientDetail.data.name || "No image available"}
              />
            </div>
            <div className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold">
                  {ingredientDetail.data.name || "N/A"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  {ingredientDetail.data.preservationMethod || "N/A"}
                </AlertDialogDescription>
                <AlertDialogDescription className="text-muted-foreground">
                  <span className="font-semibold">Packaging Method:</span>{" "}
                  {ingredientDetail.data.packagingMethod || "N/A"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogDescription className="text-muted-foreground">
                <span className="font-semibold">Category:</span>{" "}
                {ingredientDetail.data.ingredientCategory?.name || "N/A"}
              </AlertDialogDescription>
              <AlertDialogDescription className="text-muted-foreground">
                <span className="font-semibold">Price:</span>{" "}
                {ingredientDetail.data.price
                  ? `${formatVND(ingredientDetail.data.price)} `
                  : "0"}
              </AlertDialogDescription>
              <h3 className="mt-6 text-xl font-semibold">
                Nutritional Information
              </h3>
              {ingredientDetail.data.ingredientNutrient ? (
                <div className="grid grid-cols-2 gap-4">
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Calories:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.calories || "0"}
                  </AlertDialogDescription>
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Fat:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.fat || "0"}g
                  </AlertDialogDescription>
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Saturated Fat:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.saturatedFat ||
                      "0"}
                    g
                  </AlertDialogDescription>
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Sugar:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.sugar || "0"}g
                  </AlertDialogDescription>
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Carbohydrate:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.carbonhydrate ||
                      "0"}
                    g
                  </AlertDialogDescription>
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Dietary Fiber:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.dietaryFiber ||
                      "0"}
                    g
                  </AlertDialogDescription>
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Protein:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.protein || "0"}g
                  </AlertDialogDescription>
                  <AlertDialogDescription className="text-muted-foreground">
                    <span className="font-semibold">Sodium:</span>{" "}
                    {ingredientDetail.data.ingredientNutrient.sodium || "0"}mg
                  </AlertDialogDescription>
                </div>
              ) : (
                <AlertDialogDescription className="text-muted-foreground">
                  Nutritional information is not available.
                </AlertDialogDescription>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </DataRender>
  );
};

export default IngredientDetail;
