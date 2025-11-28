const API_BASE = 'http://localhost:8080/api';

export interface DatLich {
  id?: number;
  xeId?: number;
  chuXeId?: number;
  xe?: { id: number };
  chuXe?: { id: number };
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  trangThai: string;
  ghiChu?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const datLichService = {
  // === ĐẶT LỊCH ===
  getAllDatLich: async (): Promise<DatLich[]> => {
    const response = await fetch(`${API_BASE}/dat-lich`);
    if (!response.ok) throw new Error('Không thể lấy danh sách đặt lịch');
    return response.json();
  },

  getDatLichById: async (id: number): Promise<DatLich> => {
    const response = await fetch(`${API_BASE}/dat-lich/${id}`);
    if (!response.ok) throw new Error('Không thể lấy thông tin đặt lịch');
    return response.json();
  },

  getDatLichByChuXe: async (chuXeId: number): Promise<DatLich[]> => {
    const response = await fetch(`${API_BASE}/dat-lich/chu-xe/${chuXeId}`);
    if (!response.ok) throw new Error('Không thể lấy đặt lịch theo chủ xe');
    return response.json();
  },

  getDatLichByXe: async (xeId: number): Promise<DatLich[]> => {
    const response = await fetch(`${API_BASE}/dat-lich/xe/${xeId}`);
    if (!response.ok) throw new Error('Không thể lấy đặt lịch theo xe');
    return response.json();
  },

  getDatLichByTrangThai: async (trangThai: string): Promise<DatLich[]> => {
    const response = await fetch(`${API_BASE}/dat-lich/trang-thai/${trangThai}`);
    if (!response.ok) throw new Error('Không thể lấy đặt lịch theo trạng thái');
    return response.json();
  },

  getDatLichSapToiByChuXe: async (chuXeId: number): Promise<DatLich[]> => {
    const response = await fetch(`${API_BASE}/dat-lich/chu-xe/${chuXeId}/sap-toi`);
    if (!response.ok) throw new Error('Không thể lấy đặt lịch sắp tới');
    return response.json();
  },

  createDatLich: async (datLichData: Omit<DatLich, 'id'>): Promise<DatLich> => {
    const response = await fetch(`${API_BASE}/dat-lich`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datLichData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Tạo đặt lịch thất bại");
    }
    return response.json();
  },

  updateTrangThaiDatLich: async (id: number, trangThai: string): Promise<DatLich> => {
    const response = await fetch(`${API_BASE}/dat-lich/${id}/trang-thai?trangThai=${trangThai}`, {
      method: "PUT",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Cập nhật trạng thái thất bại");
    }
    return response.json();
  },

  huyDatLich: async (id: number): Promise<DatLich> => {
    const response = await fetch(`${API_BASE}/dat-lich/${id}/huy`, {
      method: "PUT",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Hủy đặt lịch thất bại");
    }
    return response.json();
  },

  deleteDatLich: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/dat-lich/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Xóa đặt lịch thất bại");
    }
  },

  getThongKeDatLich: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/dat-lich/thong-ke`);
    if (!response.ok) throw new Error('Không thể lấy thống kê đặt lịch');
    return response.json();
  },

  kiemTraTrungLich: async (xeId: number, start: string, end: string): Promise<boolean> => {
    const params = new URLSearchParams({
      xeId: xeId.toString(),
      start: start,
      end: end
    });
    const response = await fetch(`${API_BASE}/dat-lich/kiem-tra-trung-lich?${params}`);
    if (!response.ok) {
      throw new Error("Kiểm tra trùng lịch thất bại");
    }
    return response.json();
  }
};