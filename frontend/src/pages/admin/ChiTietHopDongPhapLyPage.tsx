import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

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

const ChiTietHopDongPhapLyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hopDong, setHopDong] = useState<HopDongDongSoHuu | null>(null);

  // Dữ liệu mẫu - trong thực tế sẽ gọi API
  useEffect(() => {
    const mockData: HopDongDongSoHuu[] = [
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
            isCurrentUser: false
          },
          {
            thanhVienId: 2,
            tenThanhVien: "Trần Thị B",
            tyLeSoHuu: 40,
            email: "b.tran@email.com",
            soDienThoai: "0923456789",
            isCurrentUser: false
          },
          {
            thanhVienId: 3,
            tenThanhVien: "Lê Văn C",
            tyLeSoHuu: 25,
            email: "c.le@email.com",
            soDienThoai: "0934567890",
            isCurrentUser: false
          },
          {
            thanhVienId: 4,
            tenThanhVien: "Phạm Thị D",
            tyLeSoHuu: 15,
            email: "d.pham@email.com",
            soDienThoai: "0945678901",
            isCurrentUser: false
          }
        ]
      }
    ];

    const foundHopDong = mockData.find(hd => hd.hopDongId === parseInt(id || '0'));
    setHopDong(foundHopDong || null);
  }, [id]);

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

  const handleBack = () => navigate("/admin/ql-hd");

  if (!hopDong) {
    return (
      <div className="p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy hợp đồng</p>
          <button onClick={handleBack} className="mt-4 text-blue-600 hover:text-blue-800">
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={handleBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại danh sách
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Chi tiết Hợp đồng Pháp lý</h1>
        <p className="text-gray-600 mt-2">Quản lý thông tin hợp đồng và thành viên</p>
      </div>

      {/* Thông tin hợp đồng */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin hợp đồng</h3>
        <div className="grid grid-cols-2 gap-6">
          <div><label className="text-sm font-medium text-gray-600">Mã hợp đồng</label><p className="text-lg font-semibold">{hopDong.maHopDong}</p></div>
          <div><label className="text-sm font-medium text-gray-600">Tên nhóm</label><p className="text-lg font-semibold">{hopDong.tenNhom}</p></div>
          <div><label className="text-sm font-medium text-gray-600">Ngày bắt đầu</label><p className="text-lg font-semibold">{formatDate(hopDong.ngayBatDau)}</p></div>
          <div><label className="text-sm font-medium text-gray-600">Trạng thái hợp đồng</label><div className="mt-1">{getStatusBadge(hopDong.trangThai)}</div></div>
        </div>
      </div>

      {/* Thông tin xe */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin xe</h3>
        <div className="grid grid-cols-2 gap-6">
          <div><label className="text-sm font-medium text-gray-600">Biển số xe</label><p className="text-lg font-semibold">{hopDong.xe.bienSo}</p></div>
          <div><label className="text-sm font-medium text-gray-600">Model</label><p className="text-lg font-semibold">{hopDong.xe.model}</p></div>
          <div><label className="text-sm font-medium text-gray-600">VIN</label><p className="text-lg font-semibold font-mono">{hopDong.xe.vin}</p></div>
          <div><label className="text-sm font-medium text-gray-600">Màu xe</label><p className="text-lg font-semibold">{hopDong.xe.mauXe}</p></div>
          <div><label className="text-sm font-medium text-gray-600">Năm sản xuất</label><p className="text-lg font-semibold">{hopDong.xe.namSanXuat}</p></div>
          <div><label className="text-sm font-medium text-gray-600">Dung lượng pin</label><p className="text-lg font-semibold">{hopDong.xe.dungLuongPin} kWh</p></div>
          <div><label className="text-sm font-medium text-gray-600">Quãng đường tối đa</label><p className="text-lg font-semibold">{hopDong.xe.quangDuongToiDa} km</p></div>
          <div><label className="text-sm font-medium text-gray-600">Trạng thái xe</label><div className="mt-1">{getTrangThaiXeBadge(hopDong.xe.trangThai)}</div></div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-600">Mô tả</label>
            <p className="text-lg font-semibold">{hopDong.xe.moTa}</p>
          </div>
        </div>
      </div>

      {/* Thành viên hợp đồng - View dành cho Admin */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Danh sách thành viên</h3>
          <div className="text-sm text-gray-600">
            Tổng: {hopDong.thanhVien.length} thành viên
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên thành viên</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tỷ lệ sở hữu</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hopDong.thanhVien.map((thanhVien, index) => (
                <tr key={thanhVien.thanhVienId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{thanhVien.tenThanhVien}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{thanhVien.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{thanhVien.soDienThoai}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${thanhVien.tyLeSoHuu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{thanhVien.tyLeSoHuu}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Đang hoạt động
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                  Tổng tỷ lệ:
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-bold text-gray-900">
                    {hopDong.thanhVien.reduce((total, tv) => total + tv.tyLeSoHuu, 0)}%
                  </span>
                </td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Thống kê tổng quan */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{hopDong.thanhVien.length}</div>
            <div className="text-sm text-gray-600">Tổng thành viên</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...hopDong.thanhVien.map(tv => tv.tyLeSoHuu))}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ cao nhất</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.min(...hopDong.thanhVien.map(tv => tv.tyLeSoHuu))}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ thấp nhất</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietHopDongPhapLyPage;