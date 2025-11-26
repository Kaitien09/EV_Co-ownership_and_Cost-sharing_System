import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// Interfaces
interface ChiPhi {
    chiPhiId: number;
    nhomId: number;
    loaiChiPhi: 'PhiSacDien' | 'BaoDuong' | 'BaoHiem' | 'DangKiem' | 'VeSinh' | 'Khac';
    soTien: number;
    ngayPhatSinh: string;
    ghiChu: string;
}

interface NhomDongSoHuu {
    nhomId: number;
    tenNhom: string;
    soThanhVien: number;
}

// Dữ liệu mẫu
const ThanhToanPage: React.FC = () => {
    const navigate = useNavigate();

    const [nhomList] = useState<NhomDongSoHuu[]>([
        { nhomId: 1, tenNhom: 'Nhóm Tesla Model 3 - 29A1-12345', soThanhVien: 3 },
        { nhomId: 2, tenNhom: 'Nhóm VinFast VF e34 - 29A1-67890', soThanhVien: 2 },
        { nhomId: 3, tenNhom: 'Nhóm Hyundai Kona - 29A1-54321', soThanhVien: 4 }
    ]);

    const [chiPhiList] = useState<ChiPhi[]>([
        // Nhóm 1 - Tesla
        {
            chiPhiId: 1,
            nhomId: 1,
            loaiChiPhi: 'PhiSacDien',
            soTien: 2500000,
            ngayPhatSinh: '2024-01-15',
            ghiChu: 'Tiền sạc điện tháng 1/2024'
        },
        {
            chiPhiId: 2,
            nhomId: 1,
            loaiChiPhi: 'BaoDuong',
            soTien: 3500000,
            ngayPhatSinh: '2024-01-20',
            ghiChu: 'Bảo dưỡng định kỳ 20,000km'
        },
        // ... thêm các chi phí khác
    ]);

    const [selectedNhomId, setSelectedNhomId] = useState<number | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<string>('thang-nay');

    // Lọc chi phí theo nhóm được chọn
    const chiPhiTheoNhom = selectedNhomId
        ? chiPhiList.filter(chiPhi => chiPhi.nhomId === selectedNhomId)
        : [];

    const selectedNhom = nhomList.find(nhom => nhom.nhomId === selectedNhomId);

    // Hàm chuyển đổi loại chi phí
    const getLoaiChiPhiText = (loaiChiPhi: string): string => {
        const loaiChiPhiMap: { [key: string]: string } = {
            'PhiSacDien': 'Phí sạc điện',
            'BaoDuong': 'Bảo dưỡng',
            'BaoHiem': 'Bảo hiểm',
            'DangKiem': 'Đăng kiểm',
            'VeSinh': 'Vệ sinh',
            'Khac': 'Khác'
        };
        return loaiChiPhiMap[loaiChiPhi] || loaiChiPhi;
    };

    // Hàm format tiền
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Hàm format ngày
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    // Tính tổng chi phí
    const tongChiPhi = chiPhiTheoNhom.reduce((sum, chiPhi) => sum + chiPhi.soTien, 0);

    // Xử lý chuyển trang
    const handleXemChiTiet = (chiPhiId: number) => {
        navigate(`/chi-tiet-thanh-toan/${chiPhiId}`);
    };

    const handleThemChiPhi = () => {
        navigate('/tao-chi-phi');
    };

    return (
        <div className="thanh-toan-page p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Quản lý chi phí & thanh toán</h1>
                <p className="text-gray-600">Theo dõi và quản lý chi phí theo từng nhóm sở hữu xe</p>
            </div>

            {/* Chọn nhóm xe */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">Chọn nhóm xe:</label>
                    <select
                        value={selectedNhomId || ''}
                        onChange={(e) => setSelectedNhomId(e.target.value ? parseInt(e.target.value) : null)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
                    >
                        <option value="">-- Chọn nhóm xe --</option>
                        {nhomList.map(nhom => (
                            <option key={nhom.nhomId} value={nhom.nhomId}>
                                {nhom.tenNhom} ({nhom.soThanhVien} thành viên)
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedNhomId ? (
                <>
                    {/* Thông tin nhóm */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                            {selectedNhom?.tenNhom}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                            <div>
                                <span className="font-medium">Số thành viên:</span> {selectedNhom?.soThanhVien}
                            </div>
                            <div>
                                <span className="font-medium">Tổng chi phí:</span> {formatCurrency(tongChiPhi)}
                            </div>
                        </div>
                    </div>

                    {/* Thống kê tổng quan */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Tổng chi phí</p>
                                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(tongChiPhi)}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <span className="text-blue-600 text-xl">💰</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bộ lọc thời gian */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <label className="text-sm font-medium text-gray-700">Thời gian:</label>
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="thang-nay">Tháng này</option>
                                    <option value="thang-truoc">Tháng trước</option>
                                    <option value="quy-nay">Quý này</option>
                                    <option value="nam-nay">Năm nay</option>
                                </select>
                            </div>
                            <button
                                onClick={handleThemChiPhi}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                + Thêm chi phí
                            </button>
                        </div>
                    </div>

                    {/* Danh sách chi phí */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Danh sách chi phí</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại chi phí</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày phát sinh</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {chiPhiTheoNhom.map((chiPhi) => (
                                        <tr key={chiPhi.chiPhiId} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {getLoaiChiPhiText(chiPhi.loaiChiPhi)}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{chiPhi.ghiChu}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {formatCurrency(chiPhi.soTien)}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(chiPhi.ngayPhatSinh)}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleXemChiTiet(chiPhi.chiPhiId)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Xem chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
                    <div className="text-gray-400 text-6xl mb-4">🚗</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn nhóm xe để xem chi phí</h3>
                    <p className="text-gray-500">Vui lòng chọn một nhóm xe từ dropdown phía trên để xem chi tiết chi phí và thanh toán.</p>
                </div>
            )}
        </div>
    );
};

export default ThanhToanPage;