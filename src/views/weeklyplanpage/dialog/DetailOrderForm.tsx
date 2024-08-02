import DataRender from "@/components/data_render";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { formatFromISOString, FormatType } from "@/lib";
import { OrderGroupList, Response } from "@/models/responses";
import { Trash2 } from "lucide-react";
import React from "react";

interface DetailOrderFormProps {
  id: string;
}

const DetailOrderForm: React.FC<DetailOrderFormProps> = ({ id }) => {
  const {
    data: ordergroup,
    loading,
    error,
  } = useFetch<Response<OrderGroupList>>(
    `/api/order-group/get-id?orderGroupId=${id}`
  );

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Order Group Details</h2>
      <DataRender isLoading={loading} error={error}>
        <div
          className={`grid gap-4 ${
            ordergroup?.data.orders.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {ordergroup?.data.orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row gap-5">
                <CardTitle className="flex">
                  <div>Order Code</div>
                  <strong className="ml-10">{order.orderCode}</strong>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="grid grid-cols-2 gap-4 p-4 rounded-md bg-gray-50">
                  <span className="font-semibold">Address:</span>
                  <div>{order.address}</div>
                  <span className="font-semibold">Order Date:</span>
                  <div>
                    {formatFromISOString(order.orderDate, FormatType.DATETIME)}
                  </div>
                  <span className="font-semibold">Ship Date:</span>
                  <div>
                    {formatFromISOString(order.shipDate, FormatType.DATETIME)}
                  </div>
                  <span className="font-semibold">Total Price:</span>
                  <div>${order.totalPrice.toFixed(2)}</div>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Trash2 className="size-6" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DataRender>
    </div>
  );
};

export default DetailOrderForm;
