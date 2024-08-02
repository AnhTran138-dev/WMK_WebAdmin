import { axiosInstance } from "../configs";
import {
  UpdateWeeklyPlan,
  UpdateWeeklyPlanFull,
  WeeklyPlanRequest,
} from "../models/requests/weekly_plan_request";

export const weeklyPlanApi = {
  createWeeklyPlan: async (data: WeeklyPlanRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await axiosInstance.post("/api/weekly-plan/create", data);
  },

  updateWeeklyPlan: async (id: string, data: UpdateWeeklyPlan) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await axiosInstance.put(`/api/weekly-plan/update/${id}`, data);
  },

  updateWeeklyPlanFullInfo: async (id: string, data: UpdateWeeklyPlanFull) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await axiosInstance.put(`/api/weekly-plan/update-full-info/${id}`, data);
  },

  deleteWeeklyPlan: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/api/weekly-plan/delete/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  },
};
