import axios from "axios";

const API_URL = "http://localhost:8080/api"; // sửa theo backend Spring Boot

export const getQuyChung = () => {
  return axios.get<{ sodu: number }>(`${API_URL}/quy-chung?nhomId=1`);
};

export const getChiPhi = () => {
  return axios.get<
    { id: number; tenChiPhi: string; soTien: number; ngay: string }[]
  >(`${API_URL}/chi-phi?nhomId=1`);
};
