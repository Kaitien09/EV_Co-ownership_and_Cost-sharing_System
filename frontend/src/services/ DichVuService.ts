// src/services/DichVuService.ts
const API_BASE = 'http://localhost:8080/api';

export interface TrungTamDichVu {
  trungTamId: number;
  tenTrungTam: string;
  diaChi: string;
  soDienThoai: string;
}

export interface KyThuatVien {
  kyThuatVienId: number;
  trungTamId: number;
  hoTen: string;
  chungChi: string;
  chuyenMon: string;
  trungTam?: TrungTamDichVu;
}

export interface XeDien {
  xeId: number;
  bienSo: string;
  model: string;
  dungLuongPin: number;
  mauXe: string;
  namSanXuat: number;
}

export interface ChuXe {
  chuXeId: number;
  hoTen: string;
  sdt: string;
  email?: string;
}

export interface LichHenDichVu {
  lichHenId: number;
  xeId: number;
  chuXeId: number;
  trungTamId: number;
  ngayHen: string;
  loaiDichVu: 'BaoDuong' | 'SuaChua';
  trangThai: 'ChoXacNhan' | 'DaXacNhan' | 'DangThucHien' | 'HoanTat' | 'DaHuy';
  moTa?: string;
  xe?: XeDien;
  chuXe?: ChuXe;
  trungTam?: TrungTamDichVu;
}

export interface PhieuDichVu {
  phieuId: number;
  lichHenId: number;
  kyThuatVienId: number;
  danhSachKiemTra: any;
  ketQua: string;
  ngayTiepNhan: string;
  ngayHoanThanh?: string;
  tongChiPhi: number;
  lichHen?: LichHenDichVu;
  kyThuatVien?: KyThuatVien;
  chiTietPhuTung?: ChiTietSuDungPhuTung[];
}

export interface PhuTung {
  phuTungId: number;
  tenPhuTung: string;
  soLuongTon: number;
  soLuongToiThieu: number;
  donGia: number;
}

export interface ChiTietSuDungPhuTung {
  chiTietId: number;
  phieuId: number;
  phuTungId: number;
  soLuong: number;
  donGia: number;
  thanhTien: number;
  phuTung?: PhuTung;
}

export interface Service {
  id: string;
  serviceCode: string;
  serviceName: string;
  vehicle: string;
  customerName: string;
  serviceType: 'maintenance' | 'repair' | 'inspection' | 'other';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  cost: number;
  technician: string;
  description: string;
  lichHenId?: number;
  phieuId?: number;
  xeId?: number;
  chuXeId?: number;
}

// Mapping functions
const mapServiceTypeToLoaiDichVu = (serviceType: string): 'BaoDuong' | 'SuaChua' => {
  switch (serviceType) {
    case 'maintenance':
      return 'BaoDuong';
    case 'repair':
      return 'SuaChua';
    case 'inspection':
      return 'BaoDuong';
    default:
      return 'BaoDuong';
  }
};

const mapStatusToTrangThai = (status: string): 'ChoXacNhan' | 'DaXacNhan' | 'DangThucHien' | 'HoanTat' | 'DaHuy' => {
  switch (status) {
    case 'pending':
      return 'ChoXacNhan';
    case 'in-progress':
      return 'DangThucHien';
    case 'completed':
      return 'HoanTat';
    case 'cancelled':
      return 'DaHuy';
    default:
      return 'ChoXacNhan';
  }
};

const mapLoaiDichVuToServiceType = (loaiDichVu: string): 'maintenance' | 'repair' | 'inspection' | 'other' => {
  switch (loaiDichVu) {
    case 'BaoDuong':
      return 'maintenance';
    case 'SuaChua':
      return 'repair';
    default:
      return 'other';
  }
};

const mapTrangThaiToStatus = (trangThai: string): 'pending' | 'in-progress' | 'completed' | 'cancelled' => {
  switch (trangThai) {
    case 'ChoXacNhan':
      return 'pending';
    case 'DaXacNhan':
    case 'DangThucHien':
      return 'in-progress';
    case 'HoanTat':
      return 'completed';
    case 'DaHuy':
      return 'cancelled';
    default:
      return 'pending';
  }
};

