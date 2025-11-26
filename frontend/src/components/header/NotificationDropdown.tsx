import { useState } from "react";

interface Notification {
  id: string;
  type: 'maintenance' | 'payment' | 'booking';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  data?: {
    vehicleId?: string;
    bookingId?: string;
    dueDate?: string;
    kilometers?: number;
  };
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "maintenance",
      title: "Nhắc bảo dưỡng định kỳ",
      message: "Xe BMW X5 cần bảo dưỡng sau 500km nữa (hiện tại: 14,500km)",
      time: "10 phút trước",
      isRead: false,
      data: {
        vehicleId: "VH001",
        kilometers: 14500
      }
    },
    {
      id: "2",
      type: "maintenance",
      title: "Bảo dưỡng theo thời gian",
      message: "Xe Mercedes C300 cần bảo dưỡng sau 3 ngày nữa",
      time: "1 giờ trước",
      isRead: false,
      data: {
        vehicleId: "VH002",
        dueDate: "2024-12-25"
      }
    },
    {
      id: "3",
      type: "payment",
      title: "Thanh toán gói bảo dưỡng",
      message: "Gói bảo dưỡng Premium sắp hết hạn (còn 15 ngày)",
      time: "2 giờ trước",
      isRead: false,
      data: {
        dueDate: "2024-12-31"
      }
    },
    {
      id: "4",
      type: "payment",
      title: "Gia hạn gói dịch vụ",
      message: "Gói dịch vụ cơ bản đã hết hạn, cần gia hạn ngay",
      time: "5 giờ trước",
      isRead: true,
      data: {
        dueDate: "2024-12-20"
      }
    },
    {
      id: "5",
      type: "booking",
      title: "Đơn đặt lịch được tiếp nhận",
      message: "Đơn đặt lịch #BK001 - Bảo dưỡng tổng thể đã được xác nhận",
      time: "1 ngày trước",
      isRead: true,
      data: {
        bookingId: "BK001"
      }
    },
    {
      id: "6",
      type: "booking",
      title: "Đơn đặt lịch mới",
      message: "Đơn #BK002 - Thay vỏ xe của khách Nguyễn Văn A",
      time: "2 ngày trước",
      isRead: true,
      data: {
        bookingId: "BK002"
      }
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg dark:bg-orange-900/30">
            <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg dark:bg-blue-900/30">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'booking':
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg dark:bg-green-900/30">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'maintenance':
        return { label: 'Bảo dưỡng', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' };
      case 'payment':
        return { label: 'Thanh toán', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' };
      case 'booking':
        return { label: 'Đặt lịch', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
      default:
        return { label: 'Thông báo', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' };
    }
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 text-gray-500 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label="Notifications"
      >
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0002 1.04199C7.492 1.04199 5.41683 3.11716 5.41683 5.62533V8.79199C5.41683 9.28257 5.22433 9.7549 4.88033 10.0989L3.807 11.1722C3.482 11.4972 3.41683 11.9826 3.607 12.3826C3.79716 12.7826 4.19933 13.0172 4.64183 13.0172H15.3587C15.8012 13.0172 16.2033 12.7826 16.3935 12.3826C16.5837 11.9826 16.5185 11.4972 16.1935 11.1722L15.1202 10.0989C14.7762 9.7549 14.5837 9.28257 14.5837 8.79199V5.62533C14.5837 3.11716 12.5085 1.04199 10.0002 1.04199Z"
            fill=""
          />
          <path
            d="M10.0002 17.7087C8.27433 17.7087 6.87516 16.3095 6.87516 14.5837H8.54183C8.54183 15.4672 9.2835 16.2087 10.0002 16.2087C10.7168 16.2087 11.4585 15.4672 11.4585 14.5837H13.1252C13.1252 16.3095 11.726 17.7087 10.0002 17.7087Z"
            fill=""
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Thông báo ({notifications.length})
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
                <button className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                  Cài đặt
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">Không có thông báo</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const typeBadge = getTypeBadge(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                      !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                            {notification.title}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${typeBadge.color}`}>
                            {typeBadge.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.time}
                          </p>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full px-4 py-2 text-sm font-medium text-center text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-blue-400 rounded-lg transition-colors">
              Xem tất cả thông báo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;