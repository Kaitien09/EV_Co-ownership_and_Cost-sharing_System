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
  cost: number;
  additionalCosts?: AdditionalCost[];
}

interface AdditionalCost {
  id: string;
  description: string;
  amount: number;
  type: 'phat_sinh' | 'khac';
}

interface MemberUsage {
  memberId: string;
  memberName: string;
  ownershipRate: number;
  usageRate: number;
  totalDistance: number;
  totalCost: number;
  efficiency: number;
}

const HistoryCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null);
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [memberUsageData, setMemberUsageData] = useState<MemberUsage[]>([]);
  const { isOpen, openModal, closeModal } = useModal();

  // Danh sách xe với màu riêng
  const vehicleList = [
    { licensePlate: "29A-12345", textColor: "#FF6B6B", ownershipRate: 35 },
    { licensePlate: "29A-67890", textColor: "#4ECDC4", ownershipRate: 25 },
    { licensePlate: "29A-54321", textColor: "#FFD93D", ownershipRate: 15 },
    { licensePlate: "29A-98765", textColor: "#6BCF7F", ownershipRate: 10 },
    { licensePlate: "29A-11111", textColor: "#FF8B94", ownershipRate: 8 },
    { licensePlate: "29A-22222", textColor: "#95E1D3", ownershipRate: 7 },
  ];

  const statusList = [
    { value: "completed", label: "Đã hoàn thành", color: "#10B981" },
    { value: "cancelled", label: "Đã hủy", color: "#EF4444" },
    { value: "in_progress", label: "Đang sử dụng", color: "#3B82F6" },
  ];

  // DỮ LIỆU MẪU - CHỈ LỊCH SỬ ĐÃ ĐẶT
  const sampleHistory: HistoryEvent[] = [
    {
      id: "1",
      licensePlate: "29A-12345",
      bookerName: "Văn A",
      startDate: "19/11/2025",
      endDate: "19/11/2025",
      startTime: "08:00",
      endTime: "17:00",
      status: "completed",
      distance: 150,
      cost: 450000,
      additionalCosts: [
        { id: "1-1", description: "Phí vệ sinh", amount: 50000, type: 'phat_sinh' },
        { id: "1-2", description: "Phí phụ thu", amount: 30000, type: 'phat_sinh' }
      ]
    },
    {
      id: "2",
      licensePlate: "29A-67890",
      bookerName: "Trần B",
      startDate: "21/11/2025",
      endDate: "21/11/2025",
      startTime: "09:00",
      endTime: "16:00",
      status: "completed",
      distance: 75,
      cost: 225000,
      additionalCosts: [
        { id: "2-1", description: "Phí trễ giờ", amount: 100000, type: 'phat_sinh' }
      ]
    },
    {
      id: "3",
      licensePlate: "29A-54321",
      bookerName: "Văn C",
      startDate: "23/11/2025",
      endDate: "23/11/2025",
      startTime: "07:00",
      endTime: "18:00",
      status: "cancelled",
      distance: 200,
      cost: 600000
    },
    {
      id: "4",
      licensePlate: "29A-22222",
      bookerName: "Lê E",
      startDate: "25/11/2025",
      endDate: "25/11/2025",
      startTime: "10:00",
      endTime: "20:00",
      status: "in_progress",
      distance: 120,
      cost: 360000,
      additionalCosts: [
        { id: "4-1", description: "Phí cầu đường", amount: 75000, type: 'phat_sinh' }
      ]
    },
    {
      id: "5",
      licensePlate: "29A-11111",
      bookerName: "Nguyễn D",
      startDate: "27/11/2025",
      endDate: "27/11/2025",
      startTime: "14:00",
      endTime: "18:00",
      status: "completed",
      distance: 50,
      cost: 150000
    },
  ];

  // DỮ LIỆU MẪU CHO THÀNH VIÊN
  const sampleMemberUsage: MemberUsage[] = [
    {
      memberId: "1",
      memberName: "Nguyễn Văn A",
      ownershipRate: 25,
      usageRate: 30,
      totalDistance: 450,
      totalCost: 1350000,
      efficiency: 1.2
    },
    {
      memberId: "2",
      memberName: "Trần Thị B",
      ownershipRate: 20,
      usageRate: 15,
      totalDistance: 225,
      totalCost: 675000,
      efficiency: 0.75
    },
    {
      memberId: "3",
      memberName: "Lê Văn C",
      ownershipRate: 15,
      usageRate: 25,
      totalDistance: 375,
      totalCost: 1125000,
      efficiency: 1.67
    },
    {
      memberId: "4",
      memberName: "Phạm Thị D",
      ownershipRate: 12,
      usageRate: 10,
      totalDistance: 150,
      totalCost: 450000,
      efficiency: 0.83
    },
    {
      memberId: "5",
      memberName: "Hoàng Văn E",
      ownershipRate: 10,
      usageRate: 8,
      totalDistance: 120,
      totalCost: 360000,
      efficiency: 0.8
    },
    {
      memberId: "6",
      memberName: "Vũ Thị F",
      ownershipRate: 8,
      usageRate: 7,
      totalDistance: 105,
      totalCost: 315000,
      efficiency: 0.88
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

  // Tính tổng chi phí phát sinh
  const totalAdditionalCosts = events.reduce((sum, event) => {
    const eventAdditionalCosts = event.additionalCosts?.reduce((eventSum, cost) => eventSum + cost.amount, 0) || 0;
    return sum + eventAdditionalCosts;
  }, 0);

  // Tính tổng doanh thu (chi phí gốc + phát sinh)
  const totalRevenue = events.reduce((sum, event) => {
    const eventAdditionalCosts = event.additionalCosts?.reduce((eventSum, cost) => eventSum + cost.amount, 0) || 0;
    return sum + event.cost + eventAdditionalCosts;
  }, 0);

  // Tính tổng quãng đường
  const totalDistance = events.reduce((sum, e) => sum + e.distance, 0);

  // Thống kê tổng quan
  const totalStats = {
    totalTrips: events.length,
    completedTrips: events.filter(e => e.status === 'completed').length,
    totalDistance,
    totalCost: events.reduce((sum, e) => sum + e.cost, 0),
    totalAdditionalCosts,
    totalRevenue
  };

  // Hàm đánh giá hiệu quả sử dụng
  const getEfficiencyRating = (efficiency: number) => {
    if (efficiency >= 1.2) return { label: "Rất tốt", color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/20" };
    if (efficiency >= 0.8) return { label: "Tốt", color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/20" };
    if (efficiency >= 0.5) return { label: "Khá", color: "text-yellow-600", bgColor: "bg-yellow-100 dark:bg-yellow-900/20" };
    return { label: "Cần cải thiện", color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/20" };
  };

// Component biểu đồ cột đôi giống hình
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
            <div key={member.memberId} className="flex flex-col items-center h-full" style={{ width: 'calc(100% / 6)' }}>
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
        title="Lịch sử đặt xe | Hệ thống quản lý phương tiện"
        description="Trang lịch sử đặt xe cho hệ thống quản lý phương tiện"
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Lịch sử đặt xe
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Xem lịch sử các chuyến xe đã đặt
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
                Lịch sử đặt xe
              </h3>
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Không có dữ liệu phù hợp với bộ lọc
                  </div>
                ) : (
                  filteredEvents.map((event) => {
                    const totalEventCost = event.cost + (event.additionalCosts?.reduce((sum, cost) => sum + cost.amount, 0) || 0);

                    return (
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
                            <span className="text-sm text-gray-500 dark:text-gray-400">Người đặt:</span>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{event.bookerName}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">
                              {event.distance} km
                            </span>
                            {event.additionalCosts && event.additionalCosts.length > 0 && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                +{event.additionalCosts.length} phí phát sinh
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-blue-600 block">
                              {formatCurrency(totalEventCost)}
                            </span>
                            {event.additionalCosts && event.additionalCosts.length > 0 && (
                              <span className="text-xs text-gray-500">
                                (cơ bản: {formatCurrency(event.cost)})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">Đã hoàn thành:</span>
                    <span className="font-semibold text-green-600">{totalStats.completedTrips}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tổng quãng đường:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{totalStats.totalDistance} km</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Chi phí cơ bản:</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(totalStats.totalCost)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Chi phí phát sinh:</span>
                    <span className="font-semibold text-orange-600">{formatCurrency(totalStats.totalAdditionalCosts)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tổng doanh thu:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(totalStats.totalRevenue)}</span>
                  </div>
                </div>
              </div>

              {/* Legend - Chú thích */}
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Trạng thái xe
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
                Chi tiết lịch sử đặt xe
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
                    Người đặt
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
                    Chi phí cơ bản
                  </label>
                  <p className="text-sm font-semibold text-blue-600">{formatCurrency(selectedEvent.cost)}</p>
                </div>
              </div>

              {/* Chi phí phát sinh */}
              {selectedEvent.additionalCosts && selectedEvent.additionalCosts.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                    Chi phí phát sinh
                  </label>
                  <div className="space-y-2">
                    {selectedEvent.additionalCosts.map((cost) => (
                      <div key={cost.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{cost.description}</span>
                        <span className="font-semibold text-orange-600">+{formatCurrency(cost.amount)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Tổng cộng:</span>
                    <span className="text-sm font-bold text-green-600">
                      {formatCurrency(selectedEvent.cost + selectedEvent.additionalCosts.reduce((sum, cost) => sum + cost.amount, 0))}
                    </span>
                  </div>
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