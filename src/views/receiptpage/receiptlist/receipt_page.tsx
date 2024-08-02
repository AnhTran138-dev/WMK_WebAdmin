import { DataTable } from "@/components/common/data_table";
import DialogCustom from "@/components/common/dialog";
import DataRender from "@/components/data_render";
import useFetch from "@/hooks/useFetch";
import { RecipeRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { RecipeList } from "@/models/responses/recipe_list";
import { useState } from "react";
import RecipeColumn from "./recipe_column";
import { useToast } from "../../../components/ui";
import RecepiForm from "./recepi_form";

const ReceiptPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [recipeEdit, setRecipeEdit] = useState<RecipeRequest | null>(null);
  const {
    data: recipes,
    loading,
    error,
    refetch,
  } = useFetch<Response<RecipeList[]>>("/api/recipes/get-all");

  const handleCreate = () => {
    setIsDialogOpen(true);
    setRecipeEdit(null);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (recipe: RecipeRequest) => {
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
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable
          columns={RecipeColumn(refetch, handleEdit, handleToast)}
          data={recipes?.data ?? []}
          searchColumn="name"
          handleCreate={handleCreate}
        />
      </DataRender>
      <DialogCustom
        className="max-w-5xl p-6"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <RecepiForm
            onClose={handleCloseDialog}
            refetch={refetch}
            recipe={recipeEdit}
          />
        }
      />
    </div>
  );
};

export default ReceiptPage;
