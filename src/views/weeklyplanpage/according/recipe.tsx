import React from "react";
import { RecipePLAN } from "../../../models/responses/weekly_plan";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Badge,
} from "../../../components/ui";
import { Clock, Users, Star, Info, List } from "lucide-react"; // Added icons

interface RecipeProps {
  recipePlan: RecipePLAN;
}

const Recipe: React.FC<RecipeProps> = ({ recipePlan }) => {
  const { recipe } = recipePlan;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`recipe-${recipe.id}`}>
        <AccordionTrigger className="flex items-center p-4 space-x-4 transition-colors border-b border-gray-200 bg-blue-50 hover:bg-blue-100">
          <img
            src={recipe.img}
            alt={recipe.name}
            className="object-cover w-24 h-24 border border-gray-300 rounded-md shadow-sm"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-800">{recipe.name}</h2>
              <Badge
                variant={
                  recipe.processStatus.toLocaleLowerCase() === "approved"
                    ? "success"
                    : "destructive"
                }
                className="text-sm"
              >
                {recipe.processStatus}
              </Badge>
            </div>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {recipe.cookingTime} mins
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {recipe.servingSize}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-gray-500" />
                <Badge variant="outline" className="text-gray-600">
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-6 bg-white border-t border-gray-200">
          <div className="space-y-6">
            {/* Combined Description and Price Section */}
            <Accordion type="single" collapsible>
              <AccordionItem value="details">
                <AccordionTrigger className="flex items-center p-4 space-x-3 transition-colors bg-gray-100 rounded-md hover:bg-gray-200">
                  <Info className="text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Details
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-4">
                  {/* Description */}
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800 text-md">
                      Description
                    </h4>
                    <p className="text-base text-gray-700">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800 text-md">
                      Price
                    </h4>
                    <p className="text-base text-gray-700">
                      ${recipe.price.toFixed(2)}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Ingredients Section */}
            {recipe.recipeIngredients.length > 0 && (
              <Accordion type="single" collapsible>
                <AccordionItem value="ingredients">
                  <AccordionTrigger className="flex items-center p-4 space-x-3 transition-colors bg-gray-100 rounded-md hover:bg-gray-200">
                    <List className="text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Ingredients
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 space-y-4">
                    <Accordion type="single" collapsible>
                      {recipe.recipeIngredients.map((ingredient) => (
                        <AccordionItem
                          key={ingredient.id}
                          value={`ingredient-${ingredient.id}`}
                        >
                          <AccordionTrigger className="flex items-center p-4 space-x-3 transition-colors bg-gray-200 rounded-md hover:bg-gray-300">
                            <img
                              src={ingredient.ingredient.img}
                              alt={ingredient.ingredient.name}
                              className="object-cover w-12 h-12 border border-gray-300 rounded-md shadow-sm"
                            />
                            <p className="text-base text-gray-700">
                              {ingredient.amount} {ingredient.ingredient.unit}{" "}
                              of {ingredient.ingredient.name}
                            </p>
                          </AccordionTrigger>
                          <AccordionContent className="p-4 space-y-2 bg-gray-50">
                            <p className="text-sm text-gray-600">
                              Price: ${ingredient.ingredient.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Packaging Method:{" "}
                              {ingredient.ingredient.packagingMethod}
                            </p>
                            <p className="text-sm text-gray-600">
                              Preservation Method:{" "}
                              {ingredient.ingredient.preservationMethod}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Steps Section */}
            {recipe.recipeSteps.length > 0 && (
              <Accordion type="single" collapsible>
                <AccordionItem value="steps">
                  <AccordionTrigger className="flex items-center p-4 space-x-3 transition-colors bg-gray-100 rounded-md hover:bg-gray-200">
                    <List className="text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Steps
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 space-y-4">
                    <Accordion type="single" collapsible>
                      {recipe.recipeSteps.map((step) => (
                        <AccordionItem key={step.id} value={`step-${step.id}`}>
                          <AccordionTrigger className="flex items-center p-4 space-x-3 transition-colors bg-gray-200 rounded-md hover:bg-gray-300">
                            <p className="font-semibold text-gray-700">
                              {step.name}
                            </p>
                          </AccordionTrigger>
                          <AccordionContent className="p-4 space-y-2 bg-gray-50">
                            {step.imageLink && (
                              <img
                                src={step.imageLink}
                                alt={step.name}
                                className="w-full h-auto my-2 border border-gray-300 rounded-md shadow-sm"
                              />
                            )}
                            <p className="text-base text-gray-700">
                              {step.description}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Recipe;
