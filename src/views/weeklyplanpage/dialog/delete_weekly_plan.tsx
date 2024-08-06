import React from "react";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "../../../components/ui";
import { weeklyPlanApi } from "../../../features/weekly_plan.api";

interface DeleteWeeklyPlanProps {
  id: string;
  onClose: () => void;
  onToast: (success: boolean, description: string) => void;
}

const DeleteWeeklyPlan: React.FC<DeleteWeeklyPlanProps> = ({
  id,
  onClose,
  onToast,
}) => {
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Weekly Plan</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to delete this weekly plan?
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          onClick={async () => {
            const response = await weeklyPlanApi.deleteWeeklyPlan(id);

            if (response.statusCode === 200) {
              onToast(true, "Delete weekly plan successfully");
              onClose();
            } else {
              onToast(false, "Delete weekly plan failed");
            }
          }}
        >
          Confirm
        </Button>
      </AlertDialogFooter>
    </div>
  );
};

export default DeleteWeeklyPlan;
