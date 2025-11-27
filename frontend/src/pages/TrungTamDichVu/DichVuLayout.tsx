import { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import KhachHangXe from "./KhachHangXe";
import LichHenDichVu from "./LichHenDichVu";
import QuyTrinhBaoDuong from "./QuyTrinhBaoDuong";
import QuanLyPhuTung from "./QuanLyPhuTung";
import QuanLyNhanSu from "./QuanLyNhanSu";
import TaiChinhBaoCao from "./TaiChinhBaoCao";

const DichVuLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("khachhangxe");

  const menuItems = [
    {
      id: "khachhangxe",
      name: "Khách hàng & Xe",
      icon: "👥",
      path: "/dich-vu",
      component: <KhachHangXe />
    },
    {
      id: "lichhen",
      name: "Lịch hẹn & Dịch vụ",
      icon: "📅",
      path: "/dich-vu/lich-hen",
      component: <LichHenDichVu />
    },
    {
      id: "baoduong",
      name: "Quy trình bảo dưỡng",
      icon: "🔧",
      path: "/dich-vu/bao-duong",
      component: <QuyTrinhBaoDuong />
    },
    {
      id: "phutung",
      name: "Quản lý phụ tùng",
      icon: "⚙️",
      path: "/dich-vu/phu-tung",
      component: <QuanLyPhuTung />
    },
    {
      id: "nhansu",
      name: "Quản lý nhân sự",
      icon: "👨‍💼",
      path: "/dich-vu/nhan-su",
      component: <QuanLyNhanSu />
    },
    {
      id: "taichinh",
      name: "Tài chính & Báo cáo",
      icon: "💰",
      path: "/dich-vu/tai-chinh",
      component: <TaiChinhBaoCao />
    }
  ];

  const handleMenuClick = (menuId: string, path: string) => {
    setActiveMenu(menuId);
    navigate(path);
  };

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">

      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg relative">

        {/* Title */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Trung tâm Dịch vụ
          </h1>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive =
                location.pathname === item.path || activeMenu === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id, item.path)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info + Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {/* User */}
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">D</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trung tâm dịch vụ
              </p>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            Đăng xuất
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          {menuItems.map((item) => (
            <Route
              key={item.id}
              path={item.path.replace("/dich-vu", "")}
              element={item.component}
            />
          ))}
          <Route path="" element={<KhachHangXe />} />
        </Routes>
      </div>
    </div>
  );
};

export default DichVuLayout;
