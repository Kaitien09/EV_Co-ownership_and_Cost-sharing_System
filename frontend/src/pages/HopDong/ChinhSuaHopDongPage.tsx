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

const ChinhSuaHopDongPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Dữ liệu mẫu - giả lập API call
  const mockHopDongData: HopDongDongSoHuu[] = [
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
    }
  ];

  const [hopDong, setHopDong] = useState<HopDongDongSoHuu | null>(null);
  const [newThanhVien, setNewThanhVien] = useState({
    tenThanhVien: "",
    tyLeSoHuu: 0,
    email: "",
    soDienThoai: ""
  });
  const [showAddMember, setShowAddMember] = useState(false);

  // Load dữ liệu khi component mount
  useEffect(() => {
    const foundHopDong = mockHopDongData.find(hd => hd.hopDongId === parseInt(id || '0'));
    if (foundHopDong) {
      setHopDong(foundHopDong);
    }
  }, [id]);

  const handleTenNhomChange = (value: string) => {
    if (hopDong) {
      setHopDong(prev => prev ? { ...prev, tenNhom: value } : null);
    }
  };

  const handleThanhVienChange = (thanhVienId: number, field: string, value: string) => {
    if (hopDong) {
      setHopDong(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          thanhVien: prev.thanhVien.map(tv =>
            tv.thanhVienId === thanhVienId
              ? {
                  ...tv,
                  [field]: field === 'tyLeSoHuu' ? parseInt(value) || 0 : value
                }
              : tv
          )
        };
      });
    }
  };

  const handleNewThanhVienChange = (field: string, value: string) => {
    setNewThanhVien(prev => ({
      ...prev,
      [field]: field === 'tyLeSoHuu' ? parseInt(value) || 0 : value
    }));
  };

  const addThanhVien = () => {
    if (!hopDong) return;

    if (!newThanhVien.tenThanhVien || !newThanhVien.email || !newThanhVien.soDienThoai) {
      alert("Vui lòng điền đầy đủ thông tin thành viên");
      return;
    }

    const newMember: ThanhVienHopDong = {
      thanhVienId: Math.max(...hopDong.thanhVien.map(tv => tv.thanhVienId)) + 1,
      tenThanhVien: newThanhVien.tenThanhVien,
      tyLeSoHuu: newThanhVien.tyLeSoHuu,
      email: newThanhVien.email,
      soDienThoai: newThanhVien.soDienThoai,
      isCurrentUser: false
    };

    setHopDong(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        thanhVien: [...prev.thanhVien, newMember]
      };
    });

    setNewThanhVien({ tenThanhVien: "", tyLeSoHuu: 0, email: "", soDienThoai: "" });
    setShowAddMember(false);
  };

  const removeThanhVien = (thanhVienId: number) => {
    if (!hopDong) return;

    if (hopDong.thanhVien.length <= 2) {
      alert("Hợp đồng phải có ít nhất 2 thành viên");
      return;
    }

    const memberToRemove = hopDong.thanhVien.find(tv => tv.thanhVienId === thanhVienId);
    if (memberToRemove?.isCurrentUser) {
      alert("Bạn không thể xóa chính mình khỏi hợp đồng");
      return;
    }

    setHopDong(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        thanhVien: prev.thanhVien.filter(tv => tv.thanhVienId !== thanhVienId)
      };
    });
  };

  const calculateTotalTyLe = () => {
    if (!hopDong) return 0;
    return hopDong.thanhVien.reduce((sum, tv) => sum + tv.tyLeSoHuu, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hopDong) return;

    if (calculateTotalTyLe() !== 100) {
      alert("Tổng tỷ lệ sở hữu phải bằng 100%");
      return;
    }

    // Mock update
    console.log("Cập nhật hợp đồng:", hopDong);
    alert("Cập nhật hợp đồng thành công!");
    navigate(`/hop-dong/${id}`);
  };

  const handleCancel = () => {
    navigate(`/hop-dong/${id}`);
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

  if (!hopDong) {
    return (
      <div className="p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy hợp đồng</p>
          <button onClick={handleCancel} className="mt-4 text-blue-600 hover:text-blue-800">
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={handleCancel} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại chi tiết
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Chỉnh sửa Hợp đồng</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Thông tin hợp đồng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin hợp đồng</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mã hợp đồng</label>
              <input
                type="text"
                value={hopDong.maHopDong}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên nhóm *</label>
              <input
                type="text"
                value={hopDong.tenNhom}
                onChange={(e) => handleTenNhomChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu</label>
              <input
                type="text"
                value={new Date(hopDong.ngayBatDau).toLocaleDateString('vi-VN')}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái hợp đồng</label>
              <div className="px-3 py-2">
                <span className={`px-3 py-1 text-sm rounded-full border ${
                  hopDong.trangThai === 'DangHieuLuc'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                }`}>
                  {hopDong.trangThai === 'DangHieuLuc' ? 'Đang hiệu lực' : 'Đã kết thúc'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin xe */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin xe</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biển số xe</label>
              <input
                type="text"
                value={hopDong.xe.bienSo}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                value={hopDong.xe.model}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">VIN</label>
              <input
                type="text"
                value={hopDong.xe.vin}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái xe</label>
              <div className="mt-1">{getTrangThaiXeBadge(hopDong.xe.trangThai)}</div>
            </div>
          </div>
        </div>

        {/* Thành viên hợp đồng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Thành viên hợp đồng</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Tổng tỷ lệ: <span className={`font-medium ${calculateTotalTyLe() !== 100 ? 'text-red-600' : 'text-green-600'}`}>
                  {calculateTotalTyLe()}%
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowAddMember(true)}
                className="text-blue-600 text-sm flex items-center font-medium hover:text-blue-700"
              >
                + Thêm thành viên
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {hopDong.thanhVien.map((thanhVien, index) => (
              <div key={thanhVien.thanhVienId} className={`border rounded-lg p-4 ${
                thanhVien.isCurrentUser ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">Thành viên {index + 1}</p>
                    {thanhVien.isCurrentUser && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Bạn</span>}
                  </div>
                  {!thanhVien.isCurrentUser && hopDong.thanhVien.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeThanhVien(thanhVien.thanhVienId)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên thành viên *</label>
                    <input
                      type="text"
                      value={thanhVien.tenThanhVien}
                      onChange={(e) => handleThanhVienChange(thanhVien.thanhVienId, 'tenThanhVien', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tỷ lệ sở hữu (%) *</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={thanhVien.tyLeSoHuu}
                      onChange={(e) => handleThanhVienChange(thanhVien.thanhVienId, 'tyLeSoHuu', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={thanhVien.email}
                      onChange={(e) => handleThanhVienChange(thanhVien.thanhVienId, 'email', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      value={thanhVien.soDienThoai}
                      onChange={(e) => handleThanhVienChange(thanhVien.thanhVienId, 'soDienThoai', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form thêm thành viên mới */}
          {showAddMember && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-md font-semibold mb-3 text-green-800">Thêm thành viên mới</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên thành viên *</label>
                  <input
                    type="text"
                    value={newThanhVien.tenThanhVien}
                    onChange={(e) => handleNewThanhVienChange('tenThanhVien', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Nguyễn Văn C"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tỷ lệ sở hữu (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newThanhVien.tyLeSoHuu}
                    onChange={(e) => handleNewThanhVienChange('tyLeSoHuu', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={newThanhVien.email}
                    onChange={(e) => handleNewThanhVienChange('email', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="c.nguyen@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    value={newThanhVien.soDienThoai}
                    onChange={(e) => handleNewThanhVienChange('soDienThoai', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="0934567890"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={addThanhVien}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Thêm thành viên
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {calculateTotalTyLe() !== 100 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">⚠️ Tổng tỷ lệ sở hữu phải bằng 100%. Hiện tại: {calculateTotalTyLe()}%</p>
            </div>
          )}

          <div className="flex gap-3 pt-6 mt-6 border-t">
            <button
              type="submit"
              disabled={calculateTotalTyLe() !== 100}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Cập nhật hợp đồng
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Hủy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChinhSuaHopDongPage;