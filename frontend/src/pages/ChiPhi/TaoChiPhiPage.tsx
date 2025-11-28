import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Interfaces
interface NhomDongSoHuu {
    nhomId: number;
    tenNhom: string;
    trangThai: string;
    ngayTao: string;
    thanhVien: ThanhVienNhom[];
}

interface ThanhVienNhom {
    thanhVienNhomId: number;
    chuXe: ChuXe;
    xe: XeDien;
    tyLeSoHuu: number;
    vaiTro: string;
    ngayThamGia: string;
}

interface ChuXe {
    chuXeId: number;
    hoTen: string;
    cccd: string;
    sdt: string;
    gplx: string;
    diaChi: string;
    gplxAnh: string;
}

interface XeDien {
    xeId: number;
    vin: string;
    model: string;
    bienSo: string;
    trangThai: string;
    mauXe: string;
    namSanXuat: number;
    dungLuongPin: number;
    quangDuongToiDa: number;
    hinhAnh: string;
    moTa: string;
}

interface ChiPhiFormData {
    nhomId: string;
    loaiChiPhi: string;
    soTien: string;
    ngayPhatSinh: string;
    ghiChu: string;
}

const TaoChiPhiPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ChiPhiFormData>({
        nhomId: '',
        loaiChiPhi: '',
        soTien: '',
        ngayPhatSinh: '',
        ghiChu: ''
    });

    const [nhomList, setNhomList] = useState<NhomDongSoHuu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedNhom, setSelectedNhom] = useState<NhomDongSoHuu | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const loaiChiPhiOptions = [
        { value: 'NHIEN_LIEU', label: 'Nhiên liệu' },
        { value: 'BAO_DUONG', label: 'Bảo dưỡng' },
        { value: 'SUA_CHUA', label: 'Sửa chữa' },
        { value: 'PHI_DUONG', label: 'Phí đường' },
        { value: 'BAO_HIEM', label: 'Bảo hiểm' },
        { value: 'KHAC', label: 'Khác' }
    ];

    // Lấy danh sách nhóm từ API
    useEffect(() => {
        const fetchNhomList = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/nhom');

                if (!response.ok) {
                    throw new Error('Không thể lấy danh sách nhóm');
                }

                const data = await response.json();
                setNhomList(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
                console.error('Error fetching nhom list:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNhomList();
    }, []);

    // Khi chọn nhóm, lấy thông tin chi tiết của nhóm đó
    useEffect(() => {
        const fetchNhomDetail = async () => {
            if (!formData.nhomId) {
                setSelectedNhom(null);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/nhom/${formData.nhomId}`);

                if (!response.ok) {
                    throw new Error('Không thể lấy thông tin nhóm');
                }

                const nhomDetail = await response.json();
                setSelectedNhom(nhomDetail);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
                setSelectedNhom(null);
            }
        };

        fetchNhomDetail();
    }, [formData.nhomId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedNhom) {
            setError('Vui lòng chọn nhóm');
            return;
        }

        try {
            setSubmitting(true);
            setError('');

            // Gọi API tạo chi phí
            const response = await fetch('http://localhost:8080/api/chi-phi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nhom: { nhomId: Number(formData.nhomId) },
                    loaiChiPhi: formData.loaiChiPhi,
                    soTien: Number(formData.soTien),
                    ngayPhatSinh: formData.ngayPhatSinh,
                    ghiChu: formData.ghiChu
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Tạo chi phí thất bại');
            }

            const result = await response.json();
            console.log('Chi phí đã được tạo:', result);

            // Chuyển hướng về trang thanh toán sau khi thành công
            navigate('/thanh-toan');

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo chi phí');
            console.error('Error creating chi phi:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/thanh-toan');
    };

    if (loading) {
        return (
            <div className="tao-chi-phi-page p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="tao-chi-phi-page p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
                >
                    ← Quay lại
                </button>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Tạo chi phí mới</h1>
                <p className="text-gray-600">Thêm chi phí mới cho nhóm sở hữu xe</p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Chọn nhóm */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Chọn nhóm xe *
                            </label>
                            <select
                                name="nhomId"
                                value={formData.nhomId}
                                onChange={handleInputChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn nhóm xe --</option>
                                {nhomList.map(nhom => (
                                    <option key={nhom.nhomId} value={nhom.nhomId}>
                                        {nhom.tenNhom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Loại chi phí */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loại chi phí *
                            </label>
                            <select
                                name="loaiChiPhi"
                                value={formData.loaiChiPhi}
                                onChange={handleInputChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn loại chi phí --</option>
                                {loaiChiPhiOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Số tiền */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số tiền (VND) *
                            </label>
                            <input
                                type="number"
                                name="soTien"
                                value={formData.soTien}
                                onChange={handleInputChange}
                                required
                                placeholder="Nhập số tiền"
                                min="0"
                                step="1000"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Ngày phát sinh */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ngày phát sinh *
                            </label>
                            <input
                                type="date"
                                name="ngayPhatSinh"
                                value={formData.ngayPhatSinh}
                                onChange={handleInputChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Ghi chú */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ghi chú
                        </label>
                        <textarea
                            name="ghiChu"
                            value={formData.ghiChu}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Nhập ghi chú cho chi phí này..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Thông tin chia chi phí */}
                    {selectedNhom && selectedNhom.thanhVien && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin chia chi phí</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-3">
                                    Chi phí sẽ được tự động chia theo tỷ lệ sở hữu của các thành viên:
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="px-3 py-2 text-left">Thành viên</th>
                                                <th className="px-3 py-2 text-left">Tỷ lệ sở hữu</th>
                                                <th className="px-3 py-2 text-left">Số tiền phải trả</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedNhom.thanhVien.map(thanhVien => (
                                                <tr key={thanhVien.thanhVienNhomId} className="border-b border-gray-200">
                                                    <td className="px-3 py-2">{thanhVien.chuXe.hoTen}</td>
                                                    <td className="px-3 py-2">{thanhVien.tyLeSoHuu}%</td>
                                                    <td className="px-3 py-2">
                                                        {formData.soTien ?
                                                            (Number(formData.soTien) * thanhVien.tyLeSoHuu / 100).toLocaleString('vi-VN') + ' VND'
                                                            : '0 VND'
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Nút hành động */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={submitting}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {submitting ? 'Đang tạo...' : 'Tạo chi phí'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaoChiPhiPage;