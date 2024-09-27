import useFetch from "@/hooks/useFetch";
import { OrderDetailDialog, Response } from "@/models/responses";
import React, { useState } from "react";

import DataRender from "@/components/data_render";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import GeneralInfoDetail from "../tabs/GeneralInfoDetail";
import OrderIngredientDetail from "../tabs/OrderIngredientDetail";
import OrderRecipeInfoDetail from "../tabs/OrderRecipeInfoDetail";
import OrderTransaction from "../tabs/OrderTransaction";

interface OrderDetailProps {
  id: string;
  onClose: () => void;
  refetch: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ id, onClose, refetch }) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const {
    data: order,
    loading,
    error,
    refetch: refetchOrder,
  } = useFetch<Response<OrderDetailDialog>>(`/api/order/get-order/${id}`);

  if (!order?.data) {
    return (
      <DataRender isLoading={loading} error={error}>
        Order not found
      </DataRender>
    );
  }

  const orderData = {
    receiveName: order.data.receiveName,
    receivePhone: order.data.receivePhone,
    note: order.data.note,
    address: order.data.address,
    img: order.data.img,
    shipDate: order.data.shipDate,
    orderDate: order.data.orderDate,
    totalPrice: order.data.totalPrice,
    status: order.data.status,
    weeklyPlan: order.data.weeklyPlan,
    feedBacks: order.data.feedBacks,
    message: order.data.message,
  };

  return (
    <DataRender isLoading={loading} error={error}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <AlertDialogHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <AlertDialogTitle>Order - {order.data.orderCode}</AlertDialogTitle>
            <TabsList>
              <TabsTrigger value="general">General Info</TabsTrigger>
              <TabsTrigger value="recipe">Recipe Info</TabsTrigger>
              <TabsTrigger value="ingredent">Ingredent Info</TabsTrigger>
              <TabsTrigger value="transactions">Transactions Info</TabsTrigger>
            </TabsList>
          </div>
          <AlertDialogDescription>
            <TabsContent value="general">
              <GeneralInfoDetail data={orderData} />
            </TabsContent>
            <TabsContent value="recipe">
              <OrderRecipeInfoDetail data={order.data.orderDetails} />
            </TabsContent>
            <TabsContent value="ingredent">
              <OrderIngredientDetail orderDetail={order.data.orderDetails} />
            </TabsContent>
            <TabsContent value="transactions">
              <OrderTransaction
                statusOrder={order.data.status}
                transactions={order.data.transaction}
                onClose={onClose}
                orderId={order.data.id}
                refetch={refetch}
                refetchOrder={refetchOrder}
              />
            </TabsContent>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3 space-x-2">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </Tabs>
    </DataRender>
  );
};

export default OrderDetail;
