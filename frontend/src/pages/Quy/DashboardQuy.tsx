import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

const API_URL = "http://localhost:8080/api"; // đổi theo backend của bạn

export default function DashboardQuy() {
  const location = useLocation();
  const [quyChung, setQuyChung] = useState<any[]>([]);
  const [chiPhi, setChiPhi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuyChung = async () => {
    try {
      const res = await axios.get(`${API_URL}/quy-chung`);
      setQuyChung(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChiPhi = async () => {
    try {
      const res = await axios.get(`${API_URL}/chi-phi`);
      setChiPhi(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchQuyChung();
    fetchChiPhi();
    setLoading(false);
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  // Hiển thị dựa theo path (tab hiện tại)
  const currentTab = location.pathname.includes("chi-phi")
    ? "chi-phi"
    : "quy-chung";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý Quỹ & Chi Phí</h1>
      <div className="flex gap-4 mb-6">
        <a
          href="/dashboard-quy/quy-chung"
          className={`px-4 py-2 rounded ${
            currentTab === "quy-chung"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Quỹ Chung
        </a>
        <a
          href="/dashboard-quy/chi-phi"
          className={`px-4 py-2 rounded ${
            currentTab === "chi-phi"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Chi Phí
        </a>
      </div>

      {currentTab === "quy-chung" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Danh sách Quỹ Chung</h2>
          <ul className="list-disc ml-6">
            {quyChung.length > 0 ? (
              quyChung.map((item: any) => (
                <li key={item.id}>
                  {item.ten} - {item.soTien} VND
                </li>
              ))
            ) : (
              <li>Không có dữ liệu</li>
            )}
          </ul>
        </div>
      )}

      {currentTab === "chi-phi" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Danh sách Chi Phí</h2>
          <ul className="list-disc ml-6">
            {chiPhi.length > 0 ? (
              chiPhi.map((item: any) => (
                <li key={item.id}>
                  {item.ten} - {item.soTien} VND
                </li>
              ))
            ) : (
              <li>Không có dữ liệu</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
