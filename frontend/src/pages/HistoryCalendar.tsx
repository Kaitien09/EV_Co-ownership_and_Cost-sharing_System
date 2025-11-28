import { useState, useEffect } from "react";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";

interface HistoryEvent {
  id: string;
  licensePlate: string;
  bookerName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: string;
  distance: number;
  energyConsumed: number;
  startLocation: string;
  endLocation: string;
  note: string;
}

interface MemberUsage {
  memberId: string;
  memberName: string;
  ownershipRate: number;
  usageRate: number;
  totalDistance: number;
  totalEnergy: number;
  efficiency: number;
}

const HistoryCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null);
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [memberUsageData, setMemberUsageData] = useState<MemberUsage[]>([]);
  const { isOpen, openModal, closeModal } = useModal();

  // Danh sách xe từ database
  const vehicleList = [
    { licensePlate: "30A-11111", textColor: "#FF6B6B", ownershipRate: 50 },
    { licensePlate: "30A-22222", textColor: "#4ECDC4", ownershipRate: 70 },
    { licensePlate: "30A-33333", textColor: "#FFD93D", ownershipRate: 60 },
    { licensePlate: "30A-44444", textColor: "#6BCF7F", ownershipRate: 100 },
    { licensePlate: "30A-55555", textColor: "#FF8B94", ownershipRate: 100 },
  ];

  // Danh sách chủ xe từ database
  const memberList = [
    { id: "1", name: "Nguyen Van A" },
    { id: "2", name: "Tran Thi B" },
    { id: "3", name: "Le Van C" },
    { id: "4", name: "Pham Thi D" },
    { id: "5", name: "Hoang Van E" },
  ];

  const statusList = [
    { value: "DA_XAC_NHAN", label: "Đã xác nhận", color: "#10B981" },
    { value: "CHO_XAC_NHAN", label: "Chờ xác nhận", color: "#F59E0B" },
    { value: "DANG_THUC_HIEN", label: "Đang thực hiện", color: "#3B82F6" },
    { value: "DA_HUY", label: "Đã hủy", color: "#EF4444" },
  ];

  // Format date từ database
  const formatDateFromDB = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatTimeFromDB = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // DỮ LIỆU TỪ DATABASE - Lấy từ bảng lich_su_su_dung và dat_lich
  const sampleHistory: HistoryEvent[] = [
    {
      id: "1",
      licensePlate: "30A-11111",
      bookerName: "Nguyen Van A",
      startDate: formatDateFromDB('2025-11-26 08:00:00'),
      endDate: formatDateFromDB('2025-11-26 12:00:00'),
      startTime: formatTimeFromDB('2025-11-26 08:00:00'),
      endTime: formatTimeFromDB('2025-11-26 12:00:00'),
      status: "DA_XAC_NHAN",
      distance: 50,
      energyConsumed: 20,
      startLocation: "Diem xuat phat A",
      endLocation: "Tram A",
      note: "Su dung binh thuong"
    },
    {
      id: "2",
      licensePlate: "30A-11111",
      bookerName: "Tran Thi B",
      startDate: formatDateFromDB('2025-11-27 09:00:00'),
      endDate: formatDateFromDB('2025-11-27 13:00:00'),
      startTime: formatTimeFromDB('2025-11-27 09:00:00'),
      endTime: formatTimeFromDB('2025-11-27 13:00:00'),
      status: "CHO_XAC_NHAN",
      distance: 60,
      energyConsumed: 25,
      startLocation: "Diem xuat phat B",
      endLocation: "Tram B",
      note: "Su dung binh thuong"
    },
    {
      id: "3",
      licensePlate: "30A-22222",
      bookerName: "Le Van C",
      startDate: formatDateFromDB('2025-11-28 10:00:00'),
      endDate: formatDateFromDB('2025-11-28 14:00:00'),
      startTime: formatTimeFromDB('2025-11-28 10:00:00'),
      endTime: formatTimeFromDB('2025-11-28 14:00:00'),
      status: "DA_XAC_NHAN",
      distance: 70,
      energyConsumed: 30,
      startLocation: "Diem xuat phat C",
      endLocation: "Tram C",
      note: "Su dung binh thuong"
    }
  ];

  // DỮ LIỆU THÀNH VIÊN TỪ DATABASE - Lấy từ bảng thanh_vien_nhom
  const sampleMemberUsage: MemberUsage[] = [
    {
      memberId: "1",
      memberName: "Nguyen Van A",
      ownershipRate: 50,
      usageRate: 40,
      totalDistance: 150,
      totalEnergy: 60,
      efficiency: 0.8
    },
    {
      memberId: "2",
      memberName: "Tran Thi B",
      ownershipRate: 50,
      usageRate: 30,
      totalDistance: 120,
      totalEnergy: 50,
      efficiency: 0.6
    },
    {
      memberId: "3",
      memberName: "Le Van C",
      ownershipRate: 70,
      usageRate: 50,
      totalDistance: 200,
      totalEnergy: 85,
      efficiency: 0.71
    },
    {
      memberId: "4",
      memberName: "Pham Thi D",
      ownershipRate: 30,
      usageRate: 20,
      totalDistance: 80,
      totalEnergy: 35,
      efficiency: 0.67
    },
    {
      memberId: "5",
      memberName: "Hoang Van E",
      ownershipRate: 60,
      usageRate: 40,
      totalDistance: 160,
      totalEnergy: 65,
      efficiency: 0.67
    }
  ];

  useEffect(() => {
    setEvents(sampleHistory);
    setMemberUsageData(sampleMemberUsage);
  }, []);

  // Hàm lấy màu theo biển số xe
  const getColorByLicensePlate = (licensePlate: string) => {
    const vehicle = vehicleList.find(v => v.licensePlate === licensePlate);
    return vehicle?.textColor || "#6B7280";
  };

  // Lọc sự kiện theo xe và trạng thái
  const filteredEvents = events.filter(event => {
    if (selectedFilter !== "all" && event.licensePlate !== selectedFilter) return false;
    if (statusFilter !== "all" && event.status !== statusFilter) return false;
    return true;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusInfo = statusList.find(s => s.value === status);
    return (
      <span
        className="px-2 py-1 rounded-full text-xs font-medium"
        style={{
          backgroundColor: `${statusInfo?.color}20`,
          color: statusInfo?.color,
          border: `1px solid ${statusInfo?.color}`
        }}
      >
        {statusInfo?.label}
      </span>
    );
  };

  // Tính tổng quãng đường
  const totalDistance = events.reduce((sum, e) => sum + e.distance, 0);

  // Tính tổng năng lượng tiêu thụ
  const totalEnergy = events.reduce((sum, e) => sum + e.energyConsumed, 0);

  // Thống kê tổng quan
  const totalStats = {
    totalTrips: events.length,
    completedTrips: events.filter(e => e.status === 'DA_XAC_NHAN').length,
    pendingTrips: events.filter(e => e.status === 'CHO_XAC_NHAN').length,
    totalDistance,
    totalEnergy,
    averageDistance: events.length > 0 ? totalDistance / events.length : 0,
    averageEnergy: events.length > 0 ? totalEnergy / events.length : 0
  };

  // Hàm đánh giá hiệu quả sử dụng
  const getEfficiencyRating = (efficiency: number) => {
    if (efficiency >= 0.8) return { label: "Rất tốt", color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/20" };
    if (efficiency >= 0.6) return { label: "Tốt", color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/20" };
    if (efficiency >= 0.4) return { label: "Khá", color: "text-yellow-600", bgColor: "bg-yellow-100 dark:bg-yellow-900/20" };
    return { label: "Cần cải thiện", color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/20" };
  };

  // Component biểu đồ cột đôi
  const ComparisonBarChart = ({ data }: { data: MemberUsage[] }) => {
    const maxValue = 100;

    return (
      <div className="w-full">
        {/* Tiêu đề biểu đồ */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            SO SÁNH MỨC SỬ DỤNG VÀ TỶ LỆ SỞ HỮU
          </h4>
        </div>

        {/* Biểu đồ */}
        <div className="relative h-80 bg-gray-50 dark:bg-gray-800/20 rounded-lg p-4">
          {/* Trục Y */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500 py-4">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Grid lines */}
          <div className="absolute left-12 right-0 top-0 bottom-0 flex flex-col justify-between py-4">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="border-t border-gray-200 dark:border-gray-700"
              />
            ))}
          </div>

          <div className="ml-12 h-full flex items-end px-8" style={{ gap: '1rem' }}>
            {data.map((member) => (
              <div key={member.memberId} className="flex flex-col items-center h-full" style={{ width: 'calc(100% / 5)' }}>
                {/* Nhóm 2 cột cho mỗi thành viên */}
                <div className="flex items-end justify-center space-x-0 h-full w-full">
                  {/* Cột tỷ lệ sở hữu */}
                  <div
                    className="w-6 bg-blue-500 rounded-t transition-all duration-500 ease-out relative group hover:bg-blue-600"
                    style={{
                      height: `${member.ownershipRate}%`,
                      minHeight: '4px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg border border-gray-200 dark:border-gray-700">
                      Sở hữu: {member.ownershipRate}%
                    </div>
                  </div>

                  {/* Cột mức sử dụng */}
                  <div
                    className="w-6 bg-green-500 rounded-t transition-all duration-500 ease-out delay-200 relative group hover:bg-green-600"
                    style={{
                      height: `${member.usageRate}%`,
                      minHeight: '4px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg border border-gray-200 dark:border-gray-700">
                      Sử dụng: {member.usageRate}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trục X - Tên thành viên */}
          <div className="ml-12 border-t border-gray-400 dark:border-gray-600 mt-4 pt-3">
            <div className="flex justify-between px-8">
              {data.map((member) => (
                <div key={member.memberId} className="flex-1 text-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {member.memberName.split(' ').slice(-2).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chú thích */}
        <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Tỷ lệ sở hữu</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Mức sử dụng</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageMeta
        title="Lịch sử sử dụng xe | Hệ thống quản lý phương tiện"
        description="Trang lịch sử sử dụng xe cho hệ thống quản lý phương tiện"
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Lịch sử sử dụng xe
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Xem lịch sử các chuyến xe đã sử dụng
          </p>
        </div>

        {/* Bộ lọc */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lọc theo xe:</span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tất cả xe</option>
              {vehicleList.map((vehicle) => (
                <option key={vehicle.licensePlate} value={vehicle.licensePlate}>
                  {vehicle.licensePlate}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tất cả</option>
              {statusList.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phần chính - Chiếm 2/3 màn hình */}
          <div className="lg:col-span-2">
            {/* Lịch sử gần đây */}
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
              <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                Lịch sử sử dụng xe
              </h3>
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Không có dữ liệu phù hợp với bộ lọc
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        setSelectedEvent(event);
                        openModal();
                      }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className="text-lg font-bold"
                          style={{ color: getColorByLicensePlate(event.licensePlate) }}
                        >
                          {event.licensePlate}
                        </span>
                        {getStatusBadge(event.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Ngày bắt đầu:</span>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{event.startDate}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Ngày kết thúc:</span>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{event.endDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Thời gian:</span>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {event.startTime} - {event.endTime}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Người sử dụng:</span>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{event.bookerName}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {event.distance} km
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {event.energyConsumed} kWh
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">
                            Từ: {event.startLocation}
                          </span>
                          <br />
                          <span className="text-xs text-gray-500">
                            Đến: {event.endLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Biểu đồ so sánh mức sử dụng */}
            <div className="mt-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
              <div className="overflow-x-auto">
                <ComparisonBarChart data={memberUsageData} />
              </div>
            </div>
          </div>

          {/* Thống kê tổng quan - Chiếm 1/3 màn hình */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Thống kê tổng quan */}
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
                <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                  Thống kê tổng quan
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tổng chuyến đi:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{totalStats.totalTrips}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Đã xác nhận:</span>
                    <span className="font-semibold text-green-600">{totalStats.completedTrips}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Chờ xác nhận:</span>
                    <span className="font-semibold text-yellow-600">{totalStats.pendingTrips}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tổng quãng đường:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{totalStats.totalDistance} km</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tổng năng lượng:</span>
                    <span className="font-semibold text-blue-600">{totalStats.totalEnergy} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Trung bình/chuyến:</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      {totalStats.averageDistance.toFixed(1)} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Hiệu quả sử dụng của thành viên */}
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Hiệu quả sử dụng
                </h3>
                <div className="space-y-3">
                  {memberUsageData.map((member) => {
                    const efficiency = getEfficiencyRating(member.efficiency);
                    return (
                      <div key={member.memberId} className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {member.memberName.split(' ').slice(-2).join(' ')}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${efficiency.bgColor} ${efficiency.color}`}>
                              {efficiency.label}
                            </span>
                            <span className="text-xs text-gray-500">
                              {member.efficiency.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {member.totalDistance} km
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend - Chú thích */}
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Trạng thái đặt xe
                </h3>
                <div className="space-y-3">
                  {statusList.map((status) => (
                    <div key={status.value} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: status.color,
                          border: `1px solid ${status.color}80`
                        }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{status.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal chi tiết lịch sử */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[500px] p-6"
      >
        {selectedEvent && (
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                Chi tiết lịch sử sử dụng xe
              </h5>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span
                  className="text-lg font-bold"
                  style={{ color: getColorByLicensePlate(selectedEvent.licensePlate) }}
                >
                  {selectedEvent.licensePlate}
                </span>
                {getStatusBadge(selectedEvent.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Người sử dụng
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.bookerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Ngày bắt đầu
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.startDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Ngày kết thúc
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.endDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Thời gian
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Quãng đường
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.distance} km</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Năng lượng tiêu thụ
                  </label>
                  <p className="text-sm font-semibold text-blue-600">{selectedEvent.energyConsumed} kWh</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  Điểm xuất phát
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.startLocation}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  Điểm đến
                </label>
                <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.endLocation}</p>
              </div>

              {selectedEvent.note && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Ghi chú
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.note}</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default HistoryCalendar;