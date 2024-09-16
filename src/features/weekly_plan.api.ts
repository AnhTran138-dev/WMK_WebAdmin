import axios from "axios";
import { axiosInstance } from "../configs";
import { WeeklyPlanRequest } from "../models/requests/weekly_plan_request";
import { Response } from "../models/responses";

export const weeklyPlanApi = {
  createWeeklyPlan: async (
    data: WeeklyPlanRequest
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.post("/api/weeklyplan/create", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: error.response?.status || 500,
          message: error.response?.data.message || "Internal server error",
          data: null,
        };
      } else {
        return {
          statusCode: 500,
          message: "Internal server error",
          data: null,
        };
      }
    }
  },

  updateWeeklyPlan: async (
    id: string,
    data: WeeklyPlanRequest
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.put(
        `/api/weeklyplan/update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: error.response?.status || 500,
          message: error.response?.data.message || "Internal server error",
          data: null,
        };
      } else {
        return {
          statusCode: 500,
          message: "Internal server error",
          data: null,
        };
      }
    }
  },

  changeStatusWeeklyPlan: async (
    id: string,
    processStatus: number,
    note: string
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.put(
        `/api/weeklyplan/change-status/${id}`,
        { processStatus, notice: note }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: error.response?.status || 500,
          message: error.response?.data.message || "Internal server error",
          data: null,
        };
      } else {
        return {
          statusCode: 500,
          message: "Internal server error",
          data: null,
        };
      }
    }
  },

  deleteWeeklyPlan: async (id: string): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.delete(
        `/api/weeklyplan/delete/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: error.response?.status || 500,
          message: error.response?.data.message || "Internal server error",
          data: null,
        };
      } else {
        return {
          statusCode: 500,
          message: "Internal server error",
          data: null,
        };
      }
    }
  },
  changeOrder: async (status: boolean): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance.put<Response<null>>(
        `/api/weeklyplan/change-order/${status}`
      );
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          message: error.response?.data.message || error.message,
          statusCode: error.response?.data.statusCode,
        };
      } else {
        return {
          data: null,
          message: "An unexpected error occurred.",
          statusCode: 500,
        };
      }
    }
  },
};
