const API_BASE = 'http://localhost:8080/api';

export interface YeuCauDichVu {
  yeuCauId: number;
  khachHangId: number;
  xeId: number;
  loaiDichVu: 'BAO_DUONG' | 'KIEM_TRA' | 'THAY_THE_PHU_TUNG' | 'SUA_CHUA' | 'KHAC';
  moTa: string;
  thoiGianYeuCau: string;
  thoiGianDuKien: string;
  uuTien: 'CAO' | 'TRUNG_BINH' | 'THAP';
  trangThai: 'CHO_XAC_NHAN' | 'DA_XAC_NHAN' | 'DA_TU_CHOI' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY';
  ghiChu?: string;
  khachHang?: ChuXe;
  xe?: XeDien;
}

export interface KyThuatVien {
  ktvId: number;
  hoTen: string;
  sdt: string;
  email: string;
  chuyenMon: string[];
  caLamViec: 'SANG' | 'CHIEU' | 'TOI' | 'FULLTIME';
  trangThai: 'SAN_SANG' | 'BAN' | 'NGHI';
  soCongViecHienTai: number;
}

export interface LichTrinhKTV {
  lichTrinhId: number;
  ktvId: number;
  yeuCauId: number;
  thoiGianBatDau: string;
  thoiGianKetThuc?: string;
  trangThai: 'CHO' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY';
  ghiChu?: string;
  kyThuatVien?: KyThuatVien;
  yeuCau?: YeuCauDichVu;
}

export interface PhieuTiepNhan {
  phieuId: number;
  soPhieu: string;
  yeuCauId: number;
  ktvId: number;
  ngayTiepNhan: string;
  trangThai: 'DA_PHAN_CONG' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY';
  tongChiPhi?: number;
  ghiChu?: string;
  yeuCau?: YeuCauDichVu;
  kyThuatVien?: KyThuatVien;
}

export interface ChecklistEV {
  checklistId: number;
  phieuId: number;
  kiemTraPin: boolean;
  kiemTraLop: boolean;
  kiemTraDen: boolean;
  kiemTraPhanh: boolean;
  kiemTraDieuHoa: boolean;
  kiemTraHeThongDien: boolean;
  diemDanhGia: number;
  ghiChu?: string;
  ngayKiemTra: string;
}

// Interfaces từ file cũ (cần import hoặc định nghĩa lại)
export interface ChuXe {
  chuXeId: number;
  cccd: string;
  diaChi: string;
  gplx: string;
  hoTen: string;
  sdt: string;
  nguoiDungId: number;
  gplxAnh: string;
}

export interface XeDien {
  xeId: number;
  bienSo: string;
  dungLuongPin: number;
  hinhAnh: string;
  mauXe: string;
  moTa: string;
  model: string;
  namSanXuat: number;
  quangDuongToiDa: number;
  trangThai: 'BAO_TRI' | 'DANG_SU_DUNG' | 'NGUNG_HOAT_DONG' | 'SAN_SANG' | 'SUA_CHUA';
  vin: string;
}