// Mock data for development
const mockServices: Service[] = [
  {
    id: "1",
    serviceCode: "DV-2024-001",
    serviceName: "Bảo dưỡng định kỳ 15,000km",
    vehicle: "BMW X5 - 51A-12345",
    customerName: "Nguyễn Văn A",
    serviceType: 'maintenance',
    status: 'completed',
    startDate: "2024-01-10",
    endDate: "2024-01-10",
    cost: 2500000,
    technician: "Kỹ thuật viên A",
    description: "Thay dầu máy, lọc gió, kiểm tra hệ thống phanh"
  },
  {
    id: "2",
    serviceCode: "DV-2024-002",
    serviceName: "Sửa chữa hệ thống phanh",
    vehicle: "Mercedes C300 - 51B-67890",
    customerName: "Trần Thị B",
    serviceType: 'repair',
    status: 'in-progress',
    startDate: "2024-01-15",
    cost: 4500000,
    technician: "Kỹ thuật viên B",
    description: "Thay má phanh trước, kiểm tra dầu phanh"
  },
  {
    id: "3",
    serviceCode: "DV-2024-003",
    serviceName: "Đăng kiểm định kỳ",
    vehicle: "Audi Q7 - 51C-54321",
    customerName: "Lê Văn C",
    serviceType: 'inspection',
    status: 'pending',
    startDate: "2024-01-20",
    cost: 500000,
    technician: "-",
    description: "Đăng kiểm theo quy định"
  },
  {
    id: "4",
    serviceCode: "DV-2024-004",
    serviceName: "Thay vỏ xe mới",
    vehicle: "Toyota Camry - 51D-98765",
    customerName: "Phạm Thị D",
    serviceType: 'repair',
    status: 'in-progress',
    startDate: "2024-01-14",
    cost: 3800000,
    technician: "Kỹ thuật viên C",
    description: "Thay 4 vỏ xe mới, cân bằng góc lái"
  }
];

