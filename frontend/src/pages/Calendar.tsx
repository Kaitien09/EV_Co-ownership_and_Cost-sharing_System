import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";

// Import trực tiếp từ các file service - chỉ import các service public
import { datLichService, DatLich } from "../services/datLichService";
import { xeDienService, XeDien } from "../services/xeDienService";

interface CalendarEvent extends EventInput {
  extendedProps: {
    bookerName: string;
    licensePlate: string;
    startTime: string;
    endTime: string;
    textColor: string;
    xeId?: number;
    chuXeId?: number;
    ghiChu?: string;
    trangThai?: string;
  };
}

interface Vehicle {
  id: number;
  licensePlate: string;
  textColor: string;
  tenXe?: string;
  mauSac?: string;
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [ghiChu, setGhiChu] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [bookingError, setBookingError] = useState<string>("");
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  // Giả sử user hiện tại là Nguyễn Văn A (chu_xe_id = 1)
  const currentUser = {
    id: 1,
    name: "Nguyễn Văn A"
  };

  // Màu sắc cho các xe
  const colorPalette = [
    "#FF6B6B", "#4ECDC4", "#FFD93D", "#6BCF7F", "#FF8B94", "#95E1D3",
    "#A78BFA", "#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA"
  ];

  // Dữ liệu đặt lịch mẫu
  const sampleEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "30A-11111",
      start: "2025-11-26T08:00:00",
      end: "2025-11-26T12:00:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#FF6B6B",
      extendedProps: {
        bookerName: "Nguyễn Văn A",
        licensePlate: "30A-11111",
        startTime: "08:00",
        endTime: "12:00",
        textColor: "#FF6B6B",
        xeId: 1,
        chuXeId: 1,
        ghiChu: "Đi công tác",
        trangThai: "DA_XAC_NHAN"
      },
    },
    {
      id: "2",
      title: "30A-11111",
      start: "2025-11-27T09:00:00",
      end: "2025-11-27T13:00:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#FF6B6B",
      extendedProps: {
        bookerName: "Trần Thị B",
        licensePlate: "30A-11111",
        startTime: "09:00",
        endTime: "13:00",
        textColor: "#FF6B6B",
        xeId: 1,
        chuXeId: 2,
        ghiChu: "Đi du lịch",
        trangThai: "CHO_XAC_NHAN"
      },
    },
    {
      id: "3",
      title: "30A-22222",
      start: "2025-11-28T10:00:00",
      end: "2025-11-28T14:00:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#4ECDC4",
      extendedProps: {
        bookerName: "Lê Văn C",
        licensePlate: "30A-22222",
        startTime: "10:00",
        endTime: "14:00",
        textColor: "#4ECDC4",
        xeId: 2,
        chuXeId: 3,
        ghiChu: "Đón khách",
        trangThai: "DA_XAC_NHAN"
      },
    },
    {
      id: "4",
      title: "30A-33333",
      start: "2025-11-29T07:00:00",
      end: "2025-11-29T11:00:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#FFD93D",
      extendedProps: {
        bookerName: "Phạm Thị D",
        licensePlate: "30A-33333",
        startTime: "07:00",
        endTime: "11:00",
        textColor: "#FFD93D",
        xeId: 3,
        chuXeId: 4,
        ghiChu: "Chở hàng",
        trangThai: "DA_XAC_NHAN"
      },
    },
    {
      id: "5",
      title: "30A-44444",
      start: "2025-11-30T14:00:00",
      end: "2025-11-30T18:00:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#6BCF7F",
      extendedProps: {
        bookerName: "Hoàng Văn E",
        licensePlate: "30A-44444",
        startTime: "14:00",
        endTime: "18:00",
        textColor: "#6BCF7F",
        xeId: 4,
        chuXeId: 5,
        ghiChu: "Đi tiệc",
        trangThai: "DA_XAC_NHAN"
      },
    },
    {
      id: "6",
      title: "30A-55555",
      start: "2025-12-01T08:30:00",
      end: "2025-12-01T16:30:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#FF8B94",
      extendedProps: {
        bookerName: "Võ Thị F",
        licensePlate: "30A-55555",
        startTime: "08:30",
        endTime: "16:30",
        textColor: "#FF8B94",
        xeId: 5,
        chuXeId: 6,
        ghiChu: "Cả ngày",
        trangThai: "CHO_XAC_NHAN"
      },
    },
    {
      id: "7",
      title: "30A-11111",
      start: "2025-12-02T13:00:00",
      end: "2025-12-02T17:00:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#FF6B6B",
      extendedProps: {
        bookerName: "Đặng Văn G",
        licensePlate: "30A-11111",
        startTime: "13:00",
        endTime: "17:00",
        textColor: "#FF6B6B",
        xeId: 1,
        chuXeId: 7,
        ghiChu: "Họp công ty",
        trangThai: "DA_XAC_NHAN"
      },
    },
    {
      id: "8",
      title: "30A-22222",
      start: "2025-12-03T09:00:00",
      end: "2025-12-03T15:00:00",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#4ECDC4",
      extendedProps: {
        bookerName: "Bùi Thị H",
        licensePlate: "30A-22222",
        startTime: "09:00",
        endTime: "15:00",
        textColor: "#4ECDC4",
        xeId: 2,
        chuXeId: 8,
        ghiChu: "Dã ngoại",
        trangThai: "DA_HUY"
      },
    }
  ];

  // Hàm lấy tên chủ xe theo ID
  const getChuXeName = (chuXeId?: number): string => {
    switch(chuXeId) {
      case 1: return "Nguyễn Văn A";
      case 2: return "Trần Thị B";
      case 3: return "Lê Văn C";
      case 4: return "Phạm Thị D";
      case 5: return "Hoàng Văn E";
      case 6: return "Võ Thị F";
      case 7: return "Đặng Văn G";
      case 8: return "Bùi Thị H";
      default: return `Chủ xe ${chuXeId}`;
    }
  };

  // Load dữ liệu từ API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      // Load danh sách xe điện
      console.log('🔄 Đang tải danh sách xe điện...');
      const xeList = await xeDienService.getAllXeDien();
      const vehicles: Vehicle[] = xeList.map((xe, index) => ({
        id: xe.id,
        licensePlate: xe.bienSo,
        textColor: colorPalette[index % colorPalette.length],
        tenXe: xe.tenXe,
        mauSac: xe.mauSac
      }));
      setVehicleList(vehicles);
      console.log('✅ Danh sách xe:', vehicles);

      // Kết hợp dữ liệu từ API và dữ liệu mẫu
      let combinedEvents: CalendarEvent[] = [...sampleEvents];

      try {
        // Thử load đặt lịch từ API, nếu có thì thêm vào
        const datLichList = await datLichService.getAllDatLich();
        console.log('✅ Danh sách đặt lịch từ API:', datLichList);

        const apiEvents: CalendarEvent[] = datLichList.map((datLich) => {
          const vehicle = vehicles.find(v => v.id === datLich.xeId);
          const chuXeName = getChuXeName(datLich.chuXeId);

          return {
            id: datLich.id?.toString(),
            title: vehicle?.licensePlate || `Xe ${datLich.xeId}`,
            start: datLich.thoiGianBatDau,
            end: datLich.thoiGianKetThuc,
            backgroundColor: "transparent",
            borderColor: "transparent",
            textColor: vehicle?.textColor || "#666666",
            extendedProps: {
              bookerName: chuXeName,
              licensePlate: vehicle?.licensePlate || `Xe ${datLich.xeId}`,
              startTime: new Date(datLich.thoiGianBatDau).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              }),
              endTime: new Date(datLich.thoiGianKetThuc).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              }),
              textColor: vehicle?.textColor || "#666666",
              xeId: datLich.xeId,
              chuXeId: datLich.chuXeId,
              ghiChu: datLich.ghiChu,
              trangThai: datLich.trangThai
            },
          };
        });

        combinedEvents = [...combinedEvents, ...apiEvents];
      } catch (apiError) {
        console.log('⚠️ Không thể lấy đặt lịch từ API, sử dụng dữ liệu mẫu');
      }

      setEvents(combinedEvents);
      setFilteredEvents(combinedEvents);

    } catch (err) {
      console.error('❌ Lỗi khi tải dữ liệu:', err);
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  // Lọc sự kiện theo xe
  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event =>
        event.extendedProps.licensePlate === selectedFilter
      ));
    }
  }, [selectedFilter, events]);

  // Chỉ hiển thị lịch của Nguyễn Văn A trong phần "Lịch của tôi"
  const myEvents = events
    .filter(event => event.extendedProps.chuXeId === currentUser.id)
    .slice(0, 8);

  // Hàm kiểm tra trùng lịch cục bộ
  const checkTrungLich = (xeId: number, startDateTime: string, endDateTime: string, excludeEventId?: string): boolean => {
    const newStart = new Date(startDateTime);
    const newEnd = new Date(endDateTime);

    return events.some(event => {
      // Bỏ qua sự kiện hiện tại khi chỉnh sửa
      if (excludeEventId && event.id === excludeEventId) return false;

      // Chỉ kiểm tra các sự kiện cùng xe và không bị hủy
      if (event.extendedProps.xeId !== xeId) return false;
      if (event.extendedProps.trangThai === 'DA_HUY') return false;

      const eventStart = new Date(event.start as string);
      const eventEnd = new Date(event.end as string);

      // Kiểm tra xem có sự chồng lấn thời gian không
      const hasOverlap = (
        (newStart >= eventStart && newStart < eventEnd) ||
        (newEnd > eventStart && newEnd <= eventEnd) ||
        (newStart <= eventStart && newEnd >= eventEnd)
      );

      return hasOverlap;
    });
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    const startStr = selectInfo.startStr;
    const endStr = selectInfo.endStr || selectInfo.startStr;

    setStartDate(startStr.split('T')[0]);
    setEndDate(endStr.split('T')[0]);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setSelectedVehicle(event.extendedProps.licensePlate || "");
    setStartDate(event.start?.toISOString().split("T")[0] || "");
    setEndDate(event.end?.toISOString().split("T")[0] || "");
    setStartTime(event.extendedProps.startTime || "08:00");
    setEndTime(event.extendedProps.endTime || "17:00");
    setGhiChu(event.extendedProps.ghiChu || "");
    setBookingError("");
    openModal();
  };

  const handleAddOrUpdateBooking = () => {
    if (!selectedVehicle || !startDate) {
      setBookingError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Tìm xe được chọn
    const selectedVehicleObj = vehicleList.find(v => v.licensePlate === selectedVehicle);
    if (!selectedVehicleObj) {
      setBookingError("Không tìm thấy thông tin xe");
      return;
    }

    // Tạo datetime string từ date và time
    const startDateTime = `${startDate}T${startTime}:00`;
    const endDateTime = endDate ? `${endDate}T${endTime}:00` : `${startDate}T${endTime}:00`;

    // Kiểm tra nếu ngày kết thúc trước ngày bắt đầu
    if (endDate && new Date(endDateTime) <= new Date(startDateTime)) {
      setBookingError("Thời gian kết thúc phải sau thời gian bắt đầu");
      return;
    }

    // Kiểm tra trùng lịch cục bộ
    const isTrungLich = checkTrungLich(
      selectedVehicleObj.id,
      startDateTime,
      endDateTime,
      selectedEvent?.id
    );

    if (isTrungLich) {
      setBookingError(`Xe ${selectedVehicle} đã được đặt trong khoảng thời gian này. Vui lòng chọn thời gian khác.`);
      return;
    }

    if (selectedEvent) {
      // Cập nhật đặt lịch cục bộ
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: selectedVehicle,
                start: startDateTime,
                end: endDateTime,
                textColor: selectedVehicleObj.textColor,
                extendedProps: {
                  ...event.extendedProps,
                  licensePlate: selectedVehicle,
                  startTime: startTime,
                  endTime: endTime,
                  textColor: selectedVehicleObj.textColor,
                  xeId: selectedVehicleObj.id,
                  ghiChu: ghiChu,
                  trangThai: "DA_XAC_NHAN"
                },
              }
            : event
        )
      );
    } else {
      // Tạo đặt lịch mới cục bộ - mặc định là Nguyễn Văn A
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: selectedVehicle,
        start: startDateTime,
        end: endDateTime,
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: selectedVehicleObj.textColor,
        extendedProps: {
          bookerName: currentUser.name,
          licensePlate: selectedVehicle,
          startTime: startTime,
          endTime: endTime,
          textColor: selectedVehicleObj.textColor,
          xeId: selectedVehicleObj.id,
          chuXeId: currentUser.id,
          ghiChu: ghiChu || `Đặt lịch bởi ${currentUser.name}`,
          trangThai: "CHO_XAC_NHAN"
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    closeModal();
    resetModalFields();
  };

  const handleDeleteBooking = () => {
    if (!selectedEvent) return;

    // Hủy lịch cục bộ (đánh dấu là đã hủy thay vì xóa)
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              backgroundColor: "#f8d7da",
              borderColor: "#f5c6cb",
              extendedProps: {
                ...event.extendedProps,
                trangThai: "DA_HUY"
              },
            }
          : event
      )
    );

    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setSelectedVehicle("");
    setStartDate("");
    setEndDate("");
    setStartTime("08:00");
    setEndTime("17:00");
    setGhiChu("");
    setSelectedEvent(null);
    setBookingError("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (trangThai?: string) => {
    switch(trangThai) {
      case 'DA_XAC_NHAN':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Đã xác nhận</span>;
      case 'CHO_XAC_NHAN':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Chờ xác nhận</span>;
      case 'DA_HUY':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Đã hủy</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Chưa xác định</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">⏳ Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-lg">❌ {error}</div>
        <button
          onClick={loadData}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Quản lý đặt lịch xe | Hệ thống quản lý phương tiện"
        description="Trang quản lý lịch đặt xe cho hệ thống quản lý phương tiện"
      />

      <div className="flex gap-4">
        {/* Calendar - Chiếm 3/4 màn hình */}
        <div className="w-3/4">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
            {/* Bộ lọc */}
            <div className="mb-4 flex items-center gap-4">
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

              {/* Nút làm mới dữ liệu */}
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                🔄 Làm mới
              </button>
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
                selectable={true}
                select={handleDateSelect}
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
                      fontSize: '0.75rem',
                      backgroundColor: eventInfo.event.backgroundColor || 'transparent',
                      border: `1px solid ${eventInfo.event.borderColor || 'transparent'}`
                    }}
                  >
                    <div className="fc-event-title fc-sticky">
                      {eventInfo.event.title}
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Legend - Chú thích màu xe */}
            <div className="mt-4 flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Chú thích:</div>
              {vehicleList.map((vehicle) => (
                <div key={vehicle.licensePlate} className="flex items-center gap-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: vehicle.textColor }}
                  >
                    {vehicle.licensePlate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Danh sách lịch của tôi - Chiếm 1/4 màn hình */}
        <div className="w-1/4">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Lịch của tôi
            </h3>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">👤 {currentUser.name}</p>
            </div>
            <div className="space-y-3">
              {myEvents.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  Bạn chưa có lịch đặt xe
                </p>
              ) : (
                myEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-lg border p-3 shadow-sm hover:shadow-md transition-shadow ${
                      event.extendedProps.trangThai === 'DA_HUY'
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 bg-white'
                    } dark:border-gray-700 dark:bg-gray-800`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className="font-semibold text-sm"
                        style={{ color: event.extendedProps.textColor }}
                      >
                        {event.extendedProps.licensePlate}
                      </span>
                      {getStatusBadge(event.extendedProps.trangThai)}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(event.start as string)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      ⏰ {event.extendedProps.startTime} - {event.extendedProps.endTime}
                    </div>
                    {event.extendedProps.ghiChu && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        📝 {event.extendedProps.ghiChu}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nút đặt lịch tròn */}
      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 w-16 h-16 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        title="Đặt lịch xe"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[500px] p-6"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedEvent ? "Xem lịch đặt xe" : "Đặt lịch xe mới"}
            </h5>
            {selectedEvent && selectedEvent.extendedProps.trangThai && (
              <div className="mb-2">
                {getStatusBadge(selectedEvent.extendedProps.trangThai)}
              </div>
            )}
            {!selectedEvent && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Người đặt:</strong> {currentUser.name}
                </p>
              </div>
            )}
          </div>

          {/* Hiển thị lỗi đặt lịch */}
          {bookingError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              ⚠️ {bookingError}
            </div>
          )}

          <div className="mt-4 space-y-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Chọn xe *
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="">Chọn biển số xe</option>
                {vehicleList.map((vehicle) => (
                  <option key={vehicle.licensePlate} value={vehicle.licensePlate}>
                    {vehicle.licensePlate} {vehicle.tenXe && `- ${vehicle.tenXe}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Ngày đi *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Ngày về
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Giờ đi
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Giờ về
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Ghi chú
              </label>
              <textarea
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                rows={3}
                className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                placeholder="Nhập ghi chú (nếu có)"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            {selectedEvent && selectedEvent.extendedProps.trangThai !== 'DA_HUY' && (
              <button
                onClick={handleDeleteBooking}
                type="button"
                className="flex w-full justify-center rounded-lg border border-red-300 bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 sm:w-auto"
              >
                Hủy lịch
              </button>
            )}

            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Đóng
            </button>

            {/* Chỉ hiển thị nút "Đặt lịch" khi không có selectedEvent (đặt lịch mới) */}
            {!selectedEvent && (
              <button
                onClick={handleAddOrUpdateBooking}
                type="button"
                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                Đặt lịch
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Calendar;