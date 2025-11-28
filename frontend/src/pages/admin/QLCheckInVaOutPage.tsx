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
  energyConsumed: number;
  distance: number;
  startPoint: string;
  endPoint: string;
  note: string;
  purpose: string;
}

const QLCheckInVaOutPage: React.FC = () => {
  const [records, setRecords] = useState<CheckInOut[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'checked-in' | 'checked-out' | 'pending'>('all');
  const itemsPerPage = 5;

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchCheckInOutData = async () => {
      try {
        setLoading(true);
        // Dữ liệu thực tế từ database của bạn
        const mockData: CheckInOut[] = [
          {
            id: "1",
            bookingId: "BK-2025-001",
            customerName: "Nguyễn Văn A",
            vehicle: "Model X1 - 30A-11111",
            groupName: "Nhóm Đồng Sở Hữu A",
            checkInTime: "2025-11-26T08:00:00.000Z",
            checkOutTime: "2025-11-26T12:00:00.000Z",
            status: 'checked-out',
            energyConsumed: 20,
            distance: 50,
            startPoint: "Điểm xuất phát A",
            endPoint: "Trạm A",
            note: "Sử dụng bình thường",
            purpose: "Vận hành"
          },
          {
            id: "2",
            bookingId: "BK-2025-002",
            customerName: "Trần Thị B",
            vehicle: "Model X1 - 30A-11111",
            groupName: "Nhóm Đồng Sở Hữu A",
            checkInTime: "2025-11-27T09:00:00.000Z",
            checkOutTime: "2025-11-27T13:00:00.000Z",
            status: 'checked-out',
            energyConsumed: 25,
            distance: 60,
            startPoint: "Điểm xuất phát B",
            endPoint: "Trạm B",
            note: "Sử dụng bình thường",
            purpose: "Vận hành"
          },
          {
            id: "3",
            bookingId: "BK-2025-003",
            customerName: "Lê Văn C",
            vehicle: "Model X2 - 30A-22222",
            groupName: "Nhóm Đồng Sở Hữu B",
            checkInTime: "2025-11-28T10:00:00.000Z",
            checkOutTime: "2025-11-28T14:00:00.000Z",
            status: 'checked-out',
            energyConsumed: 30,
            distance: 70,
            startPoint: "Điểm xuất phát C",
            endPoint: "Trạm C",
            note: "Sử dụng bình thường",
            purpose: "Vận hành"
          },
          {
            id: "4",
            bookingId: "BK-2025-004",
            customerName: "Nguyễn Văn A",
            vehicle: "Model X1 - 30A-11111",
            groupName: "Nhóm Đồng Sở Hữu A",
            checkInTime: "2025-01-15T08:30:00.000Z",
            status: 'checked-in',
            energyConsumed: 0,
            distance: 0,
            startPoint: "Trung tâm dịch vụ",
            endPoint: "",
            note: "Đang sử dụng",
            purpose: "Vận hành"
          },
          {
            id: "5",
            bookingId: "BK-2025-005",
            customerName: "Trần Thị B",
            vehicle: "Model X1 - 30A-11111",
            groupName: "Nhóm Đồng Sở Hữu A",
            checkInTime: "2025-01-16T09:15:00.000Z",
            status: 'checked-in',
            energyConsumed: 0,
            distance: 0,
            startPoint: "Trung tâm dịch vụ",
            endPoint: "",
            note: "Đang sử dụng",
            purpose: "Vận hành"
          },
          {
            id: "6",
            bookingId: "BK-2025-006",
            customerName: "Phạm Thị D",
            vehicle: "Model X2 - 30A-22222",
            groupName: "Nhóm Đồng Sở Hữu B",
            checkInTime: "2025-01-18T11:00:00.000Z",
            status: 'pending',
            energyConsumed: 0,
            distance: 0,
            startPoint: "",
            endPoint: "",
            note: "Chờ xác nhận",
            purpose: "Vận hành"
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

  // Lọc dữ liệu theo trạng thái
  const filteredRecords = records.filter(record => {
    if (filter === 'all') return true;
    return record.status === filter;
  });

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <div className="text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý Check-in/Check-out
          </h1>
          <p className="text-gray-600">
            Theo dõi và quản lý lịch sử nhận - trả xe
          </p>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Đã check-in</p>
                <p className="text-lg font-bold text-gray-900">
                  {records.filter(r => r.status === 'checked-in').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Đã check-out</p>
                <p className="text-lg font-bold text-gray-900">
                  {records.filter(r => r.status === 'checked-out').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Đang chờ</p>
                <p className="text-lg font-bold text-gray-900">
                  {records.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Tổng số</p>
                <p className="text-lg font-bold text-gray-900">{records.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilter('checked-in')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'checked-in'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Đã nhận xe
                </button>
                <button
                  onClick={() => setFilter('checked-out')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'checked-out'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Đã trả xe
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'pending'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Chờ xử lý
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách lịch sử */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Lịch sử Check-in/Check-out
              </h2>
              <div className="text-sm text-gray-500">
                {filteredRecords.length} kết quả • Trang {currentPage} / {totalPages}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đặt xe
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thông tin
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian nhận xe
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian trả xe
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quãng đường
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 font-mono">
                        {record.bookingId}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {record.customerName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {record.vehicle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {record.groupName}
                        </div>
                        {record.note && (
                          <div className="text-xs text-gray-400 mt-1">
                            {record.note}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">
                        {record.checkInTime ? formatDate(record.checkInTime) : (
                          <span className="text-gray-400">Chưa nhận xe</span>
                        )}
                      </div>
                      {record.startPoint && (
                        <div className="text-xs text-gray-500">
                          {record.startPoint}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">
                        {record.checkOutTime ? formatDate(record.checkOutTime) : (
                          <span className="text-gray-400">Chưa trả xe</span>
                        )}
                      </div>
                      {record.endPoint && (
                        <div className="text-xs text-gray-500">
                          {record.endPoint}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {record.distance > 0 ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {record.distance} km
                          </div>
                          <div className="text-xs text-gray-500">
                            {record.energyConsumed} kWh
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
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
          <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRecords.length)} trong tổng số {filteredRecords.length} kết quả
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