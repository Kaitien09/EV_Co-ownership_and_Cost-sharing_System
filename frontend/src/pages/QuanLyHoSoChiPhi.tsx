import { useState } from "react";

const QuanLyHoSoChiPhi = () => {
  const [activeTab, setActiveTab] = useState<'ho-so' | 'chi-phi' | 'thanh-toan'>('ho-so');

  // Danh sách xe
  const [danhSachXe, setDanhSachXe] = useState([
    {
      id: "1",
      bienSo: "29A-12345",
      model: "VinFast VF e34",
      chuXe: "Nguyễn Văn A",
      soKm: 14500,
      ngayDangKiem: "15/03/2025",
      namSanXuat: 2023,
      mauXe: "Trắng",
      soKhung: "VF123456789012345",
      ngayMua: "15/01/2023"
    },
    {
      id: "2",
      bienSo: "29A-67890",
      model: "VinFast VF 8",
      chuXe: "Trần Thị B",
      soKm: 8900,
      ngayDangKiem: "20/04/2025",
      namSanXuat: 2024,
      mauXe: "Đen",
      soKhung: "VF987654321098765",
      ngayMua: "20/02/2024"
    }
  ]);

  // Lịch sử bảo dưỡng
  const [lichSuBaoDuong, setLichSuBaoDuong] = useState([
    {
      id: "1",
      xeId: "1",
      maDichVu: "BD-001",
      tenDichVu: "Bảo dưỡng định kỳ 15,000km",
      ngayThucHien: "15/11/2024",
      soKm: 15000,
      trungTam: "Trung tâm Dịch vụ Quận 1",
      chiPhi: 1850000,
      trangThai: "hoan-tat",
      chiTiet: [
        { ten: "Thay dầu hộp số điện", donGia: 450000 },
        { ten: "Thay lọc gió cabin", donGia: 280000 },
        { ten: "Kiểm tra hệ thống ắc quy", donGia: 350000 },
        { ten: "Cân chỉnh hệ thống phanh", donGia: 420000 },
        { ten: "Cập nhật phần mềm", donGia: 350000 }
      ],
      ghiChu: "Xe vận hành tốt, ắc quy ổn định"
    },
    {
      id: "2",
      xeId: "1",
      maDichVu: "SC-002",
      tenDichVu: "Sửa chữa hệ thống phanh",
      ngayThucHien: "10/10/2024",
      soKm: 13200,
      trungTam: "Trung tâm Dịch vụ Quận 7",
      chiPhi: 3250000,
      trangThai: "hoan-tat",
      chiTiet: [
        { ten: "Thay má phanh trước", donGia: 1200000 },
        { ten: "Thay đĩa phanh", donGia: 1850000 },
        { ten: "Cân chỉnh phanh tái sinh", donGia: 200000 }
      ],
      ghiChu: "Má phanh mòn 80%, đề nghị thay thế"
    },
    {
      id: "3",
      xeId: "2",
      maDichVu: "BD-003",
      tenDichVu: "Bảo dưỡng định kỳ 10,000km",
      ngayThucHien: "05/11/2024",
      soKm: 10000,
      trungTam: "Trung tâm Dịch vụ Thủ Đức",
      chiPhi: 1650000,
      trangThai: "hoan-tat",
      chiTiet: [
        { ten: "Thay dầu hộp số điện", donGia: 450000 },
        { ten: "Vệ sinh hệ thống làm mát", donGia: 380000 },
        { ten: "Kiểm tra hệ thống sạc", donGia: 420000 },
        { ten: "Cân chỉnh áp suất lốp", donGia: 150000 },
        { ten: "Cập nhật phần mềm", donGia: 250000 }
      ],
      ghiChu: "Hệ thống sạc hoạt động tốt"
    }
  ]);

  // Hóa đơn chờ thanh toán
  const [hoaDonChoThanhToan, setHoaDonChoThanhToan] = useState([
    {
      id: "4",
      xeId: "1",
      maDichVu: "BD-004",
      tenDichVu: "Thay ắc quy Lithium",
      ngayThucHien: "20/11/2024",
      soKm: 15500,
      trungTam: "Trung tâm Dịch vụ Quận 1",
      chiPhi: 15650000,
      trangThai: "cho-thanh-toan",
      chiTiet: [
        { ten: "Ắc quy Lithium 40kWh", donGia: 14500000 },
        { ten: "Nhân công thay thế", donGia: 850000 },
        { ten: "Cân bằng cell ắc quy", donGia: 300000 }
      ],
      ghiChu: "Ắc quy xuống cấp, hiệu suất còn 65%"
    }
  ]);

  // Phương thức thanh toán
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState([
    {
      id: "1",
      ten: "Ví điện tử MoMo",
      icon: "💰",
      phiDichVu: 0
    },
    {
      id: "2",
      ten: "ZaloPay",
      icon: "💳",
      phiDichVu: 0
    },
    {
      id: "3",
      ten: "Thẻ ngân hàng",
      icon: "🏦",
      phiDichVu: 1.5
    },
    {
      id: "4",
      ten: "Chuyển khoản",
      icon: "📱",
      phiDichVu: 0
    },
    {
      id: "5",
      ten: "Tiền mặt",
      icon: "💵",
      phiDichVu: 0
    }
  ]);

  const [selectedXe, setSelectedXe] = useState("1");
  const [selectedHoaDon, setSelectedHoaDon] = useState<any>(null);
  const [showModalThanhToan, setShowModalThanhToan] = useState(false);
  const [showModalChiTiet, setShowModalChiTiet] = useState(false);
  const [phuongThucTT, setPhuongThucTT] = useState("1");

  // Thống kê
  const thongKeChiPhi = {
    tongChiPhi: lichSuBaoDuong.reduce((total, item) => total + item.chiPhi, 0),
    chiPhiThangNay: lichSuBaoDuong
      .filter(item => {
        const thang = new Date().getMonth() + 1;
        const nam = new Date().getFullYear();
        const [ngay, thangItem, namItem] = item.ngayThucHien.split('/');
        return parseInt(thangItem) === thang && parseInt(namItem) === nam;
      })
      .reduce((total, item) => total + item.chiPhi, 0),
    soLanBaoDuong: lichSuBaoDuong.length,
    choThanhToan: hoaDonChoThanhToan.reduce((total, item) => total + item.chiPhi, 0)
  };

  // Format tiền
  const formatTien = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Lấy lịch sử theo xe
  const getLichSuTheoXe = (xeId: string) => {
    return lichSuBaoDuong.filter(item => item.xeId === xeId);
  };

  // Xem chi tiết hóa đơn
  const handleXemChiTiet = (hoaDon: any) => {
    setSelectedHoaDon(hoaDon);
    setShowModalChiTiet(true);
  };

  // Thanh toán hóa đơn
  const handleThanhToan = (hoaDon: any) => {
    setSelectedHoaDon(hoaDon);
    setShowModalThanhToan(true);
  };

  // Xác nhận thanh toán
  const handleXacNhanThanhToan = () => {
    if (!selectedHoaDon) return;

    // Chuyển hóa đơn từ chờ thanh toán sang lịch sử
    setHoaDonChoThanhToan(prev => prev.filter(item => item.id !== selectedHoaDon.id));
    setLichSuBaoDuong(prev => [...prev, { ...selectedHoaDon, trangThai: "hoan-tat" }]);

    setShowModalThanhToan(false);
    alert("Thanh toán thành công! Cảm ơn quý khách.");
  };

  // Lấy xe được chọn
  const xeSelected = danhSachXe.find(xe => xe.id === selectedXe);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý Hồ sơ & Chi phí
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Theo dõi lịch sử bảo dưỡng và quản lý chi phí dịch vụ
        </p>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">
            {formatTien(thongKeChiPhi.tongChiPhi)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tổng chi phí</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">
            {formatTien(thongKeChiPhi.chiPhiThangNay)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chi phí tháng này</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600">
            {thongKeChiPhi.soLanBaoDuong}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Số lần bảo dưỡng</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-orange-600">
            {formatTien(thongKeChiPhi.choThanhToan)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chờ thanh toán</div>
        </div>
      </div>

      {/* Chọn xe */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Chọn xe để xem thông tin
        </label>
        <select
          value={selectedXe}
          onChange={(e) => setSelectedXe(e.target.value)}
          className="w-full md:w-96 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {danhSachXe.map((xe) => (
            <option key={xe.id} value={xe.id}>
              {xe.bienSo} - {xe.model} ({xe.chuXe})
            </option>
          ))}
        </select>
      </div>

      {/* Tab điều hướng */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('ho-so')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ho-so'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              📁 Hồ sơ xe
            </button>
            <button
              onClick={() => setActiveTab('chi-phi')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chi-phi'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              💰 Lịch sử chi phí
            </button>
            <button
              onClick={() => setActiveTab('thanh-toan')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'thanh-toan'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              💳 Thanh toán
            </button>
          </nav>
        </div>
      </div>

      {/* Tab: Hồ sơ xe */}
      {activeTab === 'ho-so' && xeSelected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin xe */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Thông tin xe
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Biển số
                    </label>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {xeSelected.bienSo}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Model
                    </label>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {xeSelected.model}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Chủ xe
                    </label>
                    <p className="text-gray-800 dark:text-white">{xeSelected.chuXe}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Số km hiện tại
                    </label>
                    <p className="text-gray-800 dark:text-white">{xeSelected.soKm.toLocaleString()} km</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Năm sản xuất
                    </label>
                    <p className="text-gray-800 dark:text-white">{xeSelected.namSanXuat}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Màu xe
                    </label>
                    <p className="text-gray-800 dark:text-white">{xeSelected.mauXe}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số khung
                  </label>
                  <p className="text-gray-800 dark:text-white font-mono">{xeSelected.soKhung}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ngày mua
                    </label>
                    <p className="text-gray-800 dark:text-white">{xeSelected.ngayMua}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ngày đăng kiểm
                    </label>
                    <p className="text-gray-800 dark:text-white">{xeSelected.ngayDangKiem}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thống kê bảo dưỡng */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Thống kê bảo dưỡng
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Tổng chi phí</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {formatTien(
                      getLichSuTheoXe(selectedXe).reduce((total, item) => total + item.chiPhi, 0)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Số lần bảo dưỡng</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {getLichSuTheoXe(selectedXe).length} lần
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Lần bảo dưỡng gần nhất</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {getLichSuTheoXe(selectedXe)[0]?.ngayThucHien || "Chưa có"}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Số km trung bình/lần</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {getLichSuTheoXe(selectedXe).length > 0
                      ? Math.round(
                          getLichSuTheoXe(selectedXe).reduce((total, item) => total + item.soKm, 0) /
                          getLichSuTheoXe(selectedXe).length
                        ).toLocaleString()
                      : 0} km
                  </span>
                </div>
              </div>

              {/* Lịch bảo dưỡng đề xuất */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                  Lịch bảo dưỡng đề xuất
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm">Bảo dưỡng 20,000km</span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      ~ {((20000 - xeSelected.soKm) > 0 ? (20000 - xeSelected.soKm).toLocaleString() : "0")} km nữa
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm">Bảo dưỡng 30,000km</span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      ~ {((30000 - xeSelected.soKm) > 0 ? (30000 - xeSelected.soKm).toLocaleString() : "0")} km nữa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Lịch sử chi phí */}
      {activeTab === 'chi-phi' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Lịch sử bảo dưỡng & Chi phí
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {getLichSuTheoXe(selectedXe).length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔧</div>
                <p className="text-gray-500 dark:text-gray-400">Chưa có lịch sử bảo dưỡng</p>
              </div>
            ) : (
              getLichSuTheoXe(selectedXe).map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {item.maDichVu} - {item.tenDichVu}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.trungTam} • {item.ngayThucHien} • {item.soKm.toLocaleString()} km
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg text-green-600 dark:text-green-400">
                        {formatTien(item.chiPhi)}
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900/20 dark:text-green-300">
                        Hoàn tất
                      </span>
                    </div>
                  </div>

                  {item.ghiChu && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      📝 {item.ghiChu}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleXemChiTiet(item)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Xem chi tiết
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.chiTiet.length} hạng mục
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab: Thanh toán */}
      {activeTab === 'thanh-toan' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Hóa đơn chờ thanh toán
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {hoaDonChoThanhToan.filter(item => item.xeId === selectedXe).length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">✅</div>
                <p className="text-gray-500 dark:text-gray-400">Không có hóa đơn chờ thanh toán</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Tất cả hóa đơn đã được thanh toán
                </p>
              </div>
            ) : (
              hoaDonChoThanhToan
                .filter(item => item.xeId === selectedXe)
                .map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {item.maDichVu} - {item.tenDichVu}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.trungTam} • {item.ngayThucHien} • {item.soKm.toLocaleString()} km
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg text-orange-600 dark:text-orange-400">
                        {formatTien(item.chiPhi)}
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full dark:bg-orange-900/20 dark:text-orange-300">
                        Chờ thanh toán
                      </span>
                    </div>
                  </div>

                  {item.ghiChu && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      📝 {item.ghiChu}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleXemChiTiet(item)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => handleThanhToan(item)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        💳 Thanh toán ngay
                      </button>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.chiTiet.length} hạng mục
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal chi tiết hóa đơn - ĐÃ XÓA PHẦN HEADER SEARCH */}
      {showModalChiTiet && selectedHoaDon && (
        <div className="fixed inset-0 bg-black bg-opacity-400 flex items-center justify-center z-200">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {selectedHoaDon.maDichVu}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {selectedHoaDon.tenDichVu}
                </p>
              </div>
              <button
                onClick={() => setShowModalChiTiet(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Thông tin chung - ĐÃ XÓA PHẦN SEARCH */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trung tâm thực hiện
                  </label>
                  <p className="text-gray-800 dark:text-white">{selectedHoaDon.trungTam}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ngày thực hiện
                  </label>
                  <p className="text-gray-800 dark:text-white">{selectedHoaDon.ngayThucHien}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số km
                  </label>
                  <p className="text-gray-800 dark:text-white">{selectedHoaDon.soKm.toLocaleString()} km</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trạng thái
                  </label>
                  <span className={`px-3 py-1 rounded-full text-sm border ${
                    selectedHoaDon.trangThai === "hoan-tat"
                      ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                      : "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
                  }`}>
                    {selectedHoaDon.trangThai === "hoan-tat" ? "Đã thanh toán" : "Chờ thanh toán"}
                  </span>
                </div>
              </div>
            </div>

            {/* Đường phân cách */}
            <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

            {/* Chi tiết hạng mục */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Chi tiết hạng mục dịch vụ
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300 w-3/4">
                        Tên hạng mục
                      </th>
                      <th className="text-right p-4 font-semibold text-gray-700 dark:text-gray-300 w-1/4">
                        Đơn giá
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {selectedHoaDon.chiTiet.map((chiTiet: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <td className="p-4 text-gray-800 dark:text-gray-200">
                          {chiTiet.ten}
                        </td>
                        <td className="p-4 text-right font-medium text-gray-800 dark:text-gray-200">
                          {formatTien(chiTiet.donGia)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 dark:bg-gray-600 border-t-2 border-gray-300 dark:border-gray-500">
                      <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                        Tổng cộng
                      </td>
                      <td className="p-4 text-right font-bold text-lg text-green-600 dark:text-green-400">
                        {formatTien(selectedHoaDon.chiPhi)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Ghi chú kỹ thuật */}
            {selectedHoaDon.ghiChu && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📝 Ghi chú kỹ thuật
                </label>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {selectedHoaDon.ghiChu}
                  </p>
                </div>
              </div>
            )}

            {/* Nút hành động */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowModalChiTiet(false)}
                className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Đóng
              </button>
              {selectedHoaDon.trangThai === "cho-thanh-toan" && (
                <button
                  onClick={() => {
                    setShowModalChiTiet(false);
                    handleThanhToan(selectedHoaDon);
                  }}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  💳 Thanh toán ngay
                </button>
              )}
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🖨️ In hóa đơn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thanh toán */}
      {showModalThanhToan && selectedHoaDon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Thanh toán hóa đơn
              </h3>
              <button
                onClick={() => setShowModalThanhToan(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm space-y-2">
                  <div><strong>Mã hóa đơn:</strong> {selectedHoaDon.maDichVu}</div>
                  <div><strong>Dịch vụ:</strong> {selectedHoaDon.tenDichVu}</div>
                  <div><strong>Số tiền:</strong> {formatTien(selectedHoaDon.chiPhi)}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Chọn phương thức thanh toán
                </label>
                <div className="space-y-2">
                  {phuongThucThanhToan.map((pt) => (
                    <label key={pt.id} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="phuongThucTT"
                        value={pt.id}
                        checked={phuongThucTT === pt.id}
                        onChange={(e) => setPhuongThucTT(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 dark:text-white">
                          {pt.icon} {pt.ten}
                        </div>
                        {pt.phiDichVu > 0 && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Phí dịch vụ: {pt.phiDichVu}%
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Thông tin phí */}
              {phuongThucThanhToan.find(pt => pt.id === phuongThucTT)?.phiDichVu > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                  <div className="text-sm text-yellow-800 dark:text-yellow-300">
                    <div className="flex justify-between">
                      <span>Tiền dịch vụ:</span>
                      <span>{formatTien(selectedHoaDon.chiPhi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí thanh toán ({phuongThucThanhToan.find(pt => pt.id === phuongThucTT)?.phiDichVu}%):</span>
                      <span>{formatTien(selectedHoaDon.chiPhi * (phuongThucThanhToan.find(pt => pt.id === phuongThucTT)?.phiDichVu || 0) / 100)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t mt-2 pt-2">
                      <span>Tổng thanh toán:</span>
                      <span>
                        {formatTien(
                          selectedHoaDon.chiPhi +
                          (selectedHoaDon.chiPhi * (phuongThucThanhToan.find(pt => pt.id === phuongThucTT)?.phiDichVu || 0) / 100)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowModalThanhToan(false)}
                className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleXacNhanThanhToan}
                className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyHoSoChiPhi;