import DataRender from "@/components/data_render";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/models/responses";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanTable from "../table/PlanTable";
import { Button } from "../../../components/ui";

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
    <div>
      <Button
        onClick={() => {
          navigation(-1);
        }}
      >
        Back
      </Button>
      <DataRender isLoading={loading} error={error}>
        {weeklyPlan && weeklyPlan.data && (
          <PlanTable weeklyPlan={weeklyPlan.data} />
          // <Tabs
          //   value={activeTab}
          //   onValueChange={setActiveTab}
          //   className="w-full"
          // >
          //   <div className="flex flex-row items-center justify-between">
          //     <div>{weeklyPlan.data.title}</div>
          //     <TabsList>
          //       <TabsTrigger value="general">General Info</TabsTrigger>
          //       <TabsTrigger value="recipe">Recipe Info</TabsTrigger>
          //     </TabsList>
          //   </div>
          //   <TabsContent value="general">
          //     <PlanTable weeklyPlan={weeklyPlan.data} />
          //   </TabsContent>
          //   <TabsContent value="recipe">
          //     <RecipeListInfo recipePlans={weeklyPlan.data.recipePLans} />
          //   </TabsContent>
          // </Tabs>
        )}
      </DataRender>
    </div>
  );
};

export default DetailWeeklyPlan;
