import { useState } from "react";

const QLLichHenDichVu = () => {
  const [yeuCauMoi, setYeuCauMoi] = useState([
    {
      id: "1",
      khachHang: "Nguyễn Văn A",
      bienSo: "29A-12345",
      dichVu: "Bảo dưỡng định kỳ",
      ngayYeuCau: "19/11/2024 08:30",
      uuTien: "cao",
      soDienThoai: "0912345678",
      loaiXe: "VinFast VF e34"
    },
    {
      id: "2",
      khachHang: "Trần Thị B",
      bienSo: "29A-67890",
      dichVu: "Sửa chữa điều hòa",
      ngayYeuCau: "19/11/2024 09:15",
      uuTien: "trung-binh",
      soDienThoai: "0912345679",
      loaiXe: "Tesla Model 3"
    }
  ]);

  const [kyThuatVien, setKyThuatVien] = useState([
    {
      id: "1",
      ten: "Nguyễn Văn C",
      chuyenMon: "Động cơ & Hệ thống điện",
      ca: "Sáng (8h-12h)",
      lichTrinh: [
        {
          id: "1",
          gio: "08:00",
          xe: "29A-12345",
          dichVu: "Bảo dưỡng định kỳ",
          trangThai: "dang-thuc-hien",
          khachHang: "Nguyễn Văn A"
        }
      ]
    },
    {
      id: "2",
      ten: "Trần Thị D",
      chuyenMon: "Điều hòa & Hệ thống làm mát",
      ca: "Sáng (8h-12h)",
      lichTrinh: []
    }
  ]);

  const [phieuTiepNhan, setPhieuTiepNhan] = useState([
    {
      id: "1",
      soPhieu: "PN-001",
      khachHang: "Nguyễn Văn A",
      bienSo: "29A-12345",
      ngayTiepNhan: "19/11/2024 08:00",
      dichVu: "Bảo dưỡng định kỳ",
      trangThai: "dang-thuc-hien",
      kyThuatVien: "Nguyễn Văn C"
    }
  ]);

  const [activeTab, setActiveTab] = useState("yeu-cau");

  // Tự động chọn KTV có ít công việc nhất
  const chonKTVTuDong = () => {
    return kyThuatVien.reduce((minKTV, ktv) => {
      return ktv.lichTrinh.length < minKTV.lichTrinh.length ? ktv : minKTV;
    });
  };

  // Chức năng tiếp nhận yêu cầu
  const handleTiepNhanYeuCau = (yeuCauId: string) => {
    const yeuCau = yeuCauMoi.find(yc => yc.id === yeuCauId);
    if (!yeuCau) return;

    const ktv = chonKTVTuDong();

    // Tạo phiếu tiếp nhận
    const newPhieu = {
      id: Date.now().toString(),
      soPhieu: `PN-${Date.now().toString().slice(-4)}`,
      khachHang: yeuCau.khachHang,
      bienSo: yeuCau.bienSo,
      ngayTiepNhan: new Date().toLocaleString('vi-VN'),
      dichVu: yeuCau.dichVu,
      trangThai: "da-phan-cong",
      kyThuatVien: ktv.ten
    };

    // Thêm vào lịch KTV
    const newLich = {
      id: Date.now().toString(),
      gio: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      xe: yeuCau.bienSo,
      dichVu: yeuCau.dichVu,
      trangThai: "cho",
      khachHang: yeuCau.khachHang
    };

    setKyThuatVien(prev => prev.map(k =>
      k.id === ktv.id
        ? { ...k, lichTrinh: [...k.lichTrinh, newLich] }
        : k
    ));

    setPhieuTiepNhan(prev => [...prev, newPhieu]);
    setYeuCauMoi(prev => prev.filter(yc => yc.id !== yeuCauId));
  };

  // Chức năng từ chối yêu cầu
  const handleTuChoiYeuCau = (yeuCauId: string) => {
    setYeuCauMoi(prev => prev.filter(yc => yc.id !== yeuCauId));
  };

  // Chức năng bắt đầu dịch vụ
  const handleBatDauDichVu = (ktvId: string, lichId: string) => {
    setKyThuatVien(prev => prev.map(ktv => {
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

    // Cập nhật phiếu tiếp nhận
    const lich = kyThuatVien.flatMap(ktv => ktv.lichTrinh).find(l => l.id === lichId);
    if (lich) {
      setPhieuTiepNhan(prev => prev.map(p =>
        p.bienSo === lich.xe && p.dichVu === lich.dichVu
          ? { ...p, trangThai: "dang-thuc-hien" }
          : p
      ));
    }
  };

  // Chức năng hoàn thành dịch vụ
  const handleHoanThanhDichVu = (ktvId: string, lichId: string) => {
    setKyThuatVien(prev => prev.map(ktv => {
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

    // Cập nhật phiếu tiếp nhận
    const lich = kyThuatVien.flatMap(ktv => ktv.lichTrinh).find(l => l.id === lichId);
    if (lich) {
      setPhieuTiepNhan(prev => prev.map(p =>
        p.bienSo === lich.xe && p.dichVu === lich.dichVu
          ? { ...p, trangThai: "hoan-thanh" }
          : p
      ));
    }
  };

  const getUuTienColor = (uuTien: string) => {
    const colors = {
      cao: "bg-red-50 text-red-700 border border-red-200",
      "trung-binh": "bg-yellow-50 text-yellow-700 border border-yellow-200",
      thap: "bg-green-50 text-green-700 border border-green-200"
    };
    return colors[uuTien as keyof typeof colors];
  };

  const getTrangThaiColor = (trangThai: string) => {
    const colors = {
      "cho": "bg-gray-100 text-gray-700 border border-gray-300",
      "da-phan-cong": "bg-blue-50 text-blue-700 border border-blue-200",
      "dang-thuc-hien": "bg-orange-50 text-orange-700 border border-orange-200",
      "hoan-thanh": "bg-green-50 text-green-700 border border-green-200"
    };
    return colors[trangThai as keyof typeof colors];
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

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white rounded-lg border border-gray-200 p-1">
            {[
              { id: "yeu-cau", label: "Yêu cầu mới", count: yeuCauMoi.length },
              { id: "lich-ktv", label: "Lịch kỹ thuật viên", count: kyThuatVien.length },
              { id: "phieu-tiep-nhan", label: "Phiếu tiếp nhận", count: phieuTiepNhan.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {tab.label}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? "bg-blue-500" : "bg-gray-200"
                  }`}>
                    {tab.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Yêu cầu mới */}
          {activeTab === "yeu-cau" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Yêu cầu đặt lịch mới
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {yeuCauMoi.map((yeuCau) => (
                  <div key={yeuCau.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
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
                            <p className="text-sm text-gray-600">{yeuCau.loaiXe}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Biển số:</span>
                            <span className="font-mono ml-1">{yeuCau.bienSo}</span>
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
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {yeuCau.ngayYeuCau}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUuTienColor(yeuCau.uuTien)}`}>
                          {yeuCau.uuTien === 'cao' ? 'Ưu tiên cao' : 'Ưu tiên trung bình'}
                        </span>
                      </div>
                      <div className="flex gap-2">
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
                      </div>
                    </div>
                  </div>
                ))}
                {yeuCauMoi.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">Không có yêu cầu mới</p>
                    <p className="text-sm">Tất cả yêu cầu đã được xử lý</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lịch kỹ thuật viên */}
          {activeTab === "lich-ktv" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Lịch kỹ thuật viên
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {kyThuatVien.map((ktv) => (
                    <div key={ktv.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center border">
                            <span className="text-gray-600 font-semibold text-lg">
                              {ktv.ten.split(' ').pop()?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {ktv.ten}
                            </h3>
                            <p className="text-sm text-gray-600">{ktv.chuyenMon}</p>
                            <p className="text-sm text-gray-500">{ktv.ca}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {ktv.lichTrinh.length} công việc
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            ktv.lichTrinh.length < 3 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {ktv.lichTrinh.length < 3 ? 'Còn trống' : 'Gần đầy'}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {ktv.lichTrinh.map((lich) => (
                          <div key={lich.id} className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                            lich.trangThai === 'dang-thuc-hien' ? 'border-l-orange-500 bg-orange-50' :
                            lich.trangThai === 'hoan-thanh' ? 'border-l-green-500 bg-green-50' :
                            'border-l-blue-500 bg-blue-50'
                          }`}>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="font-bold text-gray-900">{lich.gio}</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {lich.xe}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {lich.dichVu}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {lich.khachHang}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrangThaiColor(lich.trangThai)}`}>
                                {lich.trangThai === 'cho' ? 'Chờ thực hiện' :
                                 lich.trangThai === 'dang-thuc-hien' ? 'Đang thực hiện' : 'Hoàn thành'}
                              </span>
                              {lich.trangThai === "cho" && (
                                <button
                                  onClick={() => handleBatDauDichVu(ktv.id, lich.id)}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                  Bắt đầu
                                </button>
                              )}
                              {lich.trangThai === "dang-thuc-hien" && (
                                <button
                                  onClick={() => handleHoanThanhDichVu(ktv.id, lich.id)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                  Hoàn thành
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        {ktv.lichTrinh.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-lg">Chưa có lịch trình</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Phiếu tiếp nhận */}
          {activeTab === "phieu-tiep-nhan" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Phiếu tiếp nhận dịch vụ
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {phieuTiepNhan.map((phieu) => (
                    <div key={phieu.id} className={`p-6 rounded-lg border-l-4 ${
                      phieu.trangThai === 'dang-thuc-hien' ? 'border-l-orange-500 bg-orange-50' :
                      phieu.trangThai === 'hoan-thanh' ? 'border-l-green-500 bg-green-50' :
                      'border-l-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-gray-900 text-lg">
                              {phieu.soPhieu}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {phieu.khachHang}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {phieu.bienSo} • {phieu.dichVu}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTrangThaiColor(phieu.trangThai)}`}>
                          {phieu.trangThai === 'da-phan-cong' ? 'Đã phân công' :
                           phieu.trangThai === 'dang-thuc-hien' ? 'Đang thực hiện' : 'Hoàn thành'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                          Kỹ thuật viên: {phieu.kyThuatVien}
                        </div>
                        <div>
                          {phieu.ngayTiepNhan}
                        </div>
                      </div>
                    </div>
                  ))}
                  {phieuTiepNhan.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-lg">Chưa có phiếu tiếp nhận</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QLLichHenDichVu;