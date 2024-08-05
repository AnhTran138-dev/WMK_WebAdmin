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
import Show from "../../../lib/show";
// import MessageChanging from "./dialog/message_changing";

const CategoriesPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
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
    setType("edit");
    setIsDialogOpen(true);
    setCategoryEdit(null);
  };

  const handleEdit = (category: CategoryRequest) => {
    setType("edit");
    setIsDialogOpen(true);
    setCategoryEdit(category);
  };

  // const handleAction = (type: string, category: CategoryRequest) => {
  //   setType(type);
  //   setCategoryAction(category);
  //   setIsDialogOpen(true);
  // };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleToast = (success: boolean, description: string) => {
    toast({
      title: success ? "Success" : "Error",
      description: description,
    });
    if (success) refetch();
  };

  const createCategory = async (
    category: CategoryRequest
  ): Promise<Response<null>> => {
    const respone: Response<null> = await IngredientApi.category.createCategory(
      category
    );

    return respone;
  };

  const updateCategory = async (
    id: string,
    category: CategoryRequest
  ): Promise<Response<null>> => {
    const respone: Response<null> = await IngredientApi.category.updateCategory(
      id,
      category
    );

    return respone;
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
          <Show>
            <Show.When isTrue={type === "detail"}>
              <CategoriesForm
                type="ingredient"
                createCategory={createCategory}
                updateCategory={updateCategory}
                reFresh={refetch}
                onClose={handleCloseDialog}
                category={categoryEdit}
              />
            </Show.When>
            <Show.Else>{/* <MessageChanging type={type} /> */}</Show.Else>
          </Show>
        }
      />
    </div>
  );
};

export default CategoriesPage;
