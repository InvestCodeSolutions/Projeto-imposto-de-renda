import api from "./api";
import { AssetType } from "../types/asset";

export const assetService = {
  listAssets: async (params?: {
    type?: AssetType;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get("/bens", { params });
    return response.data;
  },

  getAsset: async (id: string) => {
    const response = await api.get(`/bens/${id}`);
    return response.data;
  },

  createAsset: async (data: FormData) => {
    const response = await api.post("/bens", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateAsset: async (id: string, data: FormData) => {
    const response = await api.put(`/bens/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteAsset: async (id: string) => {
    await api.delete(`/bens/${id}`);
  },

  analyzeAsset: async (id: string) => {
    const response = await api.get(`/bens/${id}/analysis`);
    return response.data;
  },
};
