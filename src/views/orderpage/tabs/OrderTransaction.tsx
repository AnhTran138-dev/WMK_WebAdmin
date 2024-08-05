import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Transaction } from "../../../models/responses/order_detail";

interface OrderTransactionProps {
  transactions: Transaction[];
  orderCode: number;
}

const OrderTransaction: React.FC<OrderTransactionProps> = ({
  transactions,
  orderCode,
}) => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Transaction Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Transaction ID:</span>
                <span>{transaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Order ID:</span>
                <span>{orderCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Type:</span>
                <span>{transaction.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Amount:</span>
                <span>
                  {transaction.amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Transaction Date:</span>
                <span>
                  {new Date(transaction.transactionDate).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span>{transaction.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderTransaction;
