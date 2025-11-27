import { useState } from "react";

const LichHenDichVu = () => {
  const [activeTab, setActiveTab] = useState<'dat-lich' | 'lich-su'>('dat-lich');
  const [trungTamDichVu, setTrungTamDichVu] = useState([
    {
      id: "1",
      ten: "Trung tâm Dịch vụ Quận 1",
      diaChi: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      thoiGianLamViec: "7:30 - 17:30 (Thứ 2 - Thứ 7)",
      soDienThoai: "028 3823 4567"
    },
    {
      id: "2",
      ten: "Trung tâm Dịch vụ Quận 7",
      diaChi: "456 Nguyễn Lương Bằng, Quận 7, TP.HCM",
      thoiGianLamViec: "7:30 - 17:30 (Thứ 2 - Thứ 7)",
      soDienThoai: "028 5412 3789"
    },
    {
      id: "3",
      ten: "Trung tâm Dịch vụ Thủ Đức",
      diaChi: "789 Võ Văn Ngân, Thủ Đức, TP.HCM",
      thoiGianLamViec: "7:30 - 17:30 (Thứ 2 - Thứ 7)",
      soDienThoai: "028 6234 1890"
    }
  ]);

  const [loaiDichVu, setLoaiDichVu] = useState([
    {
      id: "1",
      ten: "Bảo dưỡng định kỳ",
      moTa: "Kiểm tra tổng quan, thay dầu, lọc gió, cân bằng hệ thống",
      thoiGianDuKien: "2-3 giờ",
      chiPhiTu: "1.500.000 VNĐ"
    },
    {
      id: "2",
      ten: "Thay ắc quy Lithium",
      moTa: "Thay thế và cân bằng cell ắc quy, bảo dưỡng hệ thống làm mát",
      thoiGianDuKien: "4-6 giờ",
      chiPhiTu: "15.000.000 VNĐ"
    },
    {
      id: "3",
      ten: "Sửa chữa hệ thống phanh",
      moTa: "Kiểm tra và thay thế má phanh, đĩa phanh, bảo dưỡng phanh tái sinh",
      thoiGianDuKien: "3-4 giờ",
      chiPhiTu: "2.500.000 VNĐ"
    },
    {
      id: "4",
      ten: "Bảo dưỡng hệ thống sạc",
      moTa: "Kiểm tra cổng sạc, bộ sạc onboard, hệ thống sạc nhanh DC",
      thoiGianDuKien: "2-3 giờ",
      chiPhiTu: "1.200.000 VNĐ"
    },
    {
      id: "5",
      ten: "Sửa chữa động cơ điện",
      moTa: "Bảo dưỡng động cơ, kiểm tra biến tần, cân bằng trục truyền động",
      thoiGianDuKien: "6-8 giờ",
      chiPhiTu: "8.000.000 VNĐ"
    }
  ]);

  const [danhSachXe, setDanhSachXe] = useState([
    {
      id: "1",
      bienSo: "29A-12345",
      model: "VinFast VF e34",
      chuXe: "Nguyễn Văn A",
      soKm: 14500,
      ngayDangKiem: "15/03/2025"
    },
    {
      id: "2",
      bienSo: "29A-67890",
      model: "VinFast VF 8",
      chuXe: "Trần Thị B",
      soKm: 8900,
      ngayDangKiem: "20/04/2025"
    }
  ]);

  const [lichHen, setLichHen] = useState([
    {
      id: "1",
      maLichHen: "LH-001",
      xe: "29A-12345 - VinFast VF e34",
      trungTam: "Trung tâm Dịch vụ Quận 1",
      dichVu: "Bảo dưỡng định kỳ",
      ngayGioHen: "22/11/2024 08:30",
      trangThai: "cho-xac-nhan",
      thoiGianTao: "19/11/2024 14:20",
      ghiChu: "",
      loaiKhachHang: "khach-quen"
    },
    {
      id: "2",
      maLichHen: "LH-002",
      xe: "29A-67890 - VinFast VF 8",
      trungTam: "Trung tâm Dịch vụ Quận 7",
      dichVu: "Thay ắc quy Lithium",
      ngayGioHen: "23/11/2024 09:00",
      trangThai: "da-xac-nhan",
      thoiGianTao: "19/11/2024 15:45",
      ghiChu: "Khách hàng yêu cầu kiểm tra thêm hệ thống làm mát ắc quy",
      loaiKhachHang: "khach-quen"
    },
    {
      id: "3",
      maLichHen: "LH-003",
      xe: "51B-12346 - VinFast VF 9",
      trungTam: "Trung tâm Dịch vụ Thủ Đức",
      dichVu: "Sửa chữa hệ thống phanh",
      ngayGioHen: "20/11/2024 13:30",
      trangThai: "hoan-tat",
      thoiGianTao: "18/11/2024 10:15",
      ghiChu: "Khách hàng mới - đã thay má phanh trước",
      loaiKhachHang: "khach-moi"
    }
  ]);

  const [showXacNhanModal, setShowXacNhanModal] = useState(false);
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [showXacNhanAdminModal, setShowXacNhanAdminModal] = useState(false);

  const [newLichHen, setNewLichHen] = useState({
    loaiKhachHang: "khach-moi",
    xeId: "",
    bienSo: "",
    model: "",
    chuXe: "",
    soDienThoai: "",
    email: "",
    soKm: "",
    trungTamId: "",
    dichVuId: "",
    ngayHen: "",
    gioHen: "",
    ghiChu: ""
  });

  const [selectedLichHen, setSelectedLichHen] = useState<any>(null);
  const [adminGhiChu, setAdminGhiChu] = useState("");

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
    if (!newLichHen.trungTamId || !newLichHen.dichVuId || !newLichHen.ngayHen || !newLichHen.gioHen) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    // Validate thông tin xe
    if (newLichHen.loaiKhachHang === "khach-moi") {
      if (!newLichHen.bienSo || !newLichHen.model || !newLichHen.chuXe || !newLichHen.soDienThoai) {
        alert("Vui lòng điền đầy đủ thông tin xe!");
        return;
      }
    } else {
      if (!newLichHen.xeId) {
        alert("Vui lòng chọn xe!");
        return;
      }
    }

    let thongTinXe = "";
    let thongTinLienHe = {};

    if (newLichHen.loaiKhachHang === "khach-quen") {
      const xeSelected = danhSachXe.find(xe => xe.id === newLichHen.xeId);
      thongTinXe = `${xeSelected?.bienSo} - ${xeSelected?.model}`;
      thongTinLienHe = {
        chuXe: xeSelected?.chuXe,
        soDienThoai: "Đã có trong hệ thống"
      };
    } else {
      thongTinXe = `${newLichHen.bienSo} - ${newLichHen.model}`;
      thongTinLienHe = {
        chuXe: newLichHen.chuXe,
        soDienThoai: newLichHen.soDienThoai,
        email: newLichHen.email
      };
    }

    const trungTamSelected = trungTamDichVu.find(tt => tt.id === newLichHen.trungTamId);
    const dichVuSelected = loaiDichVu.find(dv => dv.id === newLichHen.dichVuId);

    const lichHenMoi = {
      id: (lichHen.length + 1).toString(),
      maLichHen: `LH-${String(lichHen.length + 1).padStart(3, '0')}`,
      xe: thongTinXe,
      trungTam: trungTamSelected?.ten,
      dichVu: dichVuSelected?.ten,
      ngayGioHen: `${newLichHen.ngayHen} ${newLichHen.gioHen}`,
      trangThai: "cho-xac-nhan",
      thoiGianTao: new Date().toLocaleDateString('vi-VN') + " " + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      ghiChu: newLichHen.ghiChu,
      loaiKhachHang: newLichHen.loaiKhachHang,
      thongTinLienHe: thongTinLienHe,
      soKm: newLichHen.soKm || "Chưa cập nhật"
    };

    setLichHen(prev => [lichHenMoi, ...prev]);

    // Reset form
    setNewLichHen({
      loaiKhachHang: "khach-moi",
      xeId: "",
      bienSo: "",
      model: "",
      chuXe: "",
      soDienThoai: "",
      email: "",
      soKm: "",
      trungTamId: "",
      dichVuId: "",
      ngayHen: "",
      gioHen: "",
      ghiChu: ""
    });

    setSelectedLichHen(lichHenMoi);
    setShowXacNhanModal(true);
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

  // Chức năng xác nhận lịch hẹn (Admin)
  const handleXacNhanLichHen = () => {
    if (!selectedLichHen) return;

    setLichHen(prev => prev.map(lh =>
      lh.id === selectedLichHen.id
        ? {
            ...lh,
            trangThai: "da-xac-nhan",
            ghiChu: adminGhiChu ? `${lh.ghiChu ? lh.ghiChu + '\n' : ''}[Admin]: ${adminGhiChu}` : lh.ghiChu
          }
        : lh
    ));

    setShowXacNhanAdminModal(false);
    setAdminGhiChu("");
    alert("Đã xác nhận lịch hẹn thành công!");
  };

  // Chức năng từ chối lịch hẹn (Admin)
  const handleTuChoiLichHen = () => {
    if (!selectedLichHen) return;

    const lyDo = prompt("Lý do từ chối lịch hẹn:");
    if (lyDo) {
      setLichHen(prev => prev.map(lh =>
        lh.id === selectedLichHen.id
          ? {
              ...lh,
              trangThai: "da-huy",
              ghiChu: `${lh.ghiChu ? lh.ghiChu + '\n' : ''}[Admin - Từ chối]: ${lyDo}`
            }
          : lh
      ));

      setShowXacNhanAdminModal(false);
      setAdminGhiChu("");
      alert("Đã từ chối lịch hẹn!");
    }
  };

  // Chức năng xem chi tiết lịch hẹn
  const handleXemChiTiet = (lichHen: any) => {
    setSelectedLichHen(lichHen);
    setShowChiTietModal(true);
  };

  // Chức năng mở modal xác nhận admin
  const handleMoXacNhanAdmin = (lichHen: any) => {
    setSelectedLichHen(lichHen);
    setShowXacNhanAdminModal(true);
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
              🗓️ Đặt lịch mới
            </button>
            <button
              onClick={() => setActiveTab('lich-su')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lich-su'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              📋 Lịch sử đặt lịch ({lichHen.length})
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
                  {/* Chọn loại khách hàng */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Bạn là? *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="loaiKhachHang"
                          value="khach-moi"
                          checked={newLichHen.loaiKhachHang === "khach-moi"}
                          onChange={(e) => setNewLichHen({...newLichHen, loaiKhachHang: e.target.value, xeId: ""})}
                          className="mr-2"
                        />
                        <span className="text-sm">Khách hàng mới</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="loaiKhachHang"
                          value="khach-quen"
                          checked={newLichHen.loaiKhachHang === "khach-quen"}
                          onChange={(e) => setNewLichHen({...newLichHen, loaiKhachHang: e.target.value, bienSo: "", model: "", chuXe: "", soDienThoai: "", email: ""})}
                          className="mr-2"
                        />
                        <span className="text-sm">Khách hàng thân thiết</span>
                      </label>
                    </div>
                  </div>

                  {/* Form thông tin xe - Hiển thị theo loại khách hàng */}
                  {newLichHen.loaiKhachHang === "khach-quen" ? (
                    /* KHÁCH QUEN: Chọn xe từ danh sách */
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
                      <p className="text-xs text-gray-500 mt-1">
                        Chọn xe từ danh sách xe đã đăng ký
                      </p>
                    </div>
                  ) : (
                    /* KHÁCH MỚI: Nhập thông tin xe */
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Biển số xe *
                          </label>
                          <input
                            type="text"
                            value={newLichHen.bienSo}
                            onChange={(e) => setNewLichHen({...newLichHen, bienSo: e.target.value})}
                            placeholder="VD: 29A-12345"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Model xe *
                          </label>
                          <select
                            value={newLichHen.model}
                            onChange={(e) => setNewLichHen({...newLichHen, model: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                            <option value="">Chọn model</option>
                            <option value="VinFast VF e34">VinFast VF e34</option>
                            <option value="VinFast VF 8">VinFast VF 8</option>
                            <option value="VinFast VF 9">VinFast VF 9</option>
                            <option value="VinFast VF 6">VinFast VF 6</option>
                            <option value="VinFast VF 5">VinFast VF 5</option>
                            <option value="Khác">Khác</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tên chủ xe *
                          </label>
                          <input
                            type="text"
                            value={newLichHen.chuXe}
                            onChange={(e) => setNewLichHen({...newLichHen, chuXe: e.target.value})}
                            placeholder="Họ và tên chủ xe"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Số điện thoại *
                          </label>
                          <input
                            type="tel"
                            value={newLichHen.soDienThoai}
                            onChange={(e) => setNewLichHen({...newLichHen, soDienThoai: e.target.value})}
                            placeholder="VD: 0912345678"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={newLichHen.email}
                            onChange={(e) => setNewLichHen({...newLichHen, email: e.target.value})}
                            placeholder="email@example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Số km hiện tại
                          </label>
                          <input
                            type="number"
                            value={newLichHen.soKm}
                            onChange={(e) => setNewLichHen({...newLichHen, soKm: e.target.value})}
                            placeholder="VD: 15000"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

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
                      !newLichHen.trungTamId || !newLichHen.dichVuId || !newLichHen.ngayHen || !newLichHen.gioHen ||
                      (newLichHen.loaiKhachHang === "khach-moi" && (!newLichHen.bienSo || !newLichHen.model || !newLichHen.chuXe || !newLichHen.soDienThoai)) ||
                      (newLichHen.loaiKhachHang === "khach-quen" && !newLichHen.xeId)
                    }
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    🗓️ Đặt lịch ngay
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
                  🏢 Trung tâm dịch vụ
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
                  🔧 Dịch vụ phổ biến
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

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {lh.dichVu}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {lh.ngayGioHen}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>Đặt lúc: {lh.thoiGianTao}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleXemChiTiet(lh)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Chi tiết
                      </button>

                      {/* Nút xác nhận (chỉ hiện cho admin và lịch chờ xác nhận) */}
                      {lh.trangThai === "cho-xac-nhan" && (
                        <button
                          onClick={() => handleMoXacNhanAdmin(lh)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Xác nhận
                        </button>
                      )}

                      {(lh.trangThai === "cho-xac-nhan" || lh.trangThai === "da-xac-nhan") && (
                        <button
                          onClick={() => handleHuyLichHen(lh.id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Hủy lịch
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal xác nhận đặt lịch */}
      {showXacNhanModal && selectedLichHen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-green-600">✅</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Đặt lịch thành công!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Mã lịch hẹn: <span className="font-medium">{selectedLichHen.maLichHen}</span>
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 text-left">
                <div className="text-sm space-y-2">
                  <div><strong>Xe:</strong> {selectedLichHen.xe}</div>
                  <div><strong>Trung tâm:</strong> {selectedLichHen.trungTam}</div>
                  <div><strong>Dịch vụ:</strong> {selectedLichHen.dichVu}</div>
                  <div><strong>Thời gian:</strong> {selectedLichHen.ngayGioHen}</div>
                  {selectedLichHen.thongTinLienHe && (
                    <div><strong>Liên hệ:</strong> {selectedLichHen.thongTinLienHe.soDienThoai}</div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Chúng tôi sẽ xác nhận lịch hẹn qua SMS/Email trong vòng 2 giờ làm việc.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowXacNhanModal(false)}
                  className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setShowXacNhanModal(false);
                    setActiveTab('lich-su');
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Xem lịch hẹn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết lịch hẹn */}
      {showChiTietModal && selectedLichHen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Chi tiết lịch hẹn
              </h3>
              <button
                onClick={() => setShowChiTietModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mã lịch hẹn
                </label>
                <p className="text-sm text-gray-800 dark:text-white font-medium">{selectedLichHen.maLichHen}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Thông tin xe
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedLichHen.xe}</p>
              </div>

              {selectedLichHen.thongTinLienHe && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Thông tin liên hệ
                  </label>
                  <div className="text-sm text-gray-800 dark:text-white">
                    <div>Chủ xe: {selectedLichHen.thongTinLienHe.chuXe}</div>
                    <div>SĐT: {selectedLichHen.thongTinLienHe.soDienThoai}</div>
                    {selectedLichHen.thongTinLienHe.email && (
                      <div>Email: {selectedLichHen.thongTinLienHe.email}</div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trung tâm dịch vụ
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedLichHen.trungTam}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dịch vụ
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedLichHen.dichVu}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Thời gian hẹn
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedLichHen.ngayGioHen}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Số km
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedLichHen.soKm}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trạng thái
                </label>
                <span className={`px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(selectedLichHen.trangThai)}`}>
                  {getTrangThaiText(selectedLichHen.trangThai)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Thời gian tạo
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedLichHen.thoiGianTao}</p>
              </div>

              {selectedLichHen.ghiChu && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ghi chú
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white whitespace-pre-wrap">{selectedLichHen.ghiChu}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setShowChiTietModal(false)}
                className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
              {selectedLichHen.trangThai === "cho-xac-nhan" && (
                <button
                  onClick={() => {
                    setShowChiTietModal(false);
                    handleMoXacNhanAdmin(selectedLichHen);
                  }}
                  className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận lịch hẹn (Admin) */}
      {showXacNhanAdminModal && selectedLichHen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Xác nhận lịch hẹn
              </h3>
              <button
                onClick={() => setShowXacNhanAdminModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm space-y-2">
                  <div><strong>Mã:</strong> {selectedLichHen.maLichHen}</div>
                  <div><strong>Xe:</strong> {selectedLichHen.xe}</div>
                  <div><strong>Trung tâm:</strong> {selectedLichHen.trungTam}</div>
                  <div><strong>Dịch vụ:</strong> {selectedLichHen.dichVu}</div>
                  <div><strong>Thời gian:</strong> {selectedLichHen.ngayGioHen}</div>
                  {selectedLichHen.thongTinLienHe && (
                    <div><strong>Liên hệ:</strong> {selectedLichHen.thongTinLienHe.soDienThoai}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ghi chú xác nhận (tùy chọn)
                </label>
                <textarea
                  value={adminGhiChu}
                  onChange={(e) => setAdminGhiChu(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Thông tin thêm cho khách hàng..."
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleTuChoiLichHen}
                className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Từ chối
              </button>
              <button
                onClick={handleXacNhanLichHen}
                className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LichHenDichVu;