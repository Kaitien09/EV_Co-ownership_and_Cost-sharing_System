import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Interfaces
interface ChiPhi {
    chiPhiId: number;
    nhomId: number;
    loaiChiPhi: 'PhiSacDien' | 'BaoDuong' | 'BaoHiem' | 'DangKiem' | 'VeSinh' | 'Khac';
    soTien: number;
    ngayPhatSinh: string;
    ghiChu: string;
}

interface ChiaChiPhi {
    chiaChiPhiId: number;
    chiPhiId: number;
    chuXeId: number;
    soTienPhaiTra: number;
    ghiChu: string;
}

interface ThanhToan {
    thanhToanId: number;
    chuXeId: number;
    chiaChiPhiId: number;
    phuongThuc: 'ViDienTu' | 'ChuyenKhoan';
    soTienThanhToan: number;
    ngayThanhToan: string;
    trangThai: 'ChuaThanhToan' | 'DaThanhToan';
}

interface ChuXe {
    chuXeId: number;
    hoTen: string;
    tyLeSoHuu: number;
}

const ChiTietThanhToanPage: React.FC = () => {
    const { chiPhiId } = useParams<{ chiPhiId: string }>();
    const navigate = useNavigate();

    const [chiPhi, setChiPhi] = useState<ChiPhi | null>(null);
    const [chiaChiPhiList, setChiaChiPhiList] = useState<ChiaChiPhi[]>([]);
    const [thanhToanList, setThanhToanList] = useState<ThanhToan[]>([]);
    const [chuXeList, setChuXeList] = useState<ChuXe[]>([]);

    // Dữ liệu mẫu
    useEffect(() => {
        // Giả lập API call
        const mockChiPhi: ChiPhi = {
            chiPhiId: 1,
            nhomId: 1,
            loaiChiPhi: 'PhiSacDien',
            soTien: 2500000,
            ngayPhatSinh: '2024-01-15',
            ghiChu: 'Tiền sạc điện tháng 1/2024'
        };

        const mockChiaChiPhi: ChiaChiPhi[] = [
            { chiaChiPhiId: 1, chiPhiId: 1, chuXeId: 1, soTienPhaiTra: 1000000, ghiChu: '40% tỷ lệ sở hữu' },
            { chiaChiPhiId: 2, chiPhiId: 1, chuXeId: 2, soTienPhaiTra: 875000, ghiChu: '35% tỷ lệ sở hữu' },
            { chiaChiPhiId: 3, chiPhiId: 1, chuXeId: 3, soTienPhaiTra: 625000, ghiChu: '25% tỷ lệ sở hữu' }
        ];

        const mockThanhToan: ThanhToan[] = [
            { thanhToanId: 1, chuXeId: 1, chiaChiPhiId: 1, phuongThuc: 'ChuyenKhoan', soTienThanhToan: 1000000, ngayThanhToan: '2024-01-16', trangThai: 'DaThanhToan' },
            { thanhToanId: 2, chuXeId: 2, chiaChiPhiId: 2, phuongThuc: 'ViDienTu', soTienThanhToan: 875000, ngayThanhToan: '2024-01-17', trangThai: 'DaThanhToan' }
        ];

        const mockChuXe: ChuXe[] = [
            { chuXeId: 1, hoTen: 'Nguyễn Văn A', tyLeSoHuu: 40 },
            { chuXeId: 2, hoTen: 'Trần Thị B', tyLeSoHuu: 35 },
            { chuXeId: 3, hoTen: 'Lê Văn C', tyLeSoHuu: 25 }
        ];

        setChiPhi(mockChiPhi);
        setChiaChiPhiList(mockChiaChiPhi);
        setThanhToanList(mockThanhToan);
        setChuXeList(mockChuXe);
    }, [chiPhiId]);

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

    // Hàm chuyển đổi phương thức thanh toán
    const getPhuongThucText = (phuongThuc: string): string => {
        const phuongThucMap: { [key: string]: string } = {
            'ViDienTu': 'Ví điện tử',
            'ChuyenKhoan': 'Chuyển khoản'
        };
        return phuongThucMap[phuongThuc] || phuongThuc;
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

    if (!chiPhi) {
        return (
            <div className="p-6">
                <div className="text-center">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="chi-tiet-thanh-toan-page p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
                >
                    ← Quay lại
                </button>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Chi tiết thanh toán</h1>
                <p className="text-gray-600">Chi tiết phân chia và thanh toán chi phí</p>
            </div>

            {/* Thông tin chi phí */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin chi phí</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Loại chi phí:</label>
                        <p className="text-sm font-medium">{getLoaiChiPhiText(chiPhi.loaiChiPhi)}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Số tiền:</label>
                        <p className="text-sm font-medium">{formatCurrency(chiPhi.soTien)}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Ngày phát sinh:</label>
                        <p className="text-sm font-medium">{formatDate(chiPhi.ngayPhatSinh)}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Ghi chú:</label>
                        <p className="text-sm font-medium">{chiPhi.ghiChu}</p>
                    </div>
                </div>
            </div>

            {/* Chi tiết chia chi phí và thanh toán */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Chi tiết chia chi phí và thanh toán</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thành viên</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tỷ lệ sở hữu</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền phải trả</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày thanh toán</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {chiaChiPhiList.map((chiaChiPhi) => {
                                const chuXe = chuXeList.find(cx => cx.chuXeId === chiaChiPhi.chuXeId);
                                const thanhToan = thanhToanList.find(tt => tt.chiaChiPhiId === chiaChiPhi.chiaChiPhiId);

                                return (
                                    <tr key={chiaChiPhi.chiaChiPhiId} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {chuXe?.hoTen || 'N/A'}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {chuXe?.tyLeSoHuu}%
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {formatCurrency(chiaChiPhi.soTienPhaiTra)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                thanhToan?.trangThai === 'DaThanhToan'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-orange-100 text-orange-800'
                                            }`}>
                                                {thanhToan?.trangThai === 'DaThanhToan' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {thanhToan?.phuongThuc ? getPhuongThucText(thanhToan.phuongThuc) : '-'}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {thanhToan?.ngayThanhToan ? formatDate(thanhToan.ngayThanhToan) : '-'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tổng kết */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tổng kết</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Tổng số thành viên</p>
                        <p className="text-2xl font-bold text-gray-800">{chuXeList.length}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Đã thanh toán</p>
                        <p className="text-2xl font-bold text-green-600">
                            {thanhToanList.length}/{chiaChiPhiList.length}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {Math.round((thanhToanList.length / chiaChiPhiList.length) * 100)}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChiTietThanhToanPage;