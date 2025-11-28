import { useState, useEffect } from "react";
import { nhomService, NhomDongSoHuu, ThanhVienNhom, ChuXe, XeDien } from "../../services/nhomService";

const QLNhomXeDongSoHuuPage: React.FC = () => {
  const [nhomXeList, setNhomXeList] = useState<NhomDongSoHuu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterTrangThai, setFilterTrangThai] = useState<'all' | 'HoatDong' | 'Ngung'>('all');
  const [expandedNhomId, setExpandedNhomId] = useState<number | null>(null);
  const [loadingThanhVien, setLoadingThanhVien] = useState<number | null>(null);
  const [chuXeCache, setChuXeCache] = useState<Map<number, ChuXe>>(new Map());
  const [xeCache, setXeCache] = useState<Map<number, XeDien>>(new Map());

  // Load dữ liệu từ API
  const loadNhomData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await nhomService.getAllNhom();
      console.log('Dữ liệu nhóm từ API:', data);
      setNhomXeList(data);
    } catch (err) {
      setError('Không thể tải danh sách nhóm');
      console.error('Lỗi khi tải dữ liệu:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load thông tin chủ xe
  const loadChuXeInfo = async (chuXeId: number): Promise<ChuXe | null> => {
    try {
      if (chuXeCache.has(chuXeId)) {
        return chuXeCache.get(chuXeId)!;
      }

      const chuXe = await nhomService.getChuXeById(chuXeId);
      setChuXeCache(prev => new Map(prev).set(chuXeId, chuXe));
      return chuXe;
    } catch (err) {
      console.error(`Lỗi khi tải thông tin chủ xe ${chuXeId}:`, err);
      return null;
    }
  };

  // Load thông tin xe
  const loadXeInfo = async (xeId: number): Promise<XeDien | null> => {
    try {
      if (xeCache.has(xeId)) {
        return xeCache.get(xeId)!;
      }

      const xe = await nhomService.getXeById(xeId);
      setXeCache(prev => new Map(prev).set(xeId, xe));
      return xe;
    } catch (err) {
      console.error(`Lỗi khi tải thông tin xe ${xeId}:`, err);
      return null;
    }
  };

  // Load chi tiết thành viên khi mở rộng
  const loadThanhVienDetail = async (nhomId: number, nhom: NhomDongSoHuu) => {
    try {
      setLoadingThanhVien(nhomId);

      console.log('Gọi API lấy thành viên cho nhóm:', nhomId);
      const thanhVienData = await nhomService.getThanhVienNhom(nhomId);
      console.log('Dữ liệu thành viên từ API:', thanhVienData);

      // Load thông tin chủ xe và xe cho từng thành viên
      const thanhVienWithDetails = await Promise.all(
        thanhVienData.map(async (thanhVien) => {
          let chuXeInfo = thanhVien.chuXe;
          let xeInfo = thanhVien.xe;

          if (!chuXeInfo) {
            chuXeInfo = await loadChuXeInfo(thanhVien.chuXeId);
          }

          if (!xeInfo) {
            xeInfo = await loadXeInfo(thanhVien.xeId);
          }

          return {
            ...thanhVien,
            chuXe: chuXeInfo,
            xe: xeInfo
          };
        })
      );

      const updatedNhomList = nhomXeList.map(item =>
        item.nhomId === nhomId ? { ...item, thanhVien: thanhVienWithDetails } : item
      );
      setNhomXeList(updatedNhomList);
    } catch (err) {
      console.error('Lỗi khi tải danh sách thành viên:', err);
    } finally {
      setLoadingThanhVien(null);
    }
  };

  const toggleExpand = async (nhomId: number) => {
    if (expandedNhomId === nhomId) {
      setExpandedNhomId(null);
    } else {
      const nhom = nhomXeList.find(n => n.nhomId === nhomId);
      if (nhom) {
        setExpandedNhomId(nhomId);
        await loadThanhVienDetail(nhomId, nhom);
      }
    }
  };

  useEffect(() => {
    loadNhomData();
  }, []);

  const getTrangThaiBadge = (trangThai: string) => {
    switch (trangThai) {
      case 'HoatDong':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Ngung':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getTrangThaiText = (trangThai: string) => {
    switch (trangThai) {
      case 'HoatDong':
        return 'Đang hoạt động';
      case 'Ngung':
        return 'Ngừng hoạt động';
      default:
        return 'Không xác định';
    }
  };

  const getTrangThaiXeBadge = (trangThai: string) => {
    const statusMap: { [key: string]: { class: string, text: string } } = {
      'SAN_SANG': { class: 'bg-green-100 text-green-800', text: 'Sẵn sàng' },
      'DANG_SU_DUNG': { class: 'bg-blue-100 text-blue-800', text: 'Đang sử dụng' },
      'BAO_TRI': { class: 'bg-yellow-100 text-yellow-800', text: 'Bảo trì' },
      'SUA_CHUA': { class: 'bg-orange-100 text-orange-800', text: 'Sửa chữa' },
      'NGUNG_HOAT_DONG': { class: 'bg-red-100 text-red-800', text: 'Ngừng hoạt động' }
    };

    const status = statusMap[trangThai] || statusMap['SAN_SANG'];
    return <span className={`inline-flex px-2 py-1 text-xs rounded-full ${status.class}`}>{status.text}</span>;
  };

  const getVaiTroText = (vaiTro: string) => {
    switch (vaiTro) {
      case 'TRUONG_NHOM':
        return 'Trưởng nhóm';
      case 'THANH_VIEN':
        return 'Thành viên';
      default:
        return 'Thành viên';
    }
  };

  const getVaiTroBadge = (vaiTro: string) => {
    switch (vaiTro) {
      case 'TRUONG_NHOM':
        return 'bg-blue-100 text-blue-800';
      case 'THANH_VIEN':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return 'N/A';
    }
  };

  // Hàm lấy thông tin thành viên từ chủ xe
  const getTenThanhVien = (thanhVien: ThanhVienNhom) => {
    return thanhVien.chuXe?.hoTen || `Chủ xe #${thanhVien.chuXeId}`;
  };

  const getSoDienThoai = (thanhVien: ThanhVienNhom) => {
    return thanhVien.chuXe?.sdt || 'Chưa có SĐT';
  };

  const getCCCD = (thanhVien: ThanhVienNhom) => {
    return thanhVien.chuXe?.cccd || 'Chưa có CCCD';
  };

  const getGPLX = (thanhVien: ThanhVienNhom) => {
    return thanhVien.chuXe?.gplx || 'Chưa có GPLX';
  };

  // Hàm lấy thông tin xe từ thành viên
  const getBienSoXe = (thanhVien: ThanhVienNhom) => {
    return thanhVien.xe?.bienSo || `Xe #${thanhVien.xeId}`;
  };

  const getModelXe = (thanhVien: ThanhVienNhom) => {
    return thanhVien.xe?.model || 'Chưa có model';
  };

  const getTrangThaiXe = (thanhVien: ThanhVienNhom) => {
    return thanhVien.xe?.trangThai || 'SAN_SANG';
  };

  // Hàm lấy thông tin xe chính của nhóm
  const getBienSoXeChinh = (nhom: NhomDongSoHuu) => {
    return nhom.xe?.bienSo || nhom.bienSo || 'Chưa có biển số';
  };

  const getModelXeChinh = (nhom: NhomDongSoHuu) => {
    return nhom.xe?.model || nhom.xeChinh || 'Chưa có model';
  };

  const getTrangThaiXeChinh = (nhom: NhomDongSoHuu) => {
    return nhom.xe?.trangThai || 'SAN_SANG';
  };

  // Hàm render danh sách thành viên
  const renderThanhVienList = (thanhVienList: ThanhVienNhom[] | undefined) => {
    if (!thanhVienList || thanhVienList.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>Chưa có thành viên nào trong nhóm</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Thành viên</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Thông tin xe</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Vai trò</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tỷ lệ sở hữu</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ngày tham gia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {thanhVienList.map((thanhVien) => (
              <tr key={thanhVien.thanhVienNhomId} className="hover:bg-white">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {getTenThanhVien(thanhVien)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <strong>CCCD:</strong> {getCCCD(thanhVien)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>SĐT:</strong> {getSoDienThoai(thanhVien)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>GPLX:</strong> {getGPLX(thanhVien)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">
                    <div><strong>Biển số:</strong> {getBienSoXe(thanhVien)}</div>
                    <div className="mt-1"><strong>Model:</strong> {getModelXe(thanhVien)}</div>
                    <div className="mt-1">
                      <strong>Trạng thái:</strong> {getTrangThaiXeBadge(getTrangThaiXe(thanhVien))}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getVaiTroBadge(thanhVien.vaiTro)}`}>
                    {getVaiTroText(thanhVien.vaiTro)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${thanhVien.tyLeSoHuu || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{thanhVien.tyLeSoHuu || 0}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatDate(thanhVien.ngayThamGia)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const filteredNhomList = filterTrangThai === 'all'
    ? nhomXeList
    : nhomXeList.filter(nhom => nhom.trangThai === filterTrangThai);

  // Tính toán thống kê
  const totalNhom = nhomXeList.length;
  const totalHoatDong = nhomXeList.filter(n => n.trangThai === 'HoatDong').length;
  const totalThanhVien = nhomXeList.reduce((sum, nhom) => sum + nhom.soThanhVien, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-lg mb-4">⚠️</div>
          <p className="text-gray-800 mb-4">{error}</p>
          <button
            onClick={loadNhomData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý nhóm xe đồng sở hữu
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi các nhóm đồng sở hữu xe điện
          </p>
        </div>

        {/* Thống kê và bộ lọc (giữ nguyên) */}
        {/* ... */}

        {/* Danh sách nhóm */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh sách nhóm đồng sở hữu
            </h2>
          </div>

          {filteredNhomList.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Không có nhóm nào để hiển thị</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNhomList.map((nhom) => (
                <div key={nhom.nhomId} className="p-6">
                  {/* Header của nhóm */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {nhom.tenNhom}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>•</span>
                        <span>{getTrangThaiXeBadge(getTrangThaiXeChinh(nhom))}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">

                      <button
                        onClick={() => toggleExpand(nhom.nhomId)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${expandedNhomId === nhom.nhomId ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {expandedNhomId === nhom.nhomId ? 'Thu gọn' : 'Xem chi tiết'}
                      </button>
                    </div>
                  </div>

                  {/* Chi tiết nhóm khi mở rộng */}
                  {expandedNhomId === nhom.nhomId && (
                    <div className="mt-6 border-t pt-6">
                      {loadingThanhVien === nhom.nhomId ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                          <p className="mt-2 text-gray-600">Đang tải danh sách thành viên...</p>
                        </div>
                      ) : (
                        <>
                          {/* Thông tin cơ bản */}

                          {/* Danh sách thành viên */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">
                              Danh sách thành viên ({nhom.thanhVien?.length || 0})
                            </h4>
                            {renderThanhVienList(nhom.thanhVien)}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QLNhomXeDongSoHuuPage;