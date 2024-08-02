import { DataTable } from "@/components/common/data_table";
import DataRender from "@/components/data_render";
import { useToast } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/models/responses";
import { OrderList } from "@/models/responses/order_list";
import { useState } from "react";
import OrderColum from "./order_column";

const OrderPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const {
    data: orders,
    loading,
    error,
    refetch,
  } = useFetch<Response<OrderList[]>>("/api/order/get-all");

  const handleToast = (success: boolean, description: string) => {
    if (success) {
      toast({
        title: "success",
        description: description,
      });
      refetch();
    } else {
      toast({
        title: "error",
        description: description,
      });
    }
  };

  const handleDetail = (id: string) => {
    setOrderGroupId(id);
  };

  const handleCreate = () => {
    setType("edit");
    setIsDialogOpen(true);
  };

  const handleEdit = (type: string) => {
    setType(type);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable columns={OrderColum()} data={orders?.data ?? []} />
      </DataRender>
    </div>
  );
};

export default OrderPage;
