import axiosClient from "./axiosClient";

const itemApi = {
  create: (data) => axiosClient.post("/items", data),
  list: () => axiosClient.get("/items"),
};

export default itemApi;