import { useState } from "react";

interface CheckInOut {
  id: string;
  bookingId: string;
  customerName: string;
  vehicle: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'checked-in' | 'checked-out' | 'pending';
  staff: string;
  notes?: string;
}

const QLCheckInVaOutPage: React.FC = () => {
  const [records, setRecords] = useState<CheckInOut[]>([
    {
      id: "1",
      bookingId: "BK-2024-001",
      customerName: "Nguyễn Văn A",
      vehicle: "BMW X5 - 51A-12345",
      checkInTime: "2024-01-15 08:30",
      checkOutTime: "2024-01-15 17:15",
      status: 'checked-out',
      staff: "Nhân viên A",
      notes: "Xe sạch sẽ, không vấn đề"
    },
    {
      id: "2",
      bookingId: "BK-2024-002",
      customerName: "Trần Thị B",
      vehicle: "Mercedes C300 - 51B-67890",
      checkInTime: "2024-01-15 09:00",
      status: 'checked-in',
      staff: "Nhân viên B",
      notes: "Cần thay dầu máy"
    },
    {
      id: "3",
      bookingId: "BK-2024-003",
      customerName: "Lê Văn C",
      vehicle: "Audi Q7 - 51C-54321",
      status: 'pending',
      staff: "-"
    },
    {
      id: "4",
      bookingId: "BK-2024-004",
      customerName: "Phạm Thị D",
      vehicle: "Toyota Camry - 51D-98765",
      checkInTime: "2024-01-14 10:30",
      checkOutTime: "2024-01-14 16:45",
      status: 'checked-out',
      staff: "Nhân viên C",
      notes: "Đã bảo dưỡng xong"
    }
  ]);

  const [qrData, setQrData] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'checked-out':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'checked-in':
        return 'Đã nhận xe';
      case 'checked-out':
        return 'Đã trả xe';
      case 'pending':
        return 'Chờ xử lý';
      default:
        return 'Không xác định';
    }
  };

  const handleCheckIn = (recordId: string) => {
    setRecords(prev => prev.map(record =>
      record.id === recordId
        ? {
            ...record,
            status: 'checked-in',
            checkInTime: new Date().toLocaleString('vi-VN'),
            staff: "Nhân viên hiện tại"
          }
        : record
    ));
  };

  const handleCheckOut = (recordId: string) => {
    setRecords(prev => prev.map(record =>
      record.id === recordId
        ? {
            ...record,
            status: 'checked-out',
            checkOutTime: new Date().toLocaleString('vi-VN')
          }
        : record
    ));
  };

  const handleScanQR = () => {
    if (qrData) {
      // Giả lập xử lý QR code
      const newRecord: CheckInOut = {
        id: Date.now().toString(),
        bookingId: `BK-${Date.now()}`,
        customerName: "Khách hàng từ QR",
        vehicle: qrData,
        status: 'pending',
        staff: "-"
      };
      setRecords(prev => [newRecord, ...prev]);
      setQrData("");
      setShowScanner(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quản lý Check-in/Check-out
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Quét QR code và quản lý nhận/trả xe
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* QR Scanner */}
        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quét QR Code
            </h2>

            {showScanner ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Camera View</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Đưa camera vào QR code để quét
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="Hoặc nhập mã QR thủ công"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleScanQR}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Xác nhận QR
                  </button>
                  <button
                    onClick={() => setShowScanner(false)}
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowScanner(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Mở máy quét QR
              </button>
            )}

            {/* Ký số */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                Ký số điện tử
              </h3>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Ký số biên bản
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách check-in/out */}
        <div className="col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Lịch sử Check-in/Check-out
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Booking ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Khách hàng & Xe
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Check-in
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Check-out
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.bookingId}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.customerName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {record.vehicle}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {record.checkInTime || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {record.checkOutTime || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {record.status === 'pending' && (
                            <button
                              onClick={() => handleCheckIn(record.id)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              Check-in
                            </button>
                          )}
                          {record.status === 'checked-in' && (
                            <button
                              onClick={() => handleCheckOut(record.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                            >
                              Check-out
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLCheckInVaOutPage;