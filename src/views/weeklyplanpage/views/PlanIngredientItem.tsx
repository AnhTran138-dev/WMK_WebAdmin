import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui";
import { RecipeIngredientItem } from "@/models/responses/weekly_plan";
import { CircleDollarSign, Package, Shield, ShoppingBag } from "lucide-react";
import React from "react";

interface PlanIngredientItemProps {
  ingredient: RecipeIngredientItem;
}

const PlanIngredientItem: React.FC<PlanIngredientItemProps> = ({
  ingredient,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  return (
    <Card className="flex flex-row items-start justify-start pt-3 my-2">
      <CardHeader>
        <img
          src={ingredient.ingredient.img}
          alt={ingredient.ingredient.name}
          className="size-20 rounded-xl"
        />
      </CardHeader>
      <CardContent>
        <CardDescription>
          <h3 className="text-lg font-semibold">
            {ingredient.ingredient.name}
          </h3>

          <div className="flex items-center gap-8 ">
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
              <ShoppingBag size={16} />
              <span>
                {ingredient.amount} ({ingredient.ingredient.unit})
              </span>
            </p>
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
              <CircleDollarSign size={16} />
              <span>{formatCurrency(ingredient.ingredient.price)}</span>
            </p>
          </div>
          <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
            <Package size={16} />
            <span className="text-sm text-gray-500">
              {ingredient.ingredient.packagingMethod}
            </span>
          </p>
          <p className="flex items-center gap-1 text-sm font-semibold text-gray-500 ">
            <Shield size={16} />
            <span className="text-sm text-gray-500">
              {ingredient.ingredient.preservationMethod}
            </span>
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PlanIngredientItem;
