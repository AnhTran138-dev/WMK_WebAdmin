import { DataTable } from "@/components/common/data_table";
import DialogCustom from "@/components/common/dialog";
import DataRender from "@/components/data_render";
import { useToast } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { IngredientRequest } from "@/models/requests";
import { IngredientsList, Response } from "@/models/responses";
import { useState } from "react";
import IngredientColumn from "./ingredient_column";
import IngredientForm from "./ingredient_form";

const IngredientPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [ingredentEdit, setIngredentEdit] = useState<IngredientRequest | null>(
    null
  );
  const {
    data: ingredient,

    loading,
    error,
    refetch,
  } = useFetch<Response<IngredientsList[]>>("/api/ingredients/get-all");

  const handleCreate = () => {
    setIsDialogOpen(true);
    setIngredentEdit(null);
  };

  const handleEdit = (ingredent: IngredientRequest) => {
    setIsDialogOpen(true);
    setIngredentEdit(ingredent);
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

  return (
    <div>
      <DataRender isLoading={loading} error={error}>
        <DataTable
          data={ingredient?.data ?? []}
          columns={IngredientColumn(handleEdit, handleToast, refetch)}
          searchColumn="name"
          handleCreate={handleCreate}
        />
      </DataRender>
      <DialogCustom
        className="max-w-5xl p-6"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <IngredientForm
            onClose={handleCloseDialog}
            reFresh={refetch}
            ingredient={ingredentEdit}
          />
        }
      />
    </div>
  );
};

export default IngredientPage;
