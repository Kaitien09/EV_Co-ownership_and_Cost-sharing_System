import { useState } from "react";

const QuanLyNhanSu = () => {
  const [nhanVien, setNhanVien] = useState([
    {
      id: "1",
      ten: "Nguyễn Văn C",
      viTri: "Kỹ thuật viên chính",
      ca: "Sáng (8h-12h)",
      hieuSuat: 95,
      gioLam: "40h/tuần",
      chungChi: ["EV Technician", "Battery Specialist"],
      trangThai: "dang-lam",
      email: "c.nguyen@company.com",
      sdt: "0912345678"
    },
    {
      id: "2",
      ten: "Trần Thị D",
      viTri: "Kỹ thuật viên",
      ca: "Chiều (13h-17h)",
      hieuSuat: 88,
      gioLam: "38h/tuần",
      chungChi: ["EV Technician"],
      trangThai: "dang-lam",
      email: "d.tran@company.com",
      sdt: "0923456789"
    },
    {
      id: "3",
      ten: "Lê Văn E",
      viTri: "Kỹ thuật viên",
      ca: "Sáng (8h-12h)",
      hieuSuat: 92,
      gioLam: "36h/tuần",
      chungChi: ["EV Technician", "Charging System"],
      trangThai: "nghi-phep",
      email: "e.le@company.com",
      sdt: "0934567890"
    }
  ]);

  const [lichCa, setLichCa] = useState([
    {
      id: "1",
      ten: "Ca sáng",
      gio: "08:00 - 12:00",
      soNhanVien: 4,
      nhanVien: ["Nguyễn Văn C", "Lê Văn E", "Phạm Thị F", "Hoàng Văn G"]
    },
    {
      id: "2",
      ten: "Ca chiều",
      gio: "13:00 - 17:00",
      soNhanVien: 3,
      nhanVien: ["Trần Thị D", "Vũ Văn H", "Đỗ Thị I"]
    },
    {
      id: "3",
      ten: "Ca tối",
      gio: "18:00 - 22:00",
      soNhanVien: 2,
      nhanVien: ["Nguyễn Văn J", "Trần Thị K"]
    }
  ]);

  const [showThemNhanVienModal, setShowThemNhanVienModal] = useState(false);
  const [showPhanCongModal, setShowPhanCongModal] = useState(false);
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [selectedNhanVien, setSelectedNhanVien] = useState<any>(null);
  const [selectedCa, setSelectedCa] = useState<any>(null);
  const [newNhanVien, setNewNhanVien] = useState({
    ten: "",
    viTri: "",
    ca: "",
    email: "",
    sdt: ""
  });

  // Thống kê động
  const thongKe = {
    tongNhanVien: nhanVien.length,
    dangLamViec: nhanVien.filter(nv => nv.trangThai === "dang-lam").length,
    hieuSuatTB: Math.round(nhanVien.reduce((total, nv) => total + nv.hieuSuat, 0) / nhanVien.length)
  };

  // Chức năng thêm nhân viên
  const handleThemNhanVien = () => {
    if (!newNhanVien.ten || !newNhanVien.viTri || !newNhanVien.ca) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    const nhanVienMoi = {
      id: (nhanVien.length + 1).toString(),
      ten: newNhanVien.ten,
      viTri: newNhanVien.viTri,
      ca: newNhanVien.ca,
      hieuSuat: 85, // Mặc định
      gioLam: "40h/tuần",
      chungChi: ["Đang đào tạo"],
      trangThai: "dang-lam",
      email: newNhanVien.email,
      sdt: newNhanVien.sdt
    };

    setNhanVien(prev => [...prev, nhanVienMoi]);
    setShowThemNhanVienModal(false);
    setNewNhanVien({ ten: "", viTri: "", ca: "", email: "", sdt: "" });
    alert("Đã thêm nhân viên mới thành công!");
  };

  // Chức năng xem chi tiết nhân viên
  const handleXemChiTiet = (nhanVien: any) => {
    setSelectedNhanVien(nhanVien);
    setShowChiTietModal(true);
  };

  // Chức năng chỉnh sửa nhân viên
  const handleChinhSua = (nhanVien: any) => {
    alert(`Chức năng chỉnh sửa nhân viên: ${nhanVien.ten}\n\n(Tính năng đang phát triển)`);
  };

  // Chức năng xóa nhân viên
  const handleXoaNhanVien = (nhanVienId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      setNhanVien(prev => prev.filter(nv => nv.id !== nhanVienId));
      alert("Đã xóa nhân viên thành công!");
    }
  };

  // Chức năng phân công ca
  const handlePhanCongCa = (ca: any) => {
    setSelectedCa(ca);
    setShowPhanCongModal(true);
  };

  // Chức năng cập nhật phân công
  const handleCapNhatPhanCong = () => {
    alert(`Đã cập nhật phân công ca ${selectedCa.ten}!\n\n(Tính năng đang phát triển)`);
    setShowPhanCongModal(false);
  };

  // Chức năng đánh giá hiệu suất
  const handleDanhGiaHieuSuat = (nhanVien: any) => {
    const newHieuSuat = prompt(`Nhập hiệu suất mới cho ${nhanVien.ten} (0-100):`, nhanVien.hieuSuat.toString());
    if (newHieuSuat && !isNaN(parseInt(newHieuSuat))) {
      const hieuSuat = parseInt(newHieuSuat);
      if (hieuSuat >= 0 && hieuSuat <= 100) {
        setNhanVien(prev => prev.map(nv =>
          nv.id === nhanVien.id ? { ...nv, hieuSuat } : nv
        ));
        alert(`Đã cập nhật hiệu suất cho ${nhanVien.ten} thành ${hieuSuat}%`);
      } else {
        alert("Hiệu suất phải từ 0 đến 100!");
      }
    }
  };

  // Chức năng thêm chứng chỉ
  const handleThemChungChi = (nhanVien: any) => {
    const chungChiMoi = prompt(`Nhập chứng chỉ mới cho ${nhanVien.ten}:`);
    if (chungChiMoi && chungChiMoi.trim() !== "") {
      setNhanVien(prev => prev.map(nv =>
        nv.id === nhanVien.id ? {
          ...nv,
          chungChi: [...nv.chungChi, chungChiMoi.trim()]
        } : nv
      ));
      alert(`Đã thêm chứng chỉ "${chungChiMoi}" cho ${nhanVien.ten}`);
    }
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "dang-lam": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
      "nghi-phep": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
      "off": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
    };
    return colors[trangThai as keyof typeof colors];
  };

  const getTrangThaiText = (trangThai: string) => {
    const texts = {
      "dang-lam": "Đang làm",
      "nghi-phep": "Nghỉ phép",
      "off": "Nghỉ"
    };
    return texts[trangThai as keyof typeof texts];
  };

  const getHieuSuatColor = (hieuSuat: number) => {
    if (hieuSuat >= 90) return "text-green-600 dark:text-green-400";
    if (hieuSuat >= 80) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý Nhân sự
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Phân công kỹ thuật viên, theo dõi hiệu suất và chứng chỉ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">{thongKe.tongNhanVien}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tổng nhân viên</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">{thongKe.dangLamViec}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Đang làm việc</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600">{thongKe.hieuSuatTB}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Hiệu suất TB</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Danh sách nhân viên */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Danh sách Nhân viên ({nhanVien.length})
              </h3>
              <button
                onClick={() => setShowThemNhanVienModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
              >
                + Thêm nhân viên
              </button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {nhanVien.map((nv) => (
                <div key={nv.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900/20">
                        <span className="text-lg">👨‍🔧</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {nv.ten}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {nv.viTri} • {nv.ca}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(nv.trangThai)}`}>
                      {getTrangThaiText(nv.trangThai)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Hiệu suất:</span>
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${getHieuSuatColor(nv.hieuSuat)}`}>
                          {nv.hieuSuat}%
                        </p>
                        <button
                          onClick={() => handleDanhGiaHieuSuat(nv)}
                          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          📊
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Giờ làm:</span>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {nv.gioLam}
                      </p>
                    </div>
                  </div>

                  {/* Chứng chỉ */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Chứng chỉ:</span>
                      <button
                        onClick={() => handleThemChungChi(nv)}
                        className="text-xs text-green-600 hover:text-green-700 dark:text-green-400"
                      >
                        + Thêm
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {nv.chungChi.map((chungChi, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs dark:bg-purple-900/20 dark:text-purple-300"
                        >
                          {chungChi}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nút thao tác */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleXemChiTiet(nv)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 transition-colors"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleChinhSua(nv)}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleXoaNhanVien(nv.id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lịch ca làm việc */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Lịch phân ca
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {lichCa.map((ca) => (
                  <div key={ca.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {ca.ten}
                      </h4>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs dark:bg-blue-900/20 dark:text-blue-300">
                          {ca.soNhanVien} người
                        </span>
                        <button
                          onClick={() => handlePhanCongCa(ca)}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 transition-colors"
                        >
                          Phân công
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      ⏰ {ca.gio}
                    </p>
                    <div className="space-y-2">
                      {ca.nhanVien.map((ten, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-700 dark:text-gray-300">{ten}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Thống kê hiệu suất */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  📈 Hiệu suất tuần
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-400">Hoàn thành dịch vụ:</span>
                    <span className="font-medium">142/150</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-400">Đánh giá khách hàng:</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-400">Thời gian TB:</span>
                    <span className="font-medium">45 phút</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal thêm nhân viên */}
      {showThemNhanVienModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Thêm nhân viên mới</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên *</label>
                <input
                  type="text"
                  value={newNhanVien.ten}
                  onChange={(e) => setNewNhanVien({...newNhanVien, ten: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vị trí *</label>
                <select
                  value={newNhanVien.viTri}
                  onChange={(e) => setNewNhanVien({...newNhanVien, viTri: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Chọn vị trí</option>
                  <option value="Kỹ thuật viên chính">Kỹ thuật viên chính</option>
                  <option value="Kỹ thuật viên">Kỹ thuật viên</option>
                  <option value="Tư vấn viên">Tư vấn viên</option>
                  <option value="Quản lý">Quản lý</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ca làm *</label>
                <select
                  value={newNhanVien.ca}
                  onChange={(e) => setNewNhanVien({...newNhanVien, ca: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Chọn ca làm</option>
                  <option value="Sáng (8h-12h)">Sáng (8h-12h)</option>
                  <option value="Chiều (13h-17h)">Chiều (13h-17h)</option>
                  <option value="Tối (18h-22h)">Tối (18h-22h)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newNhanVien.email}
                  onChange={(e) => setNewNhanVien({...newNhanVien, email: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  value={newNhanVien.sdt}
                  onChange={(e) => setNewNhanVien({...newNhanVien, sdt: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleThemNhanVien}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowThemNhanVienModal(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết nhân viên */}
      {showChiTietModal && selectedNhanVien && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Chi tiết nhân viên</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Họ tên:</span>
                <p className="font-medium">{selectedNhanVien.ten}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Vị trí:</span>
                <p className="font-medium">{selectedNhanVien.viTri}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Ca làm:</span>
                <p className="font-medium">{selectedNhanVien.ca}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Hiệu suất:</span>
                <p className={`font-medium ${getHieuSuatColor(selectedNhanVien.hieuSuat)}`}>
                  {selectedNhanVien.hieuSuat}%
                </p>
              </div>
              {selectedNhanVien.email && (
                <div>
                  <span className="text-sm text-gray-500">Email:</span>
                  <p className="font-medium">{selectedNhanVien.email}</p>
                </div>
              )}
              {selectedNhanVien.sdt && (
                <div>
                  <span className="text-sm text-gray-500">Số điện thoại:</span>
                  <p className="font-medium">{selectedNhanVien.sdt}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">Chứng chỉ:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedNhanVien.chungChi.map((cc: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {cc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowChiTietModal(false)}
              className="w-full mt-6 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Modal phân công ca */}
      {showPhanCongModal && selectedCa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Phân công ca {selectedCa.ten}</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Thời gian: {selectedCa.gio}</p>
              <label className="block text-sm font-medium mb-2">Nhân viên hiện tại:</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedCa.nhanVien.map((ten: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{ten}</span>
                    <button className="text-red-500 hover:text-red-700 text-sm">✕</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCapNhatPhanCong}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Cập nhật
              </button>
              <button
                onClick={() => setShowPhanCongModal(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
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

export default QuanLyNhanSu;