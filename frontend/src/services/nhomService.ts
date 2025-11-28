const API_BASE = 'http://localhost:8080/api';

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

export interface ThanhVienNhom {
  thanhVienNhomId: number;
  ngayThamGia: string;
  tyLeSoHuu: number;
  vaiTro: 'THANH_VIEN' | 'TRUONG_NHOM';
  chuXeId: number;
  nhomId: number;
  xeId: number;
  chuXe?: ChuXe; // Thông tin chủ xe
  xe?: XeDien; // Thông tin xe
}

export interface NhomDongSoHuu {
  nhomId: number;
  tenNhom: string;
  ngayTao: string;
  trangThai: 'HOAT_DONG' | 'NGUNG_HOAT_DONG' | 'HoatDong' | 'Ngung';
  soThanhVien: number;
  tongTyLeSoHuu: number;
  xeChinh: string; // Tên xe chính (có thể là model)
  bienSo: string; // Biển số xe chính
  moTa: string;
  thanhVien: ThanhVienNhom[];
  xe?: XeDien; // Thông tin xe chính của nhóm
}

export const nhomService = {
  // Lấy tất cả nhóm
  getAllNhom: async (): Promise<NhomDongSoHuu[]> => {
    const res = await fetch(`${API_BASE}/nhom?includeXe=true`);
    if (!res.ok) throw new Error('Không thể lấy danh sách nhóm');
    return res.json();
  },

  // Lấy nhóm theo id (bao gồm danh sách thành viên)
  getNhomById: async (id: number): Promise<NhomDongSoHuu> => {
    const res = await fetch(`${API_BASE}/nhom/${id}?includeChuXe=true&includeXe=true`);
    if (!res.ok) throw new Error('Không tìm thấy nhóm');
    return res.json();
  },

  // Lấy danh sách thành viên của nhóm (có thông tin chủ xe và xe)
  getThanhVienNhom: async (nhomId: number): Promise<ThanhVienNhom[]> => {
    const res = await fetch(`${API_BASE}/nhom/${nhomId}/thanh-vien?includeChuXe=true&includeXe=true`);
    if (!res.ok) throw new Error('Không thể lấy danh sách thành viên');
    const data = await res.json();
    console.log('API Response - Thành viên với chủ xe và xe:', data);
    return data;
  },

  // Lấy thông tin chủ xe theo ID
  getChuXeById: async (chuXeId: number): Promise<ChuXe> => {
    const res = await fetch(`${API_BASE}/chu-xe/${chuXeId}`);
    if (!res.ok) throw new Error('Không tìm thấy chủ xe');
    return res.json();
  },

  // Lấy thông tin xe theo ID
  getXeById: async (xeId: number): Promise<XeDien> => {
    const res = await fetch(`${API_BASE}/xe/${xeId}`);
    if (!res.ok) throw new Error('Không tìm thấy xe');
    return res.json();
  },

  // Tạo nhóm mới
  createNhom: async (nhom: Partial<NhomDongSoHuu>): Promise<NhomDongSoHuu> => {
    const res = await fetch(`${API_BASE}/nhom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nhom),
    });
    if (!res.ok) throw new Error('Tạo nhóm thất bại');
    return res.json();
  },

  // Cập nhật nhóm
  updateNhom: async (id: number, nhom: Partial<NhomDongSoHuu>): Promise<NhomDongSoHuu> => {
    const res = await fetch(`${API_BASE}/nhom/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nhom),
    });
    if (!res.ok) throw new Error('Cập nhật nhóm thất bại');
    return res.json();
  },

  // Xóa nhóm
  deleteNhom: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/nhom/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Xóa nhóm thất bại');
  },

  // Thêm thành viên vào nhóm
  addThanhVien: async (nhomId: number, thanhVien: {
    chuXeId: number;
    xeId: number;
    tyLeSoHuu: number;
    vaiTro?: 'THANH_VIEN' | 'TRUONG_NHOM';
  }): Promise<ThanhVienNhom> => {
    const res = await fetch(`${API_BASE}/nhom/${nhomId}/thanh-vien`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(thanhVien),
    });
    if (!res.ok) throw new Error('Thêm thành viên thất bại');
    return res.json();
  },

  // Xóa thành viên khỏi nhóm
  removeThanhVien: async (nhomId: number, thanhVienId: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/nhom/${nhomId}/thanh-vien/${thanhVienId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Xóa thành viên thất bại');
  }
};