import DialogCustom from "@/components/common/dialog";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  useToast,
} from "@/components/ui";
import Show from "@/lib/show";
import { TransactionRequest } from "@/models/requests";
import { Transaction } from "@/models/responses/order_detail";
import { CircleDollarSign } from "lucide-react";
import React from "react";
import ConfimRefund from "../../ordergrouppage/dialog/ConfimRefund";

interface OrderTransactionProps {
  transactions: Transaction;
  orderId: string;
  onClose: () => void;
  refetch: () => void;
  refetchOrder: () => void;
}

const OrderTransaction: React.FC<OrderTransactionProps> = ({
  transactions,
  orderId,
  refetch,
  refetchOrder,
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [transaction, setTransaction] = React.useState<TransactionRequest>({
    idOrder: "",
    idTransaction: "",
    zpTransId: "",
    description: "",
  });

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleRefund = async (tranaction: TransactionRequest) => {
    setTransaction(tranaction);
    setIsDialogOpen(true);
  };

  const handleToast = (success: boolean, description: string) => {
    if (success) {
      toast({
        title: "success",
        description: description,
      });
    } else {
      toast({
        title: "error",
        description: description,
      });
    }
  };

  return (
    <div className="space-y-4">
      <ScrollArea className=" h-96">
        <Card
          key={transactions.id}
          className="mb-2 border border-gray-200 shadow-sm"
        >
          <CardHeader className="flex flex-row items-baseline justify-between w-full">
            <CardTitle className="text-lg font-medium">
              Transaction Details
            </CardTitle>
            <Show>
              <Show.When
                isTrue={transactions.status === "RefundZaloPayPending"}
              >
                <Button
                  onClick={() =>
                    handleRefund({
                      idOrder: orderId,
                      idTransaction: transactions.id,
                      zpTransId: transactions.signature ?? "",
                      description: "REFUND1",
                    })
                  }
                >
                  <CircleDollarSign /> &nbsp; Refund
                </Button>
              </Show.When>
            </Show>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Transaction ID:</span>
                <span>{transactions.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Type:</span>
                <span>{transactions.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Amount:</span>
                <span>
                  {transactions.amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Transactions Date:</span>
                <span>
                  {new Date(transactions.transactionDate).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span>{transactions.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleClose}
        children={
          <ConfimRefund
            transaction={transaction}
            onClose={handleClose}
            onToast={handleToast}
            refetch={refetch}
            reftetchOrder={refetchOrder}
          />
        }
      />
    </div>
  );
};

export default OrderTransaction;
