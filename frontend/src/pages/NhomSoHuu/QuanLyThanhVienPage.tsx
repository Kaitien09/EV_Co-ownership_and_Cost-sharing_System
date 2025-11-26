import { useState } from "react";
import { useParams, useNavigate } from "react-router";

interface ThanhVienNhom {
  thanhVienNhomId: number;
  chuXeId: number;
  tenChuXe: string;
  email: string;
  soDienThoai: string;
  tyLeSoHuu: number;
  vaiTro: 'TruongNhom' | 'ThanhVien';
  ngayThamGia: string;
}

const QuanLyThanhVienPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [thanhVien, setThanhVien] = useState<ThanhVienNhom[]>([
    {
      thanhVienNhomId: 1,
      chuXeId: 1,
      tenChuXe: "Nguyễn Văn A",
      email: "a.nguyen@email.com",
      soDienThoai: "0912345678",
      tyLeSoHuu: 60,
      vaiTro: 'TruongNhom',
      ngayThamGia: "2024-01-15T00:00:00"
    },
    {
      thanhVienNhomId: 2,
      chuXeId: 2,
      tenChuXe: "Trần Thị B",
      email: "b.tran@email.com",
      soDienThoai: "0923456789",
      tyLeSoHuu: 40,
      vaiTro: 'ThanhVien',
      ngayThamGia: "2024-01-15T00:00:00"
    }
  ]);

  const [showThemThanhVien, setShowThemThanhVien] = useState(false);
  const [newMember, setNewMember] = useState({
    tenChuXe: "",
    email: "",
    soDienThoai: "",
    tyLeSoHuu: 0,
    vaiTro: 'ThanhVien' as 'TruongNhom' | 'ThanhVien'
  });

  const handleThemThanhVien = () => {
    if (!newMember.tenChuXe || !newMember.email || !newMember.soDienThoai) {
      alert("Vui lòng điền đầy đủ thông tin thành viên");
      return;
    }

    const totalTyLe = thanhVien.reduce((sum, tv) => sum + tv.tyLeSoHuu, 0) + newMember.tyLeSoHuu;
    if (totalTyLe > 100) {
      alert("Tổng tỷ lệ sở hữu không được vượt quá 100%");
      return;
    }

    const newThanhVien: ThanhVienNhom = {
      thanhVienNhomId: Math.max(...thanhVien.map(tv => tv.thanhVienNhomId)) + 1,
      chuXeId: Math.max(...thanhVien.map(tv => tv.chuXeId)) + 1,
      tenChuXe: newMember.tenChuXe,
      email: newMember.email,
      soDienThoai: newMember.soDienThoai,
      tyLeSoHuu: newMember.tyLeSoHuu,
      vaiTro: newMember.vaiTro,
      ngayThamGia: new Date().toISOString()
    };

    setThanhVien(prev => [...prev, newThanhVien]);
    setNewMember({ tenChuXe: "", email: "", soDienThoai: "", tyLeSoHuu: 0, vaiTro: 'ThanhVien' });
    setShowThemThanhVien(false);
  };

  const handleXoaThanhVien = (thanhVienNhomId: number) => {
    if (thanhVien.length <= 2) {
      alert("Nhóm phải có ít nhất 2 thành viên");
      return;
    }

    const memberToRemove = thanhVien.find(tv => tv.thanhVienNhomId === thanhVienNhomId);
    if (memberToRemove?.vaiTro === 'TruongNhom') {
      alert("Không thể xóa trưởng nhóm");
      return;
    }

    setThanhVien(prev => prev.filter(tv => tv.thanhVienNhomId !== thanhVienNhomId));
  };

  const handlePhanQuyen = (thanhVienNhomId: number, vaiTroMoi: 'TruongNhom' | 'ThanhVien') => {
    if (vaiTroMoi === 'TruongNhom') {
      // Chỉ có 1 trưởng nhóm
      setThanhVien(prev =>
        prev.map(tv => ({
          ...tv,
          vaiTro: tv.thanhVienNhomId === thanhVienNhomId ? 'TruongNhom' : 'ThanhVien'
        }))
      );
    } else {
      setThanhVien(prev =>
        prev.map(tv =>
          tv.thanhVienNhomId === thanhVienNhomId
            ? { ...tv, vaiTro: vaiTroMoi }
            : tv
        )
      );
    }
  };

  const getVaiTroBadge = (vaiTro: string) => {
    return vaiTro === 'TruongNhom'
      ? <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Trưởng nhóm</span>
      : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Thành viên</span>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={() => navigate(`/nhom/${id}`)} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại nhóm
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Quản lý thành viên</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Danh sách thành viên</h3>
          <button
            onClick={() => setShowThemThanhVien(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Thêm thành viên
          </button>
        </div>

        <div className="space-y-4">
          {thanhVien.map((tv) => (
            <div key={tv.thanhVienNhomId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {tv.tenChuXe.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{tv.tenChuXe}</span>
                      {getVaiTroBadge(tv.vaiTro)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tv.email} • {tv.soDienThoai}
                    </div>
                    <div className="text-sm text-gray-500">
                      Tham gia: {formatDate(tv.ngayThamGia)} • Tỷ lệ: {tv.tyLeSoHuu}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Phân quyền */}
                  <select
                    value={tv.vaiTro}
                    onChange={(e) => handlePhanQuyen(tv.thanhVienNhomId, e.target.value as 'TruongNhom' | 'ThanhVien')}
                    className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="ThanhVien">Thành viên</option>
                    <option value="TruongNhom">Trưởng nhóm</option>
                  </select>

                  {/* Xóa thành viên */}
                  {tv.vaiTro !== 'TruongNhom' && thanhVien.length > 2 && (
                    <button
                      onClick={() => handleXoaThanhVien(tv.thanhVienNhomId)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal thêm thành viên */}
        {showThemThanhVien && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-sm max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Thêm thành viên mới</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên thành viên *</label>
                  <input
                    type="text"
                    value={newMember.tenChuXe}
                    onChange={(e) => setNewMember(prev => ({ ...prev, tenChuXe: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Nguyễn Văn C"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="c.nguyen@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    value={newMember.soDienThoai}
                    onChange={(e) => setNewMember(prev => ({ ...prev, soDienThoai: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="0934567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tỷ lệ sở hữu (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newMember.tyLeSoHuu}
                    onChange={(e) => setNewMember(prev => ({ ...prev, tyLeSoHuu: parseInt(e.target.value) || 0 }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                  <select
                    value={newMember.vaiTro}
                    onChange={(e) => setNewMember(prev => ({ ...prev, vaiTro: e.target.value as 'TruongNhom' | 'ThanhVien' }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="ThanhVien">Thành viên</option>
                    <option value="TruongNhom">Trưởng nhóm</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleThemThanhVien}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Thêm thành viên
                </button>
                <button
                  onClick={() => setShowThemThanhVien(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuanLyThanhVienPage;