import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
// import useFetch from "../../../hooks/useFetch";
import { RecipeList } from "@/models/responses";
import { log } from "console";
import useFetch from "@/hooks/useFetchRecipe";

const ChartPopularRecipe: React.FC = () => {
  const {
    data: recipes,
    loading,
    error,
    refetch,
  } = useFetch<RecipeList[]>("/api/recipes/get-all");


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Kiểm tra nếu dữ liệu chưa có
  if (!recipes) return <div>No data available</div>;

  // Sắp xếp theo độ phổ biến và lấy top 5
  const sortedRecipes = [...recipes].sort(
    (a, b) => b.popularity - a.popularity
  );
  const top5Recipes = sortedRecipes.slice(0, 5);

  const xLabels = recipes.map((recipe) => recipe.name);
  const pData = recipes.map((recipe) => recipe.popularity);

  return (
    <div className="container flex flex-col flex-wrap p-4 mx-auto lg:flex-row">
      <div className="flex-1 min-w-0 lg:w-[60%] p-2">
        <h2 className="mb-6 text-xl font-semibold text-center uppercase">
          Popular Recipe Chart
        </h2>
        <div className="overflow-x-auto">
          <BarChart
            width={700}
            height={300}
            series={[{ data: pData, label: "Popularity", id: "popularityId" }]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </div>
      </div>
      <div className="flex-1 min-w-0 lg:w-[30%] p-2 mt-4 lg:mt-0 lg:mx-3">
        <h2 className="mb-6 text-xl font-semibold text-center uppercase">
          Top 5 Popular Recipes
        </h2>
        <div className="flex justify-center overflow-x-auto">
          <table style={{ width: "80%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
                ></th>
                <th
                  style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
                  className="text-left"
                >
                  Recipe Name
                </th>
                <th style={{ borderBottom: "2px solid #ddd", padding: "8px" }}>
                  Popularity
                </th>
              </tr>
            </thead>
            <tbody>
              {top5Recipes.map((recipe, index) => (
                <tr key={recipe.id}>
                  <td
                    style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
                  >
                    TOP {index + 1}
                  </td>
                  <td
                    style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
                  >
                    {recipe.name}
                  </td>
                  <td
                    style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
                    className="text-right"
                  >
                    {recipe.popularity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChartPopularRecipe;
