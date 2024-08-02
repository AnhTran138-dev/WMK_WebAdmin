import { DataTable } from "@/components/common/data_table";
import DataRender from "@/components/data_render";
import useFetch from "@/hooks/useFetch";
import { CategoriesRecipe, Response } from "@/models/responses";
import { CategoriesRecipeColumns } from "./categories_recipe_column";
import { useState } from "react";
import { CategoryRequest } from "../../../models/requests";
import { useToast } from "../../../components/ui";
import DialogCustom from "../../../components/common/dialog";
import CategoriesForm from "../../categorypopup/categories_form";
import { recipeApi } from "../../../features";

const CategoriesPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<CategoryRequest | null>(
    null
  );

  const {
    data: categories,
    loading,
    error,
    refetch,
  } = useFetch<Response<CategoriesRecipe[]>>("/api/categories/get-all");

  const handleCreate = () => {
    setIsDialogOpen(true);
    setCategoryEdit(null);
  };

  const handleEdit = (category: CategoryRequest) => {
    setIsDialogOpen(true);
    setCategoryEdit(category);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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

  const createCategory = async (category: CategoryRequest) => {
    await recipeApi.category.createCategory(category);
  };

  const updateCategory = async (id: string, category: CategoryRequest) => {
    await recipeApi.category.updateCategory(id, category);
  };

  return (
    <div>
      <DataRender isLoading={loading} error={error}>
        <DataTable
          columns={CategoriesRecipeColumns(handleEdit, handleToast, refetch)}
          data={categories?.data || []}
          searchColumn="name"
          handleCreate={handleCreate}
        />
      </DataRender>
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <CategoriesForm
            type="recipe"
            createCategory={createCategory}
            updateCategory={updateCategory}
            reFresh={refetch}
            onClose={handleCloseDialog}
            category={categoryEdit}
          />
        }
      />
    </div>
  );
};

export default CategoriesPage;
