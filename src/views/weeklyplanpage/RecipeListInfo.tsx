import Show from "@/lib/show";
import { RecipePLAN } from "@/models/responses/weekly_plan";
import React from "react";
import Recipe from "./according/recipe";

interface RecipeListInfoProps {
  recipePlans: RecipePLAN[];
}

const RecipeListInfo: React.FC<RecipeListInfoProps> = ({ recipePlans }) => {
  return (
    <div>
      <Show>
        <Show.When isTrue={recipePlans.length === 0 || !recipePlans}>
          <div className="text-center">No recipes available</div>
        </Show.When>
        <Show.When isTrue={recipePlans.length > 0}>
          {recipePlans.map((recipePlan, index) => (
            <Recipe key={index} recipePlan={recipePlan} />
          ))}
        </Show.When>
      </Show>
    </div>
  );
};

export default RecipeListInfo;
