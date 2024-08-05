import React from "react";
import useFetch from "../../../hooks/useFetch";
import { Response } from "../../../models/responses";
import { WeeklyPlanList } from "../../../models/responses/weekly_plan";
import DataRender from "../../../components/data_render";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui";
import GeneralInfoWeeklyPlan from "../tabs/GeneralInfoWeeklyPlan";

interface DetailWeeklyPlanProps {
  id: string;
}

const DetailWeeklyPlan: React.FC<DetailWeeklyPlanProps> = ({ id }) => {
  const {
    data: weeklyPlan,
    loading,
    error,
  } = useFetch<Response<WeeklyPlanList>>(`/api/weeklyplan/get-id/${id}`);

  return (
    <div className="p-4">
      <DataRender isLoading={loading} error={error}>
        {weeklyPlan && weeklyPlan.data && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{weeklyPlan.data.title}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <GeneralInfoWeeklyPlan weeklyPlan={weeklyPlan.data} />
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}
      </DataRender>
    </div>
  );
};

export default DetailWeeklyPlan;
