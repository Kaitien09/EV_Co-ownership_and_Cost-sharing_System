import { useState } from "react";
import { useParams, useNavigate } from "react-router";

interface LichSuQuy {
  lichSuQuyId: number;
  soTien: number;
  loaiGiaoDich: 'Thu' | 'Chi';
  ngayGiaoDich: string;
  moTa: string;
}

interface ChiPhi {
  chiPhiId: number;
  loaiChiPhi: 'PhiSacDien' | 'BaoDuong' | 'BaoHiem' | 'DangKiem' | 'VeSinh' | 'Khac';
  soTien: number;
  ngayPhatSinh: string;
  ghiChu: string;
  trangThai: 'ChuaThanhToan' | 'DaThanhToan';
}

const QuyChungPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [soDuQuy, setSoDuQuy] = useState(15000000);
  const [lichSuQuy, setLichSuQuy] = useState<LichSuQuy[]>([
    {
      lichSuQuyId: 1,
      soTien: 2000000,
      loaiGiaoDich: 'Thu',
      ngayGiaoDich: "2024-01-20T10:00:00",
      moTa: "Đóng quỹ tháng 1/2024"
    },
    {
      lichSuQuyId: 2,
      soTien: 500000,
      loaiGiaoDich: 'Chi',
      ngayGiaoDich: "2024-01-18T14:30:00",
      moTa: "Chi phí sạc điện"
    }
  ]);

  const [chiPhiList, setChiPhiList] = useState<ChiPhi[]>([
    {
      chiPhiId: 1,
      loaiChiPhi: 'BaoDuong',
      soTien: 1500000,
      ngayPhatSinh: "2024-01-25",
      ghiChu: "Bảo dưỡng định kỳ",
      trangThai: 'ChuaThanhToan'
    },
    {
      chiPhiId: 2,
      loaiChiPhi: 'PhiSacDien',
      soTien: 500000,
      ngayPhatSinh: "2024-01-20",
      ghiChu: "Tiền điện tháng 1",
      trangThai: 'DaThanhToan'
    }
  ]);

  const [showThemChiPhi, setShowThemChiPhi] = useState(false);
  const [newChiPhi, setNewChiPhi] = useState({
    loaiChiPhi: 'PhiSacDien' as 'PhiSacDien' | 'BaoDuong' | 'BaoHiem' | 'DangKiem' | 'VeSinh' | 'Khac',
    soTien: 0,
    ngayPhatSinh: new Date().toISOString().split('T')[0],
    ghiChu: ""
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getLoaiChiPhiText = (loaiChiPhi: string) => {
    const map: { [key: string]: string } = {
      'PhiSacDien': 'Phí sạc điện',
      'BaoDuong': 'Bảo dưỡng',
      'BaoHiem': 'Bảo hiểm',
      'DangKiem': 'Đăng kiểm',
      'VeSinh': 'Vệ sinh',
      'Khac': 'Khác'
    };
    return map[loaiChiPhi] || loaiChiPhi;
  };

  const handleThemChiPhi = () => {
    if (!newChiPhi.soTien || newChiPhi.soTien <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    const chiPhiMoi: ChiPhi = {
      chiPhiId: Math.max(...chiPhiList.map(cp => cp.chiPhiId)) + 1,
      loaiChiPhi: newChiPhi.loaiChiPhi,
      soTien: newChiPhi.soTien,
      ngayPhatSinh: newChiPhi.ngayPhatSinh,
      ghiChu: newChiPhi.ghiChu,
      trangThai: 'ChuaThanhToan'
    };

    setChiPhiList(prev => [chiPhiMoi, ...prev]);
    setNewChiPhi({
      loaiChiPhi: 'PhiSacDien',
      soTien: 0,
      ngayPhatSinh: new Date().toISOString().split('T')[0],
      ghiChu: ""
    });
    setShowThemChiPhi(false);
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={() => navigate(`/nhom/${id}`)} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại nhóm
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Quỹ chung</h1>
      </div>

      {/* Số dư quỹ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-600 mb-2">Số dư quỹ hiện tại</div>
          <div className="text-4xl font-bold text-green-600 mb-4">{formatCurrency(soDuQuy)}</div>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
              Nộp quỹ
            </button>
            <button
              onClick={() => setShowThemChiPhi(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Thêm chi phí
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lịch sử quỹ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Lịch sử quỹ</h3>

          <div className="space-y-3">
            {lichSuQuy.map((lichSu) => (
              <div key={lichSu.lichSuQuyId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{lichSu.moTa}</div>
                  <div className="text-sm text-gray-600">{formatDate(lichSu.ngayGiaoDich)}</div>
                </div>
                <div className={`font-semibold ${
                  lichSu.loaiGiaoDich === 'Thu' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {lichSu.loaiGiaoDich === 'Thu' ? '+' : '-'}{formatCurrency(lichSu.soTien)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chi phí */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Chi phí</h3>
            <button
              onClick={() => setShowThemChiPhi(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Thêm chi phí
            </button>
          </div>

          <div className="space-y-3">
            {chiPhiList.map((chiPhi) => (
              <div key={chiPhi.chiPhiId} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-800">{getLoaiChiPhiText(chiPhi.loaiChiPhi)}</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(chiPhi.ngayPhatSinh)} • {chiPhi.ghiChu}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">{formatCurrency(chiPhi.soTien)}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      chiPhi.trangThai === 'DaThanhToan'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {chiPhi.trangThai === 'DaThanhToan' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal thêm chi phí */}
      {showThemChiPhi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-sm max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Thêm chi phí mới</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại chi phí *</label>
                <select
                  value={newChiPhi.loaiChiPhi}
                  onChange={(e) => setNewChiPhi(prev => ({ ...prev, loaiChiPhi: e.target.value as any }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="PhiSacDien">Phí sạc điện</option>
                  <option value="BaoDuong">Bảo dưỡng</option>
                  <option value="BaoHiem">Bảo hiểm</option>
                  <option value="DangKiem">Đăng kiểm</option>
                  <option value="VeSinh">Vệ sinh</option>
                  <option value="Khac">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền *</label>
                <input
                  type="number"
                  value={newChiPhi.soTien}
                  onChange={(e) => setNewChiPhi(prev => ({ ...prev, soTien: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày phát sinh</label>
                <input
                  type="date"
                  value={newChiPhi.ngayPhatSinh}
                  onChange={(e) => setNewChiPhi(prev => ({ ...prev, ngayPhatSinh: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                <textarea
                  value={newChiPhi.ghiChu}
                  onChange={(e) => setNewChiPhi(prev => ({ ...prev, ghiChu: e.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Mô tả chi phí..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleThemChiPhi}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Thêm chi phí
              </button>
              <button
                onClick={() => setShowThemChiPhi(false)}
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

export default QuyChungPage;