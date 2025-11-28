import { useState, useEffect } from "react";

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
      viTri: "Kho A",
      lichSuNhap: [
        { ngay: "2024-01-15", soLuong: 30, nguoiNhap: "Admin" },
        { ngay: "2024-01-20", soLuong: 15, nguoiNhap: "Admin" }
      ]
    },
    {
      id: "2",
      ten: "Ắc quy Lithium",
      ma: "EV-BAT-001",
      tonKho: 12,
      tonKhoToiThieu: 10,
      gia: 15000000,
      nhaCungCap: "Công ty B",
      viTri: "Kho B",
      lichSuNhap: [
        { ngay: "2024-01-10", soLuong: 20, nguoiNhap: "Admin" }
      ]
    },
    {
      id: "3",
      ten: "Động cơ điện",
      ma: "EV-MOTOR-001",
      tonKho: 5,
      tonKhoToiThieu: 3,
      gia: 45000000,
      nhaCungCap: "Công ty C",
      viTri: "Kho C",
      lichSuNhap: [
        { ngay: "2024-01-05", soLuong: 7, nguoiNhap: "Admin" }
      ]
    },
    {
      id: "4",
      ten: "Bộ sạc nhanh",
      ma: "EV-CHARGER-001",
      tonKho: 8,
      tonKhoToiThieu: 5,
      gia: 12000000,
      nhaCungCap: "Công ty D",
      viTri: "Kho A",
      lichSuNhap: [
        { ngay: "2024-01-08", soLuong: 20, nguoiNhap: "Admin" }
      ]
    }
  ]);

  const [showNhapHangModal, setShowNhapHangModal] = useState(false);
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [showThemPhuTungModal, setShowThemPhuTungModal] = useState(false);
  const [selectedPhuTung, setSelectedPhuTung] = useState<any>(null);
  const [soLuongNhap, setSoLuongNhap] = useState("");
  const [filterTrangThai, setFilterTrangThai] = useState("tat-ca");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Form thêm phụ tùng mới
  const [newPhuTung, setNewPhuTung] = useState({
    ten: "",
    ma: "",
    tonKho: 0,
    tonKhoToiThieu: 0,
    gia: 0,
    nhaCungCap: "",
    viTri: ""
  });

  // Theo dõi số lượng phụ tùng và cảnh báo
  const [thongKe, setThongKe] = useState({
    tongPhuTung: 0,
    tongTonKho: 0,
    canhBao: 0,
    sapHet: 0
  });

  // Cập nhật thống kê khi danh sách phụ tùng thay đổi
  useEffect(() => {
    const tongPhuTung = phuTung.length;
    const tongTonKho = phuTung.reduce((total, item) => total + item.tonKho, 0);
    const canhBao = phuTung.filter(item =>
      getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu) === "canh-bao"
    ).length;
    const sapHet = phuTung.filter(item =>
      getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu) === "thap"
    ).length;

    setThongKe({
      tongPhuTung,
      tongTonKho,
      canhBao,
      sapHet
    });
  }, [phuTung]);

  // Lọc phụ tùng theo trạng thái và từ khóa tìm kiếm
  const phuTungFiltered = phuTung.filter(item => {
    const matchesSearch = item.ten.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                         item.ma.toLowerCase().includes(searchKeyword.toLowerCase());

    if (filterTrangThai === "tat-ca") return matchesSearch;

    const trangThai = getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu);
    return matchesSearch && trangThai === filterTrangThai;
  });

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
    const ngayNhap = new Date().toISOString().split('T')[0];

    setPhuTung(prev => prev.map(item => {
      if (item.id === selectedPhuTung.id) {
        return {
          ...item,
          tonKho: item.tonKho + soLuong,
          lichSuNhap: [
            ...item.lichSuNhap,
            { ngay: ngayNhap, soLuong: soLuong, nguoiNhap: "Người dùng" }
          ]
        };
      }
      return item;
    }));

    setShowNhapHangModal(false);
    setSoLuongNhap("");
    alert(`Đã nhập ${soLuong} ${selectedPhuTung.ten} vào kho!`);
  };

  // Chức năng điều chỉnh số lượng
  const handleDieuChinhSoLuong = (id: string, change: number) => {
    setPhuTung(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.tonKho + change;
        if (newQuantity < 0) return item; // Không cho phép số lượng âm

        const ngayDieuChinh = new Date().toISOString().split('T')[0];
        return {
          ...item,
          tonKho: newQuantity,
          lichSuNhap: [
            ...item.lichSuNhap,
            {
              ngay: ngayDieuChinh,
              soLuong: change > 0 ? change : change,
              nguoiNhap: "Điều chỉnh"
            }
          ]
        };
      }
      return item;
    }));
  };

  // Chức năng xem chi tiết phụ tùng
  const handleXemChiTiet = (phuTung: any) => {
    setSelectedPhuTung(phuTung);
    setShowChiTietModal(true);
  };

  // Chức năng chỉnh sửa phụ tùng
  const handleChinhSua = (phuTung: any) => {
    setSelectedPhuTung(phuTung);
    setNewPhuTung({
      ten: phuTung.ten,
      ma: phuTung.ma,
      tonKho: phuTung.tonKho,
      tonKhoToiThieu: phuTung.tonKhoToiThieu,
      gia: phuTung.gia,
      nhaCungCap: phuTung.nhaCungCap,
      viTri: phuTung.viTri
    });
    setShowThemPhuTungModal(true);
  };

  // Chức năng thêm phụ tùng mới
  const handleThemPhuTung = () => {
    if (!newPhuTung.ten || !newPhuTung.ma || newPhuTung.tonKhoToiThieu <= 0) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const phuTungMoi = {
      id: (phuTung.length + 1).toString(),
      ten: newPhuTung.ten,
      ma: newPhuTung.ma,
      tonKho: newPhuTung.tonKho || 0,
      tonKhoToiThieu: newPhuTung.tonKhoToiThieu,
      gia: newPhuTung.gia || 0,
      nhaCungCap: newPhuTung.nhaCungCap,
      viTri: newPhuTung.viTri,
      lichSuNhap: []
    };

    setPhuTung(prev => [...prev, phuTungMoi]);
    setShowThemPhuTungModal(false);
    setNewPhuTung({
      ten: "",
      ma: "",
      tonKho: 0,
      tonKhoToiThieu: 0,
      gia: 0,
      nhaCungCap: "",
      viTri: ""
    });
    alert("Đã thêm phụ tùng mới!");
  };

  // Chức năng cập nhật phụ tùng
  const handleCapNhatPhuTung = () => {
    setPhuTung(prev => prev.map(item => {
      if (item.id === selectedPhuTung.id) {
        return {
          ...item,
          ...newPhuTung
        };
      }
      return item;
    }));

    setShowThemPhuTungModal(false);
    alert("Đã cập nhật thông tin phụ tùng!");
  };

  // Chức năng xóa phụ tùng
  const handleXoaPhuTung = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa phụ tùng này?")) {
      setPhuTung(prev => prev.filter(item => item.id !== id));
      alert("Đã xóa phụ tùng!");
    }
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
          Quản lý Phụ tùng EV
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Theo dõi số lượng và kiểm soát tồn kho tối thiểu
        </p>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-xl font-bold text-blue-600">{thongKe.tongPhuTung}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tổng loại phụ tùng</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-xl font-bold text-green-600">{thongKe.tongTonKho}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tổng tồn kho</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-xl font-bold text-yellow-600">{thongKe.canhBao}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Cần cảnh báo</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-xl font-bold text-red-600">{thongKe.sapHet}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sắp hết hàng</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Danh sách phụ tùng */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Danh sách Phụ tùng EV
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Tìm kiếm phụ tùng..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                />
                <select
                  value={filterTrangThai}
                  onChange={(e) => setFilterTrangThai(e.target.value)}
                  className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                >
                  <option value="tat-ca">Tất cả</option>
                  <option value="thap">Sắp hết</option>
                  <option value="canh-bao">Cần cảnh báo</option>
                  <option value="tot">Dồi dào</option>
                </select>
                <button
                  onClick={() => {
                    setSelectedPhuTung(null);
                    setNewPhuTung({
                      ten: "",
                      ma: "",
                      tonKho: 0,
                      tonKhoToiThieu: 0,
                      gia: 0,
                      nhaCungCap: "",
                      viTri: ""
                    });
                    setShowThemPhuTungModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Thêm mới
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tên phụ tùng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Mã số
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tối thiểu
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tình trạng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Giá
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {phuTungFiltered.map((item) => {
                    const trangThai = getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu);
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleXemChiTiet(item)}
                      >
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.ten}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.nhaCungCap} • {item.viTri}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {item.ma}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDieuChinhSoLuong(item.id, -1);
                              }}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
                            >
                              -
                            </button>
                            <span className="font-medium text-gray-900 dark:text-white min-w-8 text-center">
                              {item.tonKho}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDieuChinhSoLuong(item.id, 1);
                              }}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {item.tonKhoToiThieu}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getTrangThaiColor(trangThai)}`}>
                            {getTrangThaiText(trangThai)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {formatCurrency(item.gia)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Cảnh báo tồn kho thấp */}
      {phuTung.filter(item => getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu) === "thap").length > 0 && (
        <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm border border-red-200 dark:border-red-800">
          <div className="p-4 border-b border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
              ⚠️ Cảnh báo tồn kho thấp
            </h3>
            <p className="text-sm text-red-600 dark:text-red-400">
              Các phụ tùng sau cần được bổ sung ngay
            </p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phuTung.filter(item => getTrangThaiTonKho(item.tonKho, item.tonKhoToiThieu) === "thap")
                .map((item) => (
                  <div key={item.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-300">
                          {item.ten}
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          Tồn kho: {item.tonKho} / Tối thiểu: {item.tonKhoToiThieu}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {item.viTri}
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenNhapHangModal(item)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Nhập ngay
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal nhập hàng */}
      {showNhapHangModal && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
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

      {/* Modal chi tiết phụ tùng */}
      {showChiTietModal && selectedPhuTung && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chi tiết Phụ tùng</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tên:</label>
                <p className="font-medium">{selectedPhuTung.ten}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Mã số:</label>
                <p>{selectedPhuTung.ma}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tồn kho:</label>
                <p>{selectedPhuTung.tonKho} / {selectedPhuTung.tonKhoToiThieu}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Giá:</label>
                <p>{formatCurrency(selectedPhuTung.gia)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Nhà cung cấp:</label>
                <p>{selectedPhuTung.nhaCungCap}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Vị trí:</label>
                <p>{selectedPhuTung.viTri}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Lịch sử nhập:</label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {selectedPhuTung.lichSuNhap.map((nhap: any, index: number) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <div>Ngày: {nhap.ngay}</div>
                      <div>Số lượng: {nhap.soLuong}</div>
                      <div>Người nhập: {nhap.nguoiNhap}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleChinhSua(selectedPhuTung)}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => handleXoaPhuTung(selectedPhuTung.id)}
                className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowChiTietModal(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm/cập nhật phụ tùng */}
      {showThemPhuTungModal && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              {selectedPhuTung ? "Cập nhật Phụ tùng" : "Thêm Phụ tùng Mới"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên phụ tùng *</label>
                <input
                  type="text"
                  value={newPhuTung.ten}
                  onChange={(e) => setNewPhuTung({...newPhuTung, ten: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập tên phụ tùng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mã số *</label>
                <input
                  type="text"
                  value={newPhuTung.ma}
                  onChange={(e) => setNewPhuTung({...newPhuTung, ma: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập mã số"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tồn kho</label>
                  <input
                    type="number"
                    value={newPhuTung.tonKho}
                    onChange={(e) => setNewPhuTung({...newPhuTung, tonKho: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tối thiểu *</label>
                  <input
                    type="number"
                    value={newPhuTung.tonKhoToiThieu}
                    onChange={(e) => setNewPhuTung({...newPhuTung, tonKhoToiThieu: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    min="1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giá (VND)</label>
                <input
                  type="number"
                  value={newPhuTung.gia}
                  onChange={(e) => setNewPhuTung({...newPhuTung, gia: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nhà cung cấp</label>
                <input
                  type="text"
                  value={newPhuTung.nhaCungCap}
                  onChange={(e) => setNewPhuTung({...newPhuTung, nhaCungCap: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập tên nhà cung cấp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vị trí kho</label>
                <input
                  type="text"
                  value={newPhuTung.viTri}
                  onChange={(e) => setNewPhuTung({...newPhuTung, viTri: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập vị trí kho"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={selectedPhuTung ? handleCapNhatPhuTung : handleThemPhuTung}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {selectedPhuTung ? "Cập nhật" : "Thêm mới"}
              </button>
              <button
                onClick={() => setShowThemPhuTungModal(false)}
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