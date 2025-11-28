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
  trangThai: 'DangHieuLuc' | 'DaKetThuc';
  thanhVien: ThanhVienHopDong[];
}

const QLHopDongPhapLyPage: React.FC = () => {
  const [selectedHopDong, setSelectedHopDong] = useState<HopDongDongSoHuu | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [hopDongList] = useState<HopDongDongSoHuu[]>([
    {
      hopDongId: 1,
      maHopDong: "HD001",
      nhomId: 101,
      xe: {
        xeId: 1,
        bienSo: "29A-12345",
        dungLuongPin: 75,
        hinhAnh: "/images/tesla-model3.jpg",
        mauXe: "Đỏ",
        moTa: "Xe điện cao cấp",
        model: "Tesla Model 3",
        namSanXuat: 2024,
        quangDuongToiDa: 500,
        trangThai: "DANG_SU_DUNG",
        vin: "1HGCM82633A123456"
      },
      tenNhom: "Nhóm Đồng Sở Hữu EV 01",
      ngayBatDau: "2024-01-15T00:00:00",
      ngayKetThuc: null,
      trangThai: 'DangHieuLuc',
      thanhVien: [
        {
          thanhVienId: 1,
          tenThanhVien: "Nguyễn Văn A",
          tyLeSoHuu: 60,
          email: "a.nguyen@email.com",
          soDienThoai: "0912345678",
          isCurrentUser: true
        },
        {
          thanhVienId: 2,
          tenThanhVien: "Trần Thị B",
          tyLeSoHuu: 40,
          email: "b.tran@email.com",
          soDienThoai: "0923456789",
          isCurrentUser: false
        }
      ]
    },
    {
      hopDongId: 2,
      maHopDong: "HD002",
      nhomId: 102,
      xe: {
        xeId: 2,
        bienSo: "29A-67890",
        dungLuongPin: 64,
        hinhAnh: "/images/vinfast-vfe34.jpg",
        mauXe: "Trắng",
        moTa: "Xe điện Việt Nam",
        model: "VinFast VF e34",
        namSanXuat: 2024,
        quangDuongToiDa: 300,
        trangThai: "SAN_SANG",
        vin: "2FMGK5BC1ABA123456"
      },
      tenNhom: "Nhóm EV Sài Gòn",
      ngayBatDau: "2024-02-01T00:00:00",
      ngayKetThuc: null,
      trangThai: 'DangHieuLuc',
      thanhVien: [
        {
          thanhVienId: 3,
          tenThanhVien: "Lê Văn C",
          tyLeSoHuu: 50,
          email: "c.le@email.com",
          soDienThoai: "0934567890",
          isCurrentUser: false
        },
        {
          thanhVienId: 4,
          tenThanhVien: "Phạm Thị D",
          tyLeSoHuu: 50,
          email: "d.pham@email.com",
          soDienThoai: "0945678901",
          isCurrentUser: false
        }
      ]
    }
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    return status === 'DangHieuLuc'
      ? <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">Đang hiệu lực</span>
      : <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">Đã kết thúc</span>;
  };

  const getTrangThaiXeBadge = (trangThai: string) => {
    const statusMap: { [key: string]: { class: string, text: string } } = {
      'SAN_SANG': { class: 'bg-green-100 text-green-800', text: 'Sẵn sàng' },
      'DANG_SU_DUNG': { class: 'bg-blue-100 text-blue-800', text: 'Đang sử dụng' },
      'BAO_TRI': { class: 'bg-yellow-100 text-yellow-800', text: 'Bảo trì' },
      'SUA_CHUA': { class: 'bg-orange-100 text-orange-800', text: 'Sửa chữa' },
      'NGUNG_HOAT_DONG': { class: 'bg-red-100 text-red-800', text: 'Ngừng hoạt động' }
    };

    const status = statusMap[trangThai] || statusMap['SAN_SANG'];
    return <span className={`px-2 py-1 text-xs rounded-full ${status.class}`}>{status.text}</span>;
  };

  const handleViewDetail = (hopDong: HopDongDongSoHuu) => {
    setSelectedHopDong(hopDong);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedHopDong(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quản lý hợp đồng pháp lý điện tử
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Quản lý và theo dõi các hợp đồng đồng sở hữu xe điện
        </p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng hợp đồng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{hopDongList.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang hiệu lực</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {hopDongList.filter(c => c.trangThai === 'DangHieuLuc').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang bảo trì</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {hopDongList.filter(c => c.xe.trangThai === 'BAO_TRI' || c.xe.trangThai === 'SUA_CHUA').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã kết thúc</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {hopDongList.filter(c => c.trangThai === 'DaKetThuc').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách hợp đồng */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Danh sách hợp đồng
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Mã hợp đồng
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Biển số xe
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Model
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Tên nhóm
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Trạng thái xe
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Ngày bắt đầu
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Trạng thái HĐ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {hopDongList.map((hopDong) => (
                <tr
                  key={hopDong.hopDongId}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleViewDetail(hopDong)}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline cursor-pointer"
                    >
                      {hopDong.maHopDong}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {hopDong.xe.bienSo}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {hopDong.xe.model}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {hopDong.tenNhom}
                  </td>
                  <td className="px-4 py-3">
                    {getTrangThaiXeBadge(hopDong.xe.trangThai)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {formatDate(hopDong.ngayBatDau)}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(hopDong.trangThai)}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Chi tiết hợp đồng: {selectedHopDong.maHopDong}
                </h2>
                <button
                  onClick={closeDetail}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Thông tin hợp đồng */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Thông tin hợp đồng
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Mã hợp đồng:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.maHopDong}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tên nhóm:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.tenNhom}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Ngày bắt đầu:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedHopDong.ngayBatDau)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Ngày kết thúc:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedHopDong.ngayKetThuc ? formatDate(selectedHopDong.ngayKetThuc) : 'Chưa xác định'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Trạng thái:</span>
                        {getStatusBadge(selectedHopDong.trangThai)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Thông tin xe
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Biển số:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.xe.bienSo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Model:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.xe.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Màu xe:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.xe.mauXe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Năm sản xuất:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.xe.namSanXuat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Dung lượng pin:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.xe.dungLuongPin} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Quãng đường tối đa:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedHopDong.xe.quangDuongToiDa} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Trạng thái xe:</span>
                      {getTrangThaiXeBadge(selectedHopDong.xe.trangThai)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thành viên hợp đồng */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Thành viên hợp đồng
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Tên thành viên
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Tỷ lệ sở hữu
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Email
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Số điện thoại
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Loại thành viên
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedHopDong.thanhVien.map((thanhVien) => (
                        <tr key={thanhVien.thanhVienId}>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                            {thanhVien.tenThanhVien}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                            {thanhVien.tyLeSoHuu}%
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                            {thanhVien.email}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                            {thanhVien.soDienThoai}
                          </td>
                          <td className="px-4 py-2">
                            {thanhVien.isCurrentUser ? (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Người dùng hiện tại
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
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

              <div className="flex justify-end mt-6">
                <button
                  onClick={closeDetail}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
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