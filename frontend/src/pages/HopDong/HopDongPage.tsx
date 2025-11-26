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

const HopDongPage: React.FC = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu với schema mới
  const [hopDongList, setHopDongList] = useState<HopDongDongSoHuu[]>([
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

  const handleAddNew = () => navigate("/hop-dong/tao-moi");
  const handleViewDetail = (hopDongId: number) => navigate(`/hop-dong/${hopDongId}`);

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quản lý Hợp đồng Đồng Sở Hữu</h1>
      </div>

      <div className="mb-6">
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
        >
          + Thêm hợp đồng mới
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã hợp đồng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Biển số xe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên nhóm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái xe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày bắt đầu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái HĐ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hopDongList.map((hopDong) => (
                <tr key={hopDong.hopDongId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetail(hopDong.hopDongId)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                    >
                      {hopDong.maHopDong}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hopDong.xe.bienSo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hopDong.xe.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hopDong.tenNhom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getTrangThaiXeBadge(hopDong.xe.trangThai)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(hopDong.ngayBatDau)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(hopDong.trangThai)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetail(hopDong.hopDongId)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Xem chi tiết
                    </button>
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

export default HopDongPage;