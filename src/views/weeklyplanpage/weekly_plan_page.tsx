import { DataTable } from "@/components/common/data_table";
import DialogCustom from "@/components/common/dialog";
import { useToast } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import { WeeklyPlanRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { WeeklyPlanList } from "@/models/responses/weekly_plan";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteWeeklyPlan from "./dialog/delete_weekly_plan";
import WeeklyPlanForm from "./dialog/weekly_plan_form";
import WeeklyPlanColumn from "./weekly_plan_column";

const WeeklyPlanPage = () => {
  const { toast } = useToast();
  const navigation = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [weeklyPlanEdit, setWeeklyPlanEdit] =
    useState<WeeklyPlanRequest | null>(null);
  const { data: weeklyplans, refetch } = useFetch<Response<WeeklyPlanList[]>>(
    "/api/weeklyplan/get-all-filter"
  );

  const handleCreate = () => {
    setType("edit");
    setIsDialogOpen(true);
    setWeeklyPlanEdit(null);
  };

  const handleEdit = (weeklyPlan: WeeklyPlanRequest) => {
    setType("edit");
    setIsDialogOpen(true);
    setWeeklyPlanEdit(weeklyPlan);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleID = (id: string) => {
    setId(id);
    setIsDialogOpen(true);
  };

  const handleType = (type: string) => {
    setType(type);
  };

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

  const handleDetail = (id: string) => {
    navigation(`/weekly-plan/${id}`);
  };

  useEffect(() => {
    const newValue = weeklyplans?.data?.every(
      (weeklyphan) => weeklyphan.baseStatus === "Approved"
    );
    console.log(newValue);
  }, [weeklyplans]);

  return (
    <div>
      {/* <DataRender className="my-4 h-fit" isLoading={loading} error={error}> */}
      <DataTable
        columns={WeeklyPlanColumn(
          handleEdit,
          handleID,
          handleType,
          handleDetail
        )}
        data={weeklyplans?.data ?? []}
        searchColumn="title"
        handleCreate={handleCreate}
      />
      {/* </DataRender> */}
      <DialogCustom
        className="max-w-4xl"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <Show>
            <Show.When isTrue={type === "edit"}>
              <WeeklyPlanForm
                onClose={handleCloseDialog}
                onToast={handleToast}
                refetch={refetch}
                weeklyplan={weeklyPlanEdit}
              />
            </Show.When>
            <Show.When isTrue={type === "delete"}>
              <DeleteWeeklyPlan
                id={id}
                onClose={handleCloseDialog}
                onToast={handleToast}
              />
            </Show.When>
            {/* <Show.When isTrue={type === "detail"}>
              <DetailWeeklyPlan id={id} />
            </Show.When> */}
          </Show>
        }
      />
    </div>
  );
};

export default WeeklyPlanPage;
