import React from "react";
import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "../../../components/ui";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { OrderApi } from "../../../features";
import { OrderStatus } from "../../../models/requests";

interface StatusAccessProps {
  editStatus?: { id: string; status: number };
  handleCloseDialog: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
}

const statusLabel = (status: number) => {
  switch (status) {
    case OrderStatus.Processing:
      return "Processing";
    case OrderStatus.Confirm:
      return "Confirm";
    case OrderStatus.Shipping:
      return "Shipping";
    case OrderStatus.Shipped:
      return "Shipped";
    case OrderStatus.UnShipped:
      return "UnShipped";
    case OrderStatus.Delivered:
      return "Delivered";
    case OrderStatus.Refund:
      return "Refund";
    case OrderStatus.Canceled:
      return "Canceled";
    default:
      return "Processing";
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
      editStatus!.id,
      editStatus!.status
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
        <AlertDialogTitle>Confirm change action</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        <div>
          Are you sure you want to change the status to{" "}
          <strong>{statusLabel(editStatus!.status)}</strong>?
        </div>
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={handleSubmit}>Save change</Button>
      </AlertDialogFooter>
    </div>
  );
};

export default StatusAccess;
