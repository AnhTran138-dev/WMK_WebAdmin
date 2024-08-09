import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@/components/ui";
import { transactionApi } from "@/features";
import { TransactionRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import React from "react";

interface ConfimRefundProps {
  onClose: () => void;
  transaction: TransactionRequest;
  onToast: (success: boolean, description: string) => void;
  refetch: () => void;
}

const ConfimRefund: React.FC<ConfimRefundProps> = ({
  onClose,
  onToast,
  transaction,
  refetch,
}) => {
  const handleRefund = async () => {
    const response: Response<null> = await transactionApi.refundTransaction(
      transaction
    );

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
        <AlertDialogTitle>
          Are you sure you want to refund this transaction?
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={handleRefund}>Refund</Button>
      </AlertDialogFooter>
    </div>
  );
};

export default ConfimRefund;
