import React from "react";
import { RecipePLAN } from "@/models/responses/weekly_plan";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from "@/components/ui";
import {
  ShoppingBag,
  ClipboardPenLine,
  ChefHat,
  CircleDollarSign,
  Users,
  Heart,
} from "lucide-react";
import PlanIngredientItem from "./PlanIngredientItem";

interface PlanRecipeItemProps {
  recipe: RecipePLAN;
}

const PlanRecipeItem: React.FC<PlanRecipeItemProps> = ({ recipe }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

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
    <AccordionItem value={recipe.recipe.name}>
      <AccordionTrigger className="px-4 duration-75 bg-gray-200 hover:no-underline rounded-2xl hover:shadow-lg hover:bg-gray-300 hover:cursor-pointer hover:transition-transform hover:scale-y-105">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center gap-3">
            <img
              src={recipe.recipe.img}
              alt={recipe.recipe.name}
              className="object-cover rounded-lg size-20"
            />
            <div className="flex flex-col items-start ml-5">
              <h3 className="flex items-center justify-center gap-3 text-lg font-semibold">
                <span>{recipe.recipe.name}</span>
                <span>{renderDifficulty(recipe.recipe.difficulty)}</span>
              </h3>

              <div className="flex items-center gap-8 ">
                <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                  <ShoppingBag size={16} />
                  <span>{recipe.quantity}</span>
                </p>
                <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                  <ChefHat size={16} />
                  <span>{recipe.recipe.cookingTime} (minutes)</span>
                </p>
                <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                  <Users size={16} />
                  <span>
                    {recipe.recipe.servingSize} (
                    {recipe.recipe.servingSize === 1 ? "person" : "persons"})
                  </span>
                </p>
                <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                  <Heart size={16} />
                  <span>{recipe.recipe.popularity} </span>
                </p>
                <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
                  <CircleDollarSign size={16} />
                  <span>{formatCurrency(recipe.recipe.price)}</span>
                </p>
              </div>
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <ClipboardPenLine size={16} />
                {recipe.recipe.description}
              </p>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {recipe.recipe.recipeIngredients.map((ingredient) => (
          <div key={ingredient.id} className="ml-5">
            <PlanIngredientItem ingredient={ingredient} />
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default PlanRecipeItem;