export const dichVuService = {
  // Lấy tất cả dịch vụ
  getAllDichVu: async (): Promise<Service[]> => {
    try {
      // Thử gọi API thật trước
      const res = await fetch(`${API_BASE}/dich-vu?includeDetails=true`);
      if (res.ok) {
        const data = await res.json();
        console.log('Dữ liệu dịch vụ từ API:', data);

        return data.map((item: any) => ({
          id: item.phieuId?.toString() || item.lichHenId?.toString(),
          serviceCode: item.maDichVu || `DV-${item.phieuId || item.lichHenId}`,
          serviceName: item.moTa || item.tenDichVu || 'Dịch vụ xe',
          vehicle: item.xe ? `${item.xe.model} - ${item.xe.bienSo}` : 'Chưa có thông tin xe',
          customerName: item.chuXe?.hoTen || 'Khách hàng',
          serviceType: mapLoaiDichVuToServiceType(item.loaiDichVu),
          status: mapTrangThaiToStatus(item.trangThai),
          startDate: item.ngayTiepNhan || item.ngayHen || new Date().toISOString().split('T')[0],
          endDate: item.ngayHoanThanh,
          cost: item.tongChiPhi || 0,
          technician: item.kyThuatVien?.hoTen || 'Chưa phân công',
          description: item.ketQua || item.moTa || 'Không có mô tả',
          lichHenId: item.lichHenId,
          phieuId: item.phieuId,
          xeId: item.xeId,
          chuXeId: item.chuXeId
        }));
      } else {
        // Fallback to mock data nếu API không khả dụng
        console.log('API không khả dụng, sử dụng dữ liệu mẫu');
        return mockServices;
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách dịch vụ, sử dụng dữ liệu mẫu:', error);
      return mockServices;
    }
  },

  // Lấy dịch vụ theo ID
  getDichVuById: async (id: number): Promise<Service> => {
    try {
      const res = await fetch(`${API_BASE}/dich-vu/${id}`);
      if (res.ok) {
        const data = await res.json();
        return {
          id: data.phieuId?.toString() || data.lichHenId?.toString(),
          serviceCode: data.maDichVu || `DV-${data.phieuId || data.lichHenId}`,
          serviceName: data.moTa || 'Dịch vụ xe',
          vehicle: data.xe ? `${data.xe.model} - ${data.xe.bienSo}` : 'Chưa có thông tin xe',
          customerName: data.chuXe?.hoTen || 'Khách hàng',
          serviceType: mapLoaiDichVuToServiceType(data.loaiDichVu),
          status: mapTrangThaiToStatus(data.trangThai),
          startDate: data.ngayTiepNhan || data.ngayHen,
          endDate: data.ngayHoanThanh,
          cost: data.tongChiPhi || 0,
          technician: data.kyThuatVien?.hoTen || 'Chưa phân công',
          description: data.ketQua || data.moTa || 'Không có mô tả'
        };
      } else {
        // Fallback to mock data
        const service = mockServices.find(s => s.id === id.toString());
        if (service) return service;
        throw new Error('Không tìm thấy dịch vụ');
      }
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết dịch vụ:', error);
      throw error;
    }
  },

  // Tạo dịch vụ mới
  createDichVu: async (dichVu: Partial<Service>): Promise<Service> => {
    try {
      const backendData = {
        xeId: dichVu.xeId || 1,
        chuXeId: dichVu.chuXeId || 1,
        trungTamId: 1,
        ngayHen: dichVu.startDate || new Date().toISOString().split('T')[0],
        loaiDichVu: mapServiceTypeToLoaiDichVu(dichVu.serviceType || 'maintenance'),
        moTa: dichVu.description,
        trangThai: 'ChoXacNhan'
      };

      const res = await fetch(`${API_BASE}/dich-vu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          id: data.lichHenId.toString(),
          serviceCode: `DV-${data.lichHenId}`,
          serviceName: dichVu.serviceName || 'Dịch vụ mới',
          vehicle: dichVu.vehicle || 'Chưa có thông tin xe',
          customerName: dichVu.customerName || 'Khách hàng',
          serviceType: dichVu.serviceType || 'maintenance',
          status: 'pending',
          startDate: data.ngayHen,
          cost: 0,
          technician: 'Chưa phân công',
          description: dichVu.description || 'Không có mô tả'
        };
      } else {
        // Mock response for development
        const newService: Service = {
          id: (mockServices.length + 1).toString(),
          serviceCode: `DV-2024-00${mockServices.length + 1}`,
          serviceName: dichVu.serviceName || 'Dịch vụ mới',
          vehicle: dichVu.vehicle || 'Xe mới - 00A-00000',
          customerName: dichVu.customerName || 'Khách hàng mới',
          serviceType: dichVu.serviceType || 'maintenance',
          status: 'pending',
          startDate: dichVu.startDate || new Date().toISOString().split('T')[0],
          cost: 0,
          technician: 'Chưa phân công',
          description: dichVu.description || 'Không có mô tả'
        };
        mockServices.push(newService);
        return newService;
      }
    } catch (error) {
      console.error('Lỗi khi tạo dịch vụ:', error);
      throw error;
    }
  },

  // Cập nhật dịch vụ
  updateDichVu: async (id: number, dichVu: Partial<Service>): Promise<Service> => {
    try {
      const backendData = {
        trangThai: mapStatusToTrangThai(dichVu.status || 'pending'),
        ...(dichVu.technician && { kyThuatVienId: 1 }),
        ...(dichVu.cost && { tongChiPhi: dichVu.cost }),
        ...(dichVu.description && { ketQua: dichVu.description })
      };

      const res = await fetch(`${API_BASE}/dich-vu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          id: data.phieuId?.toString() || data.lichHenId?.toString(),
          serviceCode: data.maDichVu || `DV-${data.phieuId || data.lichHenId}`,
          serviceName: data.moTa || 'Dịch vụ xe',
          vehicle: data.xe ? `${data.xe.model} - ${data.xe.bienSo}` : 'Chưa có thông tin xe',
          customerName: data.chuXe?.hoTen || 'Khách hàng',
          serviceType: mapLoaiDichVuToServiceType(data.loaiDichVu),
          status: mapTrangThaiToStatus(data.trangThai),
          startDate: data.ngayTiepNhan || data.ngayHen,
          endDate: data.ngayHoanThanh,
          cost: data.tongChiPhi || 0,
          technician: data.kyThuatVien?.hoTen || 'Chưa phân công',
          description: data.ketQua || data.moTa || 'Không có mô tả'
        };
      } else {
        // Mock update for development
        const serviceIndex = mockServices.findIndex(s => s.id === id.toString());
        if (serviceIndex !== -1) {
          mockServices[serviceIndex] = {
            ...mockServices[serviceIndex],
            ...dichVu,
            ...(dichVu.status === 'completed' && !mockServices[serviceIndex].endDate
              ? { endDate: new Date().toISOString().split('T')[0] }
              : {})
          };
          return mockServices[serviceIndex];
        }
        throw new Error('Không tìm thấy dịch vụ');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dịch vụ:', error);
      throw error;
    }
  },

  // Xóa dịch vụ
  deleteDichVu: async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/dich-vu/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        // Mock delete for development
        const serviceIndex = mockServices.findIndex(s => s.id === id.toString());
        if (serviceIndex !== -1) {
          mockServices.splice(serviceIndex, 1);
        }
      }
    } catch (error) {
      console.error('Lỗi khi xóa dịch vụ:', error);
      throw error;
    }
  },

  // Các API khác giữ nguyên...
  getTrungTamDichVu: async (): Promise<TrungTamDichVu[]> => {
    try {
      const res = await fetch(`${API_BASE}/trung-tam-dich-vu`);
      if (res.ok) {
        return res.json();
      } else {
        return []; // Return empty array for development
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách trung tâm:', error);
      return [];
    }
  },

  getKyThuatVien: async (): Promise<KyThuatVien[]> => {
    try {
      const res = await fetch(`${API_BASE}/ky-thuat-vien`);
      if (res.ok) {
        return res.json();
      } else {
        return []; // Return empty array for development
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách kỹ thuật viên:', error);
      return [];
    }
  },

  getPhuTung: async (): Promise<PhuTung[]> => {
    try {
      const res = await fetch(`${API_BASE}/phu-tung`);
      if (res.ok) {
        return res.json();
      } else {
        return []; // Return empty array for development
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phụ tùng:', error);
      return [];
    }
  },

  getXeDien: async (): Promise<XeDien[]> => {
    try {
      const res = await fetch(`${API_BASE}/xe-dien`);
      if (res.ok) {
        return res.json();
      } else {
        return []; // Return empty array for development
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách xe:', error);
      return [];
    }
  },

  getChuXe: async (): Promise<ChuXe[]> => {
    try {
      const res = await fetch(`${API_BASE}/chu-xe`);
      if (res.ok) {
        return res.json();
      } else {
        return []; // Return empty array for development
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách chủ xe:', error);
      return [];
    }
  }
};