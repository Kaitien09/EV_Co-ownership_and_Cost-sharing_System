import { useState } from "react";

interface ThanhVienHopDong {
  thanhVienId: number;
  tenThanhVien: string;
  tyLeSoHuu: number;
  email: string;
  soDienThoai: string;
  isCurrentUser: boolean;
}

interface Xe {
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

interface HopDongDongSoHuu {
  hopDongId: number;
  maHopDong: string;
  nhomId: number;
  xe: Xe;
  tenNhom: string;
  ngayBatDau: string;
  ngayKetThuc: string | null;
  trangThai: 'HIEU_LUC' | 'DA_KET_THUC';
  thanhVien: ThanhVienHopDong[];
  fileHopDong: string;
  ghiChu: string;
}

const QLHopDongPhapLyPage: React.FC = () => {
  const [selectedHopDong, setSelectedHopDong] = useState<HopDongDongSoHuu | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [hopDongList] = useState<HopDongDongSoHuu[]>([
    {
      hopDongId: 1,
      maHopDong: "HD001",
      nhomId: 1,
      xe: {
        xeId: 1,
        bienSo: "30A-11111",
        dungLuongPin: 50,
        hinhAnh: "x1.jpg",
        mauXe: "Đỏ",
        moTa: "Xe điện mẫu X1",
        model: "Model X1",
        namSanXuat: 2022,
        quangDuongToiDa: 300,
        trangThai: "SAN_SANG",
        vin: "VIN00000000000001"
      },
      tenNhom: "Nhóm Đồng Sở Hữu A",
      ngayBatDau: "2024-01-15T00:00:00",
      ngayKetThuc: "2025-01-15T00:00:00",
      trangThai: 'HIEU_LUC',
      fileHopDong: "hopdong_nhom1_xe1.pdf",
      ghiChu: "Hợp đồng nhóm 1",
      thanhVien: [
        {
          thanhVienId: 1,
          tenThanhVien: "Nguyễn Văn A",
          tyLeSoHuu: 50,
          email: "a.nguyen@email.com",
          soDienThoai: "0903000001",
          isCurrentUser: true
        },
        {
          thanhVienId: 2,
          tenThanhVien: "Trần Thị B",
          tyLeSoHuu: 50,
          email: "b.tran@email.com",
          soDienThoai: "0903000002",
          isCurrentUser: false
        }
      ]
    },
    {
      hopDongId: 2,
      maHopDong: "HD002",
      nhomId: 2,
      xe: {
        xeId: 2,
        bienSo: "30A-22222",
        dungLuongPin: 60,
        hinhAnh: "x2.jpg",
        mauXe: "Xanh",
        moTa: "Xe điện mẫu X2",
        model: "Model X2",
        namSanXuat: 2023,
        quangDuongToiDa: 350,
        trangThai: "DANG_SU_DUNG",
        vin: "VIN00000000000002"
      },
      tenNhom: "Nhóm Đồng Sở Hữu B",
      ngayBatDau: "2024-02-01T00:00:00",
      ngayKetThuc: "2026-02-01T00:00:00",
      trangThai: 'HIEU_LUC',
      fileHopDong: "hopdong_nhom2_xe2.pdf",
      ghiChu: "Hợp đồng nhóm 2",
      thanhVien: [
        {
          thanhVienId: 3,
          tenThanhVien: "Lê Văn C",
          tyLeSoHuu: 70,
          email: "c.le@email.com",
          soDienThoai: "0903000003",
          isCurrentUser: false
        },
        {
          thanhVienId: 4,
          tenThanhVien: "Phạm Thị D",
          tyLeSoHuu: 30,
          email: "d.pham@email.com",
          soDienThoai: "0903000004",
          isCurrentUser: false
        }
      ]
    },
    {
      hopDongId: 3,
      maHopDong: "HD003",
      nhomId: 3,
      xe: {
        xeId: 3,
        bienSo: "30A-33333",
        dungLuongPin: 55,
        hinhAnh: "x3.jpg",
        mauXe: "Trắng",
        moTa: "Xe điện mẫu X3",
        model: "Model X3",
        namSanXuat: 2022,
        quangDuongToiDa: 320,
        trangThai: "BAO_TRI",
        vin: "VIN00000000000003"
      },
      tenNhom: "Nhóm Đồng Sở Hữu C",
      ngayBatDau: "2024-03-01T00:00:00",
      ngayKetThuc: "2025-03-01T00:00:00",
      trangThai: 'HIEU_LUC',
      fileHopDong: "hopdong_nhom3_xe3.pdf",
      ghiChu: "Hợp đồng nhóm 3",
      thanhVien: [
        {
          thanhVienId: 5,
          tenThanhVien: "Hoàng Văn E",
          tyLeSoHuu: 60,
          email: "e.hoang@email.com",
          soDienThoai: "0903000005",
          isCurrentUser: false
        },
        {
          thanhVienId: 1,
          tenThanhVien: "Nguyễn Văn A",
          tyLeSoHuu: 40,
          email: "a.nguyen@email.com",
          soDienThoai: "0903000001",
          isCurrentUser: true
        }
      ]
    }
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    return status === 'HIEU_LUC'
      ? <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">Đang hiệu lực</span>
      : <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">Đã kết thúc</span>;
  };

  const getTrangThaiXeBadge = (trangThai: string) => {
    const statusMap: { [key: string]: { class: string, text: string } } = {
      'SAN_SANG': { class: 'bg-green-100 text-green-800 border border-green-200', text: 'Sẵn sàng' },
      'DANG_SU_DUNG': { class: 'bg-blue-100 text-blue-800 border border-blue-200', text: 'Đang sử dụng' },
      'BAO_TRI': { class: 'bg-yellow-100 text-yellow-800 border border-yellow-200', text: 'Bảo trì' },
      'SUA_CHUA': { class: 'bg-orange-100 text-orange-800 border border-orange-200', text: 'Sửa chữa' },
      'NGUNG_HOAT_DONG': { class: 'bg-red-100 text-red-800 border border-red-200', text: 'Ngừng hoạt động' }
    };

    const status = statusMap[trangThai] || statusMap['SAN_SANG'];
    return <span className={`px-3 py-1 text-xs rounded-full ${status.class}`}>{status.text}</span>;
  };

  const handleViewDetail = (hopDong: HopDongDongSoHuu) => {
    setSelectedHopDong(hopDong);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedHopDong(null);
  };

  const handleDownloadContract = (filePath: string) => {
    // Giả lập tải file hợp đồng
    console.log('Downloading contract:', filePath);
    // Trong thực tế, bạn sẽ gọi API để tải file
    alert(`Đang tải hợp đồng: ${filePath}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý hợp đồng pháp lý điện tử
        </h1>
        <p className="text-gray-600">
          Quản lý và theo dõi các hợp đồng đồng sở hữu xe điện
        </p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng hợp đồng</p>
              <p className="text-2xl font-bold text-gray-900">{hopDongList.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang hiệu lực</p>
              <p className="text-2xl font-bold text-gray-900">
                {hopDongList.filter(c => c.trangThai === 'HIEU_LUC').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang bảo trì</p>
              <p className="text-2xl font-bold text-gray-900">
                {hopDongList.filter(c => c.xe.trangThai === 'BAO_TRI' || c.xe.trangThai === 'SUA_CHUA').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-gray-50 rounded-lg">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã kết thúc</p>
              <p className="text-2xl font-bold text-gray-900">
                {hopDongList.filter(c => c.trangThai === 'DA_KET_THUC').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách hợp đồng */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách hợp đồng
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã hợp đồng
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biển số xe
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên nhóm
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái xe
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái HĐ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hopDongList.map((hopDong) => (
                <tr
                  key={hopDong.hopDongId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {hopDong.maHopDong}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {hopDong.xe.bienSo}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hopDong.xe.model}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hopDong.tenNhom}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getTrangThaiXeBadge(hopDong.xe.trangThai)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(hopDong.ngayBatDau)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(hopDong.trangThai)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(hopDong)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Xem chi tiết
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal chi tiết hợp đồng */}
      {isDetailOpen && selectedHopDong && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Chi tiết hợp đồng: {selectedHopDong.maHopDong}
                </h2>
                <button
                  onClick={closeDetail}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Thông tin hợp đồng */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin hợp đồng
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã hợp đồng:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.maHopDong}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tên nhóm:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.tenNhom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã nhóm:</span>
                      <span className="font-medium text-gray-900">NHOM-{selectedHopDong.nhomId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày bắt đầu:</span>
                      <span className="font-medium text-gray-900">{formatDate(selectedHopDong.ngayBatDau)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày kết thúc:</span>
                      <span className="font-medium text-gray-900">
                        {selectedHopDong.ngayKetThuc ? formatDate(selectedHopDong.ngayKetThuc) : 'Chưa xác định'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      {getStatusBadge(selectedHopDong.trangThai)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">File hợp đồng:</span>
                      <button
                        onClick={() => handleDownloadContract(selectedHopDong.fileHopDong)}
                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        {selectedHopDong.fileHopDong}
                      </button>
                    </div>
                    {selectedHopDong.ghiChu && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ghi chú:</span>
                        <span className="font-medium text-gray-900 text-right max-w-xs">{selectedHopDong.ghiChu}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin xe
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biển số:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.xe.bienSo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.xe.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Màu xe:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.xe.mauXe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Năm sản xuất:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.xe.namSanXuat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dung lượng pin:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.xe.dungLuongPin} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quãng đường tối đa:</span>
                      <span className="font-medium text-gray-900">{selectedHopDong.xe.quangDuongToiDa} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VIN:</span>
                      <span className="font-medium text-gray-900 font-mono text-sm">{selectedHopDong.xe.vin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái xe:</span>
                      {getTrangThaiXeBadge(selectedHopDong.xe.trangThai)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thành viên hợp đồng */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thành viên hợp đồng
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên thành viên
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tỷ lệ sở hữu
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số điện thoại
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại thành viên
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedHopDong.thanhVien.map((thanhVien) => (
                        <tr key={thanhVien.thanhVienId} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {thanhVien.tenThanhVien}
                            {thanhVien.isCurrentUser && (
                              <span className="ml-2 text-xs text-blue-600">(Bạn)</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {thanhVien.tyLeSoHuu}%
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {thanhVien.email}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {thanhVien.soDienThoai}
                          </td>
                          <td className="px-4 py-3">
                            {thanhVien.isCurrentUser ? (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
                                Người dùng hiện tại
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full border border-gray-200">
                                Thành viên
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">

                <button
                  onClick={closeDetail}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QLHopDongPhapLyPage;