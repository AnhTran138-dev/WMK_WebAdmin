import { DataTable } from "../../components/common/data_table";
import DataRender from "../../components/data_render";
import useFetch from "../../hooks/useFetch";
import { Response } from "../../models/responses";
import { OrderList } from "../../models/responses/order_list";
import OrderColum from "./order_column";

const OrderPage = () => {
  const {
    data: orders,
    loading,
    error,
  } = useFetch<Response<OrderList[]>>("/api/order/get-all");


  return (
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable columns={OrderColum()} data={orders?.data ?? []} />
      </DataRender>
    </div>
  );
};

export default OrderPage;
