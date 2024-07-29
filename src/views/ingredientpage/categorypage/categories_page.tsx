import { DataTable } from "../../../components/common/data_table";
import DataRender from "../../../components/data_render";
import useFetch from "../../../hooks/useFetch";
import { CategoriesIngredient, Response } from "../../../models/responses";
import { CategoriesIngredientColumn } from "./categories_ingredient_column";

const CategoriesPage = () => {
  const {
    data: ingredient,
    error,
    loading,
  } = useFetch<Response<CategoriesIngredient[]>>(
    "/api/ingredientcategories/get-all"
  );

  return (
    <div>
      <DataRender isLoading={loading} error={error}>
        <DataTable
          columns={CategoriesIngredientColumn()}
          data={ingredient?.data || []}
        />
      </DataRender>
    </div>
  );
};

export default CategoriesPage;
