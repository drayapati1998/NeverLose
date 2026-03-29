import axiosClient from "./axiosClient";

const itemApi = {
  create: (data) => axiosClient.post("/api/items", data),
  updateItem: (itemId, data) =>
  axiosClient.put(`/api/items/${itemId}`, data),
 list: async () => {
  const res = await axiosClient.get("api/items");
  return res.data; 
},
deleteItem: async(itemId)=>
{
  axiosClient.delete(`/items/${itemId}`);
},
getItemById: async (itemId) => {
  const res = await axiosClient.get(`api/items/owner/${itemId}`);
  return res.data; 
},

};

export default itemApi;