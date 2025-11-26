import { useState } from "react";
import { useParams, useNavigate } from "react-router";

interface BoPhieu {
  boPhieuId: number;
  tieuDe: string;
  ngayTao: string;
  trangThai: 'DangBau' | 'DaKetThuc';
  soLuongDongY: number;
  soLuongKhongDongY: number;
  daBauChua: boolean;
}

const BoPhieuPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [boPhieuList, setBoPhieuList] = useState<BoPhieu[]>([
    {
      boPhieuId: 1,
      tieuDe: "Nâng cấp pin xe điện",
      ngayTao: "2024-01-20T10:00:00",
      trangThai: 'DangBau',
      soLuongDongY: 1,
      soLuongKhongDongY: 0,
      daBauChua: false
    },
    {
      boPhieuId: 2,
      tieuDe: "Mua bảo hiểm mới",
      ngayTao: "2024-01-18T14:30:00",
      trangThai: 'DaKetThuc',
      soLuongDongY: 2,
      soLuongKhongDongY: 0,
      daBauChua: true
    }
  ]);

  const [showTaoBoPhieu, setShowTaoBoPhieu] = useState(false);
  const [newBoPhieu, setNewBoPhieu] = useState({
    tieuDe: "",
    moTa: ""
  });

  const handleTaoBoPhieu = () => {
    if (!newBoPhieu.tieuDe) {
      alert("Vui lòng nhập tiêu đề bỏ phiếu");
      return;
    }

    const boPhieuMoi: BoPhieu = {
      boPhieuId: Math.max(...boPhieuList.map(bp => bp.boPhieuId)) + 1,
      tieuDe: newBoPhieu.tieuDe,
      ngayTao: new Date().toISOString(),
      trangThai: 'DangBau',
      soLuongDongY: 0,
      soLuongKhongDongY: 0,
      daBauChua: false
    };

    setBoPhieuList(prev => [boPhieuMoi, ...prev]);
    setNewBoPhieu({ tieuDe: "", moTa: "" });
    setShowTaoBoPhieu(false);
  };

  const handleBauPhieu = (boPhieuId: number, luaChon: 'DongY' | 'KhongDongY') => {
    setBoPhieuList(prev =>
      prev.map(bp =>
        bp.boPhieuId === boPhieuId
          ? {
              ...bp,
              daBauChua: true,
              soLuongDongY: luaChon === 'DongY' ? bp.soLuongDongY + 1 : bp.soLuongDongY,
              soLuongKhongDongY: luaChon === 'KhongDongY' ? bp.soLuongKhongDongY + 1 : bp.soLuongKhongDongY
            }
          : bp
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getTrangThaiBadge = (trangThai: string) => {
    return trangThai === 'DangBau'
      ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Đang bầu</span>
      : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Đã kết thúc</span>;
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={() => navigate(`/nhom/${id}`)} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại nhóm
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Bỏ phiếu / Quyết định chung</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Danh sách bỏ phiếu</h3>
          <button
            onClick={() => setShowTaoBoPhieu(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Tạo bỏ phiếu
          </button>
        </div>

        <div className="space-y-4">
          {boPhieuList.map((boPhieu) => (
            <div key={boPhieu.boPhieuId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{boPhieu.tieuDe}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Ngày tạo: {formatDate(boPhieu.ngayTao)}</span>
                    {getTrangThaiBadge(boPhieu.trangThai)}
                  </div>
                </div>
              </div>

              {/* Kết quả bỏ phiếu */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Đồng ý: {boPhieu.soLuongDongY}</span>
                  <span>Không đồng ý: {boPhieu.soLuongKhongDongY}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(boPhieu.soLuongDongY / (boPhieu.soLuongDongY + boPhieu.soLuongKhongDongY || 1)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Nút bỏ phiếu */}
              {boPhieu.trangThai === 'DangBau' && !boPhieu.daBauChua && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleBauPhieu(boPhieu.boPhieuId, 'DongY')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={() => handleBauPhieu(boPhieu.boPhieuId, 'KhongDongY')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Không đồng ý
                  </button>
                </div>
              )}

              {boPhieu.daBauChua && (
                <div className="text-sm text-green-600 font-medium">
                  ✓ Bạn đã bỏ phiếu cho đề xuất này
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal tạo bỏ phiếu */}
      {showTaoBoPhieu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-sm max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Tạo bỏ phiếu mới</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
                <input
                  type="text"
                  value={newBoPhieu.tieuDe}
                  onChange={(e) => setNewBoPhieu(prev => ({ ...prev, tieuDe: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ví dụ: Nâng cấp pin xe điện"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea
                  value={newBoPhieu.moTa}
                  onChange={(e) => setNewBoPhieu(prev => ({ ...prev, moTa: e.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Mô tả chi tiết về đề xuất..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleTaoBoPhieu}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Tạo bỏ phiếu
              </button>
              <button
                onClick={() => setShowTaoBoPhieu(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
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

export default BoPhieuPage;