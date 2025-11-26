import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const AIPhanTichPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [phanTich, setPhanTich] = useState({
    tongQuangDuong: 1250,
    trungBinhThang: 312,
    thanhVienSuDung: [
      { ten: "Nguyễn Văn A", quangDuong: 750, tyLe: 60 },
      { ten: "Trần Thị B", quangDuong: 500, tyLe: 40 }
    ],
    deXuatLich: [
      { ngay: "Thứ 2", thanhVien: "Nguyễn Văn A" },
      { ngay: "Thứ 3", thanhVien: "Trần Thị B" },
      { ngay: "Thứ 4", thanhVien: "Nguyễn Văn A" },
      { ngay: "Thứ 5", thanhVien: "Trần Thị B" },
      { ngay: "Thứ 6", thanhVien: "Luân phiên" },
      { ngay: "Thứ 7", thanhVien: "Nghỉ" },
      { ngay: "Chủ nhật", thanhVien: "Cả nhóm" }
    ],
    khuyenNghi: [
      "Nên sạc xe vào buổi tối để tiết kiệm chi phí điện",
      "Lịch bảo dưỡng tiếp theo: 15/02/2024",
      "Dự kiến chi phí bảo hiểm tháng tới: 1.200.000 VND"
    ]
  });

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button onClick={() => navigate(`/nhom/${id}`)} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium">
          ← Quay lại nhóm
        </button>
        <h1 className="text-2xl font-bold text-gray-800">AI Phân tích & Đề xuất</h1>
        <p className="text-gray-600 mt-2">Phân tích sử dụng xe và đề xuất lịch trình công bằng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thống kê sử dụng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Thống kê sử dụng</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-gray-800">Tổng quãng đường (tháng)</span>
              <span className="font-semibold text-blue-600">{phanTich.tongQuangDuong} km</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-gray-800">Trung bình/tháng</span>
              <span className="font-semibold text-green-600">{phanTich.trungBinhThang} km</span>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Phân bổ sử dụng theo thành viên</h4>
              <div className="space-y-2">
                {phanTich.thanhVienSuDung.map((tv, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{tv.ten}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${tv.tyLe}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 w-12">{tv.tyLe}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Đề xuất lịch sử dụng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Đề xuất lịch sử dụng</h3>

          <div className="space-y-3">
            {phanTich.deXuatLich.map((lich, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <span className="font-medium text-gray-800">{lich.ngay}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  lich.thanhVien === 'Nguyễn Văn A'
                    ? 'bg-blue-100 text-blue-800'
                    : lich.thanhVien === 'Trần Thị B'
                    ? 'bg-green-100 text-green-800'
                    : lich.thanhVien === 'Cả nhóm'
                    ? 'bg-purple-100 text-purple-800'
                    : lich.thanhVien === 'Nghỉ'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {lich.thanhVien}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Khuyến nghị AI */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Khuyến nghị từ AI</h3>

          <div className="space-y-3">
            {phanTich.khuyenNghi.map((kn, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">💡</span>
                </div>
                <p className="text-gray-800">{kn}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Dự báo chi phí tháng tới</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-gray-600">Phí sạc điện</div>
                <div className="font-semibold text-green-600">450.000 VND</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Bảo dưỡng</div>
                <div className="font-semibold text-orange-600">150.000 VND</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Bảo hiểm</div>
                <div className="font-semibold text-blue-600">100.000 VND</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Tổng cộng</div>
                <div className="font-semibold text-red-600">700.000 VND</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPhanTichPage;