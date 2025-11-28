import { useState } from "react";

const KhachHangXe = () => {
  const [activeTab, setActiveTab] = useState<'khachhang' | 'xe'>('khachhang');

  // DỮ LIỆU STATE - 5 khách hàng
  const [khachHangData] = useState([
    {
      id: "1",
      ten: "Nguyễn Văn A",
      sdt: "0912345678",
      email: "a.nguyen@email.com",
      nhom: "Nhóm đồng sở hữu 3",
      ngayThamGia: "15/08/2024",
      tongXe: 3,
      diaChi: "Hà Nội",
      ghiChu: "Khách hàng thân thiết"
    },
    {
      id: "2",
      ten: "Trần Thị B",
      sdt: "0923456789",
      email: "b.tran@email.com",
      nhom: "Nhóm đồng sở hữu 1",
      ngayThamGia: "20/09/2024",
      tongXe: 2,
      diaChi: "TP.HCM",
      ghiChu: "Thường xuyên sử dụng dịch vụ"
    },
    {
      id: "3",
      ten: "Lê Văn C",
      sdt: "0934567890",
      email: "c.le@email.com",
      nhom: "Nhóm đồng sở hữu 2",
      ngayThamGia: "10/07/2024",
      tongXe: 1,
      diaChi: "Đà Nẵng",
      ghiChu: "Khách hàng mới"
    },
    {
      id: "4",
      ten: "Phạm Thị D",
      sdt: "0945678901",
      email: "d.pham@email.com",
      nhom: "Nhóm đồng sở hữu 3",
      ngayThamGia: "05/11/2024",
      tongXe: 4,
      diaChi: "Hải Phòng",
      ghiChu: "Tham gia nhiều nhóm"
    },
    {
      id: "5",
      ten: "Hoàng Văn E",
      sdt: "0956789012",
      email: "e.hoang@email.com",
      nhom: "Nhóm đồng sở hữu 1",
      ngayThamGia: "25/12/2024",
      tongXe: 2,
      diaChi: "Cần Thơ",
      ghiChu: "Khách hàng VIP"
    }
  ]);

  const [xeData] = useState([
    {
      id: "1",
      bienSo: "29A-12345",
      model: "VinFast VF e34",
      VIN: "VF123456789012345",
      chuSoHuu: "Nguyễn Văn A",
      ngayDangKy: "15/08/2024",
      namSanXuat: 2024,
      mauXe: "Trắng",
      trangThai: "Đang hoạt động",
      lichSuDichVu: [
        { ngay: "10/11/2024", dichVu: "Bảo dưỡng định kỳ", chiPhi: 1500000, trangThai: "Hoàn thành" },
        { ngay: "15/10/2024", dichVu: "Thay lốp", chiPhi: 2500000, trangThai: "Hoàn thành" }
      ]
    },
    {
      id: "2",
      bienSo: "29A-67890",
      model: "VinFast VF 8",
      VIN: "VF987654321098765",
      chuSoHuu: "Trần Thị B",
      ngayDangKy: "20/09/2024",
      namSanXuat: 2024,
      mauXe: "Đen",
      trangThai: "Đang bảo trì",
      lichSuDichVu: [
        { ngay: "12/11/2024", dichVu: "Sửa phanh", chiPhi: 1800000, trangThai: "Hoàn thành" }
      ]
    },
    {
      id: "3",
      bienSo: "29A-54321",
      model: "VinFast VF 9",
      VIN: "VF543216789012345",
      chuSoHuu: "Lê Văn C",
      ngayDangKy: "10/07/2024",
      namSanXuat: 2024,
      mauXe: "Xám",
      trangThai: "Đang hoạt động",
      lichSuDichVu: [
        { ngay: "20/11/2024", dichVu: "Bảo dưỡng tổng thể", chiPhi: 3200000, trangThai: "Hoàn thành" }
      ]
    },
    {
      id: "4",
      bienSo: "29A-98765",
      model: "VinFast VF 6",
      VIN: "VF987651234567890",
      chuSoHuu: "Phạm Thị D",
ngayDangKy: "05/11/2024",
      namSanXuat: 2024,
      mauXe: "Đỏ",
      trangThai: "Đang hoạt động",
      lichSuDichVu: [
        { ngay: "08/11/2024", dichVu: "Thay dầu máy", chiPhi: 800000, trangThai: "Hoàn thành" },
        { ngay: "25/10/2024", dichVu: "Vệ sinh điều hòa", chiPhi: 450000, trangThai: "Hoàn thành" }
      ]
    },
    {
      id: "5",
      bienSo: "29A-11111",
      model: "VinFast VF 5",
      VIN: "VF111112222233333",
      chuSoHuu: "Hoàng Văn E",
      ngayDangKy: "25/12/2024",
      namSanXuat: 2024,
      mauXe: "Xanh",
      trangThai: "Đang hoạt động",
      lichSuDichVu: [
        { ngay: "30/11/2024", dichVu: "Kiểm tra định kỳ", chiPhi: 600000, trangThai: "Hoàn thành" }
      ]
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Quản lý Khách hàng & Xe
        </h1>
        <p className="text-gray-600 mt-2">
          Hồ sơ khách hàng, thông tin xe và lịch sử dịch vụ
        </p>
      </div>

      {/* Tab điều hướng */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('khachhang')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'khachhang'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Khách hàng ({khachHangData.length})
            </button>
            <button
              onClick={() => setActiveTab('xe')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'xe'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Xe ({xeData.length})
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'khachhang' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Danh sách Khách hàng
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {khachHangData.map((khachHang) => (
              <div
                key={khachHang.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {khachHang.ten}
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {khachHang.sdt}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {khachHang.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {khachHang.nhom}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          {khachHang.tongXe} xe
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {khachHang.ngayThamGia}
                        </span>
                      </div>
                      {khachHang.ghiChu && (
                        <p className="text-sm text-gray-500 mt-2 flex items-start gap-1">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {khachHang.ghiChu}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Đang hoạt động
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'xe' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Danh sách Xe
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thông tin xe
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Chủ sở hữu
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thông số
                  </th>
<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Lịch sử dịch vụ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {xeData.map((xe) => (
                  <tr key={xe.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {xe.bienSo}
                          </div>
                          <div className="text-sm text-gray-600">
                            {xe.model}
                          </div>
                          <div className="text-xs text-gray-500">
                            VIN: {xe.VIN}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {xe.ngayDangKy}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {xe.chuSoHuu}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {xe.namSanXuat}
                      </div>
                      <div className="text-sm text-gray-600">
                        {xe.mauXe}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
xe.trangThai === 'Đang hoạt động'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {xe.trangThai}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {xe.lichSuDichVu.map((dichVu, index) => (
                          <div key={index} className="text-xs border-l-4 border-l-blue-500 pl-2">
                            <div className="font-medium text-gray-900">
                              {dichVu.dichVu}
                            </div>
                            <div className="text-gray-500">
                              {dichVu.ngay} - {formatCurrency(dichVu.chiPhi)}
                            </div>
                            <span className="text-green-600">
                              {dichVu.trangThai}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhachHangXe;