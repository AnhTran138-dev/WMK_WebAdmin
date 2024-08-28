import { Accordion } from "@/components/ui";
import { RecipePLAN } from "@/models/responses/weekly_plan";
import React from "react";
import PlanRecipeItem from "./PlanRecipeItem";

interface PlanRecipeProps {
  recipes: RecipePLAN[];
}

const PlanRecipe: React.FC<PlanRecipeProps> = ({ recipes }) => {
  const filterUniqueRecipe = (recipes: RecipePLAN[]) => {
    const uniqueRecipes: RecipePLAN[] = [];

    recipes.forEach((recipe) => {
      if (
        !uniqueRecipes.find(
          (uniqueRecipe) => uniqueRecipe.recipe.id === recipe.recipe.id
        )
      ) {
        uniqueRecipes.push(recipe);
      }
    });

    return uniqueRecipes;
  };

  const newRecipes = filterUniqueRecipe(recipes);

  return (
    <div>
      <h1>List of recipes</h1>
      {newRecipes.map((recipe) => (
        <Accordion
          type="single"
          collapsible
          key={recipe.recipe.id}
          className="w-full mb-3 "
        >
          <PlanRecipeItem recipe={recipe} />
        </Accordion>
      ))}
    </div>
  );
};

export default PlanRecipe;