export const lichHenService = {
  // ========== YÊU CẦU DỊCH VỤ ==========

  // Lấy tất cả yêu cầu dịch vụ
  getAllYeuCau: async (): Promise<YeuCauDichVu[]> => {
    const res = await fetch(`${API_BASE}/yeu-cau?includeKhachHang=true&includeXe=true`);
    if (!res.ok) throw new Error('Không thể lấy danh sách yêu cầu');
    return res.json();
  },

  // Lấy yêu cầu theo trạng thái
  getYeuCauByStatus: async (trangThai: string): Promise<YeuCauDichVu[]> => {
    const res = await fetch(`${API_BASE}/yeu-cau/trang-thai/${trangThai}?includeKhachHang=true&includeXe=true`);
    if (!res.ok) throw new Error('Không thể lấy yêu cầu theo trạng thái');
    return res.json();
  },

  // Tạo yêu cầu mới
  createYeuCau: async (yeuCau: Partial<YeuCauDichVu>): Promise<YeuCauDichVu> => {
    const res = await fetch(`${API_BASE}/yeu-cau`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(yeuCau),
    });
    if (!res.ok) throw new Error('Tạo yêu cầu thất bại');
    return res.json();
  },

  // Cập nhật trạng thái yêu cầu
  updateTrangThaiYeuCau: async (yeuCauId: number, trangThai: string): Promise<YeuCauDichVu> => {
    const res = await fetch(`${API_BASE}/yeu-cau/${yeuCauId}/trang-thai`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trangThai }),
    });
    if (!res.ok) throw new Error('Cập nhật trạng thái thất bại');
    return res.json();
  },

  // ========== KỸ THUẬT VIÊN ==========

  // Lấy tất cả kỹ thuật viên
  getAllKyThuatVien: async (): Promise<KyThuatVien[]> => {
    const res = await fetch(`${API_BASE}/ky-thuat-vien`);
    if (!res.ok) throw new Error('Không thể lấy danh sách kỹ thuật viên');
    return res.json();
  },

  // Lấy kỹ thuật viên theo ID
  getKyThuatVienById: async (ktvId: number): Promise<KyThuatVien> => {
    const res = await fetch(`${API_BASE}/ky-thuat-vien/${ktvId}`);
    if (!res.ok) throw new Error('Không tìm thấy kỹ thuật viên');
    return res.json();
  },

  // Lấy lịch trình của kỹ thuật viên
  getLichTrinhKTV: async (ktvId: number): Promise<LichTrinhKTV[]> => {
    const res = await fetch(`${API_BASE}/ky-thuat-vien/${ktvId}/lich-trinh?includeYeuCau=true`);
    if (!res.ok) throw new Error('Không thể lấy lịch trình');
    return res.json();
  },

  // Phân công công việc cho KTV
  phanCongCongViec: async (ktvId: number, yeuCauId: number, thoiGianBatDau: string): Promise<LichTrinhKTV> => {
    const res = await fetch(`${API_BASE}/ky-thuat-vien/${ktvId}/phan-cong`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yeuCauId, thoiGianBatDau }),
    });
    if (!res.ok) throw new Error('Phân công công việc thất bại');
    return res.json();
  },

  // Cập nhật trạng thái lịch trình
  updateTrangThaiLichTrinh: async (lichTrinhId: number, trangThai: string): Promise<LichTrinhKTV> => {
    const res = await fetch(`${API_BASE}/lich-trinh/${lichTrinhId}/trang-thai`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trangThai }),
    });
    if (!res.ok) throw new Error('Cập nhật trạng thái lịch trình thất bại');
    return res.json();
  },

  // ========== PHIẾU TIẾP NHẬN ==========

  // Lấy tất cả phiếu tiếp nhận
  getAllPhieuTiepNhan: async (): Promise<PhieuTiepNhan[]> => {
    const res = await fetch(`${API_BASE}/phieu-tiep-nhan?includeYeuCau=true&includeKTV=true`);
    if (!res.ok) throw new Error('Không thể lấy danh sách phiếu tiếp nhận');
    return res.json();
  },

  // Tạo phiếu tiếp nhận mới
  createPhieuTiepNhan: async (phieu: Partial<PhieuTiepNhan>): Promise<PhieuTiepNhan> => {
    const res = await fetch(`${API_BASE}/phieu-tiep-nhan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phieu),
    });
    if (!res.ok) throw new Error('Tạo phiếu tiếp nhận thất bại');
    return res.json();
  },

  // Cập nhật trạng thái phiếu tiếp nhận
  updateTrangThaiPhieu: async (phieuId: number, trangThai: string): Promise<PhieuTiepNhan> => {
    const res = await fetch(`${API_BASE}/phieu-tiep-nhan/${phieuId}/trang-thai`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trangThai }),
    });
    if (!res.ok) throw new Error('Cập nhật trạng thái phiếu thất bại');
    return res.json();
  },

  // ========== CHECKLIST EV ==========

  // Tạo checklist EV
  createChecklistEV: async (checklist: Partial<ChecklistEV>): Promise<ChecklistEV> => {
    const res = await fetch(`${API_BASE}/checklist-ev`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checklist),
    });
    if (!res.ok) throw new Error('Tạo checklist thất bại');
    return res.json();
  },

  // Lấy checklist theo phiếu tiếp nhận
  getChecklistByPhieu: async (phieuId: number): Promise<ChecklistEV> => {
    const res = await fetch(`${API_BASE}/checklist-ev/phieu/${phieuId}`);
    if (!res.ok) throw new Error('Không tìm thấy checklist');
    return res.json();
  },

  // Cập nhật checklist EV
  updateChecklistEV: async (checklistId: number, checklist: Partial<ChecklistEV>): Promise<ChecklistEV> => {
    const res = await fetch(`${API_BASE}/checklist-ev/${checklistId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checklist),
    });
    if (!res.ok) throw new Error('Cập nhật checklist thất bại');
    return res.json();
  },

  // ========== TIẾP NHẬN YÊU CẦU ==========

  // Tiếp nhận yêu cầu và tự động phân công KTV
  tiepNhanYeuCau: async (yeuCauId: number): Promise<{phieuTiepNhan: PhieuTiepNhan, lichTrinh: LichTrinhKTV}> => {
    const res = await fetch(`${API_BASE}/yeu-cau/${yeuCauId}/tiep-nhan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Tiếp nhận yêu cầu thất bại');
    return res.json();
  },

  // Từ chối yêu cầu
  tuChoiYeuCau: async (yeuCauId: number, lyDo: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/yeu-cau/${yeuCauId}/tu-choi`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyDo }),
    });
    if (!res.ok) throw new Error('Từ chối yêu cầu thất bại');
  }
};