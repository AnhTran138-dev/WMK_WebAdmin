import { DataTable } from "@/components/common/data_table";
import DataRender from "@/components/data_render";
import { useToast } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/models/responses";
import { OrderGroupList } from "@/models/responses/order_group_list";
import { useState } from "react";
import OrderGroupColumn from "./order_group_column";
import DialogCustom from "../../components/common/dialog";
import DetailOrderForm from "../weeklyplanpage/dialog/DetailOrderForm";
import OrderGroupForm from "../weeklyplanpage/dialog/OrderGroupForm";
import Show from "../../lib/show";
import ClusterForm from "../weeklyplanpage/dialog/ClusterForm";

const OrderGroupPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [orderGroupId, setOrderGroupId] = useState<string>("");

  const {
    data: orderGroup,
    loading,
    error,
    refetch,
  } = useFetch<Response<OrderGroupList[]>>("/api/order-group/get-all");

  const handleCluster = () => {
    setType("cluster");
    setIsDialogOpen(true);
  };

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
      <DataRender isLoading={loading} error={error}>
        <DataTable
          columns={OrderGroupColumn(
            handleToast,
            handleEdit,
            handleDetail,
            refetch
          )}
          data={orderGroup?.data || []}
          handleCreate={handleCreate}
          handleCluster={handleCluster}
        />
      </DataRender>
      <DialogCustom
        className="flex-grow flex-shrink p-6"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <Show>
            <Show.When isTrue={type === "detail"}>
              <DetailOrderForm id={orderGroupId} />
            </Show.When>
            <Show.When isTrue={type === "edit"}>
              <OrderGroupForm />
            </Show.When>
            <Show.When isTrue={type === "cluster"}>
              <ClusterForm />
            </Show.When>
          </Show>
        }
      />
    </div>
  );
};

export default OrderGroupPage;
