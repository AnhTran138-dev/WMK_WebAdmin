import DataRender from "@/components/data_render";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/models/responses";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui";
import PlanGeneral from "./views/PlanGeneral";
import PlanTable from "./views/PlanTable";
import { CircleArrowLeft } from "lucide-react";
import PlanRecipe from "./views/PlanRecipe";

interface DetailWeeklyPlanProps {}

const DetailWeeklyPlan: React.FC<DetailWeeklyPlanProps> = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const {
    data: weeklyPlan,
    loading,
    error,
  } = useFetch<Response<WeeklyPlanList>>(`/api/weeklyplan/get-id/${id}`);

  return (
    <div className="px-4 py-5">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="mb-4 space-x-3"
          onClick={() => {
            navigation(-1);
          }}
        >
          <CircleArrowLeft size={28} /> <span>Back</span>
        </Button>

        <h1 className="text-2xl font-semibold">Weekly Plan Detail</h1>
      </div>
      <DataRender isLoading={loading} error={error}>
        {weeklyPlan && weeklyPlan.data && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <PlanGeneral weeklyPlan={weeklyPlan.data} />
            </div>
            <div className="col-span-9">
              <PlanTable weeklyPlan={weeklyPlan.data} />
              <PlanRecipe recipes={weeklyPlan.data.recipePLans} />
            </div>
          </div>
        )}
      </DataRender>
    </div>
  );
};

export default DetailWeeklyPlan;
