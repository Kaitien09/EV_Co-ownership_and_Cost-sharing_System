import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";

interface HistoryEvent extends EventInput {
  extendedProps: {
    bookerName: string;
    licensePlate: string;
    startTime: string;
    endTime: string;
    textColor: string;
    status: string;
    distance: number;
    cost: number;
  };
}

const HistoryCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(
    null
  );
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<HistoryEvent[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  // Danh sách xe với màu chữ riêng
  const vehicleList = [
    { licensePlate: "29A-12345", textColor: "#FF6B6B" },
    { licensePlate: "29A-67890", textColor: "#4ECDC4" },
    { licensePlate: "29A-54321", textColor: "#FFD93D" },
    { licensePlate: "29A-98765", textColor: "#6BCF7F" },
    { licensePlate: "29A-11111", textColor: "#FF8B94" },
    { licensePlate: "29A-22222", textColor: "#95E1D3" },
  ];

  const statusList = [
    { value: "completed", label: "Đã hoàn thành", color: "#10B981" },
    { value: "cancelled", label: "Đã hủy", color: "#EF4444" },
    { value: "in_progress", label: "Đang sử dụng", color: "#3B82F6" },
  ];

  const vehicleTextColorMap: { [key: string]: string } = {
    "29A-12345": "#FF6B6B",
    "29A-67890": "#4ECDC4",
    "29A-54321": "#FFD93D",
    "29A-98765": "#6BCF7F",
    "29A-11111": "#FF8B94",
    "29A-22222": "#95E1D3"
  };

  useEffect(() => {
    // Dữ liệu lịch sử mẫu
    const sampleHistory = [
      {
        id: "1",
        title: "29A-12345 - 150km",
        start: new Date(Date.now() - 86400000 * 7).toISOString().split("T")[0] + "T08:00:00",
        end: new Date(Date.now() - 86400000 * 7).toISOString().split("T")[0] + "T17:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-12345"],
        extendedProps: {
          bookerName: "Văn A",
          licensePlate: "29A-12345",
          startTime: "08:00",
          endTime: "17:00",
          textColor: "#FF6B6B",
          status: "completed",
          distance: 150,
          cost: 450000
        },
      },
      {
        id: "2",
        title: "29A-67890 - 75km",
        start: new Date(Date.now() - 86400000 * 5).toISOString().split("T")[0] + "T09:00:00",
        end: new Date(Date.now() - 86400000 * 5).toISOString().split("T")[0] + "T16:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-67890"],
        extendedProps: {
          bookerName: "Trần B",
          licensePlate: "29A-67890",
          startTime: "09:00",
          endTime: "16:00",
          textColor: "#4ECDC4",
          status: "completed",
          distance: 75,
          cost: 225000
        },
      },
      {
        id: "3",
        title: "29A-54321 - 200km",
        start: new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0] + "T07:00:00",
        end: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0] + "T18:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-54321"],
        extendedProps: {
          bookerName: "Văn C",
          licensePlate: "29A-54321",
          startTime: "07:00",
          endTime: "18:00",
          textColor: "#FFD93D",
          status: "cancelled",
          distance: 200,
          cost: 600000
        },
      },
      {
        id: "4",
        title: "29A-11111 - 50km",
        start: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0] + "T14:00:00",
        end: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0] + "T18:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-11111"],
        extendedProps: {
          bookerName: "Nguyễn D",
          licensePlate: "29A-11111",
          startTime: "14:00",
          endTime: "18:00",
          textColor: "#FF8B94",
          status: "completed",
          distance: 50,
          cost: 150000
        },
      },
      {
        id: "5",
        title: "29A-22222 - 120km",
        start: new Date().toISOString().split("T")[0] + "T10:00:00",
        end: new Date().toISOString().split("T")[0] + "T20:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-22222"],
        extendedProps: {
          bookerName: "Lê E",
          licensePlate: "29A-22222",
          startTime: "10:00",
          endTime: "20:00",
          textColor: "#95E1D3",
          status: "in_progress",
          distance: 120,
          cost: 360000
        },
      },
    ];
    setEvents(sampleHistory);
    setFilteredEvents(sampleHistory);
  }, []);

  // Lọc sự kiện theo xe và trạng thái
  useEffect(() => {
    let filtered = events;

    if (selectedFilter !== "all") {
      filtered = filtered.filter(event =>
        event.extendedProps.licensePlate === selectedFilter
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(event =>
        event.extendedProps.status === statusFilter
      );
    }

    setFilteredEvents(filtered);
  }, [selectedFilter, statusFilter, events]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as HistoryEvent);
    openModal();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

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

  // Thống kê tổng quan
  const totalStats = {
    totalTrips: events.length,
    completedTrips: events.filter(e => e.extendedProps.status === 'completed').length,
    totalDistance: events.reduce((sum, e) => sum + e.extendedProps.distance, 0),
    totalCost: events.reduce((sum, e) => sum + e.extendedProps.cost, 0),
  };

  return (
    <>
      <PageMeta
        title="Lịch sử sử dụng xe | Hệ thống quản lý phương tiện"
        description="Trang lịch sử sử dụng xe cho hệ thống quản lý phương tiện"
      />

      <div className="flex gap-4">
        {/* Calendar - Chiếm 3/4 màn hình */}
        <div className="w-3/4">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
            {/* Bộ lọc */}
            <div className="mb-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lọc theo xe:</span>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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

            <div className="custom-calendar">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridDay",
                }}
                events={filteredEvents}
                selectable={false}
                eventClick={handleEventClick}
                height="600px"
                fixedWeekCount={true}
                showNonCurrentDates={true}
                dayMaxEvents={4}
                eventContent={(eventInfo) => (
                  <div
                    className="fc-event-main fc-event-main-frame p-1 rounded"
                    style={{
                      color: eventInfo.event.textColor,
                      fontWeight: '600',
                      fontSize: '0.75rem'
                    }}
                  >
                    <div className="fc-event-title fc-sticky">
                      {eventInfo.event.title}
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Legend - Chú thích */}
            <div className="mt-4 flex flex-wrap gap-6 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Xe:</span>
                {vehicleList.map((vehicle) => (
                  <div key={vehicle.licensePlate} className="flex items-center gap-1">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: vehicle.textColor }}
                    >
                      {vehicle.licensePlate}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái:</span>
                {statusList.map((status) => (
                  <div key={status.value} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{status.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thống kê và chi tiết - Chiếm 1/4 màn hình */}
        <div className="w-1/4">
          <div className="space-y-4">
            {/* Thống kê tổng quan */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Thống kê tổng quan
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tổng chuyến đi:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{totalStats.totalTrips}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Đã hoàn thành:</span>
                  <span className="font-semibold text-green-600">{totalStats.completedTrips}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tổng quãng đường:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{totalStats.totalDistance}km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tổng chi phí:</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(totalStats.totalCost)}</span>
                </div>
              </div>
            </div>

            {/* Lịch sử gần đây */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Lịch sử gần đây
              </h3>
              <div className="space-y-3">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className="font-semibold text-sm"
                        style={{ color: event.extendedProps.textColor }}
                      >
                        {event.extendedProps.licensePlate}
                      </span>
                      {getStatusBadge(event.extendedProps.status)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {formatDate(event.start as string)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      ⏰ {event.extendedProps.startTime} - {event.extendedProps.endTime}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      👤 {event.extendedProps.bookerName}
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="text-gray-600 dark:text-gray-400">{event.extendedProps.distance}km</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(event.extendedProps.cost)}</span>
                    </div>
                  </div>
                ))}
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
                Chi tiết lịch sử
              </h5>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span
                  className="text-lg font-bold"
                  style={{ color: selectedEvent.extendedProps.textColor }}
                >
                  {selectedEvent.extendedProps.licensePlate}
                </span>
                {getStatusBadge(selectedEvent.extendedProps.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Người đặt
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.extendedProps.bookerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Ngày sử dụng
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{formatDate(selectedEvent.start as string)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Thời gian bắt đầu
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.extendedProps.startTime}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Thời gian kết thúc
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.extendedProps.endTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Quãng đường
                  </label>
                  <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.extendedProps.distance} km</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Chi phí
                  </label>
                  <p className="text-sm font-semibold text-blue-600">{formatCurrency(selectedEvent.extendedProps.cost)}</p>
                </div>
              </div>
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