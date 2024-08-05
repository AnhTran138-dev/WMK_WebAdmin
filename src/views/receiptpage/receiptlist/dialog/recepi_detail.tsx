import React, { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { RecipeList, Response } from "../../../../models/responses";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  ScrollArea,
} from "../../../../components/ui";
import DataRender from "../../../../components/data_render";

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
    <ScrollArea className="p-4 h-96">
      <DataRender isLoading={loading} error={error}>
        {recipe && recipe.data && (
          <>
            <AlertDialogHeader className="flex flex-row items-start">
              <img
                src={recipe.data.img}
                alt={recipe.data.name}
                className="object-cover w-32 h-32 mr-4 rounded-md"
              />
              <div>
                <AlertDialogTitle className="text-2xl font-bold">
                  {recipe.data.name} ({recipe.data.price})
                </AlertDialogTitle>
                <AlertDialogDescription className="my-2">
                  <p className="text-sm">{recipe.data.description}</p>
                </AlertDialogDescription>
              </div>
            </AlertDialogHeader>

            {/* Grid Container for Details */}
            <div className="grid grid-cols-1 gap-4 mt-4">
              {/* Ingredients and Nutritional Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-semibold">Ingredients</h3>
                  <ul className="mt-2 list-disc list-inside">
                    {recipe.data.recipeIngredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.ingredient.name}: {ingredient.amount}{" "}
                        {ingredient.ingredient.unit} (
                        {ingredient.ingredient.price})
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutritional Information */}
                {recipe.data.recipeNutrient && (
                  <div>
                    <h3 className="text-lg font-semibold">
                      Nutritional Information
                    </h3>
                    <ul className="mt-2 list-disc list-inside">
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
              <div>
                <h3 className="text-lg font-semibold">Preparation</h3>
                <div className="flex flex-col gap-4">
                  {recipe.data.recipeSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-start p-4 border rounded-md cursor-pointer transition-transform duration-300 ease-in-out ${
                        selectedStepIndex === index ? "bg-gray-100" : "bg-white"
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
                        <p className="mt-2">{step.description}</p>
                        {step.mediaURL && (
                          <div className="mt-2">
                            {/* Include additional media rendering if needed */}
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
