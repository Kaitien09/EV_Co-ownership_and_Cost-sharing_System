import { useState } from "react";

const TaiChinhBaoCao = () => {
  const [hoaDon, setHoaDon] = useState([
    {
      id: "1",
      soHoaDon: "HD-001",
      khachHang: "Nguyễn Văn A",
      bienSo: "30A-11111",
      dichVu: "Bảo dưỡng pin",
      tongTien: 1500000,
      trangThai: "da-thanh-toan",
      ngayTao: "2025-11-28",
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
      bienSo: "30A-22222",
      dichVu: "Kiểm tra hệ thống",
      tongTien: 2500000,
      trangThai: "chua-thanh-toan",
      ngayTao: "2025-11-28",
      phuongThuc: "Tiền mặt",
      chiTiet: [
        { ten: "Nhân công", gia: 800000 },
        { ten: "Phụ tùng", gia: 1700000 }
      ]
    },
    {
      id: "3",
      soHoaDon: "HD-003",
      khachHang: "Lê Văn C",
      bienSo: "30A-33333",
      dichVu: "Thay thế phụ tùng",
      tongTien: 3200000,
      trangThai: "cho-thanh-toan",
      ngayTao: "2025-11-27",
      phuongThuc: "Thẻ tín dụng",
      chiTiet: [
        { ten: "Phụ tùng thay thế", gia: 2500000 },
        { ten: "Nhân công", gia: 700000 }
      ]
    }
  ]);

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
    chuaThanhToan: hoaDon.filter(hd => hd.trangThai === "chua-thanh-toan").reduce((total, hd) => total + hd.tongTien, 0),
    choThanhToan: hoaDon.filter(hd => hd.trangThai === "cho-thanh-toan").reduce((total, hd) => total + hd.tongTien, 0)
  };

  // Chức năng tạo hóa đơn mới
  const handleTaoHoaDon = () => {
    if (!newHoaDon.khachHang || !newHoaDon.bienSo || !newHoaDon.dichVu || !newHoaDon.tongTien) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Tự động cập nhật trạng thái dựa trên phương thức thanh toán
    let trangThaiMoi = "cho-thanh-toan";
    if (newHoaDon.phuongThuc === "Chuyển khoản" || newHoaDon.phuongThuc === "Thẻ tín dụng" || newHoaDon.phuongThuc === "Ví điện tử") {
      trangThaiMoi = "da-thanh-toan"; // Tự động cập nhật thành đã thanh toán
    }

    const hoaDonMoi = {
      id: (hoaDon.length + 1).toString(),
      soHoaDon: `HD-${String(hoaDon.length + 1).padStart(3, '0')}`,
      khachHang: newHoaDon.khachHang,
      bienSo: newHoaDon.bienSo,
      dichVu: newHoaDon.dichVu,
      tongTien: parseInt(newHoaDon.tongTien),
      trangThai: trangThaiMoi,
      ngayTao: new Date().toISOString().split('T')[0],
      phuongThuc: newHoaDon.phuongThuc,
      chiTiet: [
        { ten: "Dịch vụ chính", gia: parseInt(newHoaDon.tongTien) * 0.7 },
        { ten: "Phụ tùng", gia: parseInt(newHoaDon.tongTien) * 0.3 }
      ]
    };

    setHoaDon(prev => [hoaDonMoi, ...prev]);
    setShowTaoHoaDonModal(false);
    setNewHoaDon({ khachHang: "", bienSo: "", dichVu: "", tongTien: "", phuongThuc: "Tiền mặt" });
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

  // Chức năng thanh toán hóa đơn - chỉ hiển thị cho thanh toán tiền mặt
  const handleThanhToan = (hoaDonId: string) => {
    setHoaDon(prev => prev.map(hd =>
      hd.id === hoaDonId ? { ...hd, trangThai: "da-thanh-toan" } : hd
    ));
  };

  // Chức năng xóa hóa đơn
  const handleXoaHoaDon = (hoaDonId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      setHoaDon(prev => prev.filter(hd => hd.id !== hoaDonId));
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

  // Kiểm tra xem có hiển thị nút thanh toán không (chỉ cho thanh toán tiền mặt)
  const canShowThanhToanButton = (hoaDon: any) => {
    return hoaDon.phuongThuc === "Tiền mặt" && hoaDon.trangThai !== "da-thanh-toan";
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "da-thanh-toan": "bg-green-100 text-green-800 border border-green-200",
      "chua-thanh-toan": "bg-red-100 text-red-800 border border-red-200",
      "cho-thanh-toan": "bg-yellow-100 text-yellow-800 border border-yellow-200"
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

  const formatNgay = (ngayString: string) => {
    return new Date(ngayString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý Tài chính & Báo cáo
          </h1>
          <p className="text-gray-600">
            Báo giá, hóa đơn, thanh toán và thống kê dịch vụ
          </p>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(thongKeThucTe.doanhThu)}</div>
            <div className="text-sm text-gray-600">Tổng doanh thu</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(thongKeThucTe.daThanhToan)}</div>
            <div className="text-sm text-gray-600">Đã thanh toán</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-red-600">{formatCurrency(thongKeThucTe.chuaThanhToan)}</div>
            <div className="text-sm text-gray-600">Chưa thanh toán</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(thongKeThucTe.choThanhToan)}</div>
            <div className="text-sm text-gray-600">Chờ thanh toán</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Danh sách hóa đơn */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Danh sách hóa đơn
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleXuatBaoCao}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    Xuất báo cáo
                  </button>
                  <button
                    onClick={() => setShowTaoHoaDonModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Tạo hóa đơn
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {hoaDon.map((hd) => (
                  <div key={hd.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {hd.soHoaDon}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {hd.khachHang} • {hd.bienSo}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrangThaiColor(hd.trangThai)}`}>
                        {getTrangThaiText(hd.trangThai)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-700 font-medium">
                          {hd.dichVu}
                        </p>
                        <p className="text-sm text-gray-600">
                          {hd.phuongThuc}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-lg">
                          {formatCurrency(hd.tongTien)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatNgay(hd.ngayTao)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleXemChiTiet(hd)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => handleInHoaDon(hd)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                      >
                        In hóa đơn
                      </button>
                      {canShowThanhToanButton(hd) && (
                        <button
                          onClick={() => handleThanhToan(hd.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm"
                        >
                          Thanh toán
                        </button>
                      )}
                      <button
                        onClick={() => handleXoaHoaDon(hd.id)}
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

          {/* Thống kê */}
          <div className="space-y-6">
            {/* Thống kê thanh toán */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Thống kê thanh toán
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Đã thanh toán</span>
                      <span className="font-medium">{formatCurrency(thongKeThucTe.daThanhToan)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(thongKeThucTe.daThanhToan / thongKeThucTe.doanhThu) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Chưa thanh toán</span>
                      <span className="font-medium">{formatCurrency(thongKeThucTe.chuaThanhToan)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(thongKeThucTe.chuaThanhToan / thongKeThucTe.doanhThu) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Phương thức thanh toán
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {["Tiền mặt", "Chuyển khoản", "Thẻ tín dụng", "Ví điện tử"].map((phuongThuc) => {
                    const soLuong = hoaDon.filter(hd => hd.phuongThuc === phuongThuc).length;
                    const tongTien = hoaDon.filter(hd => hd.phuongThuc === phuongThuc).reduce((total, hd) => total + hd.tongTien, 0);

                    return (
                      <div key={phuongThuc} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{phuongThuc}</span>
                        <div className="text-right">
                          <div className="font-medium">{soLuong} hóa đơn</div>
                          <div className="text-gray-500">{formatCurrency(tongTien)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal tạo hóa đơn */}
      {showTaoHoaDonModal && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Tạo hóa đơn mới</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Khách hàng</label>
                <input
                  type="text"
                  value={newHoaDon.khachHang}
                  onChange={(e) => setNewHoaDon({...newHoaDon, khachHang: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tên khách hàng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Biển số</label>
                <input
                  type="text"
                  value={newHoaDon.bienSo}
                  onChange={(e) => setNewHoaDon({...newHoaDon, bienSo: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập biển số xe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dịch vụ</label>
                <select
                  value={newHoaDon.dichVu}
                  onChange={(e) => setNewHoaDon({...newHoaDon, dichVu: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn dịch vụ</option>
                  <option value="Bảo dưỡng pin">Bảo dưỡng pin</option>
                  <option value="Kiểm tra hệ thống">Kiểm tra hệ thống</option>
                  <option value="Thay thế phụ tùng">Thay thế phụ tùng</option>
                  <option value="Sửa chữa điện">Sửa chữa điện</option>
                  <option value="Thay ắc quy">Thay ắc quy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tổng tiền</label>
                <input
                  type="number"
                  value={newHoaDon.tongTien}
                  onChange={(e) => setNewHoaDon({...newHoaDon, tongTien: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tổng tiền"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phương thức thanh toán</label>
                <select
                  value={newHoaDon.phuongThuc}
                  onChange={(e) => setNewHoaDon({...newHoaDon, phuongThuc: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                  <option value="Ví điện tử">Ví điện tử</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {newHoaDon.phuongThuc !== "Tiền mặt" ?
                    "Hóa đơn sẽ tự động cập nhật thành Đã thanh toán" :
                    "Cần xác nhận thanh toán sau khi nhận tiền"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleTaoHoaDon}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tạo hóa đơn
              </button>
              <button
                onClick={() => setShowTaoHoaDonModal(false)}
                className="flex-1 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết hóa đơn */}
      {showChiTietModal && selectedHoaDon && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Chi tiết hóa đơn</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Số hóa đơn:</span>
                <span className="font-medium">{selectedHoaDon.soHoaDon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Khách hàng:</span>
                <span className="font-medium">{selectedHoaDon.khachHang}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Biển số:</span>
                <span className="font-medium">{selectedHoaDon.bienSo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dịch vụ:</span>
                <span className="font-medium">{selectedHoaDon.dichVu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phương thức:</span>
                <span className="font-medium">{selectedHoaDon.phuongThuc}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Chi tiết:</span>
                <div className="mt-2 space-y-2">
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
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Trạng thái:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getTrangThaiColor(selectedHoaDon.trangThai)}`}>
                  {getTrangThaiText(selectedHoaDon.trangThai)}
                </span>
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

export default TaiChinhBaoCao;