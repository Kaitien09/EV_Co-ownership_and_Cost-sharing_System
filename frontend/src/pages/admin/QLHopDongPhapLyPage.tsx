import { useState } from "react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

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

  const handleViewDetail = (hopDongId: number) => navigate(`/admin/hop-dong-phap-ly/${hopDongId}`);

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
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleViewDetail(hopDong.hopDongId)}
                >
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      {hopDong.maHopDong}
                    </div>
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
    </div>
  );
};

export default QLHopDongPhapLyPage;