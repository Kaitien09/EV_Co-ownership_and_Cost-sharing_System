import { useState } from "react";

const QuanLyPhuTung = () => {
  const [phuTung, setPhuTung] = useState([
    {
      id: "1",
      ten: "Lốp xe EV",
      ma: "EV-TIRE-001",
      tonKho: 45,
      tonKhoToiThieu: 20,
      gia: 2500000,
      nhaCungCap: "Công ty A",
      viTri: "Kho A"
    },
    {
      id: "2",
      ten: "Ắc quy Lithium",
      ma: "EV-BAT-001",
      tonKho: 12,
      tonKhoToiThieu: 10,
      gia: 15000000,
      nhaCungCap: "Công ty B",
      viTri: "Kho B"
    },
    {
      id: "3",
      ten: "Động cơ điện",
      ma: "EV-MOTOR-001",
      tonKho: 5,
      tonKhoToiThieu: 3,
      gia: 45000000,
      nhaCungCap: "Công ty C",
      viTri: "Kho C"
    },
    {
      id: "4",
      ten: "Bộ sạc nhanh",
      ma: "EV-CHARGER-001",
      tonKho: 8,
      tonKhoToiThieu: 5,
      gia: 12000000,
      nhaCungCap: "Công ty D",
      viTri: "Kho A"
    }
  ]);

  const [deXuat, setDeXuat] = useState([
    {
      id: "1",
      ten: "Lốp xe EV",
      lyDo: "Nhu cầu thay thế cao trong tháng 11",
      soLuongDeXuat: 30,
      doUuTien: "cao"
    },
    {
      id: "2",
      ten: "Bộ lọc gió",
      lyDo: "Dự báo thời tiết nhiều bụi",
      soLuongDeXuat: 25,
      doUuTien: "trung-binh"
    }
  ]);

  const [showNhapHangModal, setShowNhapHangModal] = useState(false);
  const [showDatHangModal, setShowDatHangModal] = useState(false);
  const [selectedPhuTung, setSelectedPhuTung] = useState<any>(null);
  const [soLuongNhap, setSoLuongNhap] = useState("");
  const [selectedDeXuat, setSelectedDeXuat] = useState<any>(null);

  // Chức năng mở modal nhập hàng
  const handleOpenNhapHangModal = (phuTung: any) => {
    setSelectedPhuTung(phuTung);
    setSoLuongNhap("");
    setShowNhapHangModal(true);
  };

  // Chức năng nhập hàng
  const handleNhapHang = () => {
    if (!soLuongNhap || parseInt(soLuongNhap) <= 0) {
      alert("Vui lòng nhập số lượng hợp lệ!");
      return;
    }

    const soLuong = parseInt(soLuongNhap);
    setPhuTung(prev => prev.map(item => {
      if (item.id === selectedPhuTung.id) {
        return {
          ...item,
          tonKho: item.tonKho + soLuong
        };
      }
      return item;
    }));

    setShowNhapHangModal(false);
    setSoLuongNhap("");
    alert(`Đã nhập ${soLuong} ${selectedPhuTung.ten} vào kho!`);
  };

  // Chức năng mở modal đặt hàng từ đề xuất AI
  const handleOpenDatHangModal = (deXuatItem: any) => {
    setSelectedDeXuat(deXuatItem);
    setShowDatHangModal(true);
  };

  // Chức năng đặt hàng từ đề xuất AI
  const handleDatHang = () => {
    // Tìm phụ tùng tương ứng trong kho
    const phuTungItem = phuTung.find(item => item.ten === selectedDeXuat.ten);

    if (phuTungItem) {
      // Cập nhật tồn kho
      setPhuTung(prev => prev.map(item => {
        if (item.ten === selectedDeXuat.ten) {
          return {
            ...item,
            tonKho: item.tonKho + selectedDeXuat.soLuongDeXuat
          };
        }
        return item;
      }));

      // Xóa khỏi danh sách đề xuất
      setDeXuat(prev => prev.filter(item => item.id !== selectedDeXuat.id));
    } else {
      // Thêm phụ tùng mới nếu chưa có trong kho
      const newPhuTung = {
        id: (phuTung.length + 1).toString(),
        ten: selectedDeXuat.ten,
        ma: `EV-${selectedDeXuat.ten.toUpperCase().replace(/ /g, '-')}-001`,
        tonKho: selectedDeXuat.soLuongDeXuat,
        tonKhoToiThieu: 10,
        gia: 1000000, // Giá mặc định
        nhaCungCap: "Nhà cung cấp mới",
        viTri: "Kho mới"
      };
      setPhuTung(prev => [...prev, newPhuTung]);
      setDeXuat(prev => prev.filter(item => item.id !== selectedDeXuat.id));
    }

    setShowDatHangModal(false);
    alert(`Đã đặt hàng ${selectedDeXuat.soLuongDeXuat} ${selectedDeXuat.ten}!`);
  };

  // Chức năng xem chi tiết phụ tùng
  const handleXemChiTiet = (phuTung: any) => {
    alert(`Chi tiết phụ tùng:\n\nTên: ${phuTung.ten}\nMã: ${phuTung.ma}\nTồn kho: ${phuTung.tonKho}\nTối thiểu: ${phuTung.tonKhoToiThieu}\nGiá: ${formatCurrency(phuTung.gia)}\nNhà cung cấp: ${phuTung.nhaCungCap}\nVị trí: ${phuTung.viTri}`);
  };

  // Chức năng chỉnh sửa phụ tùng
  const handleChinhSua = (phuTung: any) => {
    alert(`Chức năng chỉnh sửa phụ tùng: ${phuTung.ten}\n\n(Tính năng đang phát triển)`);
  };

  // Chức năng bỏ qua đề xuất
  const handleBoQuaDeXuat = (deXuatId: string) => {
    setDeXuat(prev => prev.filter(item => item.id !== deXuatId));
    alert("Đã bỏ qua đề xuất!");
  };

  const getTrangThaiTonKho = (tonKho: number, toiThieu: number) => {
    if (tonKho <= toiThieu) return "thap";
    if (tonKho <= toiThieu * 1.5) return "canh-bao";
    return "tot";
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      thap: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
      "canh-bao": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
      tot: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
    };
    return colors[trangThai as keyof typeof colors];
  };

  const getTrangThaiText = (trangThai: string) => {
    const texts = {
      thap: "Sắp hết",
      "canh-bao": "Đủ dùng",
      tot: "Dồi dào"
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
          Quản lý Phụ tùng
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Theo dõi tồn kho và AI đề xuất nhu cầu phụ tùng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">{phuTung.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tổng loại phụ tùng</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600">
            {phuTung.reduce((total, item) => total + item.tonKho, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tổng tồn kho</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600">
            {phuTung.filter(item => getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu) === "canh-bao").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Cần cảnh báo</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600">
            {phuTung.filter(item => getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu) === "thap").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sắp hết hàng</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Danh sách phụ tùng */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Danh sách Phụ tùng
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tên phụ tùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Mã số
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tồn kho
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tình trạng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {phuTung.map((item) => {
                    const trangThai = getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu);
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.ten}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.nhaCungCap}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {item.ma}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {item.tonKho} / {item.tonKhoToiThieu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(trangThai)}`}>
                            {getTrangThaiText(trangThai)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatCurrency(item.gia)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleXemChiTiet(item)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 transition-colors"
                            >
                              Chi tiết
                            </button>
                            <button
                              onClick={() => handleOpenNhapHangModal(item)}
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 transition-colors"
                            >
                              Nhập thêm
                            </button>
                            <button
                              onClick={() => handleChinhSua(item)}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 transition-colors"
                            >
                              Sửa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Đề xuất AI */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                🤖 AI Đề xuất
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gợi ý nhu cầu phụ tùng
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {deXuat.map((item) => (
                  <div key={item.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                        {item.ten}
                      </h4>
                      <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs dark:bg-blue-700 dark:text-blue-200">
                        Đề xuất
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                      {item.lyDo}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        SL: {item.soLuongDeXuat}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenDatHangModal(item)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Đặt hàng
                        </button>
                        <button
                          onClick={() => handleBoQuaDeXuat(item.id)}
                          className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 transition-colors"
                        >
                          Bỏ qua
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  📊 Phân tích tồn kho
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Dự kiến đủ phụ tùng cho 15 ngày tới. Nên bổ sung lốp xe và bộ lọc gió.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal nhập hàng */}
      {showNhapHangModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Nhập hàng</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Phụ tùng: <span className="font-medium">{selectedPhuTung?.ten}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Tồn kho hiện tại: <span className="font-medium">{selectedPhuTung?.tonKho}</span>
              </p>
              <label className="block text-sm font-medium mb-2">Số lượng nhập:</label>
              <input
                type="number"
                value={soLuongNhap}
                onChange={(e) => setSoLuongNhap(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="Nhập số lượng"
                min="1"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleNhapHang}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setShowNhapHangModal(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal đặt hàng */}
      {showDatHangModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Xác nhận đặt hàng</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Phụ tùng: <span className="font-medium">{selectedDeXuat?.ten}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Số lượng: <span className="font-medium">{selectedDeXuat?.soLuongDeXuat}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lý do: <span className="font-medium">{selectedDeXuat?.lyDo}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDatHang}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Xác nhận đặt
              </button>
              <button
                onClick={() => setShowDatHangModal(false)}
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

export default QuanLyPhuTung;