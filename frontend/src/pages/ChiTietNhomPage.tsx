import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface NhomDongSoHuu {
  nhomId: number;
  tenNhom: string;
  ngayTao: string;
  trangThai: 'HoatDong' | 'Ngung';
  soThanhVien: number;
  tongTyLeSoHuu: number;
  xeChinh: string;
  bienSo: string;
  moTa?: string;
}

interface ThanhVienNhom {
  thanhVienNhomId: number;
  chuXeId: number;
  nhomId: number;
  xeId: number;
  tenChuXe: string;
  email: string;
  soDienThoai: string;
  tenXe: string;
  bienSo: string;
  tyLeSoHuu: number;
  vaiTro: 'TruongNhom' | 'ThanhVien';
  ngayThamGia: string;
}

const ChiTietNhomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nhom, setNhom] = useState<NhomDongSoHuu | null>(null);
  const [thanhVienList, setThanhVienList] = useState<ThanhVienNhom[]>([]);

  // Dữ liệu mẫu - trong thực tế sẽ gọi API
  useEffect(() => {
    if (id) {
      // Giả lập fetch data từ API
      const nhomData: NhomDongSoHuu = {
        nhomId: parseInt(id),
        tenNhom: "Nhóm Tesla Model 3 - Quận 1",
        ngayTao: "2024-01-15",
        trangThai: 'HoatDong',
        soThanhVien: 3,
        tongTyLeSoHuu: 100,
        xeChinh: "Tesla Model 3",
        bienSo: "51A-12345",
        moTa: "Nhóm đồng sở hữu Tesla Model 3 phục vụ di chuyển trong nội thành Quận 1"
      };
      setNhom(nhomData);

      const thanhVienData: ThanhVienNhom[] = [
        {
          thanhVienNhomId: 1,
          chuXeId: 1,
          nhomId: parseInt(id),
          xeId: 1,
          tenChuXe: "Nguyễn Văn A",
          email: "nguyenvana@email.com",
          soDienThoai: "0912345678",
          tenXe: "Tesla Model 3",
          bienSo: "51A-12345",
          tyLeSoHuu: 40,
          vaiTro: 'TruongNhom',
          ngayThamGia: "2024-01-15"
        },
        {
          thanhVienNhomId: 2,
          chuXeId: 2,
          nhomId: parseInt(id),
          xeId: 1,
          tenChuXe: "Trần Thị B",
          email: "tranthib@email.com",
          soDienThoai: "0912345679",
          tenXe: "Tesla Model 3",
          bienSo: "51A-12345",
          tyLeSoHuu: 35,
          vaiTro: 'ThanhVien',
          ngayThamGia: "2024-01-16"
        },
        {
          thanhVienNhomId: 3,
          chuXeId: 3,
          nhomId: parseInt(id),
          xeId: 1,
          tenChuXe: "Lê Văn C",
          email: "levanc@email.com",
          soDienThoai: "0912345680",
          tenXe: "Tesla Model 3",
          bienSo: "51A-12345",
          tyLeSoHuu: 25,
          vaiTro: 'ThanhVien',
          ngayThamGia: "2024-01-17"
        }
      ];
      setThanhVienList(thanhVienData);
    }
  }, [id]);

  const getTrangThaiBadge = (trangThai: string) => {
    switch (trangThai) {
      case 'HoatDong':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Ngung':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTrangThaiText = (trangThai: string) => {
    switch (trangThai) {
      case 'HoatDong':
        return 'Hoạt động';
      case 'Ngung':
        return 'Ngừng hoạt động';
      default:
        return 'Không xác định';
    }
  };

  const getVaiTroBadge = (vaiTro: string) => {
    switch (vaiTro) {
      case 'TruongNhom':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'ThanhVien':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getVaiTroText = (vaiTro: string) => {
    switch (vaiTro) {
      case 'TruongNhom':
        return 'Trưởng nhóm';
      case 'ThanhVien':
        return 'Thành viên';
      default:
        return 'Không xác định';
    }
  };

  if (!nhom) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Đang tải thông tin nhóm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header với breadcrumb */}
      <div className="mb-6">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/quan-ly/nhom-xe" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Nhóm xe đồng sở hữu
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500 dark:text-gray-400">Chi tiết nhóm</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {nhom.tenNhom}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thông tin chi tiết nhóm đồng sở hữu (Chế độ xem)
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Chế độ xem - Chỉ được phép xem thông tin
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin nhóm */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Thông tin nhóm
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tên nhóm
                </label>
                <p className="text-sm text-gray-900 dark:text-white font-semibold mt-1">
                  {nhom.tenNhom}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Xe chính
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {nhom.xeChinh} - {nhom.bienSo}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Trạng thái
                </label>
                <p className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrangThaiBadge(nhom.trangThai)}`}>
                    {getTrangThaiText(nhom.trangThai)}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Số thành viên
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {nhom.soThanhVien} thành viên
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ngày tạo
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {nhom.ngayTao}
                </p>
              </div>
              {nhom.moTa && (
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Mô tả
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {nhom.moTa}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Thống kê nhanh */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Thống kê
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Tổng tỷ lệ</span>
                <span className="text-lg font-bold text-blue-900 dark:text-blue-200">{nhom.tongTyLeSoHuu}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-sm font-medium text-green-800 dark:text-green-300">Thành viên</span>
                <span className="text-lg font-bold text-green-900 dark:text-green-200">{thanhVienList.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Trưởng nhóm</span>
                <span className="text-lg font-bold text-purple-900 dark:text-purple-200">
                  {thanhVienList.filter(tv => tv.vaiTro === 'TruongNhom').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách thành viên - CHỈ XEM */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Danh sách thành viên ({thanhVienList.length})
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Thông tin các thành viên trong nhóm đồng sở hữu
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {thanhVienList.map((thanhVien) => (
                  <div key={thanhVien.thanhVienNhomId} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-semibold text-lg">
                          {thanhVien.tenChuXe.split(' ').pop()?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {thanhVien.tenChuXe}
                          </p>
                          <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getVaiTroBadge(thanhVien.vaiTro)}`}>
                            {getVaiTroText(thanhVien.vaiTro)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{thanhVien.email}</span>
                          <span>{thanhVien.soDienThoai}</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            Tỷ lệ: {thanhVien.tyLeSoHuu}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Tham gia: {thanhVien.ngayThamGia}
                        </div>
                      </div>
                    </div>
                    {/* KHÔNG CÓ NÚT THAO TÁC */}
                  </div>
                ))}
              </div>

              {thanhVienList.length === 0 && (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Chưa có thành viên nào trong nhóm
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Biểu đồ phân bổ tỷ lệ - CHỈ XEM */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Phân bổ tỷ lệ sở hữu
            </h2>
            <div className="space-y-3">
              {thanhVienList.map((thanhVien) => (
                <div key={thanhVien.thanhVienNhomId} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{thanhVien.tenChuXe}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {thanhVien.tyLeSoHuu}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${thanhVien.tyLeSoHuu}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin phân chia chi phí - CHỈ XEM */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Phân chia chi phí mẫu
            </h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Chi phí được phân chia theo tỷ lệ sở hữu (Ví dụ với tổng chi phí 10,000,000 VND)
              </p>
              {thanhVienList.map((thanhVien) => (
                <div key={thanhVien.thanhVienNhomId} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{thanhVien.tenChuXe}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {((10000000 * thanhVien.tyLeSoHuu) / 100).toLocaleString('vi-VN')} VND
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ({thanhVien.tyLeSoHuu}% của 10,000,000 VND)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietNhomPage;