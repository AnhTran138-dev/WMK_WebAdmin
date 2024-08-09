import React from "react";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "../../../components/ui";
import { Response } from "../../../models/responses";
import { OrderGroupApi } from "../../../features/order_group";

interface ResetAllGroupProps {
  onClose: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
}

const ResetAllGroup: React.FC<ResetAllGroupProps> = ({
  onClose,
  refetch,
  onToast,
}) => {
  const handleReset = async () => {
    const response: Response<null> = await OrderGroupApi.resetAllOrder();

    if (response.statusCode === 200) {
      onToast(true, response.message);
      refetch();
      onClose();
    } else {
      onToast(false, response.message);
    }
  };
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Reset All Group</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to reset all group?
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={handleReset}>Confirm</Button>
      </AlertDialogFooter>
    </div>
  );
};

export default ResetAllGroup;
