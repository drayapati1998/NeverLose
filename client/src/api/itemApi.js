import axiosClient from "./axiosClient";

const itemApi = {
  create: (data) => axiosClient.post("/api/items", data),
 list: async () => {
  const res = await axiosClient.get("api/items");
  return res.data; 
},

};

export default itemApi;