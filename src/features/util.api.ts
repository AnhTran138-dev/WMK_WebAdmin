import { axiosInstance } from "../configs";

export const utilApi = {
  uploadFile: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post<string>(
        "/api/util/UploadFile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
