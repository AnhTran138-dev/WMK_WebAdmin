import { DataTable } from "@/components/common/data_table";
import DialogCustom from "@/components/common/dialog";
import DataRender from "@/components/data_render";
import { useToast } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { IngredientRequest } from "@/models/requests";
import { IngredientsList, Response } from "@/models/responses";
import { useState } from "react";
import IngredientForm from "./dialog/ingredient_form";
import IngredientColumn from "./ingredient_column";
import Show from "../../../lib/show";
import IngredientDetail from "./dialog/ingredient_detail";

const IngredientPage = () => {
  const { toast } = useToast();
  const [id, setId] = useState<string>("");
  const [type, setType] = useState<string>("");
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
    setType("edit");
    setIsDialogOpen(true);
    setIngredentEdit(null);
  };

  const handleDetail = (id: string) => {
    setId(id);
    setType("detail");
    setIsDialogOpen(true);
  };

  const handleEdit = (ingredent: IngredientRequest) => {
    setType("edit");
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
          columns={IngredientColumn(handleEdit, handleToast, refetch, handleDetail)}
          searchColumn="name"
          handleCreate={handleCreate}
        />
      </DataRender>
      <DialogCustom
        className="max-w-5xl p-6"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <Show>
            <Show.When isTrue={type === "edit"}>
              <IngredientForm
                onClose={handleCloseDialog}
                reFresh={refetch}
                ingredient={ingredentEdit}
              />
            </Show.When>
            <Show.When isTrue={type === "detail"}>
              <IngredientDetail id={id} />
            </Show.When>
          </Show>
        }
      />
    </div>
  );
};

export default IngredientPage;
