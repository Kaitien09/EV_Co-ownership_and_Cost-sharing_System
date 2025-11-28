import { useState, useEffect } from "react";

interface CheckInOut {
  id: string;
  bookingId: string;
  customerName: string;
  vehicle: string;
  groupName: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'checked-in' | 'checked-out' | 'pending';
}

const QLCheckInVaOutPage: React.FC = () => {
  const [records, setRecords] = useState<CheckInOut[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchCheckInOutData = async () => {
      try {
        setLoading(true);
        // Giả lập API call - trong thực tế sẽ gọi API thật
        const mockData: CheckInOut[] = [
          {
            id: "1",
            bookingId: "BK-2024-001",
            customerName: "Nguyễn Văn A",
            vehicle: "Model X1 - 30A-11111",
            groupName: "Nhóm Đồng Sở Hữu A",
            checkInTime: "2024-01-15 08:30",
            checkOutTime: "2024-01-15 17:15",
            status: 'checked-out'
          },
          {
            id: "2",
            bookingId: "BK-2024-002",
            customerName: "Trần Thị B",
            vehicle: "Model X1 - 30A-11111",
            groupName: "Nhóm Đồng Sở Hữu A",
            checkInTime: "2024-01-16 09:00",
            status: 'checked-in'
          },
          {
            id: "3",
            bookingId: "BK-2024-003",
            customerName: "Lê Văn C",
            vehicle: "Model X2 - 30A-22222",
            groupName: "Nhóm Đồng Sở Hữu B",
            checkInTime: "2024-01-16 08:15",
            checkOutTime: "2024-01-16 18:30",
            status: 'checked-out'
          },
          {
            id: "4",
            bookingId: "BK-2024-004",
            customerName: "Phạm Thị D",
            vehicle: "Model X2 - 30A-22222",
            groupName: "Nhóm Đồng Sở Hữu B",
            checkInTime: "2024-01-17 10:30",
            checkOutTime: "2024-01-17 16:45",
            status: 'checked-out'
          },
          {
            id: "5",
            bookingId: "BK-2024-005",
            customerName: "Hoàng Văn E",
            vehicle: "Model X3 - 30A-33333",
            groupName: "Nhóm Đồng Sở Hữu C",
            checkInTime: "2024-01-17 07:45",
            status: 'checked-in'
          },
          {
            id: "6",
            bookingId: "BK-2024-006",
            customerName: "Nguyễn Văn A",
            vehicle: "Model X3 - 30A-33333",
            groupName: "Nhóm Đồng Sở Hữu C",
            checkInTime: "2024-01-18 08:00",
            checkOutTime: "2024-01-18 17:30",
            status: 'checked-out'
          }
        ];

        setRecords(mockData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckInOutData();
  }, []);

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = records.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(records.length / itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'checked-out':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked-in':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'checked-out':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Tạo mảng số trang để hiển thị
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Lịch sử Check-in/Check-out
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Theo dõi lịch sử nhận và trả xe theo dữ liệu thực tế
        </p>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã check-in</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.status === 'checked-in').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã check-out</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.status === 'checked-out').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang chờ</p>
              <p className="text-2xl font-bold text-gray-900">
                {records.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng số</p>
              <p className="text-2xl font-bold text-gray-900">{records.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách lịch sử */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Lịch sử giao dịch theo dữ liệu hệ thống
            </h2>
            <div className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Mã đặt xe
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Thông tin
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Thời gian nhận xe
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Thời gian trả xe
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 font-mono">
                      {record.bookingId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">🚗</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {record.customerName}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {record.vehicle}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {record.groupName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {record.checkInTime || (
                        <span className="text-gray-400">Chưa nhận xe</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {record.checkOutTime || (
                        <span className="text-gray-400">Chưa trả xe</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
                        <span className="mr-1.5">
                          {getStatusIcon(record.status)}
                        </span>
                        {getStatusText(record.status)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer với phân trang */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị {currentRecords.length} trong tổng số {records.length} kết quả
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trước
              </button>

              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLCheckInVaOutPage;