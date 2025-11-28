import { useState } from "react";

const QuyTrinhBaoDuong = () => {
  const [xeDangXuLy, setXeDangXuLy] = useState([
    {
      id: "1",
      bienSo: "29A-12345",
      model: "VinFast VF e34",
      trangThai: "dang-lam",
      buocHienTai: "Đang kiểm tra hệ thống phanh",
      kyThuatVien: "Nguyễn Văn C",
      batDau: "08:00",
      duKienHoanThanh: "11:30",
      tinhTrang: "Bình thường"
    },
    {
      id: "2",
      bienSo: "29A-67890",
      model: "VinFast VF 8",
      trangThai: "cho",
      buocHienTai: "Chờ tiếp nhận",
      kyThuatVien: "",
      batDau: "",
      duKienHoanThanh: "",
      tinhTrang: "Cần kiểm tra điều hòa"
    },
    {
      id: "3",
      bienSo: "29A-99999",
      model: "Tesla Model 3",
      trangThai: "hoan-tat",
      buocHienTai: "Đã hoàn thành bảo dưỡng",
      kyThuatVien: "Trần Thị D",
      batDau: "07:30",
      duKienHoanThanh: "10:15",
      tinhTrang: "Tốt, không phát hiện lỗi"
    }
  ]);

  // Chức năng bắt đầu xử lý xe
  const handleBatDauXuLy = (xeId: string) => {
    setXeDangXuLy(prev => prev.map(xe => {
      if (xe.id === xeId) {
        return {
          ...xe,
          trangThai: "dang-lam",
          buocHienTai: "Đang kiểm tra tổng quan",
          kyThuatVien: "Nguyễn Văn C",
          batDau: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          duKienHoanThanh: new Date(Date.now() + 3 * 60 * 60 * 1000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
      }
      return xe;
    }));
  };

  // Chức năng hoàn thành xe
  const handleHoanThanh = (xeId: string) => {
    setXeDangXuLy(prev => prev.map(xe => {
      if (xe.id === xeId) {
        return {
          ...xe,
          trangThai: "hoan-tat",
          buocHienTai: "Đã hoàn thành bảo dưỡng",
          duKienHoanThanh: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
      }
      return xe;
    }));
  };

  // Chức năng cập nhật tình trạng
  const handleUpdateTinhTrang = (xeId: string, tinhTrang: string) => {
    setXeDangXuLy(prev => prev.map(xe => {
      if (xe.id === xeId) {
        return {
          ...xe,
          tinhTrang: tinhTrang
        };
      }
      return xe;
    }));
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      cho: "bg-gray-100 text-gray-700 border border-gray-300",
      "dang-lam": "bg-blue-50 text-blue-700 border border-blue-200",
      "hoan-tat": "bg-green-50 text-green-700 border border-green-200"
    };
    return colors[trangThai as keyof typeof colors];
  };

  const getTrangThaiText = (trangThai: string) => {
    const texts = {
      cho: "Chờ xử lý",
      "dang-lam": "Đang thực hiện",
      "hoan-tat": "Hoàn thành"
    };
    return texts[trangThai as keyof typeof texts];
  };

  // Thống kê
  const thongKe = {
    cho: xeDangXuLy.filter(xe => xe.trangThai === "cho").length,
    dangXuLy: xeDangXuLy.filter(xe => xe.trangThai === "dang-lam").length,
    hoanThanh: xeDangXuLy.filter(xe => xe.trangThai === "hoan-tat").length
  };

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
          {/* Tiến độ tổng quan - ĐƯA LÊN TRÊN */}
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
                      {xeDangXuLy.length} xe
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round((thongKe.hoanThanh / xeDangXuLy.length) * 100)}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-gray-600">Chờ xử lý</span>
                    </div>
                    <span className="font-medium text-gray-900">{thongKe.cho}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
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

          {/* Danh sách xe - CHIẾM 3/4 CÒN LẠI */}
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
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        {xe.batDau && (
                          <p>Bắt đầu: {xe.batDau}</p>
                        )}
                        {xe.duKienHoanThanh && (
                          <p>Dự kiến: {xe.duKienHoanThanh}</p>
                        )}
                      </div>
                    </div>

                    {/* Ghi nhận tình trạng */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ghi nhận tình trạng:
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="Mô tả tình trạng xe..."
                        value={xe.tinhTrang}
                        onChange={(e) => handleUpdateTinhTrang(xe.id, e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      {xe.trangThai === "cho" && (
                        <button
                          onClick={() => handleBatDauXuLy(xe.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Bắt đầu xử lý
                        </button>
                      )}
                      {xe.trangThai === "dang-lam" && (
                        <button
                          onClick={() => handleHoanThanh(xe.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Hoàn thành
                        </button>
                      )}
                      {xe.trangThai === "hoan-tat" && (
                        <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm font-medium">
                          Đã hoàn thành
                        </span>
                      )}
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