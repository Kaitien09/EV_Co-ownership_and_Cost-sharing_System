const API_BASE = 'http://localhost:8080/api';

export interface ChuXe {
  chuXeId: number;
  hoTen: string;
  sdt: string;
  diaChi?: string;
  ghiChu?: string;
  ngayThamGia?: string;
  nguoiDung?: {
    email: string;
  };
}

export interface Xe {
  xeId: number;
  model: string;
  bienSo: string;
  vin?: string;
  namSanXuat?: number;
  mauXe?: string;
  trangThai?: string;
  dungLuongPin?: number;
  quangDuongToiDa?: number;
  moTa?: string;
  hinhAnh?: string;
}

export interface PhieuDichVu {
  phieuDichVuId: number;
  ngayTao: string;
  trangThai: string;
  tongChiPhi?: number;
  moTa?: string;
  xe?: Xe;
  kyThuatVien?: {
    hoTen: string;
  };
  danhSachKiemTra?: string;
  ghiChuKyThuat?: string;
  ketQuaKiemTra?: string;
}

export interface LichSuSuDung {
  lichSuSuDungId: number;
  quangDuong: number;
  nangLuongTieuThu: number;
  thoiGianNhanXe: string;
  thoiGianTraXe: string;
  diemXuatPhat: string;
  diemDen: string;
  ghiChu: string;
  xe?: Xe;
}

// Helper function để lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Không parse được JSON, sử dụng message mặc định
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const khachHangVaXeService = {
  // ===== KHÁCH HÀNG (CHỦ XE) =====
  getChuXe: async (): Promise<ChuXe[]> => {
    try {
      const response = await fetch(`${API_BASE}/chu-xe`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách chủ xe:', error);
      throw error;
    }
  },

  getChuXeById: async (chuXeId: number): Promise<ChuXe> => {
    try {
      const response = await fetch(`${API_BASE}/chu-xe/${chuXeId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin chủ xe:', error);
      throw error;
    }
  },

  createChuXe: async (data: Omit<ChuXe, 'chuXeId'>): Promise<ChuXe> => {
    try {
      const response = await fetch(`${API_BASE}/chu-xe`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi tạo chủ xe:', error);
      throw error;
    }
  },

  // ===== XE ĐIỆN =====
  getXeDien: async (): Promise<Xe[]> => {
    try {
      console.log('Fetching xe dien from:', `${API_BASE}/xe-dien`);
      const response = await fetch(`${API_BASE}/xe-dien`, {
        headers: getAuthHeaders()
      });

      const data = await handleResponse(response);
      console.log('Xe dien data received:', data);
      return data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách xe điện:', error);
      throw error;
    }
  },

  getXeDienById: async (xeId: number): Promise<Xe> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien/${xeId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin xe điện:', error);
      throw error;
    }
  },

  createXeDien: async (data: Omit<Xe, 'xeId'>): Promise<Xe> => {
    try {
      const response = await fetch(`${API_BASE}/xe-dien`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi tạo xe điện:', error);
      throw error;
    }
  },

  // ===== PHIẾU DỊCH VỤ =====
  getPhieuDichVu: async (): Promise<PhieuDichVu[]> => {
    try {
      const response = await fetch(`${API_BASE}/phieu-dich-vu`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phiếu dịch vụ:', error);
      return [];
    }
  },

  getPhieuDichVuByXe: async (xeId: number): Promise<PhieuDichVu[]> => {
    try {
      // Có thể cần endpoint riêng hoặc lọc từ danh sách tổng
      const allPhieu = await khachHangVaXeService.getPhieuDichVu();
      return allPhieu.filter(phieu => phieu.xe?.xeId === xeId);
    } catch (error) {
      console.error('Lỗi khi lấy phiếu dịch vụ theo xe:', error);
      return [];
    }
  },

  getPhieuDichVuById: async (phieuId: number): Promise<PhieuDichVu> => {
    try {
      const response = await fetch(`${API_BASE}/phieu-dich-vu/${phieuId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin phiếu dịch vụ:', error);
      throw error;
    }
  },

  // ===== LỊCH SỬ SỬ DỤNG =====
  getLichSuSuDung: async (): Promise<LichSuSuDung[]> => {
    try {
      const response = await fetch(`${API_BASE}/lich-su-su-dung`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử sử dụng:', error);
      return [];
    }
  },

  getLichSuSuDungByXe: async (xeId: number): Promise<LichSuSuDung[]> => {
    try {
      const allLichSu = await khachHangVaXeService.getLichSuSuDung();
      return allLichSu.filter(lichSu => lichSu.xe?.xeId === xeId);
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử sử dụng theo xe:', error);
      return [];
    }
  },

  // ===== NHÓM ĐỒNG SỞ HỮU =====
  getNhomDongSoHuu: async (): Promise<any[]> => {
    try {
      const response = await fetch(`${API_BASE}/nhom`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhóm:', error);
      return [];
    }
  },

  getThanhVienByNhom: async (nhomId: number): Promise<any[]> => {
    try {
      const response = await fetch(`${API_BASE}/thanh-vien/nhom/${nhomId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi lấy thành viên nhóm:', error);
      return [];
    }
  },

  // ===== TÌM KIẾM =====
  searchChuXe: async (keyword: string): Promise<ChuXe[]> => {
    try {
      // Nếu có endpoint search
      const response = await fetch(`${API_BASE}/chu-xe/search?keyword=${encodeURIComponent(keyword)}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm chủ xe:', error);
      // Fallback: lọc thủ công
      try {
        const allChuXe = await khachHangVaXeService.getChuXe();
        return allChuXe.filter(chuXe =>
          chuXe.hoTen.toLowerCase().includes(keyword.toLowerCase()) ||
          chuXe.sdt.includes(keyword)
        );
      } catch {
        return [];
      }
    }
  },

  searchXeDien: async (keyword: string): Promise<Xe[]> => {
    try {
      // Nếu có endpoint search
      const response = await fetch(`${API_BASE}/xe-dien/search?keyword=${encodeURIComponent(keyword)}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm xe điện:', error);
      // Fallback: lọc thủ công
      try {
        const allXe = await khachHangVaXeService.getXeDien();
        return allXe.filter(xe =>
          xe.bienSo.toLowerCase().includes(keyword.toLowerCase()) ||
          xe.model.toLowerCase().includes(keyword.toLowerCase()) ||
          xe.vin?.toLowerCase().includes(keyword.toLowerCase())
        );
      } catch {
        return [];
      }
    }
  }
};