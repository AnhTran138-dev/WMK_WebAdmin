import DialogCustom from "@/components/common/dialog";
import DataRender from "@/components/data_render";
import { useToast } from "@/components/ui";
import { useDebounce } from "@/hooks";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import type { WeeklyPlanRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import React, { useMemo, useState } from "react";
import WeeklyPlanForm from "../../weeklyplanpage/dialog/weekly_plan_form";
import { SelectType } from "../notification_page";
import WeeklyPlanItem from "./weekly_plan_item";

interface WeeklyPlanRequestProps {
  role: string;
  title: string;
  handleChangeStatus: (
    chooseNotification: SelectType,
    refetch: () => void
  ) => void;
}

const WeeklyPlanRequest: React.FC<WeeklyPlanRequestProps> = ({
  title,
  handleChangeStatus,
  role,
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [weeklyplan, setWeeklyPlan] = useState<WeeklyPlanRequest | null>(null);
  const titleDebounce = useDebounce(title, 500);

  const options = useMemo(() => {
    const params: { [key: string]: string } = {};
    if (titleDebounce) {
      params.Title = titleDebounce;
    }
    return { params };
  }, [titleDebounce]);

  const {
    data: weeklyplans,
    loading,
    error,
    refetch,
  } = useFetch<Response<WeeklyPlanList[]>>(
    "/api/weeklyplan/get-all-filter",
    options
  );

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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleApprove = (planId: string) => {
    handleChangeStatus(
      {
        id: planId,
        status: 1,
        type: "weeklyplan",
        author: "access",
      },
      refetch
    );
  };

  const handleDeny = (planId: string) => {
    handleChangeStatus(
      {
        id: planId,
        status: 2,
        type: "weeklyplan",
        author: "deny",
      },
      refetch
    );
  };

  const handleEdit = (data: WeeklyPlanRequest) => {
    setWeeklyPlan(data);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <Show>
        <Show.When isTrue={role !== "Staff"}>
          {weeklyplans?.data
            .filter((plan) => plan.processStatus.toLowerCase() === "processing")
            .map((plan) => (
              <WeeklyPlanItem
                key={plan.id}
                plan={plan}
                onApprove={() => handleApprove(plan.id)}
                onDeny={() => handleDeny(plan.id)}
                onEdit={() =>
                  handleEdit({
                    id: plan.id,
                    title: plan.title,
                    urlImage: plan.urlImage,
                    description: plan.description,
                    recipeIds: plan.recipePLans,
                  })
                }
                isStaff={false}
              />
            ))}
        </Show.When>
        <Show.Else>
          {weeklyplans?.data
            .filter((plan) => plan.processStatus.toLowerCase() === "denied")
            .map((plan) => (
              <WeeklyPlanItem
                key={plan.id}
                plan={plan}
                onApprove={() => handleApprove(plan.id)}
                onDeny={() => handleDeny(plan.id)}
                onEdit={() =>
                  handleEdit({
                    id: plan.id,
                    title: plan.title,
                    urlImage: plan.urlImage,
                    description: plan.description,
                    recipeIds: plan.recipePLans,
                  })
                }
                isStaff={true}
              />
            ))}
        </Show.Else>
      </Show>
      <DialogCustom
        className="max-w-5xl p-6 "
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <WeeklyPlanForm
            onClose={handleCloseDialog}
            refetch={refetch}
            onToast={handleToast}
            weeklyplan={weeklyplan}
          />
        }
      />
    </div>
    // <DataRender className="p-4" isLoading={loading} error={error}>
    // </DataRender>
  );
};

export default WeeklyPlanRequest;
