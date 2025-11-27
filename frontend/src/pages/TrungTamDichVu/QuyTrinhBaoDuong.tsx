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
    }
  ]);

  const [thongKe, setThongKe] = useState({
    cho: 5,
    dangXuLy: 3,
    hoanThanh: 12
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedXe, setSelectedXe] = useState<any>(null);
  const [buocMoi, setBuocMoi] = useState("");

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

    setThongKe(prev => ({
      ...prev,
      cho: prev.cho - 1,
      dangXuLy: prev.dangXuLy + 1
    }));

    alert("Đã bắt đầu xử lý xe!");
  };

  // Chức năng mở modal cập nhật tiến độ
  const handleOpenUpdateModal = (xe: any) => {
    setSelectedXe(xe);
    setBuocMoi(xe.buocHienTai);
    setShowUpdateModal(true);
  };

  // Chức năng cập nhật tiến độ
  const handleCapNhatTienDo = () => {
    if (buocMoi.trim() === "") {
      alert("Vui lòng nhập bước hiện tại!");
      return;
    }

    setXeDangXuLy(prev => prev.map(xe => {
      if (xe.id === selectedXe.id) {
        return {
          ...xe,
          buocHienTai: buocMoi
        };
      }
      return xe;
    }));

    setShowUpdateModal(false);
    setBuocMoi("");
    alert("Đã cập nhật tiến độ!");
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

    setThongKe(prev => ({
      ...prev,
      dangXuLy: prev.dangXuLy - 1,
      hoanThanh: prev.hoanThanh + 1
    }));

    alert("Đã hoàn thành bảo dưỡng xe!");
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
      cho: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
      "dang-lam": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
      "hoan-tat": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quy trình Bảo dưỡng
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Theo dõi tiến độ và ghi nhận tình trạng xe
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Thống kê nhanh */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-yellow-600">{thongKe.cho}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Đang chờ</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">{thongKe.dangXuLy}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Đang xử lý</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{thongKe.hoanThanh}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hoàn thành hôm nay</div>
          </div>
        </div>

        {/* Danh sách xe */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Xe trong xưởng
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {xeDangXuLy.map((xe) => (
                <div key={xe.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {xe.bienSo}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {xe.model}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(xe.trangThai)}`}>
                      {getTrangThaiText(xe.trangThai)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {xe.buocHienTai}
                      </p>
                      {xe.kyThuatVien && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Kỹ thuật viên: {xe.kyThuatVien}
                        </p>
                      )}
                    </div>
                    <div>
                      {xe.batDau && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Bắt đầu: {xe.batDau}
                        </p>
                      )}
                      {xe.duKienHoanThanh && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Dự kiến: {xe.duKienHoanThanh}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ghi nhận tình trạng */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ghi nhận tình trạng:
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      rows={2}
                      placeholder="Mô tả tình trạng xe..."
                      value={xe.tinhTrang}
                      onChange={(e) => handleUpdateTinhTrang(xe.id, e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 mt-3">
                    {xe.trangThai === "cho" && (
                      <button
                        onClick={() => handleBatDauXuLy(xe.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Bắt đầu xử lý
                      </button>
                    )}
                    {xe.trangThai === "dang-lam" && (
                      <>
                        <button
                          onClick={() => handleOpenUpdateModal(xe)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Cập nhật tiến độ
                        </button>
                        <button
                          onClick={() => handleHoanThanh(xe.id)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Hoàn thành
                        </button>
                      </>
                    )}
                    {xe.trangThai === "hoan-tat" && (
                      <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded">
                        Đã hoàn thành
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tiến độ tổng quan */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Tiến độ hôm nay
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Hoàn thành</span>
                  <span className="font-medium">
                    {Math.round((thongKe.hoanThanh / (thongKe.cho + thongKe.dangXuLy + thongKe.hoanThanh)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((thongKe.hoanThanh / (thongKe.cho + thongKe.dangXuLy + thongKe.hoanThanh)) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <span>Chờ xử lý: {thongKe.cho} xe</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Đang xử lý: {thongKe.dangXuLy} xe</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Hoàn thành: {thongKe.hoanThanh} xe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal cập nhật tiến độ */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Cập nhật tiến độ</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Xe: <span className="font-medium">{selectedXe?.bienSo}</span>
              </p>
              <label className="block text-sm font-medium mb-2">Bước hiện tại:</label>
              <textarea
                value={buocMoi}
                onChange={(e) => setBuocMoi(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="Nhập bước hiện tại đang thực hiện..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCapNhatTienDo}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Cập nhật
              </button>
              <button
                onClick={() => setShowUpdateModal(false)}
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

export default QuyTrinhBaoDuong;