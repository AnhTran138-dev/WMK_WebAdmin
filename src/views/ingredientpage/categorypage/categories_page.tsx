import { DataTable } from "@/components/common/data_table";
import DialogCustom from "@/components/common/dialog";
import DataRender from "@/components/data_render";
import { useToast } from "@/components/ui";
import { IngredientApi } from "@/features";
import useFetch from "@/hooks/useFetch";
import { CategoryRequest } from "@/models/requests";
import { CategoriesIngredient, Response } from "@/models/responses";
import { useState } from "react";
import CategoriesForm from "../../categorypopup/categories_form";
import { CategoriesIngredientColumn } from "./categories_ingredient_column";

const CategoriesPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<CategoryRequest | null>(
    null
  );

  const {
    data: ingredient,
    error,
    loading,
    refetch,
  } = useFetch<Response<CategoriesIngredient[]>>(
    "/api/ingredientcategories/get-all"
  );

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
    await IngredientApi.category.createCategory(category);
  };

  const updateCategory = async (id: string, category: CategoryRequest) => {
    await IngredientApi.category.updateCategory(id, category);
  };

  return (
    <div>
      <DataRender isLoading={loading} error={error}>
        <DataTable
          columns={CategoriesIngredientColumn(handleEdit, handleToast, refetch)}
          data={ingredient?.data || []}
          handleCreate={handleCreate}
        />
      </DataRender>
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <CategoriesForm
            type="ingredient"
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
