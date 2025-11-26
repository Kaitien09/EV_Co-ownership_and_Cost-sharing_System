import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

// Import các component đã được fix
import QuanLyThanhVienPage from "./QuanLyThanhVienPage";
import BoPhieuPage from "./BoPhieuPage";
import QuyChungPage from "./QuyChungPage";
import AIPhanTichPage from "./AIPhanTichPage";

interface ThanhVienNhom {
  thanhVienNhomId: number;
  chuXeId: number;
  tenChuXe: string;
  email: string;
  soDienThoai: string;
  tyLeSoHuu: number;
  vaiTro: 'TruongNhom' | 'ThanhVien';
  ngayThamGia: string;
}

interface NhomDongSoHuu {
  nhomId: number;
  tenNhom: string;
  ngayTao: string;
  trangThai: 'HoatDong' | 'Ngung';
  thanhVien: ThanhVienNhom[];
  soDuQuy: number;
}

const NhomDongSoHuuPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tong-quan' | 'thanh-vien' | 'bieu-quyet' | 'quy-chung' | 'ai'>('tong-quan');
  const [nhom, setNhom] = useState<NhomDongSoHuu | null>(null);
  const [loading, setLoading] = useState(true);

  const mockNhomData: { [key: number]: NhomDongSoHuu } = {
    1: {
      nhomId: 1,
      tenNhom: "Nhóm Đồng Sở Hữu EV 01",
      ngayTao: "2024-01-15",
      trangThai: 'HoatDong',
      soDuQuy: 15000000,
      thanhVien: [
        {
          thanhVienNhomId: 1,
          chuXeId: 1,
          tenChuXe: "Nguyễn Văn A",
          email: "a.nguyen@email.com",
          soDienThoai: "0912345678",
          tyLeSoHuu: 60,
          vaiTro: 'TruongNhom',
          ngayThamGia: "2024-01-15T00:00:00"
        },
        {
          thanhVienNhomId: 2,
          chuXeId: 2,
          tenChuXe: "Trần Thị B",
          email: "b.tran@email.com",
          soDienThoai: "0923456789",
          tyLeSoHuu: 40,
          vaiTro: 'ThanhVien',
          ngayThamGia: "2024-01-15T00:00:00"
        }
      ]
    },
    2: {
      nhomId: 2,
      tenNhom: "Nhóm EV Sài Gòn",
      ngayTao: "2024-02-01",
      trangThai: 'HoatDong',
      soDuQuy: 8000000,
      thanhVien: [
        {
          thanhVienNhomId: 3,
          chuXeId: 3,
          tenChuXe: "Lê Văn C",
          email: "c.le@email.com",
          soDienThoai: "0934567890",
          tyLeSoHuu: 50,
          vaiTro: 'TruongNhom',
          ngayThamGia: "2024-02-01T00:00:00"
        },
        {
          thanhVienNhomId: 4,
          chuXeId: 4,
          tenChuXe: "Phạm Thị D",
          email: "d.pham@email.com",
          soDienThoai: "0945678901",
          tyLeSoHuu: 50,
          vaiTro: 'ThanhVien',
          ngayThamGia: "2024-02-01T00:00:00"
        }
      ]
    }
  };

  useEffect(() => {
    if (id) {
      const nhomId = parseInt(id);
      const nhomData = mockNhomData[nhomId];

      if (nhomData) {
        setNhom(nhomData);
      } else {
        navigate('/nhom');
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleQuayLai = () => {
    navigate('/nhom');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getTrangThaiBadge = (trangThai: string) => {
    return trangThai === 'HoatDong'
      ? <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">Đang hoạt động</span>
      : <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">Đã ngừng</span>;
  };

  const getVaiTroBadge = (vaiTro: string) => {
    return vaiTro === 'TruongNhom'
      ? <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Trưởng nhóm</span>
      : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Thành viên</span>;
  };

  const renderTongQuan = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Số dư quỹ</div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(nhom!.soDuQuy)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Thành viên</div>
          <div className="text-2xl font-bold text-blue-600">{nhom!.thanhVien.length}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Ngày tạo</div>
          <div className="text-lg font-semibold text-gray-800">{formatDate(nhom!.ngayTao)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-2">Trạng thái</div>
          <div>{getTrangThaiBadge(nhom!.trangThai)}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Thành viên nhóm</h3>
        <div className="space-y-3">
          {nhom!.thanhVien.map((thanhVien) => (
            <div key={thanhVien.thanhVienNhomId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {thanhVien.tenChuXe.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{thanhVien.tenChuXe}</span>
                    {getVaiTroBadge(thanhVien.vaiTro)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {thanhVien.email} • {thanhVien.soDienThoai}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-gray-800">{thanhVien.tyLeSoHuu}%</div>
                <div className="text-sm text-gray-600">Tỷ lệ sở hữu</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (!nhom) return null;

    switch (activeTab) {
      case 'tong-quan':
        return renderTongQuan();
      case 'thanh-vien':
        return <QuanLyThanhVienPage />;
      case 'bieu-quyet':
        return <BoPhieuPage />;
      case 'quy-chung':
        return <QuyChungPage />;
      case 'ai':
        return <AIPhanTichPage />;
      default:
        return renderTongQuan();
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Đang tải thông tin nhóm...</p>
        </div>
      </div>
    );
  }

  if (!nhom) {
    return (
      <div className="p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy nhóm</p>
          <button onClick={handleQuayLai} className="mt-4 text-blue-600 hover:text-blue-800">
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <button
          onClick={handleQuayLai}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium"
        >
          ← Quay lại danh sách nhóm
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{nhom.tenNhom}</h1>
        <p className="text-gray-600 mt-1">Nhóm ID: {nhom.nhomId}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('tong-quan')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'tong-quan'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            📊 Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('thanh-vien')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'thanh-vien'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            👥 Thành viên
          </button>
          <button
            onClick={() => setActiveTab('bieu-quyet')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'bieu-quyet'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            🗳️ Biểu quyết
          </button>
          <button
            onClick={() => setActiveTab('quy-chung')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'quy-chung'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            💰 Quỹ chung
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'ai'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            🤖 AI Phân tích
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default NhomDongSoHuuPage;