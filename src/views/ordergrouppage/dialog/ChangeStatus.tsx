import React from "react";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "../../../components/ui";
import { OrderGroupApi } from "../../../features/order_group";

interface ChangeStatusProps {
  onClose: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
  orderGroupId: string;
  status: number;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({
  onClose,
  refetch,
  onToast,
  orderGroupId,
  status,
}) => {
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Change Status</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to change this order group status?
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          onClick={async () => {
            const response = await OrderGroupApi.changeStatusOrderGroup(
              orderGroupId,
              status
            );

            if (response.statusCode === 200) {
              onToast(true, response.message);
              refetch();
              onClose();
            } else {
              onToast(false, response.message);
            }
          }}
        >
          Confirm
        </Button>
      </AlertDialogFooter>
    </div>
  );
};

export default ChangeStatus;
