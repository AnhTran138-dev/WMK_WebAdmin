import axios from "axios";
import { axiosInstance } from "../configs";
import { WeeklyPlanRequest } from "../models/requests/weekly_plan_request";
import { Response } from "../models/responses";

export const weeklyPlanApi = {
  createWeeklyPlan: async (data: WeeklyPlanRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await axiosInstance.post("/api/weekly-plan/create", data);
  },

  updateWeeklyPlan: async (id: string, data: WeeklyPlanRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await axiosInstance.put(`/api/weekly-plan/update/${id}`, data);
  },

  updateWeeklyPlanFullInfo: async (id: string, data: WeeklyPlanRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await axiosInstance.put(`/api/weekly-plan/update-full-info/${id}`, data);
  },

  changeStatusWeeklyPlan: async (
    id: string,
    processStatus: number,
    note: string
  ): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axiosInstance.put(
        `/api/weekly-plan/change-status/${id}`,
        { processStatus, note }
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
};
