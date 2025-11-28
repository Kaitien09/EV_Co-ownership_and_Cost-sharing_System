import { useState } from "react";

const KhachHangXe = () => {
  const [activeTab, setActiveTab] = useState<'khachhang' | 'xe'>('khachhang');

  // DỮ LIỆU KHÁCH HÀNG
  const [khachHangData] = useState([
    {
      id: "1",
      ten: "Nguyễn Văn A",
      sdt: "0912345678",
      email: "a.nguyen@email.com",
      diaChi: "Hà Nội",
      ngayThamGia: "28/11/2025",
      nhom: "Nhóm đồng sở hữu A",
      phanTramSoHuu: "50%",
      ghiChu: "Khách hàng thân thiết"
    },
    {
      id: "2",
      ten: "Trần Thị B",
      sdt: "0923456789",
      email: "b.tran@email.com",
      diaChi: "TP.HCM",
      ngayThamGia: "28/11/2025",
      nhom: "Nhóm đồng sở hữu A",
      phanTramSoHuu: "50%",
      ghiChu: "Thường xuyên sử dụng dịch vụ"
    },
    {
      id: "3",
      ten: "Lê Văn C",
      sdt: "0934567890",
      email: "c.le@email.com",
      diaChi: "Đà Nẵng",
      ngayThamGia: "28/11/2025",
      nhom: "Nhóm đồng sở hữu B",
      phanTramSoHuu: "70%",
      ghiChu: "Khách hàng mới"
    }
  ]);

  // DỮ LIỆU XE
  const [xeData] = useState([
    {
      id: "1",
      bienSo: "30A-11111",
      model: "Model X1",
      VIN: "VIN00000000000001",
      chuSoHuu: "Nguyễn Văn A",
      namSanXuat: 2022,
      mauXe: "Đỏ",
      phanKhoi: "50cc",
      congSuat: "300kW",
      trangThai: "Sẵn sàng",
      lichSuDichVu: [
        {
          ngay: "10/11/2024",
          dichVu: "Bảo dưỡng định kỳ",
          chiPhi: 1500000,
          trangThai: "Hoàn thành",
          moTa: "Bảo dưỡng pin và hệ thống điện"
        },
        {
          ngay: "15/10/2024",
          dichVu: "Thay lốp",
          chiPhi: 2500000,
          trangThai: "Hoàn thành",
          moTa: "Thay lốp trước và sau"
        }
      ]
    },
    {
      id: "2",
      bienSo: "30A-22222",
      model: "Model X2",
      VIN: "VIN00000000000002",
      chuSoHuu: "Trần Thị B",
      namSanXuat: 2023,
      mauXe: "Xanh",
      phanKhoi: "60cc",
      congSuat: "350kW",
      trangThai: "Đang bảo trì",
      lichSuDichVu: [
        {
          ngay: "12/11/2024",
          dichVu: "Sửa phanh",
          chiPhi: 1800000,
          trangThai: "Đang thực hiện",
          moTa: "Thay má phanh và dầu phanh"
        }
      ]
    },
    {
      id: "3",
      bienSo: "30A-33333",
      model: "Model X3",
      VIN: "VIN00000000000003",
      chuSoHuu: "Lê Văn C",
      namSanXuat: 2022,
      mauXe: "Trắng",
      phanKhoi: "55cc",
      congSuat: "320kW",
      trangThai: "Sẵn sàng",
      lichSuDichVu: [
        {
          ngay: "20/11/2024",
          dichVu: "Bảo dưỡng tổng thể",
          chiPhi: 3200000,
          trangThai: "Hoàn thành",
          moTa: "Bảo dưỡng toàn bộ hệ thống"
        }
      ]
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (trangThai: string) => {
    switch (trangThai) {
      case 'Sẵn sàng':
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      case 'Đang bảo trì':
      case 'Đang thực hiện':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Hồ sơ Khách hàng & Xe
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông tin khách hàng, xe và lịch sử dịch vụ
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

      {/* TAB KHÁCH HÀNG */}
      {activeTab === 'khachhang' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Danh sách Khách hàng
              </h3>

            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {khachHangData.map((khachHang) => (
              <div key={khachHang.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {khachHang.ten}
                        </h4>
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {khachHang.nhom}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {khachHang.sdt}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {khachHang.email}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {khachHang.diaChi}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Tham gia: {khachHang.ngayThamGia}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Sở hữu: {khachHang.phanTramSoHuu}
                        </span>
                        {khachHang.ghiChu && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {khachHang.ghiChu}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Đang hoạt động
                    </span>
                    <div className="flex gap-2">

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB XE */}
      {activeTab === 'xe' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Danh sách Xe
              </h3>

            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thông tin xe
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Chủ sở hữu & Thông số
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
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border">
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">
                            {xe.bienSo}
                          </div>
                          <div className="text-sm text-gray-600">
                            {xe.model}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <strong>VIN:</strong> {xe.VIN}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {xe.mauXe} • {xe.namSanXuat}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {xe.chuSoHuu}
                          </div>
                          <div className="text-xs text-gray-500">
                            Chủ sở hữu
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Phân khối: {xe.phanKhoi}</div>
                          <div>Công suất: {xe.congSuat}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(xe.trangThai)}`}>
                        {xe.trangThai}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        {xe.lichSuDichVu.map((dichVu, index) => (
                          <div key={index} className="border-l-4 border-l-blue-500 pl-3 py-1">
                            <div className="font-medium text-gray-900 text-sm">
                              {dichVu.dichVu}
                            </div>
                            <div className="text-xs text-gray-500">
                              {dichVu.ngay} • {formatCurrency(dichVu.chiPhi)}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {dichVu.moTa}
                            </div>
                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium mt-1 ${getStatusColor(dichVu.trangThai)}`}>
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