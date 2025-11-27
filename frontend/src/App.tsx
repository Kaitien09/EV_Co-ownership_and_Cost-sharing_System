import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HistoryCalendar from "./pages/HistoryCalendar";
import HopDongPage from "./pages/HopDong/HopDongPage";
import TaoHopDongPage from './pages/hopdong/TaoHopDongPage';
import ChiTietHopDongPage from './pages/hopdong/ChiTietHopDongPage';
import ChinhSuaHopDongPage from './pages/hopdong/ChinhSuaHopDongPage';
import DanhSachNhomPage from './pages/NhomSoHuu/DanhSachNhomPage';
import NhomDongSoHuuPage from './pages/NhomSoHuu/NhomDongSoHuuPage';
import QuanLyThanhVienPage from './pages/NhomSoHuu/QuanLyThanhVienPage';
import BoPhieuPage from './pages/NhomSoHuu/BoPhieuPage';
import QuyChungPage from './pages/NhomSoHuu/QuyChungPage';
import AIPhanTichPage from './pages/NhomSoHuu/AIPhanTichPage';
import ThanhToanPage from './pages/ChiPhi/ThanhToanPage';
import ChiTietThanhToanPage from './pages/ChiPhi/ChiTietThanhToanPage';
import TaoChiPhiPage from './pages/ChiPhi/TaoChiPhiPage';
import RequireAuth from "./components/auth/RequireAuth";
import QLHopDongPhapLyPage from './pages/QLHopDongPhapLyPage';
import QLCheckInVaOutPage from './pages/QLCheckInVaOutPage';
import QLDichVuXePage from './pages/QLDichVuXePage';
import TheoDoiVaGiamSatPage from './pages/TheoDoiVaGiamSatPage';
import BaoCaoPage from './pages/BaoCaoPage';
import QLNhomXeDongSoHuuPage from './pages/QLNhomXeDongSoHuuPage';
import ChiTietNhomPage from './pages/ChiTietNhomPage';
import DichVuLayout from "./pages/TrungTamDichVu/DichVuLayout";
import LichHenDichVu from "./pages/LichHenDichVu";
import QuanLyHoSoChiPhi from "./pages/QuanLyHoSoChiPhi";


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route index path="/" element={<Home />} />

          {/* Others Page */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/history" element={<HistoryCalendar />} />

          {/* Hợp đồng */}
          <Route path="/hop-dong" element={<HopDongPage />} />
          <Route path="/hop-dong/tao-moi" element={<TaoHopDongPage />} />
          <Route path="/hop-dong/:id" element={<ChiTietHopDongPage />} />
          <Route path="/hop-dong/:id/chinh-sua" element={<ChinhSuaHopDongPage />} />

          {/* Nhóm sở hữu */}
          <Route path="/nhom" element={<DanhSachNhomPage />} />
          <Route path="/nhom/:id" element={<NhomDongSoHuuPage />} />
          <Route path="/nhom/:id/quan-ly-thanh-vien" element={<QuanLyThanhVienPage />} />
          <Route path="/nhom/:id/bo-phieu" element={<BoPhieuPage />} />
          <Route path="/nhom/:id/quy-chung" element={<QuyChungPage />} />
          <Route path="/nhom/:id/ai-phan-tich" element={<AIPhanTichPage />} />

          {/* Chi phí / Thanh toán */}
          <Route path="/thanh-toan" element={<ThanhToanPage />} />
          <Route path="/chi-tiet-thanh-toan/:chiPhiId" element={<ChiTietThanhToanPage />} />
          <Route path="/tao-chi-phi" element={<TaoChiPhiPage />} />
          //
          <Route path="admin/ql-check" element={<QLCheckInVaOutPage />} />
          <Route path="admin/ql-dv" element={<QLDichVuXePage />} />
          <Route path="admin/ql-hd" element={<QLHopDongPhapLyPage />} />
          <Route path="admin/theo-doi" element={<TheoDoiVaGiamSatPage />} />
          <Route path="admin/bao-cao" element={<BaoCaoPage />} />
          <Route path="admin" element={<QLNhomXeDongSoHuuPage />} />
          <Route path="/admin/:id" element={<ChiTietNhomPage />} />
          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

           {/* Lịch hẹn dịch vụ*/}
           <Route path="/lich-hen-dich-vu" element={<LichHenDichVu/>} />

           {/* Quản lý hồ sơ & chi phí*/}
           <Route path="/ho-so-chi-phi" element={<QuanLyHoSoChiPhi/>} />

           {/* Trung tâm dịch vụ - Sử dụng layout riêng */}
                   <Route
                     path="/dich-vu/*"
                     element={
                       <RequireAuth>
                         <DichVuLayout />
                       </RequireAuth>
                     }
                   />


          {/* Ui Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
