import axios from "axios";
import { Response } from "../models/responses";
import { TransactionRequest } from "../models/requests";
import { axiosInstance } from "../configs";

export const transactionApi = {
  refundTransaction: async (
    data: TransactionRequest
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.post<Response<null>>(
        "/api/transaction/refund-zalopay",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          message: error.response?.data.message || "An error occurred",
          statusCode: error.response?.status || 500,
        };
      } else {
        return {
          data: null,
          message: "An error occurred",
          statusCode: 500,
        };
      }
    }
  },
};
