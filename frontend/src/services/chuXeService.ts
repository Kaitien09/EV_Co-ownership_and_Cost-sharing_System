const API_BASE = 'http://localhost:8080/api';

export interface ChuXe {
  id: number;
  tenChuXe: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  createdAt?: string;
  updatedAt?: string;
}

export const chuXeService = {
  getAllChuXe: async (): Promise<ChuXe[]> => {
    try {
      const response = await fetch(`${API_BASE}/chu-xe`);
      if (!response.ok) throw new Error('Không thể lấy danh sách chủ xe');
      const data = await response.json();
      console.log('👤 Danh sách chủ xe từ API:', data);
      return data;
    } catch (error) {
      console.error('Lỗi getAllChuXe:', error);
      throw error;
    }
  },

  getChuXeById: async (chuXeId: number): Promise<ChuXe> => {
    try {
      const response = await fetch(`${API_BASE}/chu-xe/${chuXeId}`);
      if (!response.ok) throw new Error('Không thể lấy thông tin chủ xe');
      return await response.json();
    } catch (error) {
      console.error('Lỗi getChuXeById:', error);
      throw error;
    }
  },

  getXeByChuXe: async (chuXeId: number): Promise<any[]> => {
    try {
      const response = await fetch(`${API_BASE}/chu-xe/${chuXeId}/xe`);
      if (!response.ok) throw new Error('Không thể lấy danh sách xe');
      return await response.json();
    } catch (error) {
      console.error('Lỗi getXeByChuXe:', error);
      throw error;
    }
  },

  updateChuXe: async (chuXeId: number, data: any): Promise<ChuXe> => {
    try {
      const response = await fetch(`${API_BASE}/chu-xe/${chuXeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Cập nhật thông tin thất bại");
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi updateChuXe:', error);
      throw error;
    }
  }
};