const API_BASE = 'http://localhost:8080/api';

export interface XeDien {
  id: number;
  tenXe: string;
  bienSo: string;
  mauSac: string;
  trangThai: string;
  chuXeId: number;
  moTa?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const xeDienService = {
  // Lấy tất cả xe điện
  getAllXeDien: async (): Promise<XeDien[]> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien`);
      if (!response.ok) throw new Error('Không thể lấy danh sách xe điện');
      const data = await response.json();
      console.log('🚗 Danh sách xe điện từ API:', data);
      return data;
    } catch (error) {
      console.error('Lỗi getAllXeDien:', error);
      throw error;
    }
  },

  // Lấy xe điện theo ID
  getXeDienById: async (id: number): Promise<XeDien> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien/${id}`);
      if (!response.ok) throw new Error('Không thể lấy thông tin xe điện');
      return await response.json();
    } catch (error) {
      console.error('Lỗi getXeDienById:', error);
      throw error;
    }
  },

  // Lấy xe điện theo chủ xe
  getXeDienByChuXe: async (chuXeId: number): Promise<XeDien[]> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien/chu-xe/${chuXeId}`);
      if (!response.ok) throw new Error('Không thể lấy xe theo chủ xe');
      return await response.json();
    } catch (error) {
      console.error('Lỗi getXeDienByChuXe:', error);
      throw error;
    }
  },

  // Tạo xe điện mới
  createXeDien: async (xeDienData: Omit<XeDien, 'id'>): Promise<XeDien> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(xeDienData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Tạo xe điện thất bại");
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi createXeDien:', error);
      throw error;
    }
  },

  // Cập nhật xe điện
  updateXeDien: async (id: number, xeDienData: Partial<XeDien>): Promise<XeDien> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(xeDienData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Cập nhật xe điện thất bại");
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi updateXeDien:', error);
      throw error;
    }
  },

  // Xóa xe điện
  deleteXeDien: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Xóa xe điện thất bại");
      }
    } catch (error) {
      console.error('Lỗi deleteXeDien:', error);
      throw error;
    }
  }
};