import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { hopDongService, HopDongDongSoHuu } from "../../services/hopDongService";
import { thanhVienService, ThanhVienNhom } from "../../services/thanhVienService";

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

interface HopDongDongSoHuuExtended {
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

  const [hopDongList, setHopDongList] = useState<HopDongDongSoHuuExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Đang tải danh sách hợp đồng...');

        const allHopDong: HopDongDongSoHuuExtended[] = [];

        try {
          // SỬA: Sử dụng API getAll để lấy tất cả hợp đồng
          const hopDongData = await hopDongService.getAll();
          console.log('Dữ liệu hợp đồng từ API:', hopDongData);

          // Với mỗi hợp đồng, lấy thông tin thành viên
          for (const hd of hopDongData) {
            try {
              const thanhVienData = await thanhVienService.getByNhom(hd.nhom.nhomId);

              const transformedHopDong: HopDongDongSoHuuExtended = {
                hopDongId: hd.hopDongId,
                maHopDong: `HD${hd.hopDongId.toString().padStart(3, '0')}`,
                nhomId: hd.nhom.nhomId,
                tenNhom: hd.nhom.tenNhom,
                ngayBatDau: hd.ngayBatDau,
                ngayKetThuc: hd.ngayKetThuc || null,
                trangThai: hd.trangThai === 'HIEU_LUC' ? 'DangHieuLuc' : 'DaKetThuc',
                xe: {
                  xeId: hd.xe.xeId,
                  bienSo: hd.xe.bienSo,
                  model: hd.xe.model,
                  // Các trường mặc định cho đến khi có API xe chi tiết
                  dungLuongPin: 75,
                  hinhAnh: "/images/tesla-model3.jpg",
                  mauXe: "Đỏ",
                  moTa: "Xe điện cao cấp",
                  namSanXuat: 2024,
                  quangDuongToiDa: 500,
                  trangThai: 'DANG_SU_DUNG',
                  vin: hd.xe.vin || "1HGCM82633A123456"
                },
                thanhVien: thanhVienData.map((tv: ThanhVienNhom, index: number) => ({
                  thanhVienId: tv.thanhVienNhomId,
                  tenThanhVien: tv.chuXe.hoTen,
                  tyLeSoHuu: tv.tyLeSoHuu,
                  email: `${tv.chuXe.hoTen.toLowerCase().replace(/\s+/g, '.')}@email.com`,
                  soDienThoai: tv.chuXe.sdt,
                  isCurrentUser: index === 0
                }))
              };
              allHopDong.push(transformedHopDong);
            } catch (err) {
              console.error(`Lỗi khi tải thành viên cho hợp đồng ${hd.hopDongId}:`, err);
              // Vẫn thêm hợp đồng dù không có thành viên
              const transformedHopDong: HopDongDongSoHuuExtended = {
                hopDongId: hd.hopDongId,
                maHopDong: `HD${hd.hopDongId.toString().padStart(3, '0')}`,
                nhomId: hd.nhom.nhomId,
                tenNhom: hd.nhom.tenNhom,
                ngayBatDau: hd.ngayBatDau,
                ngayKetThuc: hd.ngayKetThuc || null,
                trangThai: hd.trangThai === 'HIEU_LUC' ? 'DangHieuLuc' : 'DaKetThuc',
                xe: {
                  xeId: hd.xe.xeId,
                  bienSo: hd.xe.bienSo,
                  model: hd.xe.model,
                  dungLuongPin: 75,
                  hinhAnh: "/images/tesla-model3.jpg",
                  mauXe: "Đỏ",
                  moTa: "Xe điện cao cấp",
                  namSanXuat: 2024,
                  quangDuongToiDa: 500,
                  trangThai: 'DANG_SU_DUNG',
                  vin: hd.xe.vin || "1HGCM82633A123456"
                },
                thanhVien: [] // Thành viên rỗng nếu có lỗi
              };
              allHopDong.push(transformedHopDong);
            }
          }
        } catch (err) {
          console.error('Lỗi khi gọi API getAll, thử dùng getByNhom:', err);
          // Fallback: dùng cách cũ nếu API getAll chưa có
          const nhomIds = [1, 2];
          for (const nhomId of nhomIds) {
            try {
              const hopDongData = await hopDongService.getByNhom(nhomId);
              const thanhVienData = await thanhVienService.getByNhom(nhomId);

              for (const hd of hopDongData) {
                const transformedHopDong: HopDongDongSoHuuExtended = {
                  hopDongId: hd.hopDongId,
                  maHopDong: `HD${hd.hopDongId.toString().padStart(3, '0')}`,
                  nhomId: hd.nhom.nhomId,
                  tenNhom: hd.nhom.tenNhom,
                  ngayBatDau: hd.ngayBatDau,
                  ngayKetThuc: hd.ngayKetThuc || null,
                  trangThai: hd.trangThai === 'HIEU_LUC' ? 'DangHieuLuc' : 'DaKetThuc',
                  xe: {
                    xeId: hd.xe.xeId,
                    bienSo: hd.xe.bienSo,
                    model: hd.xe.model,
                    dungLuongPin: 75,
                    hinhAnh: "/images/tesla-model3.jpg",
                    mauXe: "Đỏ",
                    moTa: "Xe điện cao cấp",
                    namSanXuat: 2024,
                    quangDuongToiDa: 500,
                    trangThai: 'DANG_SU_DUNG',
                    vin: hd.xe.vin || "1HGCM82633A123456"
                  },
                  thanhVien: thanhVienData.map((tv: ThanhVienNhom, index: number) => ({
                    thanhVienId: tv.thanhVienNhomId,
                    tenThanhVien: tv.chuXe.hoTen,
                    tyLeSoHuu: tv.tyLeSoHuu,
                    email: `${tv.chuXe.hoTen.toLowerCase().replace(/\s+/g, '.')}@email.com`,
                    soDienThoai: tv.chuXe.sdt,
                    isCurrentUser: index === 0
                  }))
                };
                allHopDong.push(transformedHopDong);
              }
            } catch (err) {
              console.error(`Lỗi khi tải dữ liệu nhóm ${nhomId}:`, err);
            }
          }
        }

        console.log('Dữ liệu hợp đồng đã tải:', allHopDong);
        setHopDongList(allHopDong);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Không thể tải danh sách hợp đồng');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]); // Thêm refreshTrigger để có thể reload

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

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

  if (loading) {
    return (
      <div className="p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => window.location.reload()} className="text-blue-600 hover:text-blue-800">
              Thử lại
            </button>
            <button onClick={refreshData} className="text-green-600 hover:text-green-800">
              Làm mới
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quản lý Hợp đồng Đồng Sở Hữu</h1>
      </div>

      <div className="mb-6 flex gap-3">
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
        >
          + Thêm hợp đồng mới
        </button>
        <button
          onClick={refreshData}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
        >
          Làm mới
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {hopDongList.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Chưa có hợp đồng nào</p>
            <button
              onClick={handleAddNew}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Tạo hợp đồng đầu tiên
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default HopDongPage;