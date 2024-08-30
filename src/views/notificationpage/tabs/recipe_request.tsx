import DialogCustom from "@/components/common/dialog";
import { useToast } from "@/components/ui";
import { useDebounce } from "@/hooks";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import type { RecipeRequest } from "@/models/requests";
import { RecipeList, Response } from "@/models/responses";
import { AlertCircle } from "lucide-react";
import React, { useMemo, useState } from "react";
import RecepiDetail from "../../receiptpage/receiptlist/dialog/recepi_detail";
import RecepiForm from "../../receiptpage/receiptlist/dialog/recepi_form";
import { SelectType } from "../notification_page";
import RecipeItem from "./recipe_item";
import { Loading } from "../../../components/loading";

interface RecipeRequestProps {
  role: string;
  name: string | "";
  handleChangeStatus: (
    chooseNotification: SelectType,
    refetch: () => void
  ) => void;
}

const RecipeRequest: React.FC<RecipeRequestProps> = ({
  role,
  name,
  handleChangeStatus,
}) => {
  const { toast } = useToast();
  const [recipeEdit, setRecipeEdit] = useState<RecipeRequest | null>(null);
  const [type, setType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const nameDebounce = useDebounce<string>(name, 500);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const options = useMemo(() => {
    const params: { [key: string]: string } = {};
    if (nameDebounce) {
      params.Name = nameDebounce;
    }
    return { params };
  }, [nameDebounce]);

  const {
    data: recipes,
    loading,
    refetch,
  } = useFetch<Response<RecipeList[]>>(`/api/recipes/get-all`, options);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleApprove = (recipeId: string) => {
    handleChangeStatus(
      {
        id: recipeId,
        status: 1,
        type: "recipe",
        author: "access",
      },
      refetch
    );
  };

  const handleDeny = (recipeId: string) => {
    handleChangeStatus(
      {
        id: recipeId,
        status: 2,
        type: "recipe",
        author: "deny",
      },
      refetch
    );
  };

  const handleUpdate = (recipe: RecipeRequest) => {
    setType("update");
    setIsDialogOpen(true);
    setRecipeEdit(recipe);
  };

  const handleDetail = (recipeId: string) => {
    setType("detail");
    setId(recipeId);
    setIsDialogOpen(true);
  };

  const handleToast = (success: boolean, description: string) => {
    toast({
      title: success ? "Success" : "Error",
      description: description,
      variant: success ? "default" : "destructive",
    });
    if (success) refetch();
  };

  const recipeRequest = recipes?.data.filter((recipe) => {
    if (role === "Admin" || role === "Manager") {
      return recipe.processStatus.toLowerCase() === "processing";
    }
    if (role === "Staff") {
      return recipe.processStatus.toLowerCase() === "denied";
    }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full ">
      {recipes === undefined || recipeRequest?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-10">
          <AlertCircle className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-lg font-semibold text-center text-gray-500">
            No Recipe Requests Found
          </p>
        </div>
      ) : (
        <Show>
          <Show.When isTrue={role === "Staff"}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5">
              {recipes?.data
                .filter((recipe) => recipe.processStatus === "Denied")
                .map((recipe) => (
                  <RecipeItem
                    key={recipe.id}
                    recipe={recipe}
                    onApprove={() => handleApprove(recipe.id)}
                    onDeny={() => handleDeny(recipe.id)}
                    onEdit={() =>
                      handleUpdate({
                        id: recipe.id,
                        name: recipe.name,
                        description: recipe.description,
                        recipeIngredientsList: recipe.recipeIngredients.map(
                          (ingredient) => {
                            return {
                              ingredientId: ingredient.ingredientId,
                              amount: ingredient.amount,
                            };
                          }
                        ),
                        img: recipe.img,
                        servingSize: recipe.servingSize,
                        cookingTime: recipe.cookingTime,
                        difficulty: recipe.difficulty,
                        categoryIds: recipe.recipeCategories.map(
                          (category) => category.categoryId
                        ),
                        steps: recipe.recipeSteps.map((step) => {
                          return {
                            id: step.id,
                            index: step.index,
                            name: step.name,
                            mediaURL: step.imageLink,
                            description: step.description,
                            imageLink: step.imageLink,
                          };
                        }),
                      })
                    }
                    onDetail={handleDetail}
                    isStaff={true}
                  />
                ))}
            </div>
          </Show.When>
          <Show.Else>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5">
              {recipes?.data
                .filter((recipe) => recipe.processStatus === "Processing")
                .map((recipe) => (
                  <RecipeItem
                    key={recipe.id}
                    recipe={recipe}
                    onApprove={() => handleApprove(recipe.id)}
                    onDeny={() => handleDeny(recipe.id)}
                    onEdit={() =>
                      handleUpdate({
                        id: recipe.id,
                        name: recipe.name,
                        description: recipe.description,
                        recipeIngredientsList: recipe.recipeIngredients.map(
                          (ingredient) => {
                            return {
                              ingredientId: ingredient.ingredientId,
                              amount: ingredient.amount,
                            };
                          }
                        ),
                        img: recipe.img,
                        servingSize: recipe.servingSize,
                        cookingTime: recipe.cookingTime,
                        difficulty: recipe.difficulty,
                        categoryIds: recipe.recipeCategories.map(
                          (category) => category.categoryId
                        ),
                        steps: recipe.recipeSteps.map((step) => {
                          return {
                            id: step.id,
                            index: step.index,
                            name: step.name,
                            mediaURL: step.imageLink,
                            description: step.description,
                            imageLink: step.imageLink,
                          };
                        }),
                      })
                    }
                    onDetail={handleDetail}
                    isStaff={false}
                  />
                ))}
            </div>
          </Show.Else>
        </Show>
      )}
      <DialogCustom
        className="max-w-5xl p-6"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <Show>
            <Show.When isTrue={type === "update"}>
              <RecepiForm
                onClose={handleCloseDialog}
                refetch={refetch}
                onToast={handleToast}
                recipe={recipeEdit}
              />
            </Show.When>
            <Show.When isTrue={type === "detail"}>
              <RecepiDetail id={id} />
            </Show.When>
          </Show>
        }
      />
    </div>
  );
};

export default RecipeRequest;
