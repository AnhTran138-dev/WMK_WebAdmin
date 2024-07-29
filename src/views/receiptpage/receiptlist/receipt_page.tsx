import { useState } from "react";
import { DataTable } from "../../../components/common/data_table";
import DialogCustom from "../../../components/common/dialog";
import DataRender from "../../../components/data_render";
import useFetch from "../../../hooks/useFetch";
import { Response } from "../../../models/responses";
import { RecipeList } from "../../../models/responses/recipe_list";
import RecipeColumn from "./recipe_column";

const ReceiptPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    data: recipes,
    loading,
    error,
    refetch,
  } = useFetch<Response<RecipeList[]>>("/api/recipes/get-all");

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (id: string) => {
    console.log(id);

    setIsDialogOpen(true);
  };

  return (
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable
          columns={RecipeColumn(refetch, handleEdit)}
          data={recipes?.data ?? []}
          searchColumn="name"
        />
      </DataRender>
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={<div>Hello</div>}
      />
    </div>
  );
};

export default ReceiptPage;
