import DataRender from "@/components/data_render";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Ingredient, Response } from "@/models/responses";
import { XCircle, Package, Tag, DollarSign } from "lucide-react";
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
      <div className="relative p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <AlertDialogCancel className="absolute border border-white border-solid cursor-pointer top-4 right-4 hover:bg-white">
          <XCircle />
        </AlertDialogCancel>

        {ingredientDetail && (
          <>
            <div className="flex gap-6">
              <img
                className="object-cover w-1/2 rounded-lg shadow-md"
                src={
                  ingredientDetail.data.img || "https://via.placeholder.com/250"
                }
                alt={ingredientDetail.data.name || "No image available"}
              />
              <div className="w-1/2 space-y-4">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                    {ingredientDetail.data.name || "N/A"}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                    {ingredientDetail.data.preservationMethod || "N/A"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Package className="size-4" />
                    <span className="font-semibold">
                      Packaging Method:
                    </span>{" "}
                    {ingredientDetail.data.packagingMethod || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Tag className="size-4" />
                    <span className="font-semibold">Category:</span>{" "}
                    {ingredientDetail.data.ingredientCategory?.name || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <DollarSign className="size-4" />
                    <span className="font-semibold">Price:</span>{" "}
                    {ingredientDetail.data.price
                      ? formatVND(ingredientDetail.data.price)
                      : "0"}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Nutritional Information
                  </h3>
                  {ingredientDetail.data.ingredientNutrient ? (
                    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 rounded-2xl bg-slate-100">
                      {Object.entries(ingredientDetail.data.ingredientNutrient)
                        .filter(
                          ([key]) => key !== "id" && key !== "ingredientID"
                        ) // Exclude IDs
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                          >
                            <AlertDialogDescription>
                              <span className="font-semibold">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                                :
                              </span>{" "}
                              {value || "0"}
                            </AlertDialogDescription>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                      Nutritional information is not available.
                    </AlertDialogDescription>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DataRender>
  );
};

export default IngredientDetail;
