import DataRender from "@/components/data_render";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ScrollArea,
} from "@/components/ui";
import { OrderApi } from "@/features";
import useFetch from "@/hooks/useFetch";
import { formatFromISOString, FormatType } from "@/lib";
import Show from "@/lib/show";
import { OrderGroupList, Response } from "@/models/responses";
import { Trash2 } from "lucide-react";
import React from "react";

interface DetailOrderFormProps {
  id: string;
  onToast: (success: boolean, description: string) => void;
}

const DetailOrderForm: React.FC<DetailOrderFormProps> = ({ id, onToast }) => {
  const {
    data: ordergroup,
    loading,
    error,
    refetch,
  } = useFetch<Response<OrderGroupList>>(`/api/order-group/get-id/${id}`);

  return (
    <div className="w-full p-4">
      <Show>
        <Show.When
          isTrue={
            ordergroup?.data.orders.length === 0 ||
            ordergroup?.data.orders === undefined
          }
        >
          <div className="flex items-center justify-center size-full">
            <div className="text-center">
              <h3 className="text-lg font-semibold">No Orders</h3>
              <p className="text-gray-500">No orders have been added yet.</p>
            </div>
          </div>
        </Show.When>
        <Show.Else>
          <h2 className="mb-4 text-xl font-semibold">Order Group Details</h2>
          <ScrollArea className="h-96">
            <DataRender
              className={`w-full grid gap-4 ${
                ordergroup?.data.orders.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
              isLoading={loading}
              error={error}
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
                        {formatFromISOString(
                          order.orderDate,
                          FormatType.DATETIME
                        )}
                      </div>
                      <span className="font-semibold">Ship Date:</span>
                      <div>
                        {formatFromISOString(
                          order.shipDate,
                          FormatType.DATETIME
                        )}
                      </div>
                      <span className="font-semibold">Total Price:</span>
                      <div>${order.totalPrice.toFixed(2)}</div>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={async () => {
                        const response: Response<null> =
                          await OrderApi.removeInOrder(order.id);

                        if (response.statusCode === 200) {
                          onToast(true, response.message);
                          refetch();
                        }

                        if (response.statusCode !== 200) {
                          onToast(false, response.message);
                        }
                      }}
                    >
                      <Trash2 className="size-6" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </DataRender>
          </ScrollArea>
        </Show.Else>
      </Show>
    </div>
  );
};

export default DetailOrderForm;
