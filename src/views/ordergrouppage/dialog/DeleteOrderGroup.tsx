import React from "react";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "../../../components/ui";
import { OrderApi } from "../../../features";

interface DeleteOrderGroupProps {
  onClose: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
  orderGroupId: string;
}

const DeleteOrderGroup: React.FC<DeleteOrderGroupProps> = ({
  orderGroupId,
  onClose,
  refetch,
  onToast,
}) => {
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Order Group</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this order group?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          onClick={async () => {
            const response = await OrderApi.deleteOrder(orderGroupId);

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

export default DeleteOrderGroup;
