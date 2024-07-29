import { DataTable } from "@/components/common/data_table";
import DataRender from "@/components/data_render";
import useFetch from "@/hooks/useFetch";
import { CategoriesRecipe, Response } from "@/models/responses";
import { CategoriesRecipeColumns } from "./categories_recipe_column";

const CategoriesPage = () => {
  const {
    data: categories,
    loading,
    error,
  } = useFetch<Response<CategoriesRecipe[]>>("/api/categories/get-all");

  return (
    <div>
      <DataRender isLoading={loading} error={error}>
        <DataTable
          columns={CategoriesRecipeColumns()}
          data={categories?.data || []}
          searchColumn="name"
        />
      </DataRender>
    </div>
  );
};

export default CategoriesPage;
