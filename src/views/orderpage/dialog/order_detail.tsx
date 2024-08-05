import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { OrderDetailDialog, Response } from "../../../models/responses";

import DataRender from "../../../components/data_render";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui";
import GeneralInfoDetail from "../tabs/GeneralInfoDetail";
import OrderRecipeInfoDetail from "../tabs/OrderRecipeInfoDetail";
import OrderTransaction from "../tabs/OrderTransaction";
import OrderIngredientDetail from "../tabs/OrderIngredientDetail";

interface OrderDetailProps {
  id: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const {
    data: order,
    loading,
    error,
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
  };

  return (
    <DataRender isLoading={loading} error={error}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <AlertDialogHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <AlertDialogTitle>Code - {order.data.orderCode}</AlertDialogTitle>
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
                transactions={order.data.transactions}
                orderCode={order.data.orderCode}
              />
            </TabsContent>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </Tabs>
    </DataRender>
  );
};

export default OrderDetail;
