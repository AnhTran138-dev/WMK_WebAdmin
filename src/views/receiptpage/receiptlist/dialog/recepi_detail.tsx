import React, { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { RecipeList, Response } from "../../../../models/responses";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  ScrollArea,
} from "../../../../components/ui";
import DataRender from "../../../../components/data_render";
import { XCircle } from "lucide-react";

interface RecepiDetailProps {
  id: string;
}

const RecepiDetail: React.FC<RecepiDetailProps> = ({ id }) => {
  const {
    data: recipe,
    loading,
    error,
  } = useFetch<Response<RecipeList>>(`/api/recipes/get-by-id/${id}`);

  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null
  );

  const handleStepClick = (index: number) => {
    setSelectedStepIndex(index);
  };

  return (
    <ScrollArea className="p-4 h-[calc(90vh-4rem)]">
      <DataRender isLoading={loading} error={error}>
        {recipe && recipe.data && (
          <>
            <AlertDialogHeader className="flex flex-col md:flex-row md:items-start">
              <img
                src={recipe.data.img}
                alt={recipe.data.name}
                className="object-cover w-32 h-32 mb-4 rounded-md shadow-md md:mb-0 md:mr-4"
              />
              <div className="flex-1">
                <AlertDialogTitle className="text-3xl font-bold">
                  {recipe.data.name} -{" "}
                  <span className="text-xl font-semibold">
                    {recipe.data.price}
                  </span>
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-lg text-gray-600">
                  {recipe.data.description}
                </AlertDialogDescription>
                <div className="mt-2"></div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recipe.data.recipeCategories.map((category) => (
                    <Badge
                      key={category.id}
                      className="text-blue-800 bg-blue-100"
                    >
                      {category.category.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <AlertDialogCancel className="border-none hover:bg-white">
                <XCircle className="ml-2 cursor-pointer size-6" />
              </AlertDialogCancel>
            </AlertDialogHeader>

            <div className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Ingredients */}
                <div className="p-4 bg-white border rounded-md shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold">Ingredients</h3>
                  <ul className="list-disc list-inside">
                    {recipe.data.recipeIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="mb-1">
                        {ingredient.ingredient.name}: {ingredient.amount}{" "}
                        {ingredient.ingredient.unit} (
                        {ingredient.ingredient.price})
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutritional Information */}
                {recipe.data.recipeNutrient && (
                  <div className="p-4 bg-white border rounded-md shadow-sm">
                    <h3 className="mb-2 text-xl font-semibold">
                      Nutritional Information
                    </h3>
                    <ul className="list-disc list-inside">
                      <li>
                        Calories: {recipe.data.recipeNutrient.calories} kcal
                      </li>
                      <li>Fat: {recipe.data.recipeNutrient.fat} g</li>
                      <li>
                        Saturated Fat: {recipe.data.recipeNutrient.saturatedFat}{" "}
                        g
                      </li>
                      <li>Sugar: {recipe.data.recipeNutrient.sugar} g</li>
                      <li>
                        Carbohydrates:{" "}
                        {recipe.data.recipeNutrient.carbonhydrate} g
                      </li>
                      <li>
                        Fiber: {recipe.data.recipeNutrient.dietaryFiber} g
                      </li>
                      <li>Protein: {recipe.data.recipeNutrient.protein} g</li>
                      <li>Sodium: {recipe.data.recipeNutrient.sodium} mg</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Preparation Steps */}
              <div className="mt-6">
                <h3 className="mb-4 text-xl font-semibold">Preparation</h3>
                <div className="flex flex-col gap-4">
                  {recipe.data.recipeSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-start p-4 border rounded-md cursor-pointer transition-transform duration-300 ease-in-out ${
                        selectedStepIndex === index
                          ? "bg-gray-100 shadow-lg"
                          : "bg-white"
                      }`}
                      onClick={() => handleStepClick(index)}
                    >
                      <img
                        src={step.imageLink || "/placeholder-image.png"}
                        alt={`Step ${step.index}`}
                        className={`object-cover w-32 h-32 rounded-md ${
                          selectedStepIndex === index ? "scale-105" : ""
                        }`}
                      />
                      <div className="flex-1 ml-4">
                        <div className="text-lg font-semibold">
                          Step {step.index} - {step.name}
                        </div>
                        <p className="mt-2 text-gray-700">{step.description}</p>
                        {step.mediaURL && (
                          <div className="mt-2">
                            <a
                              href={step.mediaURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Watch Video
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </DataRender>
    </ScrollArea>
  );
};

export default RecepiDetail;
