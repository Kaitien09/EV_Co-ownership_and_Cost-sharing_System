import { useState } from "react";
import { useNavigate } from "react-router";
import { hopDongService } from "../../services/hopDongService";
import { nhomService } from "../../services/nhomService";
import { thanhVienService } from "../../services/thanhVienService";

interface ThanhVien {
  id: number;
  tenThanhVien: string;
  tyLeSoHuu: number;
  email: string;
  soDienThoai: string;
}

const TaoHopDongPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tenNhom: "",
  });

  const [xeData, setXeData] = useState({
    bienSo: "",
    dungLuongPin: 0,
    hinhAnh: "",
    mauXe: "",
    moTa: "",
    model: "",
    namSanXuat: new Date().getFullYear(),
    quangDuongToiDa: 0,
    trangThai: "SAN_SANG" as 'BAO_TRI' | 'DANG_SU_DUNG' | 'NGUNG_HOAT_DONG' | 'SAN_SANG' | 'SUA_CHUA',
    vin: ""
  });

  const [thanhVienList, setThanhVienList] = useState<ThanhVien[]>([
    { id: 1, tenThanhVien: "", tyLeSoHuu: 0, email: "", soDienThoai: "" },
    { id: 2, tenThanhVien: "", tyLeSoHuu: 0, email: "", soDienThoai: "" }
  ]);

  const [loading, setLoading] = useState(false);

  const handleXeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setXeData(prev => ({
      ...prev,
      [name]: name === 'dungLuongPin' || name === 'namSanXuat' || name === 'quangDuongToiDa'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThanhVienChange = (id: number, field: string, value: string) => {
    setThanhVienList(prev =>
      prev.map(tv =>
        tv.id === id
          ? { ...tv, [field]: field === 'tyLeSoHuu' ? parseInt(value) || 0 : value }
          : tv
      )
    );
  };

  const addThanhVien = () => {
    const newId = Math.max(...thanhVienList.map(tv => tv.id)) + 1;
    setThanhVienList(prev => [
      ...prev,
      { id: newId, tenThanhVien: "", tyLeSoHuu: 0, email: "", soDienThoai: "" }
    ]);
  };

  const removeThanhVien = (id: number) => {
    if (thanhVienList.length > 2) {
      setThanhVienList(prev => prev.filter(tv => tv.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const totalTyLe = thanhVienList.reduce((sum, tv) => sum + tv.tyLeSoHuu, 0);
    if (totalTyLe !== 100) {
      alert("Tổng tỷ lệ sở hữu phải bằng 100%");
      setLoading(false);
      return;
    }

    try {
      // 1. Tạo nhóm mới
      const nhomMoi = await nhomService.createNhom({
        tenNhom: formData.tenNhom
      });

      // 2. Tạo hợp đồng
      const hopDongMoi = await hopDongService.create({
        nhomId: nhomMoi.nhomId,
        xeId: 1, // TODO: Cần API tạo xe trước
        ngayBatDau: new Date().toISOString(),
        fileHopDong: "",
        ghiChu: ""
      });

      // 3. THÊM THÀNH VIÊN VÀO BACKEND
      for (const [index, tv] of thanhVienList.entries()) {
        try {
          await thanhVienService.addThanhVien({
            nhomId: nhomMoi.nhomId,
            chuXeId: index + 1, // Tạm thời dùng index + 1 làm chuXeId
            xeId: 1, // TODO: Cần xeId thực tế
            tyLeSoHuu: tv.tyLeSoHuu,
            vaiTro: index === 0 ? 'TRUONG_NHOM' : 'THANH_VIEN'
          });
          console.log(`Đã thêm thành viên: ${tv.tenThanhVien}`);
        } catch (err) {
          console.error(`Lỗi khi thêm thành viên ${tv.tenThanhVien}:`, err);
        }
      }

      console.log("Tạo hợp đồng thành công:", { nhomMoi, hopDongMoi });
      alert("Tạo hợp đồng thành công!");
      navigate("/hop-dong");
    } catch (err) {
      console.error('Lỗi khi tạo hợp đồng:', err);
      alert('Tạo hợp đồng thất bại: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/hop-dong");
  };

  const calculateTotalTyLe = () => {
    return thanhVienList.reduce((sum, tv) => sum + tv.tyLeSoHuu, 0);
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={handleCancel} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại danh sách
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Tạo Hợp đồng Mới</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Thông tin hợp đồng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin hợp đồng</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên nhóm *</label>
              <input
                type="text"
                name="tenNhom"
                value={formData.tenNhom}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Nhóm Đồng Sở Hữu EV"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu *</label>
              <input
                type="text"
                value={new Date().toLocaleDateString('vi-VN')}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Ngày tạo tự động</p>
            </div>
          </div>

          {/* Thông tin xe */}
          <h4 className="text-md font-semibold mb-4 text-gray-800 border-b pb-2">Thông tin xe</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biển số xe *</label>
              <input
                type="text"
                name="bienSo"
                value={xeData.bienSo}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="29A-12345"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
              <input
                type="text"
                name="model"
                value={xeData.model}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Tesla Model 3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">VIN *</label>
              <input
                type="text"
                name="vin"
                value={xeData.vin}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="1HGCM82633A123456"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Màu xe *</label>
              <input
                type="text"
                name="mauXe"
                value={xeData.mauXe}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Đỏ"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Năm sản xuất *</label>
              <input
                type="number"
                name="namSanXuat"
                value={xeData.namSanXuat}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                min="2000"
                max="2030"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dung lượng pin (kWh) *</label>
              <input
                type="number"
                name="dungLuongPin"
                value={xeData.dungLuongPin}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quãng đường tối đa (km) *</label>
              <input
                type="number"
                name="quangDuongToiDa"
                value={xeData.quangDuongToiDa}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái xe *</label>
              <select
                name="trangThai"
                value={xeData.trangThai}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="SAN_SANG">Sẵn sàng</option>
                <option value="DANG_SU_DUNG">Đang sử dụng</option>
                <option value="BAO_TRI">Bảo trì</option>
                <option value="SUA_CHUA">Sửa chữa</option>
                <option value="NGUNG_HOAT_DONG">Ngừng hoạt động</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
              <input
                type="text"
                name="hinhAnh"
                value={xeData.hinhAnh}
                onChange={handleXeInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="/images/xe.jpg"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <textarea
                name="moTa"
                value={xeData.moTa}
                onChange={handleXeInputChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Mô tả về xe..."
              />
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
                onClick={addThanhVien}
                className="text-blue-600 text-sm flex items-center font-medium hover:text-blue-700"
              >
                + Thêm thành viên
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {thanhVienList.map((thanhVien, index) => (
              <div key={thanhVien.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-blue-800">Thành viên {index + 1}</p>
                  {thanhVienList.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeThanhVien(thanhVien.id)}
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
                      onChange={(e) => handleThanhVienChange(thanhVien.id, 'tenThanhVien', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Nguyễn Văn A"
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
                      onChange={(e) => handleThanhVienChange(thanhVien.id, 'tyLeSoHuu', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={thanhVien.email}
                      onChange={(e) => handleThanhVienChange(thanhVien.id, 'email', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      value={thanhVien.soDienThoai}
                      onChange={(e) => handleThanhVienChange(thanhVien.id, 'soDienThoai', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="0912345678"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {calculateTotalTyLe() !== 100 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">⚠️ Tổng tỷ lệ sở hữu phải bằng 100%. Hiện tại: {calculateTotalTyLe()}%</p>
            </div>
          )}

          <div className="flex gap-3 pt-6 mt-6 border-t">
            <button
              type="submit"
              disabled={calculateTotalTyLe() !== 100 || loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              {loading ? 'Đang tạo...' : 'Tạo hợp đồng'}
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

export default TaoHopDongPage;