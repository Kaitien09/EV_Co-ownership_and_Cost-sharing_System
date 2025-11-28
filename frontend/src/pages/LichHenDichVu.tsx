import { useState } from "react";

const LichHenDichVu = () => {
  const [activeTab, setActiveTab] = useState<'dat-lich' | 'lich-su'>('dat-lich');

  // Dữ liệu từ database
  const [trungTamDichVu, setTrungTamDichVu] = useState([
    {
      id: "1",
      ten: "Trung tam Dien 1",
      diaChi: "123 Duong A, Ha Noi",
      thoiGianLamViec: "8:00-17:00 (Thứ 2 - Thứ 7)",
      soDienThoai: "0901000001",
      email: "tt1@example.com"
    },
    {
      id: "2",
      ten: "Trung tam Dien 2",
      diaChi: "456 Duong B, Ho Chi Minh",
      thoiGianLamViec: "8:00-17:00 (Thứ 2 - Thứ 7)",
      soDienThoai: "0901000002",
      email: "tt2@example.com"
    },
    {
      id: "3",
      ten: "Trung tam Dien 3",
      diaChi: "789 Duong C, Da Nang",
      thoiGianLamViec: "8:00-17:00 (Thứ 2 - Thứ 7)",
      soDienThoai: "0901000003",
      email: "tt3@example.com"
    }
  ]);

  const [loaiDichVu, setLoaiDichVu] = useState([
    {
      id: "1",
      ten: "Bảo dưỡng định kỳ",
      moTa: "Kiểm tra tổng quan, thay dầu, lọc gió, cân bằng hệ thống",
      thoiGianDuKien: "2-3 giờ",
      chiPhiTu: "1.500.000 VNĐ",
      loai: "BAO_DUONG"
    },
    {
      id: "2",
      ten: "Thay ắc quy Lithium",
      moTa: "Thay thế và cân bằng cell ắc quy, bảo dưỡng hệ thống làm mát",
      thoiGianDuKien: "4-6 giờ",
      chiPhiTu: "15.000.000 VNĐ",
      loai: "THAY_THE_PHU_TUNG"
    },
    {
      id: "3",
      ten: "Sửa chữa hệ thống phanh",
      moTa: "Kiểm tra và thay thế má phanh, đĩa phanh, bảo dưỡng phanh tái sinh",
      thoiGianDuKien: "3-4 giờ",
      chiPhiTu: "2.500.000 VNĐ",
      loai: "SUA_CHUA"
    },
    {
      id: "4",
      ten: "Kiểm tra hệ thống",
      moTa: "Kiểm tra cổng sạc, bộ sạc onboard, hệ thống sạc nhanh DC",
      thoiGianDuKien: "2-3 giờ",
      chiPhiTu: "1.200.000 VNĐ",
      loai: "KIEM_TRA"
    },
    {
      id: "5",
      ten: "Sửa chữa động cơ điện",
      moTa: "Bảo dưỡng động cơ, kiểm tra biến tần, cân bằng trục truyền động",
      thoiGianDuKien: "6-8 giờ",
      chiPhiTu: "8.000.000 VNĐ",
      loai: "SUA_CHUA"
    }
  ]);

  // Dữ liệu xe từ database
  const [danhSachXe, setDanhSachXe] = useState([
    {
      id: "1",
      bienSo: "30A-11111",
      model: "Model X1",
      chuXe: "Nguyen Van A",
      soKm: 14500,
      ngayDangKiem: "15/03/2025",
      vin: "VIN00000000000001"
    },
    {
      id: "2",
      bienSo: "30A-22222",
      model: "Model X2",
      chuXe: "Tran Thi B",
      soKm: 8900,
      ngayDangKiem: "20/04/2025",
      vin: "VIN00000000000002"
    },
    {
      id: "3",
      bienSo: "30A-33333",
      model: "Model X3",
      chuXe: "Le Van C",
      soKm: 12000,
      ngayDangKiem: "10/05/2025",
      vin: "VIN00000000000003"
    }
  ]);

  // Hàm lấy ngày hiện tại theo format YYYY-MM-DD
  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Hàm lấy thời gian hiện tại theo format HH:MM
  const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 5);
  };

  // Hàm format ngày giờ cho display
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Dữ liệu lịch hẹn từ database - cập nhật với ngày hiện tại
  const [lichHen, setLichHen] = useState([
    {
      id: "1",
      maLichHen: "LH-001",
      xe: "30A-11111 - Model X1",
      trungTam: "Trung tam Dien 1",
      dichVu: "Bảo dưỡng định kỳ",
      ngayGioHen: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Ngày mai
      trangThai: "cho-xac-nhan",
      thoiGianTao: new Date().toISOString(),
      ghiChu: "",
      loaiKhachHang: "khach-quen",
      xeId: "1",
      trungTamId: "1",
      dichVuId: "1"
    },
    {
      id: "2",
      maLichHen: "LH-002",
      xe: "30A-22222 - Model X2",
      trungTam: "Trung tam Dien 2",
      dichVu: "Thay ắc quy Lithium",
      ngayGioHen: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 2 ngày tới
      trangThai: "da-xac-nhan",
      thoiGianTao: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 giờ trước
      ghiChu: "Khách hàng yêu cầu kiểm tra thêm hệ thống làm mát ắc quy",
      loaiKhachHang: "khach-quen",
      xeId: "2",
      trungTamId: "2",
      dichVuId: "2"
    },
    {
      id: "3",
      maLichHen: "LH-003",
      xe: "30A-33333 - Model X3",
      trungTam: "Trung tam Dien 3",
      dichVu: "Sửa chữa hệ thống phanh",
      ngayGioHen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Hôm qua
      trangThai: "hoan-tat",
      thoiGianTao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 ngày trước
      ghiChu: "Khách hàng mới - đã thay má phanh trước",
      loaiKhachHang: "khach-moi",
      xeId: "3",
      trungTamId: "3",
      dichVuId: "3"
    }
  ]);

  const [showThongBaoThanhCong, setShowThongBaoThanhCong] = useState(false);

  const [newLichHen, setNewLichHen] = useState({
    xeId: "",
    trungTamId: "",
    dichVuId: "",
    ngayHen: "",
    gioHen: "",
    ghiChu: ""
  });

  const [selectedLichHen, setSelectedLichHen] = useState<any>(null);

  // Thống kê
  const thongKeLichHen = {
    choXacNhan: lichHen.filter(lh => lh.trangThai === "cho-xac-nhan").length,
    daXacNhan: lichHen.filter(lh => lh.trangThai === "da-xac-nhan").length,
    dangThucHien: lichHen.filter(lh => lh.trangThai === "dang-thuc-hien").length,
    hoanTat: lichHen.filter(lh => lh.trangThai === "hoan-tat").length,
    daHuy: lichHen.filter(lh => lh.trangThai === "da-huy").length
  };

  // Chức năng đặt lịch
  const handleDatLich = () => {
    // Validate thông tin cơ bản
    if (!newLichHen.xeId || !newLichHen.trungTamId || !newLichHen.dichVuId || !newLichHen.ngayHen || !newLichHen.gioHen) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    const xeSelected = danhSachXe.find(xe => xe.id === newLichHen.xeId);
    const trungTamSelected = trungTamDichVu.find(tt => tt.id === newLichHen.trungTamId);
    const dichVuSelected = loaiDichVu.find(dv => dv.id === newLichHen.dichVuId);

    // Tạo datetime từ ngày và giờ đã chọn
    const ngayGioHen = new Date(`${newLichHen.ngayHen}T${newLichHen.gioHen}`);

    const lichHenMoi = {
      id: (lichHen.length + 1).toString(),
      maLichHen: `LH-${String(lichHen.length + 1).padStart(3, '0')}`,
      xe: `${xeSelected?.bienSo} - ${xeSelected?.model}`,
      trungTam: trungTamSelected?.ten,
      dichVu: dichVuSelected?.ten,
      ngayGioHen: ngayGioHen.toISOString(),
      trangThai: "cho-xac-nhan",
      thoiGianTao: new Date().toISOString(),
      ghiChu: newLichHen.ghiChu,
      loaiKhachHang: "khach-quen",
      thongTinLienHe: {
        chuXe: xeSelected?.chuXe,
        soDienThoai: "Đã có trong hệ thống"
      },
      soKm: xeSelected?.soKm || "Chưa cập nhật",
      xeId: newLichHen.xeId,
      trungTamId: newLichHen.trungTamId,
      dichVuId: newLichHen.dichVuId
    };

    setLichHen(prev => [lichHenMoi, ...prev]);

    // Reset form
    setNewLichHen({
      xeId: "",
      trungTamId: "",
      dichVuId: "",
      ngayHen: "",
      gioHen: "",
      ghiChu: ""
    });

    setSelectedLichHen(lichHenMoi);
    setShowThongBaoThanhCong(true);

    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
      setShowThongBaoThanhCong(false);
    }, 5000);
  };

  // Chức năng hủy lịch hẹn
  const handleHuyLichHen = (lichHenId: string) => {
    if (confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?")) {
      setLichHen(prev => prev.map(lh =>
        lh.id === lichHenId ? { ...lh, trangThai: "da-huy" } : lh
      ));
      alert("Đã hủy lịch hẹn thành công!");
    }
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "cho-xac-nhan": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
      "da-xac-nhan": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
      "dang-thuc-hien": "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
      "hoan-tat": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
      "da-huy": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
    };
    return colors[trangThai as keyof typeof colors];
  };

  const getTrangThaiText = (trangThai: string) => {
    const texts = {
      "cho-xac-nhan": "Chờ xác nhận",
      "da-xac-nhan": "Đã xác nhận",
      "dang-thuc-hien": "Đang thực hiện",
      "hoan-tat": "Hoàn tất",
      "da-huy": "Đã hủy"
    };
    return texts[trangThai as keyof typeof texts];
  };

  // Lấy ngày trong tuần (thứ 2 đến thứ 7)
  const getNgayTrongTuan = () => {
    const today = new Date();
    const ngayTrongTuan = [];

    for (let i = 0; i < 7; i++) {
      const ngay = new Date(today);
      ngay.setDate(today.getDate() + i);
      if (ngay.getDay() !== 0) { // Không tính chủ nhật
        ngayTrongTuan.push({
          date: ngay.toISOString().split('T')[0],
          display: ngay.toLocaleDateString('vi-VN'),
          thu: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][ngay.getDay()]
        });
      }
    }

    return ngayTrongTuan.slice(0, 5); // Chỉ lấy 5 ngày làm việc
  };

  const gioTrongNgay = [
    "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  return (
    <div className="p-6">
      {/* Thông báo thành công */}
      {showThongBaoThanhCong && selectedLichHen && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm">✓</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-green-800 mb-2">Đặt lịch thành công!</h4>
              <div className="text-sm text-green-700 space-y-1 mb-3">
                <div><strong>Mã lịch hẹn:</strong> {selectedLichHen.maLichHen}</div>
                <div><strong>Xe:</strong> {selectedLichHen.xe}</div>
                <div><strong>Trung tâm:</strong> {selectedLichHen.trungTam}</div>
                <div><strong>Dịch vụ:</strong> {selectedLichHen.dichVu}</div>
                <div><strong>Thời gian:</strong> {formatDateTime(selectedLichHen.ngayGioHen)}</div>
              </div>
              <p className="text-xs text-green-600 border-t border-green-200 pt-2">
                Chúng tôi sẽ xác nhận lịch hẹn qua SMS/Email trong vòng 2 giờ làm việc.
              </p>
            </div>
            <button
              onClick={() => setShowThongBaoThanhCong(false)}
              className="text-green-600 hover:text-green-800 text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Đặt lịch Dịch vụ
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Đặt lịch bảo dưỡng, sửa chữa và theo dõi trạng thái dịch vụ
        </p>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600">{thongKeLichHen.choXacNhan}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chờ xác nhận</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">{thongKeLichHen.daXacNhan}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Đã xác nhận</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600">{thongKeLichHen.dangThucHien}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Đang thực hiện</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">{thongKeLichHen.hoanTat}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Hoàn tất</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600">{thongKeLichHen.daHuy}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Đã hủy</div>
        </div>
      </div>

      {/* Tab điều hướng */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dat-lich')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dat-lich'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Đặt lịch mới
            </button>
            <button
              onClick={() => setActiveTab('lich-su')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lich-su'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Lịch sử đặt lịch ({lichHen.length})
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'dat-lich' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form đặt lịch */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Thông tin đặt lịch
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Chọn xe */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Chọn xe *
                    </label>
                    <select
                      value={newLichHen.xeId}
                      onChange={(e) => setNewLichHen({...newLichHen, xeId: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Chọn xe</option>
                      {danhSachXe.map((xe) => (
                        <option key={xe.id} value={xe.id}>
                          {xe.bienSo} - {xe.model} ({xe.chuXe})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Chọn trung tâm */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Chọn trung tâm dịch vụ *
                    </label>
                    <select
                      value={newLichHen.trungTamId}
                      onChange={(e) => setNewLichHen({...newLichHen, trungTamId: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Chọn trung tâm</option>
                      {trungTamDichVu.map((tt) => (
                        <option key={tt.id} value={tt.id}>
                          {tt.ten} - {tt.diaChi}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Chọn loại dịch vụ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Chọn loại dịch vụ *
                    </label>
                    <select
                      value={newLichHen.dichVuId}
                      onChange={(e) => setNewLichHen({...newLichHen, dichVuId: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Chọn dịch vụ</option>
                      {loaiDichVu.map((dv) => (
                        <option key={dv.id} value={dv.id}>
                          {dv.ten} - {dv.chiPhiTu} - {dv.thoiGianDuKien}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Chọn ngày & giờ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Chọn ngày *
                      </label>
                      <select
                        value={newLichHen.ngayHen}
                        onChange={(e) => setNewLichHen({...newLichHen, ngayHen: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Chọn ngày</option>
                        {getNgayTrongTuan().map((ngay) => (
                          <option key={ngay.date} value={ngay.date}>
                            {ngay.display} ({ngay.thu})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Chọn giờ *
                      </label>
                      <select
                        value={newLichHen.gioHen}
                        onChange={(e) => setNewLichHen({...newLichHen, gioHen: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Chọn giờ</option>
                        {gioTrongNgay.map((gio) => (
                          <option key={gio} value={gio}>
                            {gio}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ghi chú thêm
                    </label>
                    <textarea
                      value={newLichHen.ghiChu}
                      onChange={(e) => setNewLichHen({...newLichHen, ghiChu: e.target.value})}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Mô tả vấn đề hoặc yêu cầu đặc biệt..."
                    />
                  </div>

                  {/* Nút đặt lịch */}
                  <button
                    onClick={handleDatLich}
                    disabled={
                      !newLichHen.xeId ||
                      !newLichHen.trungTamId ||
                      !newLichHen.dichVuId ||
                      !newLichHen.ngayHen ||
                      !newLichHen.gioHen
                    }
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Đặt lịch ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin trung tâm */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Trung tâm dịch vụ
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {trungTamDichVu.map((tt) => (
                    <div key={tt.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{tt.ten}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tt.diaChi}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tt.thoiGianLamViec}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{tt.soDienThoai}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thông tin dịch vụ */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Dịch vụ phổ biến
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {loaiDichVu.slice(0, 3).map((dv) => (
                    <div key={dv.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{dv.ten}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{dv.moTa}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-blue-600 dark:text-blue-400">{dv.chiPhiTu}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{dv.thoiGianDuKien}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lich-su' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Lịch sử đặt lịch
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {lichHen.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📋</div>
                <p className="text-gray-500 dark:text-gray-400">Chưa có lịch hẹn nào</p>
                <button
                  onClick={() => setActiveTab('dat-lich')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đặt lịch ngay
                </button>
              </div>
            ) : (
              lichHen.map((lh) => (
                <div key={lh.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {lh.maLichHen}
                        {lh.loaiKhachHang === "khach-moi" && (
                          <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full dark:bg-orange-900/20 dark:text-orange-300">
                            Mới
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lh.xe} • {lh.trungTam}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(lh.trangThai)}`}>
                      {getTrangThaiText(lh.trangThai)}
                    </span>
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Dịch vụ:</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-white">{lh.dichVu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Thời gian hẹn:</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {formatDateTime(lh.ngayGioHen)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Đặt lúc:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDateTime(lh.thoiGianTao)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Số km:</span>
                        <span className="text-sm text-gray-800 dark:text-white">{lh.soKm || "Chưa cập nhật"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Chủ xe:</span>
                        <span className="text-sm text-gray-800 dark:text-white">
                          {lh.thongTinLienHe?.chuXe || "Không có thông tin"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Liên hệ:</span>
                        <span className="text-sm text-gray-800 dark:text-white">
                          {lh.thongTinLienHe?.soDienThoai || "Đã có trong hệ thống"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ghi chú (nếu có) */}
                  {lh.ghiChu && (
                    <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ghi chú:</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-wrap">{lh.ghiChu}</p>
                    </div>
                  )}

                  {/* Nút hủy lịch */}
                  <div className="flex justify-end">
                    {(lh.trangThai === "cho-xac-nhan" || lh.trangThai === "da-xac-nhan") && (
                      <button
                        onClick={() => handleHuyLichHen(lh.id)}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Hủy lịch
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LichHenDichVu;