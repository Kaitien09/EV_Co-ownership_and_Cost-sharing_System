import { useState } from "react";

const QuyTrinhBaoDuong = () => {
  const [xeDangXuLy, setXeDangXuLy] = useState([
    {
      id: "1",
      bienSo: "30A-11111",
      model: "Model X1",
      trangThai: "DANG_THUC_HIEN",
      buocHienTai: "Kiểm tra pin",
      kyThuatVien: "Nguyen Van A",
      batDau: "2025-11-28 07:17:36",
      duKienHoanThanh: "2025-11-28 09:17:36",
      tinhTrang: "Pin ok",
      danhSachKiemTra: "kiểm tra pin",
      ketQuaKiemTra: "Thanh cong",
      khacPhuc: "Khong can"
    },
    {
      id: "2",
      bienSo: "30A-22222",
      model: "Model X2",
      trangThai: "DANG_THUC_HIEN",
      buocHienTai: "Kiểm tra động cơ",
      kyThuatVien: "Le Thi B",
      batDau: "2025-11-28 07:17:36",
      duKienHoanThanh: "2025-11-28 10:17:36",
      tinhTrang: "Dong co ok",
      danhSachKiemTra: "Kiểm tra động cơ",
      ketQuaKiemTra: "Thanh cong",
      khacPhuc: "Khong can"
    },
    {
      id: "3",
      bienSo: "30A-33333",
      model: "Model X3",
      trangThai: "HOAN_THANH",
      buocHienTai: "Thay phụ tùng",
      kyThuatVien: "Tran Van C",
      batDau: "2025-11-28 07:17:36",
      duKienHoanThanh: "2025-11-28 08:17:36",
      tinhTrang: "Thay phu tung thanh cong",
      danhSachKiemTra: "Thay phụ tùng",
      ketQuaKiemTra: "Thanh cong",
      khacPhuc: "Khac phuc xong"
    },
    {
      id: "4",
      bienSo: "30A-44444",
      model: "Model X4",
      trangThai: "CHO_XAC_NHAN",
      buocHienTai: "Chờ tiếp nhận",
      kyThuatVien: "",
      batDau: "",
      duKienHoanThanh: "",
      tinhTrang: "Cần kiểm tra hệ thống điện",
      danhSachKiemTra: {},
      ketQuaKiemTra: "",
      khacPhuc: ""
    },
    {
      id: "5",
      bienSo: "30A-55555",
      model: "Model X5",
      trangThai: "DA_XAC_NHAN",
      buocHienTai: "Chờ phân công kỹ thuật viên",
      kyThuatVien: "",
      batDau: "",
      duKienHoanThanh: "",
      tinhTrang: "Bảo dưỡng định kỳ",
      danhSachKiemTra: {},
      ketQuaKiemTra: "",
      khacPhuc: ""
    }
  ]);

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "CHO_XAC_NHAN": "bg-gray-100 text-gray-700 border border-gray-300",
      "DA_XAC_NHAN": "bg-blue-50 text-blue-700 border border-blue-200",
      "DANG_THUC_HIEN": "bg-orange-50 text-orange-700 border border-orange-200",
      "HOAN_THANH": "bg-green-50 text-green-700 border border-green-200"
    };
    return colors[trangThai as keyof typeof colors] || colors["CHO_XAC_NHAN"];
  };

  const getTrangThaiText = (trangThai: string) => {
    const texts = {
      "CHO_XAC_NHAN": "Chờ xác nhận",
      "DA_XAC_NHAN": "Đã xác nhận",
      "DANG_THUC_HIEN": "Đang thực hiện",
      "HOAN_THANH": "Hoàn thành"
    };
    return texts[trangThai as keyof typeof texts] || trangThai;
  };

  const formatThoiGian = (thoiGian: string) => {
    if (!thoiGian) return "";
    return new Date(thoiGian).toLocaleString('vi-VN');
  };

  // Thống kê
  const thongKe = {
    choXacNhan: xeDangXuLy.filter(xe => xe.trangThai === "CHO_XAC_NHAN").length,
    daXacNhan: xeDangXuLy.filter(xe => xe.trangThai === "DA_XAC_NHAN").length,
    dangXuLy: xeDangXuLy.filter(xe => xe.trangThai === "DANG_THUC_HIEN").length,
    hoanThanh: xeDangXuLy.filter(xe => xe.trangThai === "HOAN_THANH").length
  };

  const tongXe = xeDangXuLy.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quy trình Bảo dưỡng
          </h1>
          <p className="text-gray-600">
            Theo dõi tiến độ và ghi nhận tình trạng xe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tiến độ tổng quan */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tiến độ hôm nay
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Tổng số xe</span>
                    <span className="font-medium text-gray-900">
                      {tongXe} xe
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round((thongKe.hoanThanh / tongXe) * 100)}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-gray-600">Chờ xác nhận</span>
                    </div>
                    <span className="font-medium text-gray-900">{thongKe.choXacNhan}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Đã xác nhận</span>
                    </div>
                    <span className="font-medium text-gray-900">{thongKe.daXacNhan}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Đang xử lý</span>
                    </div>
                    <span className="font-medium text-gray-900">{thongKe.dangXuLy}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Hoàn thành</span>
                    </div>
                    <span className="font-medium text-gray-900">{thongKe.hoanThanh}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách xe */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Xe trong xưởng
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {xeDangXuLy.map((xe) => (
                  <div key={xe.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {xe.bienSo}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {xe.model}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrangThaiColor(xe.trangThai)}`}>
                        {getTrangThaiText(xe.trangThai)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-700 font-medium mb-2">
                          {xe.buocHienTai}
                        </p>
                        {xe.kyThuatVien && (
                          <p className="text-sm text-gray-600">
                            Kỹ thuật viên: {xe.kyThuatVien}
                          </p>
                        )}
                        {xe.ketQuaKiemTra && (
                          <p className="text-sm text-green-600 mt-1">
                            Kết quả: {xe.ketQuaKiemTra}
                          </p>
                        )}
                        {xe.khacPhuc && (
                          <p className="text-sm text-blue-600 mt-1">
                            Khắc phục: {xe.khacPhuc}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        {xe.batDau && (
                          <p>Bắt đầu: {formatThoiGian(xe.batDau)}</p>
                        )}
                        {xe.duKienHoanThanh && (
                          <p>Dự kiến: {formatThoiGian(xe.duKienHoanThanh)}</p>
                        )}
                      </div>
                    </div>

                    {/* Danh sách kiểm tra */}
                    {Object.keys(xe.danhSachKiemTra).length > 0 && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Danh sách kiểm tra:
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <pre className="text-sm text-gray-700">
                            {JSON.stringify(xe.danhSachKiemTra, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Ghi nhận tình trạng */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ghi nhận tình trạng:
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{xe.tinhTrang}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuyTrinhBaoDuong;