import React from "react";
import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
} from "../../../components/ui";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { OrderApi } from "../../../features";

interface StatusAccessProps {
  editStatus: { id: string; status: number };
  handleCloseDialog: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
}

const statusLabel = (status: number) => {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Shipping";
    case 5:
      return "Refund";
    case 6:
      return "Canceled";
    default:
      return "Unknown";
  }
};

const StatusAccess: React.FC<StatusAccessProps> = ({
  editStatus,
  handleCloseDialog,
  refetch,
  onToast,
}) => {
  const handleSubmit = async () => {
    const respone = await OrderApi.changeOrderStatus(
      editStatus.id,
      editStatus.status
    );

    if (respone.statusCode === 200) {
      handleCloseDialog();
      refetch();
      onToast(true, respone.message);
    }

    if (respone.statusCode === 400) {
      onToast(false, respone.message);
    }

    if (respone.statusCode === 500) {
      onToast(false, respone.message);
    }
  };

  return (
    <div>
      <AlertDialogHeader>
        <h1 className="text-lg font-bold">Change status</h1>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to change the status to{" "}
        <strong>{statusLabel(editStatus.status)}</strong>?
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={handleSubmit}>Save change</Button>
      </AlertDialogFooter>
    </div>
  );
};

export default StatusAccess;
