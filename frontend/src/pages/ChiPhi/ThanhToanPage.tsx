import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { nhomService } from '../../services/nhomService';
import { chiPhiService } from "../../services/chiPhiService";

interface NhomDongSoHuu {
    nhomId: number;
    tenNhom: string;
    trangThai: string;
    ngayTao: string;
    thanhVien: any[];
}

interface ChiPhi {
    chiPhiId: number;
    nhom: {
        nhomId: number;
        tenNhom: string;
    };
    loaiChiPhi: string;
    soTien: number;
    ngayPhatSinh: string;
    ghiChu: string;
    ngayTao: string;
}

const ThanhToanPage: React.FC = () => {
    const navigate = useNavigate();

    const [nhomList, setNhomList] = useState<NhomDongSoHuu[]>([]);
    const [chiPhiList, setChiPhiList] = useState<ChiPhi[]>([]);
    const [selectedNhomId, setSelectedNhomId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load danh sách nhóm khi vào page
    useEffect(() => {
        const loadNhomList = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await nhomService.getAllNhom();
                setNhomList(data);
            } catch (err) {
                setError('Không tải được danh sách nhóm');
                console.error('Error loading nhom list:', err);
            } finally {
                setLoading(false);
            }
        };

        loadNhomList();
    }, []);

    // Load chi phí khi nhóm thay đổi
    useEffect(() => {
        const loadChiPhi = async () => {
            if (!selectedNhomId) {
                setChiPhiList([]);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const data = await chiPhiService.getByNhom(selectedNhomId);
                setChiPhiList(data);
            } catch (err) {
                setError('Không tải được danh sách chi phí');
                console.error('Error loading chi phi:', err);
            } finally {
                setLoading(false);
            }
        };

        loadChiPhi();
    }, [selectedNhomId]);

    const getLoaiChiPhiText = (loaiChiPhi: string) => {
        const map: { [key: string]: string } = {
            'NHIEN_LIEU': 'Nhiên liệu',
            'BAO_DUONG': 'Bảo dưỡng',
            'SUA_CHUA': 'Sửa chữa',
            'PHI_DUONG': 'Phí đường',
            'BAO_HIEM': 'Bảo hiểm',
            'KHAC': 'Khác'
        };
        return map[loaiChiPhi] || loaiChiPhi;
    };

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('vi-VN');
        } catch {
            return dateString;
        }
    };

    const tongChiPhi = chiPhiList.reduce((sum, cp) => sum + cp.soTien, 0);
    const soThanhVien = selectedNhomId
        ? nhomList.find(n => n.nhomId === selectedNhomId)?.thanhVien?.length || 0
        : 0;

    if (loading && nhomList.length === 0) {
        return (
            <div className="p-6">
                <div className="text-center py-8">
                    <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Quản lý chi phí & thanh toán</h1>
                <p className="text-gray-600">Theo dõi và quản lý chi phí cho các nhóm đồng sở hữu</p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chọn nhóm xe:
                        </label>
                        <select
                            value={selectedNhomId || ''}
                            onChange={e => setSelectedNhomId(e.target.value ? parseInt(e.target.value) : null)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn nhóm xe --</option>
                            {nhomList.map(n => (
                                <option key={n.nhomId} value={n.nhomId}>
                                    {n.tenNhom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/tao-chi-phi')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                    + Thêm chi phí mới
                </button>
            </div>

            {selectedNhomId && (
                <>
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Nhóm xe</h3>
                            <p className="text-lg font-semibold text-gray-800">
                                {nhomList.find(n => n.nhomId === selectedNhomId)?.tenNhom}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Số thành viên</h3>
                            <p className="text-lg font-semibold text-gray-800">{soThanhVien}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Tổng chi phí</h3>
                            <p className="text-lg font-semibold text-blue-600">{formatCurrency(tongChiPhi)}</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="text-lg text-gray-600">Đang tải chi phí...</div>
                        </div>
                    ) : chiPhiList.length > 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Loại chi phí</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Số tiền</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Ngày phát sinh</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Ghi chú</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {chiPhiList.map(cp => (
                                            <tr key={cp.chiPhiId} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <span className="font-medium text-gray-800">
                                                        {getLoaiChiPhiText(cp.loaiChiPhi)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 font-semibold text-gray-800">
                                                    {formatCurrency(cp.soTien)}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {formatDate(cp.ngayPhatSinh)}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {cp.ghiChu || '-'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => navigate(`/chi-tiet-thanh-toan/${cp.chiPhiId}`)}
                                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
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
                    ) : (
                        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                            <div className="text-gray-500 mb-2">Chưa có chi phí nào</div>
                            <button
                                onClick={() => navigate('/tao-chi-phi')}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Tạo chi phí đầu tiên
                            </button>
                        </div>
                    )}
                </>
            )}

            {!selectedNhomId && nhomList.length > 0 && (
                <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                    <div className="text-gray-500">Vui lòng chọn một nhóm để xem chi phí</div>
                </div>
            )}

            {nhomList.length === 0 && !loading && (
                <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                    <div className="text-gray-500 mb-2">Chưa có nhóm nào</div>
                    <button
                        onClick={() => navigate('/tao-nhom')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Tạo nhóm đầu tiên
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThanhToanPage;