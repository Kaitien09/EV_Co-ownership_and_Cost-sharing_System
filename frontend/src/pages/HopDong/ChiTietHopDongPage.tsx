import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { hopDongService, HopDongDongSoHuu } from "../../services/hopDongService";
import { thanhVienService, ThanhVienNhom } from "../../services/thanhVienService";
import { nhomService } from "../../services/nhomService";

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

const ChiTietHopDongPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [hopDong, setHopDong] = useState<HopDongDongSoHuuExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  // Load dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hopDongId = parseInt(id || '0');

        if (!hopDongId) {
          throw new Error('ID hợp đồng không hợp lệ');
        }

        let hopDongData: HopDongDongSoHuu;
        let nhomData: any;
        let thanhVienData: ThanhVienNhom[] = [];

        try {
          // Thử lấy hợp đồng từ API
          hopDongData = await hopDongService.getById(hopDongId);
        } catch (err) {
          console.warn('Không thể lấy hợp đồng từ API, sử dụng dữ liệu mẫu');
          // Fallback: Sử dụng dữ liệu mẫu
          hopDongData = {
            hopDongId: hopDongId,
            nhom: {
              nhomId: hopDongId,
              tenNhom: `Nhóm Đồng Sở Hữu ${hopDongId}`
            },
            xe: {
              xeId: hopDongId,
              bienSo: `29A-${10000 + hopDongId}`,
              model: "Tesla Model 3",
              vin: `1HGCM82633A${100000 + hopDongId}`
            },
            ngayBatDau: new Date().toISOString(),
            trangThai: 'HIEU_LUC'
          } as HopDongDongSoHuu;
        }

        try {
          // Thử lấy thông tin nhóm
          nhomData = await nhomService.getNhomById(hopDongData.nhom.nhomId);
        } catch (err) {
          console.warn('Không thể lấy thông tin nhóm từ API');
          nhomData = { tenNhom: hopDongData.nhom.tenNhom };
        }

        try {
          // Thử lấy danh sách thành viên
          thanhVienData = await thanhVienService.getByNhom(hopDongData.nhom.nhomId);
        } catch (err) {
          console.warn('Không thể lấy danh sách thành viên từ API, sử dụng dữ liệu mẫu');
          // Fallback: Dữ liệu thành viên mẫu
          thanhVienData = [
            {
              thanhVienNhomId: 1,
              nhom: { nhomId: hopDongData.nhom.nhomId, tenNhom: hopDongData.nhom.tenNhom },
              chuXe: { chuXeId: 1, hoTen: "Nguyễn Văn A", sdt: "0912345678" },
              xe: { xeId: hopDongData.xe.xeId, model: hopDongData.xe.model, bienSo: hopDongData.xe.bienSo },
              tyLeSoHuu: 60,
              vaiTro: 'TRUONG_NHOM' as const,
              ngayThamGia: new Date().toISOString()
            },
            {
              thanhVienNhomId: 2,
              nhom: { nhomId: hopDongData.nhom.nhomId, tenNhom: hopDongData.nhom.tenNhom },
              chuXe: { chuXeId: 2, hoTen: "Trần Thị B", sdt: "0923456789" },
              xe: { xeId: hopDongData.xe.xeId, model: hopDongData.xe.model, bienSo: hopDongData.xe.bienSo },
              tyLeSoHuu: 40,
              vaiTro: 'THANH_VIEN' as const,
              ngayThamGia: new Date().toISOString()
            }
          ] as ThanhVienNhom[];
        }

        // Transform dữ liệu để phù hợp với giao diện
        const transformedHopDong: HopDongDongSoHuuExtended = {
          hopDongId: hopDongData.hopDongId,
          maHopDong: `HD${hopDongData.hopDongId.toString().padStart(3, '0')}`,
          nhomId: hopDongData.nhom.nhomId,
          tenNhom: nhomData.tenNhom || hopDongData.nhom.tenNhom,
          ngayBatDau: hopDongData.ngayBatDau,
          ngayKetThuc: hopDongData.ngayKetThuc || null,
          trangThai: hopDongData.trangThai === 'HIEU_LUC' ? 'DangHieuLuc' : 'DaKetThuc',
          xe: {
            xeId: hopDongData.xe.xeId,
            bienSo: hopDongData.xe.bienSo,
            model: hopDongData.xe.model,
            // Các trường mặc định cho đến khi có API xe chi tiết
            dungLuongPin: 75,
            hinhAnh: "/images/tesla-model3.jpg",
            mauXe: "Đỏ",
            moTa: "Xe điện cao cấp",
            namSanXuat: 2024,
            quangDuongToiDa: 500,
            trangThai: 'DANG_SU_DUNG',
            vin: hopDongData.xe.vin || "1HGCM82633A123456"
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

        setHopDong(transformedHopDong);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu hợp đồng');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setError('Không tìm thấy ID hợp đồng');
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return "Ngày không hợp lệ";
    }
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

  const handleEdit = () => navigate(`/hop-dong/${id}/chinh-sua`);
  const handleBack = () => navigate("/hop-dong");

  const handleLeaveContract = () => {
    setShowConfirmLeave(true);
  };

  const confirmLeave = async () => {
    try {
      if (!hopDong) return;

      const currentUserMember = hopDong.thanhVien.find(tv => tv.isCurrentUser);
      if (currentUserMember) {
        await thanhVienService.removeThanhVien(currentUserMember.thanhVienId);
        alert("Bạn đã rời khỏi hợp đồng thành công!");
        navigate("/hop-dong");
      }
    } catch (err) {
      console.error('Lỗi khi rời khỏi hợp đồng:', err);
      alert('Rời khỏi hợp đồng thất bại');
    } finally {
      setShowConfirmLeave(false);
    }
  };

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

  if (error || !hopDong) {
    return (
      <div className="p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Không tìm thấy hợp đồng"}</p>
          <button onClick={handleBack} className="text-blue-600 hover:text-blue-800">
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const currentUserMember = hopDong.thanhVien.find(tv => tv.isCurrentUser);

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={handleBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại danh sách
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Chi tiết Hợp đồng</h1>
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

      {/* Thành viên hợp đồng */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Thành viên hợp đồng & Tỷ lệ sở hữu</h3>
        <div className="space-y-4">
          {hopDong.thanhVien.map((thanhVien, index) => (
            <div key={thanhVien.thanhVienId} className={`border rounded-lg p-4 ${
              thanhVien.isCurrentUser ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-gray-800">Thành viên {index + 1}</p>
                {thanhVien.isCurrentUser && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Bạn</span>}
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Tên:</span> {thanhVien.tenThanhVien}</p>
                <p><span className="font-medium">Tỷ lệ:</span> {thanhVien.tyLeSoHuu}%</p>
                <p><span className="font-medium">Email:</span> {thanhVien.email}</p>
                <p><span className="font-medium">SĐT:</span> {thanhVien.soDienThoai}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-6 mt-6 border-t">
          <button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
            Chỉnh sửa hợp đồng
          </button>

          {currentUserMember && (
            <button
              onClick={handleLeaveContract}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Rời khỏi hợp đồng
            </button>
          )}

          <button onClick={handleBack} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
            Đóng
          </button>
        </div>
      </div>

      {/* Modal xác nhận rời khỏi */}
      {showConfirmLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-sm max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Xác nhận rời khỏi hợp đồng</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn rời khỏi hợp đồng <span className="font-semibold">{hopDong.maHopDong}</span>?
              Tỷ lệ sở hữu của bạn sẽ được tự động phân bổ lại cho các thành viên còn lại.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmLeave}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Xác nhận rời khỏi
              </button>
              <button
                onClick={() => setShowConfirmLeave(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChiTietHopDongPage;