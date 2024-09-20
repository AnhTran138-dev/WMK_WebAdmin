import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { weeklyPlanApi } from "@/features/weekly_plan.api";
import React from "react";

interface ChangeOrderStatusProps {
  status: boolean;
  onToast: (success: boolean, description: string) => void;
  onClose: () => void;
  refetch: () => void;
}

const ChangeOrderStatus: React.FC<ChangeOrderStatusProps> = ({
  status,
  onClose,
  onToast,
  refetch,
}) => {
  const handleChangeStatus = async (changeStatus: boolean) => {
    const response = await weeklyPlanApi.changeOrder(changeStatus);
    if (response.statusCode === 200) {
      onToast(true, response.message);
      onClose();
      refetch();
    } else {
      onToast(false, response.message);
    }
  };
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Change Order Status</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to{" "}
        <span className="font-semibold uppercase">
          {status ? "open" : "close"}
        </span>{" "}
        the order status to be{" "}
        <span className="font-semibold uppercase">
          {status ? "active" : "inactive"}
        </span>
        ?
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => handleChangeStatus(status)}>
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  );
};

export default ChangeOrderStatus;
