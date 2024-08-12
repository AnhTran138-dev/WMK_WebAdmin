import { useState } from "react";
import { DataTable } from "../../components/common/data_table";
import DialogCustom from "../../components/common/dialog";
import DataRender from "../../components/data_render";
import useFetch from "../../hooks/useFetch";
import { Response } from "../../models/responses";
import { WeeklyPlanList } from "../../models/responses/weekly_plan";
import WeeklyPlanColumn from "./weekly_plan_column";
import WeeklyPlanForm from "./dialog/weekly_plan_form";
import { useToast } from "../../components/ui";
import { WeeklyPlanRequest } from "../../models/requests";
import Show from "../../lib/show";
import DeleteWeeklyPlan from "./dialog/delete_weekly_plan";
import DetailWeeklyPlan from "./dialog/detail_weekly_plan";

const WeeklyPlanPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [weeklyPlanEdit, setWeeklyPlanEdit] =
    useState<WeeklyPlanRequest | null>(null);
  const {
    data: weeklyplans,
    loading,
    error,
    refetch,
  } = useFetch<Response<WeeklyPlanList[]>>("/api/weeklyplan/get-all-filter");

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

  return (
    <div>
      {/* <DataRender className="my-4 h-fit" isLoading={loading} error={error}> */}
      <DataTable
        columns={WeeklyPlanColumn(handleEdit, handleID, handleType)}
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
            <Show.When isTrue={type === "detail"}>
              <DetailWeeklyPlan id={id} />
            </Show.When>
          </Show>
        }
      />
    </div>
  );
};

export default WeeklyPlanPage;
