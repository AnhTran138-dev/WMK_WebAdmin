import React, { useMemo, useState } from "react";
import DataRender from "@/components/data_render";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ScrollArea,
  useToast,
} from "@/components/ui";
import { recipeApi } from "@/features";
import useFetch from "@/hooks/useFetch";
import { formatFromISOString, FormatType } from "@/lib";
import Show from "@/lib/show";
import type { RecipeRequest } from "@/models/requests";
import { RecipeList, Response } from "@/models/responses";
import DialogCustom from "@/components/common/dialog";
import RecepiForm from "../../receiptpage/receiptlist/dialog/recepi_form";
import { useDebounce } from "../../../hooks";

interface RecipeRequestProps {
  role: string;
  name: string | "";
}

const RecipeRequest: React.FC<RecipeRequestProps> = ({ role, name }) => {
  const { toast } = useToast();
  const [recipeEdit, setRecipeEdit] = useState<RecipeRequest | null>(null);
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
    refetch,
    loading,
    error,
  } = useFetch<Response<RecipeList[]>>(`/api/recipes/get-all`, options);

  const handleChangeStatus = async (id: string, status: number) => {
    const response: Response<null> = await recipeApi.changeStatusRecipe(
      id,
      status,
      ""
    );

    if (response.statusCode === 200) {
      toast({
        title: "Success",
        description: response.message,
        duration: 5000,
      });
      await refetch();
    }
    if (response.statusCode !== 200) {
      toast({
        title: "Error",
        description: response.message,
        duration: 5000,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUpdate = (recipe: RecipeRequest) => {
    setIsDialogOpen(true);
    setRecipeEdit(recipe);
  };

  const handleToast = (success: boolean, description: string) => {
    if (success) {
      toast({
        title: "success",
        description: description,
      });
      refetch();
    } else {
      toast({
        title: "error",
        description: description,
      });
    }
  };

  return (
    <ScrollArea className="h-full p-4 bg-background">
      <DataRender isLoading={loading} error={error}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recipes?.data.map((recipe) => (
            <Show key={recipe.id}>
              <Show.When
                isTrue={
                  recipe.processStatus.toLowerCase() === "processing" &&
                  (role === "Admin" || role === "Manager")
                }
              >
                <Card className="flex flex-col overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="flex flex-col flex-1 p-4">
                    <CardHeader className="mb-2">
                      <CardTitle className="text-lg font-bold text-primary">
                        {recipe.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {recipe.createdBy} -{" "}
                        {formatFromISOString(recipe.createdAt, FormatType.DATE)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col mt-auto sm:flex-row sm:gap-2">
                      <Button
                        variant="success"
                        onClick={() => handleChangeStatus(recipe.id, 1)}
                      >
                        Access
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleChangeStatus(recipe.id, 2)}
                      >
                        Deny
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </Show.When>
              <Show.When
                isTrue={
                  recipe.processStatus.toLowerCase() === "denied" &&
                  role === "Staff"
                }
              >
                <Card className="flex flex-col overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="flex flex-col flex-1 p-4">
                    <CardHeader className="mb-2">
                      <CardTitle className="text-lg font-bold text-primary">
                        {recipe.name} -{" "}
                        <Badge variant="secondary">
                          {recipe.processStatus}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {recipe.createdBy} -{" "}
                        {formatFromISOString(recipe.createdAt, FormatType.DATE)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col mt-auto sm:flex-row sm:gap-2 sm:justify-end">
                      <Button
                        onClick={() =>
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
                      >
                        Update
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </Show.When>
            </Show>
          ))}
        </div>
      </DataRender>
      <DialogCustom
        className="max-w-5xl p-6 "
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <RecepiForm
            onClose={handleCloseDialog}
            refetch={refetch}
            onToast={handleToast}
            recipe={recipeEdit}
          />
        }
      />
    </ScrollArea>
  );
};

export default RecipeRequest;
