import { DataTable } from "../../components/common/data_table";
import DataRender from "../../components/data_render";
import useFetch from "../../hooks/useFetch";
import { Response } from "../../models/responses";
import { RecipeList } from "../../models/responses/recipe_list";
import RecipeColumn from "./recipe_column";

const ReceiptPage = () => {
  const {
    data: recipes,
    loading,
    error,
  } = useFetch<Response<RecipeList[]>>("/api/recipes/get-all");

  return (
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable
          columns={RecipeColumn()}
          data={recipes?.data ?? []}
          searchColumn="name"
        />
      </DataRender>
    </div>
  );
};

export default ReceiptPage;
