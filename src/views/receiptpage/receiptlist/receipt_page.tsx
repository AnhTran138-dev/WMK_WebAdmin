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
import RecepiForm from "./dialog/recepi_form";
import Show from "../../../lib/show";
import RecepiDetail from "./dialog/recepi_detail";

const ReceiptPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [recipeEdit, setRecipeEdit] = useState<RecipeRequest | null>(null);
const [id, setId] = useState<string>("");
const [type, setType] = useState<string>("");
  const {
    data: recipes,
    loading,
    error,
    refetch,
  } = useFetch<Response<RecipeList[]>>("/api/recipes/get-all");

  const handleCreate = () => {
    setType("edit");
    setIsDialogOpen(true);
    setRecipeEdit(null);
  };

  const handleDetail = (id: string) => {
    setId(id);
    setType("detail");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (recipe: RecipeRequest) => {
    setType("edit");
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
          columns={RecipeColumn(refetch, handleEdit, handleToast, handleDetail)}
          data={recipes?.data ?? []}
          searchColumn="name"
          handleCreate={handleCreate}
        />
      </DataRender>
      <DialogCustom
        className="max-w-5xl p-6 "
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <Show>
            <Show.When isTrue={type === "edit"}>
              <RecepiForm
                onToast={handleToast}
                onClose={handleCloseDialog}
                refetch={refetch}
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

export default ReceiptPage;
