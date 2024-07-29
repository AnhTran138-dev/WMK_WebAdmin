import { DataTable } from "../../../components/common/data_table";
import DataRender from "../../../components/data_render";
import useFetch from "../../../hooks/useFetch";
import { IngredientsList, Response } from "../../../models/responses";
import IngredientColumn from "./ingredient_column";

const IngredientPage = () => {
  const {
    data: ingredient,
    loading,
    error,
  } = useFetch<Response<IngredientsList[]>>("/api/ingredients/get-all");

  return (
    <div>
      <DataRender isLoading={loading} error={error}>
        <DataTable
          data={ingredient?.data ?? []}
          columns={IngredientColumn()}
          searchColumn="name"
        />
      </DataRender>
    </div>
  );
};

export default IngredientPage;
