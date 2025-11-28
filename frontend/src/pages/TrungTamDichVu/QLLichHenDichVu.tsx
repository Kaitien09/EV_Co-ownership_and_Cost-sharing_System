import { useState } from "react";

const QLLichHenDichVu = () => {
  const [yeuCauMoi, setYeuCauMoi] = useState([
    {
      id: "1",
      khachHang: "Nguyễn Văn A",
      bienSo: "30A-11111",
      dichVu: "Bảo dưỡng pin",
      ngayYeuCau: "2025-11-27 08:00:00",
      uuTien: "cao",
      soDienThoai: "0903000001",
      loaiXe: "Model X1",
      moTaVanDe: "Bao duong pin",
      trangThai: "CHO_XAC_NHAN"
    },
    {
      id: "2",
      khachHang: "Tran Thi B",
      bienSo: "30A-22222",
      dichVu: "Kiểm tra hệ thống",
      ngayYeuCau: "2025-11-28 09:00:00",
      uuTien: "trung-binh",
      soDienThoai: "0903000002",
      loaiXe: "Model X2",
      moTaVanDe: "Kiem tra he thong",
      trangThai: "CHO_XAC_NHAN"
    },
    {
      id: "3",
      khachHang: "Le Van C",
      bienSo: "30A-33333",
      dichVu: "Thay thế phụ tùng",
      ngayYeuCau: "2025-11-29 10:00:00",
      uuTien: "thap",
      soDienThoai: "0903000003",
      loaiXe: "Model X3",
      moTaVanDe: "Thay phu tung xe",
      trangThai: "CHO_XAC_NHAN"
    }
  ]);

  const [kyThuatVien, setKyThuatVien] = useState([
    {
      id: "1",
      ten: "Nguyen Van A",
      chuyenMon: "Điện",
      kinhNghiem: 5,
      chungChi: "CC01",
      soDienThoai: "0902000001",
      email: "kth1@example.com",
      congViecDangLam: 1
    },
    {
      id: "2",
      ten: "Le Thi B",
      chuyenMon: "Cơ Khí",
      kinhNghiem: 3,
      chungChi: "CC02",
      soDienThoai: "0902000002",
      email: "kth2@example.com",
      congViecDangLam: 1
    },
    {
      id: "3",
      ten: "Tran Van C",
      chuyenMon: "Điện Tử",
      kinhNghiem: 7,
      chungChi: "CC03",
      soDienThoai: "0902000003",
      email: "kth3@example.com",
      congViecDangLam: 0
    }
  ]);

  // Tự động chọn KTV có ít công việc nhất
  const chonKTVTuDong = () => {
    return kyThuatVien.reduce((minKTV, ktv) => {
      return ktv.congViecDangLam < minKTV.congViecDangLam ? ktv : minKTV;
    });
  };

  // Chức năng tiếp nhận yêu cầu
  const handleTiepNhanYeuCau = (yeuCauId) => {
    const yeuCau = yeuCauMoi.find(yc => yc.id === yeuCauId);
    if (!yeuCau) return;

    const ktv = chonKTVTuDong();

    // Cập nhật trạng thái yêu cầu thành "Đang làm"
    setYeuCauMoi(prev => prev.map(yc =>
      yc.id === yeuCauId
        ? {
            ...yc,
            trangThai: "DANG_THUC_HIEN",
            kyThuatVien: ktv.ten,
            ngayBatDau: new Date().toISOString().slice(0, 19).replace('T', ' '),
            duKienHoanThanh: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
          }
        : yc
    ));

    // Cập nhật số lượng công việc của KTV
    setKyThuatVien(prev => prev.map(k =>
      k.id === ktv.id
        ? { ...k, congViecDangLam: k.congViecDangLam + 1 }
        : k
    ));
  };

  // Chức năng từ chối yêu cầu
  const handleTuChoiYeuCau = (yeuCauId) => {
    setYeuCauMoi(prev => prev.filter(yc => yc.id !== yeuCauId));
  };

  // Chức năng hoàn thành dịch vụ
  const handleHoanThanhDichVu = (yeuCauId) => {
    const yeuCau = yeuCauMoi.find(yc => yc.id === yeuCauId);
    if (!yeuCau) return;

    // Cập nhật trạng thái yêu cầu thành "Hoàn thành"
    setYeuCauMoi(prev => prev.map(yc =>
      yc.id === yeuCauId
        ? {
            ...yc,
            trangThai: "HOAN_THANH",
            ngayHoanThanh: new Date().toISOString().slice(0, 19).replace('T', ' ')
          }
        : yc
    ));

    // Giảm số lượng công việc của KTV
    if (yeuCau.kyThuatVien) {
      const ktv = kyThuatVien.find(k => k.ten === yeuCau.kyThuatVien);
      if (ktv) {
        setKyThuatVien(prev => prev.map(k =>
          k.id === ktv.id
            ? { ...k, congViecDangLam: Math.max(0, k.congViecDangLam - 1) }
            : k
        ));
      }
    }
  };

  const getUuTienColor = (uuTien) => {
    const colors = {
      cao: "bg-red-50 text-red-700 border border-red-200",
      "trung-binh": "bg-yellow-50 text-yellow-700 border border-yellow-200",
      thap: "bg-green-50 text-green-700 border border-green-200"
    };
    return colors[uuTien] || colors["trung-binh"];
  };

  const getTrangThaiColor = (trangThai) => {
    const colors = {
      "CHO_XAC_NHAN": "bg-gray-100 text-gray-700 border border-gray-300",
      "DANG_THUC_HIEN": "bg-orange-50 text-orange-700 border border-orange-200",
      "HOAN_THANH": "bg-green-50 text-green-700 border border-green-200",
      "DA_HUY": "bg-red-50 text-red-700 border border-red-200"
    };
    return colors[trangThai] || colors["CHO_XAC_NHAN"];
  };

  const formatTrangThai = (trangThai) => {
    const mappings = {
      "CHO_XAC_NHAN": "Chờ xác nhận",
      "DANG_THUC_HIEN": "Đang thực hiện",
      "HOAN_THANH": "Hoàn thành",
      "DA_HUY": "Đã hủy"
    };
    return mappings[trangThai] || trangThai;
  };

  const formatNgay = (ngayString) => {
    if (!ngayString) return "";
    return new Date(ngayString).toLocaleString('vi-VN');
  };

  // Thống kê
  const thongKe = {
    choXacNhan: yeuCauMoi.filter(x => x.trangThai === "CHO_XAC_NHAN").length,
    dangThucHien: yeuCauMoi.filter(x => x.trangThai === "DANG_THUC_HIEN").length,
    hoanThanh: yeuCauMoi.filter(x => x.trangThai === "HOAN_THANH").length,
    tong: yeuCauMoi.length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý Lịch hẹn & Dịch vụ
          </h1>
          <p className="text-gray-600">
            Tiếp nhận yêu cầu và quản lý lịch trình kỹ thuật viên
          </p>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
              <div>
                <p className="text-sm text-gray-600">Chờ xác nhận</p>
                <p className="text-2xl font-bold text-gray-900">{thongKe.choXacNhan}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm text-gray-600">Đang thực hiện</p>
                <p className="text-2xl font-bold text-gray-900">{thongKe.dangThucHien}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm text-gray-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{thongKe.hoanThanh}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm text-gray-600">Tổng số</p>
                <p className="text-2xl font-bold text-gray-900">{thongKe.tong}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách kỹ thuật viên */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Kỹ thuật viên hiện có
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kyThuatVien.map((ktv) => (
                <div key={ktv.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border">
                      <span className="text-gray-600 font-semibold text-lg">
                        {ktv.ten.split(' ').pop()?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{ktv.ten}</h3>
                      <p className="text-sm text-gray-600">{ktv.chuyenMon}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Kinh nghiệm: {ktv.kinhNghiem} năm</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ktv.congViecDangLam > 0 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {ktv.congViecDangLam} công việc
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Danh sách yêu cầu */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh sách yêu cầu dịch vụ
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {yeuCauMoi.map((yeuCau) => (
              <div key={yeuCau.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border">
                        <span className="text-gray-600 font-semibold text-lg">
                          {yeuCau.khachHang.split(' ').pop()?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {yeuCau.khachHang}
                        </h3>
                        <p className="text-sm text-gray-600">{yeuCau.loaiXe} - {yeuCau.bienSo}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Dịch vụ:</span>
                        <span className="ml-1">{yeuCau.dichVu}</span>
                      </div>
                      <div>
                        <span className="font-medium">Điện thoại:</span>
                        <span className="ml-1">{yeuCau.soDienThoai}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                      <p className="text-gray-800 font-medium">
                        {yeuCau.dichVu}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {yeuCau.moTaVanDe}
                      </p>
                    </div>

                    {/* Thông tin thêm khi đang làm hoặc hoàn thành */}
                    {(yeuCau.trangThai === "DANG_THUC_HIEN" || yeuCau.trangThai === "HOAN_THANH") && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Kỹ thuật viên:</span>
                            <span className="ml-1">{yeuCau.kyThuatVien}</span>
                          </div>
                          <div>
                            <span className="font-medium">Bắt đầu:</span>
                            <span className="ml-1">{formatNgay(yeuCau.ngayBatDau)}</span>
                          </div>
                          {yeuCau.duKienHoanThanh && (
                            <div>
                              <span className="font-medium">Dự kiến hoàn thành:</span>
                              <span className="ml-1">{formatNgay(yeuCau.duKienHoanThanh)}</span>
                            </div>
                          )}
                          {yeuCau.ngayHoanThanh && (
                            <div>
                              <span className="font-medium">Hoàn thành:</span>
                              <span className="ml-1">{formatNgay(yeuCau.ngayHoanThanh)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrangThaiColor(yeuCau.trangThai)}`}>
                      {formatTrangThai(yeuCau.trangThai)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUuTienColor(yeuCau.uuTien)}`}>
                      {yeuCau.uuTien === 'cao' ? 'Ưu tiên cao' :
                       yeuCau.uuTien === 'thap' ? 'Ưu tiên thấp' : 'Ưu tiên trung bình'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      Yêu cầu: {formatNgay(yeuCau.ngayYeuCau)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {yeuCau.trangThai === "CHO_XAC_NHAN" && (
                      <>
                        <button
                          onClick={() => handleTiepNhanYeuCau(yeuCau.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Tiếp nhận
                        </button>
                        <button
                          onClick={() => handleTuChoiYeuCau(yeuCau.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                        >
                          Từ chối
                        </button>
                      </>
                    )}
                    {yeuCau.trangThai === "DANG_THUC_HIEN" && (
                      <button
                        onClick={() => handleHoanThanhDichVu(yeuCau.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Hoàn thành
                      </button>
                    )}
                    {yeuCau.trangThai === "HOAN_THANH" && (
                      <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm font-medium">
                        Đã hoàn thành
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {yeuCauMoi.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg">Không có yêu cầu nào</p>
                <p className="text-sm">Tất cả yêu cầu đã được xử lý</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLLichHenDichVu;