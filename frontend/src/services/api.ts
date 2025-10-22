import axios from "axios";
import type { IAMUser, IAMFinding } from "../types/iam";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const iamApi = {
  listUsers: async (): Promise<IAMUser[]> => {
    const res = await axios.get(`${API_BASE}/api/list-users`);
    return res.data.Users || [];
  },

  runAssessment: async (): Promise<IAMFinding[]> => {
    const res = await axios.get(`${API_BASE}/api/run-assessment`);
    return res.data || [];
  },

  getReportDownloadUrl: (): string => {
    return `${API_BASE}/api/download-report`;
  },
};
