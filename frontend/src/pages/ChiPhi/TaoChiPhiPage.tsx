import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// Interfaces
interface NhomDongSoHuu {
    nhomId: number;
    tenNhom: string;
}

interface ChuXe {
    chuXeId: number;
    hoTen: string;
    tyLeSoHuu: number;
}

const TaoChiPhiPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nhomId: '',
        loaiChiPhi: '',
        soTien: '',
        ngayPhatSinh: '',
        ghiChu: ''
    });

    const [nhomList] = useState<NhomDongSoHuu[]>([
        { nhomId: 1, tenNhom: 'Nhóm Tesla Model 3 - 29A1-12345' },
        { nhomId: 2, tenNhom: 'Nhóm VinFast VF e34 - 29A1-67890' },
        { nhomId: 3, tenNhom: 'Nhóm Hyundai Kona - 29A1-54321' }
    ]);

    const [chuXeList] = useState<ChuXe[]>([
        { chuXeId: 1, hoTen: 'Nguyễn Văn A', tyLeSoHuu: 40 },
        { chuXeId: 2, hoTen: 'Trần Thị B', tyLeSoHuu: 35 },
        { chuXeId: 3, hoTen: 'Lê Văn C', tyLeSoHuu: 25 }
    ]);

    const loaiChiPhiOptions = [
        { value: 'PhiSacDien', label: 'Phí sạc điện' },
        { value: 'BaoDuong', label: 'Bảo dưỡng' },
        { value: 'BaoHiem', label: 'Bảo hiểm' },
        { value: 'DangKiem', label: 'Đăng kiểm' },
        { value: 'VeSinh', label: 'Vệ sinh' },
        { value: 'Khac', label: 'Khác' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý submit form ở đây
        console.log('Form data:', formData);
        // Sau khi submit thành công, chuyển hướng về trang thanh toán
        navigate('/thanh-toan');
    };

    const handleCancel = () => {
        navigate('/thanh-toan');
    };

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
                                        {chuXeList.map(chuXe => (
                                            <tr key={chuXe.chuXeId} className="border-b border-gray-200">
                                                <td className="px-3 py-2">{chuXe.hoTen}</td>
                                                <td className="px-3 py-2">{chuXe.tyLeSoHuu}%</td>
                                                <td className="px-3 py-2">
                                                    {formData.soTien ?
                                                        (Number(formData.soTien) * chuXe.tyLeSoHuu / 100).toLocaleString('vi-VN') + ' VND'
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

                    {/* Nút hành động */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Tạo chi phí
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaoChiPhiPage;