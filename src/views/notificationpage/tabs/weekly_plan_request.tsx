import React, { useMemo, useState } from "react";
import DialogCustom from "@/components/common/dialog";
import { useToast } from "@/components/ui";
import { useDebounce } from "@/hooks";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import type { WeeklyPlanRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import { SelectType } from "../notification_page";
import WeeklyPlanItem from "./weekly_plan_item";
import WeeklyPlanForm from "../../weeklyplanpage/dialog/weekly_plan_form";
import { AlertCircle } from "lucide-react";

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

  const { data: weeklyplans, refetch } = useFetch<Response<WeeklyPlanList[]>>(
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

  const weeklyPlanRequest = weeklyplans?.data.filter((wps) => {
    if (role === "Staff") {
      return wps.processStatus.toLowerCase() === "denied";
    } else {
      return wps.processStatus.toLowerCase() === "processing";
    }
  });

  return (
    <div>
      {weeklyplans === undefined || weeklyPlanRequest?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-10">
          <AlertCircle className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-lg font-medium text-center text-gray-500">
            No Weekly Plan Request Found
          </p>
        </div>
      ) : (
        <Show>
          <Show.When isTrue={role !== "Staff"}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {weeklyplans?.data
                .filter(
                  (plan) => plan.processStatus.toLowerCase() === "processing"
                )
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
            </div>
          </Show.When>
          <Show.Else>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            </div>
          </Show.Else>
        </Show>
      )}
      <DialogCustom
        className="max-w-5xl p-6"
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
  );
};

export default WeeklyPlanRequest;
