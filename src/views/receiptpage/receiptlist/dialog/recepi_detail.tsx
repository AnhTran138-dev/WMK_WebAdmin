import DataRender from "@/components/data_render";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  ScrollArea,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { RecipeList, Response } from "@/models/responses";
import {
  ChefHat,
  CircleDollarSign,
  ClipboardPenLine,
  Heart,
  Users,
  XCircle,
  CheckCircle,
  Info,
  PlayCircle,
  Menu,
  SquareMenu,
} from "lucide-react";
import React, { useState } from "react";

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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  function formatDecimal(number: number) {
    return parseFloat(number.toFixed(2));
  }

  const renderDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case "Normal":
        return <Badge className="bg-blue-300">{difficulty}</Badge>;
      case "Medinum":
        return <Badge variant="success">{difficulty}</Badge>;

      case "Hard":
        return <Badge variant="destructive">{difficulty}</Badge>;
      default:
        return <Badge>{difficulty}</Badge>;
    }
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
                className="object-cover mb-4 rounded-lg shadow-md size-48 md:mb-0 md:mr-4"
              />
              <div className="flex-1">
                <AlertDialogTitle className="mb-2 ">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <CircleDollarSign className=" size-6" />
                      <span className="text-2xl font-bold">
                        {recipe.data.price}
                      </span>
                    </div>
                    {renderDifficulty(recipe.data.difficulty)}
                  </div>
                  <div className="text-2xl ">
                    <span>{recipe.data.name}</span>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.data.recipeCategories.map((category) => (
                      <Badge key={category.id}>{category.category.name}</Badge>
                    ))}
                  </div>
                </AlertDialogDescription>

                <AlertDialogDescription className="mt-5 text-lg text-gray-600">
                  <div>
                    <div className="flex items-center gap-8 ">
                      <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                        <Heart size={16} />
                        <span>{recipe.data.popularity} </span>
                      </p>
                      <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                        <ChefHat size={16} />
                        <span>{recipe.data.cookingTime} (minutes)</span>
                      </p>
                      <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                        <Users size={16} />
                        <span>
                          {recipe.data.servingSize} (
                          {recipe.data.servingSize === 1 ? "person" : "persons"}
                          )
                        </span>
                      </p>

                      <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                        <CircleDollarSign size={16} />
                        <span>{formatCurrency(recipe.data.price)}</span>
                      </p>
                    </div>
                  </div>
                  <p className="flex items-center gap-1 text-sm text-gray-500">
                    <ClipboardPenLine size={16} />
                    {recipe.data.description}
                  </p>
                </AlertDialogDescription>
              </div>
              <AlertDialogCancel className="border-none hover:bg-white">
                <XCircle className="ml-2 cursor-pointer size-6" />
              </AlertDialogCancel>
            </AlertDialogHeader>
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Ingredients */}
                <div className="p-4 bg-white border rounded-md shadow-sm">
                  <h3 className="flex items-center mb-4 text-xl font-semibold">
                    <Menu className="w-6 h-6 mr-2 " />
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside">
                    {recipe.data.recipeIngredients.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex items-center mb-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-semibold">
                          {ingredient.ingredient.name}
                        </span>
                        : {ingredient.amount} {ingredient.ingredient.unit} (
                        {ingredient.ingredient.price})
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutritional Information */}
                {recipe.data.recipeNutrient && (
                  <div className="p-4 bg-white border rounded-md shadow-sm">
                    <h3 className="flex items-center mb-4 text-xl font-semibold">
                      <Info className="w-6 h-6 mr-2 " />
                      Nutritional Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <span className="font-medium">Calories:</span>
                        <span className="ml-2">
                          {formatDecimal(recipe.data.recipeNutrient.calories)}{" "}
                          kcal
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Fat:</span>
                        <span className="ml-2">
                          {formatDecimal(recipe.data.recipeNutrient.fat)} g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Saturated Fat:</span>
                        <span className="ml-2">
                          {formatDecimal(
                            recipe.data.recipeNutrient.saturatedFat
                          )}{" "}
                          g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Sugar:</span>
                        <span className="ml-2">
                          {formatDecimal(recipe.data.recipeNutrient.sugar)} g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Carbohydrates:</span>
                        <span className="ml-2">
                          {formatDecimal(
                            recipe.data.recipeNutrient.carbonhydrate
                          )}{" "}
                          g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Fiber:</span>
                        <span className="ml-2">
                          {formatDecimal(
                            recipe.data.recipeNutrient.dietaryFiber
                          )}{" "}
                          g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Protein:</span>
                        <span className="ml-2">
                          {formatDecimal(recipe.data.recipeNutrient.protein)} g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Sodium:</span>
                        <span className="ml-2">
                          {formatDecimal(recipe.data.recipeNutrient.sodium)} mg
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preparation Steps */}
              <div className="mt-6">
                <h3 className="flex items-center mb-4 text-xl font-semibold">
                  <SquareMenu className="mr-2 size-6" />
                  Preparation
                </h3>
                <div className="flex flex-col gap-4">
                  {recipe.data.recipeSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-start p-4 border rounded-md cursor-pointer transition-transform duration-300 ease-in-out ${
                        selectedStepIndex === index
                          ? "bg-gray-100 shadow-lg transform scale-105"
                          : "bg-white"
                      }`}
                      onClick={() => handleStepClick(index)}
                    >
                      <img
                        src={step.imageLink || "/placeholder-image.png"}
                        alt={`Step ${step.index}`}
                        className={`object-cover w-32 h-32 rounded-md transition-transform ${
                          selectedStepIndex === index ? "scale-110" : ""
                        }`}
                      />
                      <div className="flex-1 ml-4">
                        <div className="text-lg font-semibold">
                          Step {step.index} - {step.name}
                        </div>
                        <p className="flex items-center gap-2 mt-2 text-gray-700">
                          <ClipboardPenLine className="size-4 " />
                          {step.description}
                        </p>
                        {step.mediaURL && (
                          <div className="mt-2">
                            <a
                              href={step.mediaURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 underline"
                            >
                              <PlayCircle className="w-4 h-4 mr-1" />
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
