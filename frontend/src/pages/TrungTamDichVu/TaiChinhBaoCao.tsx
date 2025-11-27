import { useState } from "react";

const TaiChinhBaoCao = () => {
  const [hoaDon, setHoaDon] = useState([
    {
      id: "1",
      soHoaDon: "HD-001",
      khachHang: "Nguyễn Văn A",
      bienSo: "29A-12345",
      dichVu: "Bảo dưỡng định kỳ",
      tongTien: 1500000,
      trangThai: "da-thanh-toan",
      ngayTao: "19/11/2024",
      phuongThuc: "Chuyển khoản",
      chiTiet: [
        { ten: "Nhân công", gia: 500000 },
        { ten: "Phụ tùng", gia: 1000000 }
      ]
    },
    {
      id: "2",
      soHoaDon: "HD-002",
      khachHang: "Trần Thị B",
      bienSo: "29A-67890",
      dichVu: "Sửa chữa phanh",
      tongTien: 2500000,
      trangThai: "chua-thanh-toan",
      ngayTao: "19/11/2024",
      phuongThuc: "Tiền mặt",
      chiTiet: [
        { ten: "Nhân công", gia: 800000 },
        { ten: "Phụ tùng phanh", gia: 1700000 }
      ]
    },
    {
      id: "3",
      soHoaDon: "HD-003",
      khachHang: "Lê Văn C",
      bienSo: "29A-11223",
      dichVu: "Thay lốp",
      tongTien: 3200000,
      trangThai: "cho-thanh-toan",
      ngayTao: "18/11/2024",
      phuongThuc: "Thẻ tín dụng",
      chiTiet: [
        { ten: "Lốp xe EV", gia: 2500000 },
        { ten: "Nhân công", gia: 700000 }
      ]
    }
  ]);

  const [thongKe, setThongKe] = useState({
    doanhThu: 125000000,
    chiPhi: 85000000,
    loiNhuan: 40000000,
    dichVuPhoBien: [
      { ten: "Bảo dưỡng định kỳ", soLuong: 45 },
      { ten: "Thay lốp", soLuong: 28 },
      { ten: "Sửa phanh", soLuong: 22 },
      { ten: "Sửa điều hòa", soLuong: 18 },
      { ten: "Thay ắc quy", soLuong: 12 }
    ],
    xuatHuong: [
      { vanDe: "Hỏng ắc quy", tyLe: 35 },
      { vanDe: "Lỗi hệ thống sạc", tyLe: 25 },
      { vanDe: "Mòn lốp", tyLe: 20 },
      { vanDe: "Lỗi phanh", tyLe: 15 },
      { vanDe: "Hệ thống điện", tyLe: 5 }
    ]
  });

  const [showTaoHoaDonModal, setShowTaoHoaDonModal] = useState(false);
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [selectedHoaDon, setSelectedHoaDon] = useState<any>(null);
  const [newHoaDon, setNewHoaDon] = useState({
    khachHang: "",
    bienSo: "",
    dichVu: "",
    tongTien: "",
    phuongThuc: "Tiền mặt"
  });

  // Thống kê động từ dữ liệu hóa đơn
  const thongKeThucTe = {
    doanhThu: hoaDon.reduce((total, hd) => total + hd.tongTien, 0),
    daThanhToan: hoaDon.filter(hd => hd.trangThai === "da-thanh-toan").reduce((total, hd) => total + hd.tongTien, 0),
    chuaThanhToan: hoaDon.filter(hd => hd.trangThai === "chua-thanh-toan").reduce((total, hd) => total + hd.tongTien, 0)
  };

  // Chức năng tạo hóa đơn mới
  const handleTaoHoaDon = () => {
    if (!newHoaDon.khachHang || !newHoaDon.bienSo || !newHoaDon.dichVu || !newHoaDon.tongTien) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const hoaDonMoi = {
      id: (hoaDon.length + 1).toString(),
      soHoaDon: `HD-${String(hoaDon.length + 1).padStart(3, '0')}`,
      khachHang: newHoaDon.khachHang,
      bienSo: newHoaDon.bienSo,
      dichVu: newHoaDon.dichVu,
      tongTien: parseInt(newHoaDon.tongTien),
      trangThai: "cho-thanh-toan",
      ngayTao: new Date().toLocaleDateString('vi-VN'),
      phuongThuc: newHoaDon.phuongThuc,
      chiTiet: [
        { ten: "Dịch vụ chính", gia: parseInt(newHoaDon.tongTien) * 0.7 },
        { ten: "Phụ tùng", gia: parseInt(newHoaDon.tongTien) * 0.3 }
      ]
    };

    setHoaDon(prev => [hoaDonMoi, ...prev]);
    setShowTaoHoaDonModal(false);
    setNewHoaDon({ khachHang: "", bienSo: "", dichVu: "", tongTien: "", phuongThuc: "Tiền mặt" });
    alert("Đã tạo hóa đơn mới thành công!");
  };

  // Chức năng xem chi tiết hóa đơn
  const handleXemChiTiet = (hoaDon: any) => {
    setSelectedHoaDon(hoaDon);
    setShowChiTietModal(true);
  };

  // Chức năng in hóa đơn
  const handleInHoaDon = (hoaDon: any) => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="text-align: center; color: #333;">HÓA ĐƠN DỊCH VỤ</h2>
        <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0;">
          <p><strong>Số hóa đơn:</strong> ${hoaDon.soHoaDon}</p>
          <p><strong>Khách hàng:</strong> ${hoaDon.khachHang}</p>
          <p><strong>Biển số:</strong> ${hoaDon.bienSo}</p>
          <p><strong>Dịch vụ:</strong> ${hoaDon.dichVu}</p>
          <p><strong>Ngày tạo:</strong> ${hoaDon.ngayTao}</p>
        </div>
        <h3>Chi tiết dịch vụ:</h3>
        ${hoaDon.chiTiet.map((item: any) => `
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>${item.ten}</span>
            <span>${formatCurrency(item.gia)}</span>
          </div>
        `).join('')}
        <hr style="margin: 15px 0;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
          <span>TỔNG CỘNG:</span>
          <span>${formatCurrency(hoaDon.tongTien)}</span>
        </div>
        <p style="text-align: center; margin-top: 20px; color: #666;">Cảm ơn quý khách!</p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Chức năng thanh toán hóa đơn
  const handleThanhToan = (hoaDonId: string) => {
    setHoaDon(prev => prev.map(hd =>
      hd.id === hoaDonId ? { ...hd, trangThai: "da-thanh-toan" } : hd
    ));
    alert("Đã xác nhận thanh toán hóa đơn!");
  };

  // Chức năng xóa hóa đơn
  const handleXoaHoaDon = (hoaDonId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      setHoaDon(prev => prev.filter(hd => hd.id !== hoaDonId));
      alert("Đã xóa hóa đơn thành công!");
    }
  };

  // Chức năng xuất báo cáo
  const handleXuatBaoCao = () => {
    const baoCao = {
      thongKe: thongKeThucTe,
      tongHoaDon: hoaDon.length,
      hoaDonDaThanhToan: hoaDon.filter(hd => hd.trangThai === "da-thanh-toan").length,
      hoaDonChuaThanhToan: hoaDon.filter(hd => hd.trangThai === "chua-thanh-toan").length
    };

    alert(`Đã xuất báo cáo!\n\nTổng doanh thu: ${formatCurrency(thongKeThucTe.doanhThu)}\nĐã thanh toán: ${formatCurrency(thongKeThucTe.daThanhToan)}\nChưa thanh toán: ${formatCurrency(thongKeThucTe.chuaThanhToan)}`);
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "da-thanh-toan": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
      "chua-thanh-toan": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
      "cho-thanh-toan": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
    };
    return colors[trangThai as keyof typeof colors];
  };

  const getTrangThaiText = (trangThai: string) => {
    const texts = {
      "da-thanh-toan": "Đã thanh toán",
      "chua-thanh-toan": "Chưa thanh toán",
      "cho-thanh-toan": "Chờ thanh toán"
    };
    return texts[trangThai as keyof typeof texts];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý Tài chính & Báo cáo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Báo giá, hóa đơn, thanh toán và thống kê dịch vụ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(thongKeThucTe.doanhThu)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tổng doanh thu</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(thongKeThucTe.daThanhToan)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Đã thanh toán</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600">{formatCurrency(thongKeThucTe.chuaThanhToan)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chưa thanh toán</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hóa đơn & Thanh toán */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Hóa đơn gần đây ({hoaDon.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleXuatBaoCao}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors"
                >
                   Xuất báo cáo
                </button>
                <button
                  onClick={() => setShowTaoHoaDonModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                >
                  Tạo hóa đơn
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {hoaDon.map((hd) => (
                <div key={hd.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {hd.soHoaDon}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {hd.khachHang} • {hd.bienSo}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(hd.trangThai)}`}>
                      {getTrangThaiText(hd.trangThai)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {hd.dichVu}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {formatCurrency(hd.tongTien)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>📅 {hd.ngayTao}</span>
                    <span>💳 {hd.phuongThuc}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleXemChiTiet(hd)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => handleInHoaDon(hd)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      In hóa đơn
                    </button>
                    {hd.trangThai !== "da-thanh-toan" && (
                      <button
                        onClick={() => handleThanhToan(hd.id)}
                        className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                      >
                        Thanh toán
                      </button>
                    )}
                    <button
                      onClick={() => handleXoaHoaDon(hd.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thống kê & Báo cáo */}
        <div className="space-y-6">
          {/* Dịch vụ phổ biến */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                📈 Dịch vụ phổ biến
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {thongKe.dichVuPhoBien.map((dichVu, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {dichVu.ten}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(dichVu.soLuong / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white w-8">
                        {dichVu.soLuong}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Xu hướng hỏng hóc */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                🔧 Xu hướng hỏng hóc EV
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {thongKe.xuatHuong.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.vanDe}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-red-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.tyLe}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white w-8">
                        {item.tyLe}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Báo cáo nhanh */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              📊 Báo cáo tháng 11
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-green-400">Tăng trưởng:</span>
                <span className="font-medium text-green-800 dark:text-green-300">+15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-green-400">Khách hàng mới:</span>
                <span className="font-medium text-green-800 dark:text-green-300">{hoaDon.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-green-400">Tỷ lệ hoàn thành:</span>
                <span className="font-medium text-green-800 dark:text-green-300">
                  {Math.round((hoaDon.filter(hd => hd.trangThai === "da-thanh-toan").length / hoaDon.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal tạo hóa đơn */}
      {showTaoHoaDonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Tạo hóa đơn mới</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Khách hàng *</label>
                <input
                  type="text"
                  value={newHoaDon.khachHang}
                  onChange={(e) => setNewHoaDon({...newHoaDon, khachHang: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập tên khách hàng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Biển số *</label>
                <input
                  type="text"
                  value={newHoaDon.bienSo}
                  onChange={(e) => setNewHoaDon({...newHoaDon, bienSo: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập biển số xe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dịch vụ *</label>
                <select
                  value={newHoaDon.dichVu}
                  onChange={(e) => setNewHoaDon({...newHoaDon, dichVu: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Chọn dịch vụ</option>
                  <option value="Bảo dưỡng định kỳ">Bảo dưỡng định kỳ</option>
                  <option value="Thay lốp">Thay lốp</option>
                  <option value="Sửa phanh">Sửa phanh</option>
                  <option value="Thay ắc quy">Thay ắc quy</option>
                  <option value="Sửa điều hòa">Sửa điều hòa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tổng tiền *</label>
                <input
                  type="number"
                  value={newHoaDon.tongTien}
                  onChange={(e) => setNewHoaDon({...newHoaDon, tongTien: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập tổng tiền"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phương thức thanh toán</label>
                <select
                  value={newHoaDon.phuongThuc}
                  onChange={(e) => setNewHoaDon({...newHoaDon, phuongThuc: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleTaoHoaDon}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo hóa đơn
              </button>
              <button
                onClick={() => setShowTaoHoaDonModal(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết hóa đơn */}
      {showChiTietModal && selectedHoaDon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Chi tiết hóa đơn</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Số hóa đơn:</span>
                <p className="font-medium">{selectedHoaDon.soHoaDon}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Khách hàng:</span>
                <p className="font-medium">{selectedHoaDon.khachHang}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Biển số:</span>
                <p className="font-medium">{selectedHoaDon.bienSo}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Dịch vụ:</span>
                <p className="font-medium">{selectedHoaDon.dichVu}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Chi tiết:</span>
                <div className="space-y-1 mt-1">
                  {selectedHoaDon.chiTiet.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.ten}</span>
                      <span>{formatCurrency(item.gia)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(selectedHoaDon.tongTien)}</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Trạng thái:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(selectedHoaDon.trangThai)}`}>
                  {getTrangThaiText(selectedHoaDon.trangThai)}
                </span>
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
    </div>
  );
};

export default TaiChinhBaoCao;