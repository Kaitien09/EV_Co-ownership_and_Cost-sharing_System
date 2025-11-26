import React, { useState } from "react";
import { useNavigate } from "react-router";

interface NhomDongSoHuu {
  nhomId: number;
  tenNhom: string;
  ngayTao: string;
  trangThai: 'HoatDong' | 'Ngung';
  soThanhVien: number;
  soDuQuy: number;
  tyLeSoHuu: number;
  vaiTro: 'TruongNhom' | 'ThanhVien';
}

const DanhSachNhomPage: React.FC = () => {
  const navigate = useNavigate();

  const [danhSachNhom] = useState<NhomDongSoHuu[]>([
    {
      nhomId: 1,
      tenNhom: "Nhóm Đồng Sở Hữu EV 01",
      ngayTao: "2024-01-15",
      trangThai: 'HoatDong',
      soThanhVien: 3,
      soDuQuy: 15000000,
      tyLeSoHuu: 60,
      vaiTro: 'TruongNhom'
    },
    {
      nhomId: 2,
      tenNhom: "Nhóm EV Sài Gòn",
      ngayTao: "2024-02-01",
      trangThai: 'HoatDong',
      soThanhVien: 4,
      soDuQuy: 8000000,
      tyLeSoHuu: 25,
      vaiTro: 'ThanhVien'
    }
  ]);

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
      ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Đang hoạt động</span>
      : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Đã ngừng</span>;
  };

  const getVaiTroBadge = (vaiTro: string) => {
    return vaiTro === 'TruongNhom'
      ? <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Trưởng nhóm</span>
      : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Thành viên</span>;
  };

  const handleChonNhom = (nhomId: number) => {
    navigate(`/nhom/${nhomId}`);
  };

  const handleQuayLai = () => {
    navigate('/nhom-so-huu');
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Danh sách nhóm đồng sở hữu</h1>
        <p className="text-gray-600">Chọn một nhóm để xem chi tiết và quản lý</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {danhSachNhom.map((nhom) => (
          <div
            key={nhom.nhomId}
            onClick={() => handleChonNhom(nhom.nhomId)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-800 text-lg">{nhom.tenNhom}</h3>
              {getVaiTroBadge(nhom.vaiTro)}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                {getTrangThaiBadge(nhom.trangThai)}
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Thành viên:</span>
                <span className="font-medium">{nhom.soThanhVien} người</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Quỹ chung:</span>
                <span className="font-medium text-green-600">{formatCurrency(nhom.soDuQuy)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tỷ lệ sở hữu:</span>
                <span className="font-medium">{nhom.tyLeSoHuu}%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Ngày tham gia:</span>
                <span className="font-medium">{formatDate(nhom.ngayTao)}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleChonNhom(nhom.nhomId);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanhSachNhomPage;