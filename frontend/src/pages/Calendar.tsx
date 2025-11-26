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
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  // Danh sách biển số xe
  const vehicleList = [
    "29A-12345",
    "29A-67890",
    "29A-54321",
    "29A-98765",
    "29A-11111",
    "29A-22222",
  ];

  useEffect(() => {
    // Khởi tạo với một số lịch đặt xe mẫu
    setEvents([
      {
        id: "1",
        title: "Văn A",
        start: new Date().toISOString().split("T")[0] + "T08:00:00",
        end: new Date().toISOString().split("T")[0] + "T17:00:00",
        extendedProps: {
          bookerName: "Văn A",
          licensePlate: "29A-12345",
          startTime: "08:00",
          endTime: "17:00"
        },
      },
      {
        id: "2",
        title: "Trần B",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T09:00:00",
        end: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T16:00:00",
        extendedProps: {
          bookerName: "Trần B",
          licensePlate: "29A-67890",
          startTime: "09:00",
          endTime: "16:00"
        },
      },
      {
        id: "3",
        title: "Văn C",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0] + "T07:00:00",
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0] + "T18:00:00",
        extendedProps: {
          bookerName: "Văn C",
          licensePlate: "29A-54321",
          startTime: "07:00",
          endTime: "18:00"
        },
      },
    ]);
  }, []);

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
      // Cập nhật lịch đặt xe hiện có
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: bookerName,
                start: `${startDate}T${startTime}:00`,
                end: `${endDate}T${endTime}:00`,
                extendedProps: {
                  bookerName: bookerName,
                  licensePlate: selectedVehicle,
                  startTime: startTime,
                  endTime: endTime
                },
              }
            : event
        )
      );
    } else {
      // Thêm lịch đặt xe mới
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: bookerName,
        start: `${startDate}T${startTime}:00`,
        end: `${endDate}T${endTime}:00`,
        extendedProps: {
          bookerName: bookerName,
          licensePlate: selectedVehicle,
          startTime: startTime,
          endTime: endTime
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

  return (
    <>
      <PageMeta
        title="Quản lý đặt lịch xe | Hệ thống quản lý phương tiện"
        description="Trang quản lý lịch đặt xe cho hệ thống quản lý phương tiện"
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next addBookingButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            customButtons={{
              addBookingButton: {
                text: "Đặt lịch xe +",
                click: openModal,
              },
            }}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
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
                  {vehicleList.map((licensePlate) => (
                    <option key={licensePlate} value={licensePlate}>
                      {licensePlate}
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
      </div>
    </>
  );
};

const renderEventContent = (eventInfo: any) => {
  return (
    <div
      className="event-fc-color flex fc-event-main fc-bg-primary p-1 rounded-sm"
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;