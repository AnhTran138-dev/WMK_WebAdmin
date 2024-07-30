import { axiosInstance } from "../configs";
import { OrderRequest } from "../models/requests/order";

export const OrderApi = {
  getOrderList: () => axiosInstance.get("/api/order/get-all"),

  getOrderById: (Id: string) => axiosInstance.get(`/api/order/get-order/${Id}`),

  createOrder: (data: OrderRequest) =>
    axiosInstance.post("/api/order/create-new", data),

  updateOrder: (id: string, data: OrderRequest) =>
    axiosInstance.put(`/api/order/update/${id}`, data),

  changeOrderStatus: (Id: string, Status: number) =>
    axiosInstance.put(`/api/order/change-status`, { Id, Status }),

  deleteOrder: (id: string) => axiosInstance.delete(`/api/order/delete/${id}`),
};
