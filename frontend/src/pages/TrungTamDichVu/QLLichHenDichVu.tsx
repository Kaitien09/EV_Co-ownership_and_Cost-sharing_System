import { useState } from "react";

const QLLichHenDichVu = () => {
  const [yeuCauMoi, setYeuCauMoi] = useState([
    {
      id: "1",
      khachHang: "Nguyễn Văn A",
      bienSo: "29A-12345",
      dichVu: "Bảo dưỡng định kỳ",
      ngayYeuCau: "19/11/2024 08:30",
      uuTien: "cao"
    },
    {
      id: "2",
      khachHang: "Trần Thị B",
      bienSo: "29A-67890",
      dichVu: "Sửa chữa điều hòa",
      ngayYeuCau: "19/11/2024 09:15",
      uuTien: "trung-binh"
    }
  ]);

  const [lichKyThuatVien, setLichKyThuatVien] = useState([
    {
      id: "1",
      ten: "Nguyễn Văn C",
      ca: "Sáng (8h-12h)",
      lichTrinh: [
        { id: "1", gio: "08:00", xe: "29A-12345", dichVu: "Bảo dưỡng", trangThai: "cho" },
        { id: "2", gio: "10:30", xe: "29A-54321", dichVu: "Sửa phanh", trangThai: "cho" }
      ]
    },
    {
      id: "2",
      ten: "Trần Thị D",
      ca: "Sáng (8h-12h)",
      lichTrinh: [
        { id: "3", gio: "09:00", xe: "29A-67890", dichVu: "Sửa điều hòa", trangThai: "cho" }
      ]
    }
  ]);

  const [checklist, setChecklist] = useState([
    { id: "1", ten: "Kiểm tra ắc quy", checked: false },
    { id: "2", ten: "Hệ thống phanh", checked: false },
    { id: "3", ten: "Động cơ điện", checked: false },
    { id: "4", ten: "Hệ thống sạc", checked: false },
    { id: "5", ten: "Lốp xe", checked: false },
    { id: "6", ten: "Đèn chiếu sáng", checked: false },
    { id: "7", ten: "Hệ thống điều hòa", checked: false },
    { id: "8", ten: "Phần mềm hệ thống", checked: false }
  ]);

  // Chức năng duyệt yêu cầu
  const handleDuyetYeuCau = (yeuCauId: string) => {
    const yeuCau = yeuCauMoi.find(yc => yc.id === yeuCauId);
    if (yeuCau) {
      // Xóa yêu cầu khỏi danh sách yêu cầu mới
      setYeuCauMoi(prev => prev.filter(yc => yc.id !== yeuCauId));

      // Thêm vào lịch kỹ thuật viên (giả lập thêm vào kỹ thuật viên đầu tiên)
      setLichKyThuatVien(prev => prev.map(ktv => {
        if (ktv.id === "1") {
          const newLich = {
            id: Date.now().toString(),
            gio: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            xe: yeuCau.bienSo,
            dichVu: yeuCau.dichVu,
            trangThai: "cho"
          };
          return {
            ...ktv,
            lichTrinh: [...ktv.lichTrinh, newLich]
          };
        }
        return ktv;
      }));

      alert(`Đã duyệt yêu cầu của ${yeuCau.khachHang}`);
    }
  };

  // Chức năng từ chối yêu cầu
  const handleTuChoiYeuCau = (yeuCauId: string) => {
    const yeuCau = yeuCauMoi.find(yc => yc.id === yeuCauId);
    if (yeuCau) {
      setYeuCauMoi(prev => prev.filter(yc => yc.id !== yeuCauId));
      alert(`Đã từ chối yêu cầu của ${yeuCau.khachHang}`);
    }
  };

  // Chức năng bắt đầu dịch vụ
  const handleBatDauDichVu = (ktvId: string, lichId: string) => {
    setLichKyThuatVien(prev => prev.map(ktv => {
      if (ktv.id === ktvId) {
        return {
          ...ktv,
          lichTrinh: ktv.lichTrinh.map(lich =>
            lich.id === lichId
              ? { ...lich, trangThai: "dang-thuc-hien" }
              : lich
          )
        };
      }
      return ktv;
    }));
    alert("Đã bắt đầu thực hiện dịch vụ!");
  };

  // Chức năng hoàn thành dịch vụ
  const handleHoanThanhDichVu = (ktvId: string, lichId: string) => {
    setLichKyThuatVien(prev => prev.map(ktv => {
      if (ktv.id === ktvId) {
        return {
          ...ktv,
          lichTrinh: ktv.lichTrinh.map(lich =>
            lich.id === lichId
              ? { ...lich, trangThai: "hoan-thanh" }
              : lich
          )
        };
      }
      return ktv;
    }));
    alert("Đã hoàn thành dịch vụ!");
  };

  // Chức năng toggle checklist
  const handleToggleChecklist = (checkId: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === checkId ? { ...item, checked: !item.checked } : item
    ));
  };

  // Chức năng hoàn thành checklist
  const handleHoanThanhChecklist = () => {
    const allChecked = checklist.every(item => item.checked);
    if (allChecked) {
      alert("Checklist đã được hoàn thành!");
      // Reset checklist
      setChecklist(prev => prev.map(item => ({ ...item, checked: false })));
    } else {
      alert("Vui lòng hoàn thành tất cả các mục trong checklist!");
    }
  };

  const getUuTienColor = (uuTien: string) => {
    const colors = {
      cao: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
      "trung-binh": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
      thap: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
    };
    return colors[uuTien as keyof typeof colors];
  };

  const getUuTienText = (uuTien: string) => {
    const texts = {
      cao: "Ưu tiên cao",
      "trung-binh": "Ưu tiên trung bình",
      thap: "Ưu tiên thấp"
    };
    return texts[uuTien as keyof typeof texts];
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "cho": "bg-gray-100 text-gray-800",
      "dang-thuc-hien": "bg-blue-100 text-blue-800",
      "hoan-thanh": "bg-green-100 text-green-800"
    };
    return colors[trangThai as keyof typeof colors];
  };

  const getTrangThaiText = (trangThai: string) => {
    const texts = {
      "cho": "Chờ thực hiện",
      "dang-thuc-hien": "Đang thực hiện",
      "hoan-thanh": "Hoàn thành"
    };
    return texts[trangThai as keyof typeof texts];
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý Lịch hẹn & Dịch vụ
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tiếp nhận yêu cầu, lập lịch kỹ thuật viên và quản lý dịch vụ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yêu cầu mới */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Yêu cầu mới ({yeuCauMoi.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {yeuCauMoi.map((yeuCau) => (
                <div key={yeuCau.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {yeuCau.khachHang}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {yeuCau.bienSo}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getUuTienColor(yeuCau.uuTien)}`}>
                      {getUuTienText(yeuCau.uuTien)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {yeuCau.dichVu}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {yeuCau.ngayYeuCau}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDuyetYeuCau(yeuCau.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleTuChoiYeuCau(yeuCau.id)}
                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lịch kỹ thuật viên */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Lịch kỹ thuật viên
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                {lichKyThuatVien.map((kyThuatVien) => (
                  <div key={kyThuatVien.id}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">👨‍🔧</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {kyThuatVien.ten}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {kyThuatVien.ca}
                        </p>
                      </div>
                    </div>
                    <div className="ml-12 space-y-2">
                      {kyThuatVien.lichTrinh.map((lich) => (
                        <div key={lich.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium text-gray-700 dark:text-gray-300 min-w-12">
                            {lich.gio}
                          </span>
                          <div className="flex-1">
                            <span className="font-medium text-gray-800 dark:text-white">
                              {lich.xe}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                              • {lich.dichVu}
                            </span>
                            <div className="mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs ${getTrangThaiColor(lich.trangThai)}`}>
                                {getTrangThaiText(lich.trangThai)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {lich.trangThai === "cho" && (
                              <button
                                onClick={() => handleBatDauDichVu(kyThuatVien.id, lich.id)}
                                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              >
                                Bắt đầu
                              </button>
                            )}
                            {lich.trangThai === "dang-thuc-hien" && (
                              <button
                                onClick={() => handleHoanThanhDichVu(kyThuatVien.id, lich.id)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              >
                                Hoàn thành
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist EV */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Checklist kiểm tra EV
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {checklist.map((item) => (
                  <label key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleChecklist(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {item.ten}
                      {item.checked && <span className="ml-1 text-green-500">✓</span>}
                    </span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleHoanThanhChecklist}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Hoàn thành kiểm tra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLLichHenDichVu;