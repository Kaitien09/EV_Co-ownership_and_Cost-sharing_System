import { useState } from "react";
import { useParams, useNavigate } from "react-router";

interface ThanhVienNhom {
  thanhVienNhomId: number;
  chuXeId: number;
  tenChuXe: string;
  email: string;
  soDienThoai: string;
  tyLeSoHuu: number;
  vaiTro: 'TruongNhom' | 'ThanhVien';
  ngayThamGia: string;
}

interface NhomDongSoHuu {
  nhomId: number;
  tenNhom: string;
  ngayTao: string;
  trangThai: 'HoatDong' | 'Ngung';
  thanhVien: ThanhVienNhom[];
  soDuQuy: number;
}

const NhomDongSoHuuPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Dữ liệu mẫu
  const [nhom, setNhom] = useState<NhomDongSoHuu>({
    nhomId: 1,
    tenNhom: "Nhóm Đồng Sở Hữu EV 01",
    ngayTao: "2024-01-15",
    trangThai: 'HoatDong',
    soDuQuy: 15000000,
    thanhVien: [
      {
        thanhVienNhomId: 1,
        chuXeId: 1,
        tenChuXe: "Nguyễn Văn A",
        email: "a.nguyen@email.com",
        soDienThoai: "0912345678",
        tyLeSoHuu: 60,
        vaiTro: 'TruongNhom',
        ngayThamGia: "2024-01-15T00:00:00"
      },
      {
        thanhVienNhomId: 2,
        chuXeId: 2,
        tenChuXe: "Trần Thị B",
        email: "b.tran@email.com",
        soDienThoai: "0923456789",
        tyLeSoHuu: 40,
        vaiTro: 'ThanhVien',
        ngayThamGia: "2024-01-15T00:00:00"
      }
    ]
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getTrangThaiBadge = (trangThai: string) => {
    return trangThai === 'HoatDong'
      ? <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">Đang hoạt động</span>
      : <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">Đã ngừng</span>;
  };

  const getVaiTroBadge = (vaiTro: string) => {
    return vaiTro === 'TruongNhom'
      ? <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Trưởng nhóm</span>
      : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Thành viên</span>;
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={() => navigate("/hop-dong")} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại hợp đồng
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{nhom.tenNhom}</h1>
      </div>

      {/* Thông tin tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Số dư quỹ</div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(nhom.soDuQuy)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Thành viên</div>
          <div className="text-2xl font-bold text-blue-600">{nhom.thanhVien.length}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Ngày tạo</div>
          <div className="text-lg font-semibold text-gray-800">{formatDate(nhom.ngayTao)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Trạng thái</div>
          <div>{getTrangThaiBadge(nhom.trangThai)}</div>
        </div>
      </div>

      {/* Menu chức năng */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => navigate(`/nhom/${id}/quan-ly-thanh-vien`)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:bg-gray-50 transition-colors"
        >
          <div className="text-blue-600 text-lg mb-2">👥</div>
          <div className="font-medium text-gray-800">Quản lý thành viên</div>
        </button>

        <button
          onClick={() => navigate(`/nhom/${id}/bo-phieu`)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:bg-gray-50 transition-colors"
        >
          <div className="text-green-600 text-lg mb-2">🗳️</div>
          <div className="font-medium text-gray-800">Bỏ phiếu</div>
        </button>

        <button
          onClick={() => navigate(`/nhom/${id}/quy-chung`)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:bg-gray-50 transition-colors"
        >
          <div className="text-yellow-600 text-lg mb-2">💰</div>
          <div className="font-medium text-gray-800">Quỹ chung</div>
        </button>

        <button
          onClick={() => navigate(`/nhom/${id}/ai-phan-tich`)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:bg-gray-50 transition-colors"
        >
          <div className="text-purple-600 text-lg mb-2">🤖</div>
          <div className="font-medium text-gray-800">AI Phân tích</div>
        </button>
      </div>

      {/* Thành viên nhóm */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Thành viên nhóm</h3>
          <button
            onClick={() => navigate(`/nhom/${id}/quan-ly-thanh-vien`)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Quản lý thành viên →
          </button>
        </div>

        <div className="space-y-3">
          {nhom.thanhVien.map((thanhVien) => (
            <div key={thanhVien.thanhVienNhomId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {thanhVien.tenChuXe.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{thanhVien.tenChuXe}</span>
                    {getVaiTroBadge(thanhVien.vaiTro)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {thanhVien.email} • {thanhVien.soDienThoai}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-gray-800">{thanhVien.tyLeSoHuu}%</div>
                <div className="text-sm text-gray-600">Tỷ lệ sở hữu</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NhomDongSoHuuPage;