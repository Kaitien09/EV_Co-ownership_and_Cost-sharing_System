import { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import QLNhomXeDongSoHuuPage from "./QLNhomXeDongSoHuuPage";
import QLHopDongPhapLyPage from "./QLHopDongPhapLyPage";
import QLDichVuXePage from "./QLDichVuXePage";
import QLCheckInVaOutPage from "./QLCheckInVaOutPage";
import TheoDoiVaGiamSatPage from "./TheoDoiVaGiamSatPage";
import BaoCaoPage from "./BaoCaoPage";
import ChiTietNhomPage from "./ChiTietNhomPage";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("nhomxe");

  const menuItems = [
    {
      id: "nhomxe",
      name: "Nhóm xe đồng sở hữu",
      icon: "🚗",
      path: "/admin",
      component: <QLNhomXeDongSoHuuPage />
    },
    {
      id: "hopdong",
      name: "Hợp đồng pháp lý",
      icon: "📄",
      path: "/admin/ql-hd",
      component: <QLHopDongPhapLyPage />
    },
    {
      id: "dichvu",
      name: "Dịch vụ xe",
      icon: "⚙️",
      path: "/admin/ql-dv",
      component: <QLDichVuXePage />
    },
    {
      id: "checkinout",
      name: "Check-in/Check-out",
      icon: "🔄",
      path: "/admin/ql-check",
      component: <QLCheckInVaOutPage />
    },
    {
      id: "theodoi",
      name: "Theo dõi & Giám sát",
      icon: "📊",
      path: "/admin/theo-doi",
      component: <TheoDoiVaGiamSatPage />
    },
    {
      id: "baocao",
      name: "Báo cáo",
      icon: "📋",
      path: "/admin/bao-cao",
      component: <BaoCaoPage />
    }
  ];

  const handleMenuClick = (menuId: string, path: string) => {
    setActiveMenu(menuId);
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg relative">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>←</span>
              <span className="text-sm font-medium">Về trang chủ</span>
            </Link>
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
             Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Quản lý hệ thống
          </p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || activeMenu === item.id;
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

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Quản trị viên
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          {menuItems.map((item) => (
            <Route
              key={item.id}
              path={item.path.replace('/admin', '')}
              element={item.component}
            />
          ))}
          {/* Route cho chi tiết nhóm */}
          <Route path="/:id" element={<ChiTietNhomPage />} />
          {/* Route mặc định */}
          <Route path="" element={<QLNhomXeDongSoHuuPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;