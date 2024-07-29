import { DataTable } from "../../components/common/data_table";
import DataRender from "../../components/data_render";
import useFetch from "../../hooks/useFetch";
import { Response } from "../../models/responses";
import { WeeklyPlanList } from "../../models/responses/weekly_plan";
import WeeklyPlanColumn from "./weekly_plan_column";

const WeeklyPlanPage = () => {
  const {
    data: weeklyplans,
    loading,
    error,
  } = useFetch<Response<WeeklyPlanList[]>>("/api/weeklyplan/get-all");
  return (
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable
          columns={WeeklyPlanColumn()}
          data={weeklyplans?.data ?? []}
        ></DataTable>
      </DataRender>
    </div>
  );
};

export default WeeklyPlanPage;
