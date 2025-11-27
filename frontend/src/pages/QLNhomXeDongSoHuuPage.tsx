import { useState } from "react";
import { Link } from "react-router-dom";

interface NhomDongSoHuu {
  nhomId: number;
  tenNhom: string;
  ngayTao: string;
  trangThai: 'HoatDong' | 'Ngung';
  soThanhVien: number;
  tongTyLeSoHuu: number;
  xeChinh: string;
  bienSo: string;
}

const QLNhomXeDongSoHuuPage: React.FC = () => {
  const [nhomXeList] = useState<NhomDongSoHuu[]>([
    {
      nhomId: 1,
      tenNhom: "Nhóm Tesla Model 3 - Quận 1",
      ngayTao: "2024-01-15",
      trangThai: 'HoatDong',
      soThanhVien: 3,
      tongTyLeSoHuu: 100,
      xeChinh: "Tesla Model 3",
      bienSo: "51A-12345"
    },
    {
      nhomId: 2,
      tenNhom: "Nhóm VinFast VF e34 - Quận 2",
      ngayTao: "2024-01-20",
      trangThai: 'HoatDong',
      soThanhVien: 4,
      tongTyLeSoHuu: 100,
      xeChinh: "VinFast VF e34",
      bienSo: "51B-67890"
    },
    {
      nhomId: 3,
      tenNhom: "Nhóm BMW i3 - Quận 3",
      ngayTao: "2024-01-10",
      trangThai: 'Ngung',
      soThanhVien: 2,
      tongTyLeSoHuu: 100,
      xeChinh: "BMW i3",
      bienSo: "51C-54321"
    },
    {
      nhomId: 4,
      tenNhom: "Nhóm Hyundai Kona Electric - Quận 7",
      ngayTao: "2024-02-01",
      trangThai: 'HoatDong',
      soThanhVien: 5,
      tongTyLeSoHuu: 100,
      xeChinh: "Hyundai Kona Electric",
      bienSo: "51D-98765"
    }
  ]);

  const [filterTrangThai, setFilterTrangThai] = useState<'all' | 'HoatDong' | 'Ngung'>('all');

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

  const filteredNhomList = filterTrangThai === 'all'
    ? nhomXeList
    : nhomXeList.filter(nhom => nhom.trangThai === filterTrangThai);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quản lý nhóm xe đồng sở hữu
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Xem thông tin các nhóm đồng sở hữu xe điện
        </p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng nhóm</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{nhomXeList.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {nhomXeList.filter(n => n.trangThai === 'HoatDong').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng thành viên</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {nhomXeList.reduce((sum, nhom) => sum + nhom.soThanhVien, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Xe đang quản lý</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{nhomXeList.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterTrangThai('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterTrangThai === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterTrangThai('HoatDong')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterTrangThai === 'HoatDong'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Đang hoạt động
          </button>
          <button
            onClick={() => setFilterTrangThai('Ngung')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterTrangThai === 'Ngung'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Ngừng hoạt động
          </button>
        </div>
      </div>

      {/* Danh sách nhóm - CHỈ XEM */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Danh sách nhóm đồng sở hữu
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Nhấn vào "Xem chi tiết" để xem thông tin đầy đủ
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Tên nhóm & Xe
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Thành viên
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Ngày tạo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredNhomList.map((nhom) => (
                <tr key={nhom.nhomId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {nhom.tenNhom}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {nhom.xeChinh} - {nhom.bienSo}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Tỷ lệ: {nhom.tongTyLeSoHuu}%
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {nhom.soThanhVien} thành viên
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {nhom.ngayTao}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrangThaiBadge(nhom.trangThai)}`}>
                      {getTrangThaiText(nhom.trangThai)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/quan-ly/nhom-xe/${nhom.nhomId}`}
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QLNhomXeDongSoHuuPage;