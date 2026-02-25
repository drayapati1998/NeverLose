import axios from "./axiosClient";

export const reportsApi = {
  list: (itemId) => axios.get(`/api/reports/${itemId}`),
  detail: (reportId) => axios.get(`/api/reports/detail/${reportId}`),
  updateStatus: (reportId, status) =>
    axios.post(`/reports/detail/${reportId}/status`, { status })
};