import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";

interface CalendarEvent extends EventInput {
  extendedProps: {
    bookerName: string;
    licensePlate: string;
    startTime: string;
    endTime: string;
    textColor: string;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [bookerName, setBookerName] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  // Giả sử user hiện tại là "Văn A"
  const currentUser = "Văn A";

  // Danh sách xe với màu chữ riêng
  const vehicleList = [
    { licensePlate: "29A-12345", textColor: "#FF6B6B" }, // Đỏ cam
    { licensePlate: "29A-67890", textColor: "#4ECDC4" }, // Xanh ngọc
    { licensePlate: "29A-54321", textColor: "#FFD93D" }, // Vàng
    { licensePlate: "29A-98765", textColor: "#6BCF7F" }, // Xanh lá
    { licensePlate: "29A-11111", textColor: "#FF8B94" }, // Hồng
    { licensePlate: "29A-22222", textColor: "#95E1D3" }, // Xanh pastel
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
    const sampleEvents = [
      {
        id: "1",
        title: "29A-12345",
        start: new Date().toISOString().split("T")[0] + "T08:00:00",
        end: new Date().toISOString().split("T")[0] + "T17:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-12345"],
        extendedProps: {
          bookerName: "Văn A",
          licensePlate: "29A-12345",
          startTime: "08:00",
          endTime: "17:00",
          textColor: "#FF6B6B"
        },
      },
      {
        id: "2",
        title: "29A-67890",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T09:00:00",
        end: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T16:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-67890"],
        extendedProps: {
          bookerName: "Trần B",
          licensePlate: "29A-67890",
          startTime: "09:00",
          endTime: "16:00",
          textColor: "#4ECDC4"
        },
      },
      {
        id: "3",
        title: "29A-54321",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0] + "T07:00:00",
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0] + "T18:00:00",
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap["29A-54321"],
        extendedProps: {
          bookerName: "Văn C",
          licensePlate: "29A-54321",
          startTime: "07:00",
          endTime: "18:00",
          textColor: "#FFD93D"
        },
      },
    ];
    setEvents(sampleEvents);
    setFilteredEvents(sampleEvents);
  }, []);

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

  const myEvents = events
    .filter(event => event.extendedProps.bookerName === currentUser)
    .slice(0, 5);

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
    setBookerName(event.extendedProps.bookerName || "");
    setSelectedVehicle(event.extendedProps.licensePlate || "");
    setStartDate(event.start?.toISOString().split("T")[0] || "");
    setEndDate(event.end?.toISOString().split("T")[0] || "");
    setStartTime(event.extendedProps.startTime || "08:00");
    setEndTime(event.extendedProps.endTime || "17:00");
    openModal();
  };

  const handleAddOrUpdateBooking = () => {
    if (!bookerName || !selectedVehicle || !startDate) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: selectedVehicle,
                start: `${startDate}T${startTime}:00`,
                end: `${endDate}T${endTime}:00`,
                backgroundColor: "transparent",
                borderColor: "transparent",
                textColor: vehicleTextColorMap[selectedVehicle],
                extendedProps: {
                  bookerName: bookerName,
                  licensePlate: selectedVehicle,
                  startTime: startTime,
                  endTime: endTime,
                  textColor: vehicleTextColorMap[selectedVehicle]
                },
              }
            : event
        )
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: selectedVehicle,
        start: `${startDate}T${startTime}:00`,
        end: `${endDate}T${endTime}:00`,
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: vehicleTextColorMap[selectedVehicle],
        extendedProps: {
          bookerName: bookerName,
          licensePlate: selectedVehicle,
          startTime: startTime,
          endTime: endTime,
          textColor: vehicleTextColorMap[selectedVehicle]
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setBookerName("");
    setSelectedVehicle("");
    setStartDate("");
    setEndDate("");
    setStartTime("08:00");
    setEndTime("17:00");
    setSelectedEvent(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

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

        {/* Danh sách lịch cá nhân - Chiếm 1/4 màn hình */}
        <div className="w-1/4">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white/[0.03]">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Lịch của tôi
            </h3>
            <div className="space-y-3">
              {myEvents.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  Chưa có lịch đặt xe
                </p>
              ) : (
                myEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-2">
                      <span
                        className="font-semibold text-sm"
                        style={{ color: event.extendedProps.textColor }}
                      >
                        {event.extendedProps.licensePlate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(event.start as string)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      ⏰ {event.extendedProps.startTime} - {event.extendedProps.endTime}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      👤 {event.extendedProps.bookerName}
                    </div>
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
              {selectedEvent ? "Chỉnh sửa lịch đặt xe" : "Đặt lịch xe mới"}
            </h5>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Tên người đặt *
              </label>
              <input
                type="text"
                value={bookerName}
                onChange={(e) => setBookerName(e.target.value)}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                placeholder="Nhập tên người đặt xe"
              />
            </div>

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
                    {vehicle.licensePlate}
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
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Đóng
            </button>
            <button
              onClick={handleAddOrUpdateBooking}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {selectedEvent ? "Cập nhật" : "Đặt lịch"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Calendar;