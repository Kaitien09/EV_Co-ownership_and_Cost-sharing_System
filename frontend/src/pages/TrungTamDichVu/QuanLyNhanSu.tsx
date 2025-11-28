import { useState } from "react";

const QuanLyNhanSu = () => {
  const [nhanVien, setNhanVien] = useState([
    {
      id: "1",
      ten: "Nguyen Van A",
      viTri: "Kỹ thuật viên Điện",
      ca: "Sáng (8h-12h)",
      hieuSuat: 95,
      gioLam: "40h/tuần",
      chungChi: "CC01",
      chuyenMon: "Điện",
      kinhNghiem: 5,
      email: "kth1@example.com",
      soDienThoai: "0902000001",
      trangThai: "dang-lam"
    },
    {
      id: "2",
      ten: "Le Thi B",
      viTri: "Kỹ thuật viên Cơ Khí",
      ca: "Chiều (13h-17h)",
      hieuSuat: 88,
      gioLam: "38h/tuần",
      chungChi: "CC02",
      chuyenMon: "Cơ Khí",
      kinhNghiem: 3,
      email: "kth2@example.com",
      soDienThoai: "0902000002",
      trangThai: "dang-lam"
    },
    {
      id: "3",
      ten: "Tran Van C",
      viTri: "Kỹ thuật viên Điện Tử",
      ca: "Sáng (8h-12h)",
      hieuSuat: 92,
      gioLam: "36h/tuần",
      chungChi: "CC03",
      chuyenMon: "Điện Tử",
      kinhNghiem: 7,
      email: "kth3@example.com",
      soDienThoai: "0902000003",
      trangThai: "nghi-phep"
    }
  ]);

  const [lichCa, setLichCa] = useState([
    {
      id: "1",
      ten: "Ca sáng",
      gio: "08:00 - 12:00",
      soNhanVien: 2,
      nhanVien: ["Nguyen Van A", "Tran Van C"]
    },
    {
      id: "2",
      ten: "Ca chiều",
      gio: "13:00 - 17:00",
      soNhanVien: 1,
      nhanVien: ["Le Thi B"]
    }
  ]);

  const [showThemNhanVienModal, setShowThemNhanVienModal] = useState(false);
  const [showDoiCaModal, setShowDoiCaModal] = useState(false);
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [selectedNhanVien, setSelectedNhanVien] = useState<any>(null);
  const [newNhanVien, setNewNhanVien] = useState({
    ten: "",
    viTri: "",
    chuyenMon: "",
    chungChi: "",
    kinhNghiem: "",
    email: "",
    soDienThoai: "",
    ca: "Sáng (8h-12h)"
  });

  // Thống kê động
  const thongKe = {
    tongNhanVien: nhanVien.length,
    dangLamViec: nhanVien.filter(nv => nv.trangThai === "dang-lam").length,
    hieuSuatTB: Math.round(nhanVien.reduce((total, nv) => total + nv.hieuSuat, 0) / nhanVien.length),
    tongKinhNghiem: nhanVien.reduce((total, nv) => total + nv.kinhNghiem, 0)
  };

  // Chức năng thêm nhân viên mới
  const handleThemNhanVien = () => {
    if (!newNhanVien.ten || !newNhanVien.viTri || !newNhanVien.chuyenMon) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    const nhanVienMoi = {
      id: (nhanVien.length + 1).toString(),
      ten: newNhanVien.ten,
      viTri: newNhanVien.viTri,
      chuyenMon: newNhanVien.chuyenMon,
      chungChi: newNhanVien.chungChi || "Đang cập nhật",
      kinhNghiem: parseInt(newNhanVien.kinhNghiem) || 0,
      ca: newNhanVien.ca,
      hieuSuat: 85,
      gioLam: "40h/tuần",
      email: newNhanVien.email,
      soDienThoai: newNhanVien.soDienThoai,
      trangThai: "dang-lam"
    };

    // Thêm nhân viên mới
    setNhanVien(prev => [...prev, nhanVienMoi]);

    // Cập nhật lịch ca
    setLichCa(prev => prev.map(ca => {
      const caTen = newNhanVien.ca === "Sáng (8h-12h)" ? "Ca sáng" : "Ca chiều";
      if (ca.ten === caTen) {
        return {
          ...ca,
          nhanVien: [...ca.nhanVien, newNhanVien.ten],
          soNhanVien: ca.nhanVien.length + 1
        };
      }
      return ca;
    }));

    setShowThemNhanVienModal(false);
    setNewNhanVien({
      ten: "",
      viTri: "",
      chuyenMon: "",
      chungChi: "",
      kinhNghiem: "",
      email: "",
      soDienThoai: "",
      ca: "Sáng (8h-12h)"
    });
  };

  // Chức năng xem chi tiết nhân viên
  const handleXemChiTiet = (nhanVien: any) => {
    setSelectedNhanVien(nhanVien);
    setShowChiTietModal(true);
  };

  // Chức năng đổi ca làm việc
  const handleDoiCa = (nhanVien: any) => {
    setSelectedNhanVien(nhanVien);
    setShowDoiCaModal(true);
  };

  // Chức năng cập nhật ca làm việc
  const handleCapNhatCa = () => {
    if (!selectedNhanVien) return;

    const caMoi = (document.getElementById("caMoi") as HTMLSelectElement)?.value;
    if (caMoi) {
      const caCu = selectedNhanVien.ca;

      // Cập nhật ca trong danh sách nhân viên
      setNhanVien(prev => prev.map(nv =>
        nv.id === selectedNhanVien.id ? { ...nv, ca: caMoi } : nv
      ));

      // Cập nhật lịch phân ca
      setLichCa(prev => prev.map(ca => {
        const isCaCu = ca.ten === (caCu === "Sáng (8h-12h)" ? "Ca sáng" : "Ca chiều");
        const isCaMoi = ca.ten === (caMoi === "Sáng (8h-12h)" ? "Ca sáng" : "Ca chiều");

        if (isCaCu) {
          // Xóa khỏi ca cũ
          return {
            ...ca,
            nhanVien: ca.nhanVien.filter(ten => ten !== selectedNhanVien.ten),
            soNhanVien: ca.nhanVien.length - 1
          };
        } else if (isCaMoi) {
          // Thêm vào ca mới
          return {
            ...ca,
            nhanVien: [...ca.nhanVien, selectedNhanVien.ten],
            soNhanVien: ca.nhanVien.length + 1
          };
        }
        return ca;
      }));

      setShowDoiCaModal(false);
      setSelectedNhanVien(null);
    }
  };

  // Chức năng xóa nhân viên
  const handleXoaNhanVien = (nhanVienId: string) => {
    const nhanVienCanXoa = nhanVien.find(nv => nv.id === nhanVienId);
    if (!nhanVienCanXoa) return;

    if (confirm(`Bạn có chắc chắn muốn xóa nhân viên ${nhanVienCanXoa.ten}?`)) {
      // Xóa nhân viên
      setNhanVien(prev => prev.filter(nv => nv.id !== nhanVienId));

      // Cập nhật lịch ca
      setLichCa(prev => prev.map(ca => ({
        ...ca,
        nhanVien: ca.nhanVien.filter(ten => ten !== nhanVienCanXoa.ten),
        soNhanVien: Math.max(0, ca.nhanVien.filter(ten => ten !== nhanVienCanXoa.ten).length)
      })));
    }
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
      }
    }
  };

  // Chức năng cập nhật chứng chỉ
  const handleCapNhatChungChi = (nhanVien: any) => {
    const chungChiMoi = prompt(`Nhập chứng chỉ mới cho ${nhanVien.ten}:`, nhanVien.chungChi);
    if (chungChiMoi !== null) {
      setNhanVien(prev => prev.map(nv =>
        nv.id === nhanVien.id ? { ...nv, chungChi: chungChiMoi } : nv
      ));
    }
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "dang-lam": "bg-green-100 text-green-800 border-green-200",
      "nghi-phep": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "off": "bg-red-100 text-red-800 border-red-200"
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
    if (hieuSuat >= 90) return "text-green-600";
    if (hieuSuat >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getChuyenMonColor = (chuyenMon: string) => {
    const colors = {
      "Điện": "bg-blue-100 text-blue-800",
      "Cơ Khí": "bg-orange-100 text-orange-800",
      "Điện Tử": "bg-purple-100 text-purple-800"
    };
    return colors[chuyenMon as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý Nhân sự
          </h1>
          <p className="text-gray-600">
            Quản lý kỹ thuật viên và phân công công việc
          </p>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-blue-600">{thongKe.tongNhanVien}</div>
            <div className="text-sm text-gray-600">Tổng nhân viên</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-green-600">{thongKe.dangLamViec}</div>
            <div className="text-sm text-gray-600">Đang làm việc</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-yellow-600">{thongKe.hieuSuatTB}%</div>
            <div className="text-sm text-gray-600">Hiệu suất TB</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-purple-600">{thongKe.tongKinhNghiem} năm</div>
            <div className="text-sm text-gray-600">Tổng kinh nghiệm</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Danh sách nhân viên */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Danh sách Kỹ thuật viên
                </h3>
                <button
                  onClick={() => setShowThemNhanVienModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  + Thêm nhân viên
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {nhanVien.map((nv) => (
                  <div key={nv.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center border">
                          <span className="text-gray-600 font-semibold text-lg">
                            {nv.ten.split(' ').pop()?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {nv.ten}
                          </h4>
                          <p className="text-sm text-gray-600">{nv.viTri}</p>
                          <div className="flex gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs ${getChuyenMonColor(nv.chuyenMon)}`}>
                              {nv.chuyenMon}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {nv.kinhNghiem} năm KN
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrangThaiColor(nv.trangThai)}`}>
                        {getTrangThaiText(nv.trangThai)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600">Hiệu suất:</span>
                          <span className={`text-sm font-medium ${getHieuSuatColor(nv.hieuSuat)}`}>
                            {nv.hieuSuat}%
                          </span>
                          <button
                            onClick={() => handleDanhGiaHieuSuat(nv)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            📊
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>Ca làm: </span>
                          <span className="font-medium">{nv.ca}</span>
                          <button
                            onClick={() => handleDoiCa(nv)}
                            className="ml-2 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Đổi ca
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">
                          <span>Chứng chỉ: </span>
                          <span className="font-medium">{nv.chungChi}</span>
                          <button
                            onClick={() => handleCapNhatChungChi(nv)}
                            className="ml-2 text-green-600 hover:text-green-700 text-sm"
                          >
                            Cập nhật
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>Liên hệ: </span>
                          <span className="font-medium">{nv.soDienThoai}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleXemChiTiet(nv)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => handleXoaNhanVien(nv.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lịch ca và thông tin */}
          <div className="space-y-6">
            {/* Lịch ca làm việc */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Lịch phân ca
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {lichCa.map((ca) => (
                    <div key={ca.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-900">
                          {ca.ten}
                        </h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {ca.soNhanVien} người
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        ⏰ {ca.gio}
                      </p>
                      <div className="space-y-2">
                        {ca.nhanVien.map((ten, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-gray-700">{ten}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thống kê chuyên môn */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Phân bổ chuyên môn
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Điện</span>
                    <span className="font-medium">
                      {nhanVien.filter(nv => nv.chuyenMon === "Điện").length} người
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cơ Khí</span>
                    <span className="font-medium">
                      {nhanVien.filter(nv => nv.chuyenMon === "Cơ Khí").length} người
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Điện Tử</span>
                    <span className="font-medium">
                      {nhanVien.filter(nv => nv.chuyenMon === "Điện Tử").length} người
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal thêm nhân viên mới */}
      {showThemNhanVienModal && (
        <div className="fixed inset-0 bg- bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Thêm nhân viên mới</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên *</label>
                <input
                  type="text"
                  value={newNhanVien.ten}
                  onChange={(e) => setNewNhanVien({...newNhanVien, ten: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vị trí *</label>
                <input
                  type="text"
                  value={newNhanVien.viTri}
                  onChange={(e) => setNewNhanVien({...newNhanVien, viTri: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: Kỹ thuật viên Điện"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chuyên môn *</label>
                <select
                  value={newNhanVien.chuyenMon}
                  onChange={(e) => setNewNhanVien({...newNhanVien, chuyenMon: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn chuyên môn</option>
                  <option value="Điện">Điện</option>
                  <option value="Cơ Khí">Cơ Khí</option>
                  <option value="Điện Tử">Điện Tử</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chứng chỉ</label>
                <input
                  type="text"
                  value={newNhanVien.chungChi}
                  onChange={(e) => setNewNhanVien({...newNhanVien, chungChi: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: CC01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kinh nghiệm (năm)</label>
                <input
                  type="number"
                  value={newNhanVien.kinhNghiem}
                  onChange={(e) => setNewNhanVien({...newNhanVien, kinhNghiem: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newNhanVien.email}
                  onChange={(e) => setNewNhanVien({...newNhanVien, email: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  value={newNhanVien.soDienThoai}
                  onChange={(e) => setNewNhanVien({...newNhanVien, soDienThoai: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0902000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ca làm việc</label>
                <select
                  value={newNhanVien.ca}
                  onChange={(e) => setNewNhanVien({...newNhanVien, ca: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Sáng (8h-12h)">Sáng (8h-12h)</option>
                  <option value="Chiều (13h-17h)">Chiều (13h-17h)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleThemNhanVien}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thêm
              </button>
              <button
                onClick={() => {
                  setShowThemNhanVienModal(false);
                  setNewNhanVien({
                    ten: "",
                    viTri: "",
                    chuyenMon: "",
                    chungChi: "",
                    kinhNghiem: "",
                    email: "",
                    soDienThoai: "",
                    ca: "Sáng (8h-12h)"
                  });
                }}
                className="flex-1 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal đổi ca làm việc */}
      {showDoiCaModal && selectedNhanVien && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Đổi ca làm việc</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Nhân viên: <span className="font-medium">{selectedNhanVien.ten}</span></p>
                <p className="text-sm text-gray-600">Ca hiện tại: <span className="font-medium">{selectedNhanVien.ca}</span></p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chọn ca mới</label>
                <select
                  id="caMoi"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={selectedNhanVien.ca}
                >
                  <option value="Sáng (8h-12h)">Sáng (8h-12h)</option>
                  <option value="Chiều (13h-17h)">Chiều (13h-17h)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleCapNhatCa}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cập nhật
              </button>
              <button
                onClick={() => {
                  setShowDoiCaModal(false);
                  setSelectedNhanVien(null);
                }}
                className="flex-1 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết nhân viên */}
      {showChiTietModal && selectedNhanVien && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Chi tiết nhân viên</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Họ tên:</span>
                <span className="font-medium">{selectedNhanVien.ten}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Vị trí:</span>
                <span className="font-medium">{selectedNhanVien.viTri}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Chuyên môn:</span>
                <span className="font-medium">{selectedNhanVien.chuyenMon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Chứng chỉ:</span>
                <span className="font-medium">{selectedNhanVien.chungChi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Kinh nghiệm:</span>
                <span className="font-medium">{selectedNhanVien.kinhNghiem} năm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Hiệu suất:</span>
                <span className={`font-medium ${getHieuSuatColor(selectedNhanVien.hieuSuat)}`}>
                  {selectedNhanVien.hieuSuat}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ca làm:</span>
                <span className="font-medium">{selectedNhanVien.ca}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Email:</span>
                <span className="font-medium">{selectedNhanVien.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Số điện thoại:</span>
                <span className="font-medium">{selectedNhanVien.soDienThoai}</span>
              </div>
            </div>
            <button
              onClick={() => setShowChiTietModal(false)}
              className="w-full mt-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyNhanSu;