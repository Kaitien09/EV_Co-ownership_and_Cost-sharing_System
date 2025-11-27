import { useState } from "react";

interface Dispute {
  id: string;
  disputeCode: string;
  customerName: string;
  vehicle: string;
  serviceCode: string;
  type: 'quality' | 'payment' | 'damage' | 'other';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdDate: string;
  description: string;
  assignedTo: string;
  resolution?: string;
  resolvedDate?: string;
}

const TheoDoiVaGiamSatPage: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: "1",
      disputeCode: "TRANHCHAP-2024-001",
      customerName: "Nguyễn Văn A",
      vehicle: "BMW X5 - 51A-12345",
      serviceCode: "DV-2024-001",
      type: 'quality',
      status: 'investigating',
      priority: 'high',
      createdDate: "2024-01-12",
      description: "Khách hàng phản ánh chất lượng dịch vụ bảo dưỡng không đạt yêu cầu, xe vẫn có tiếng ồn sau khi bảo dưỡng",
      assignedTo: "Quản lý A"
    },
    {
      id: "2",
      disputeCode: "TRANHCHAP-2024-002",
      customerName: "Trần Thị B",
      vehicle: "Mercedes C300 - 51B-67890",
      serviceCode: "DV-2024-002",
      type: 'damage',
      status: 'open',
      priority: 'critical',
      createdDate: "2024-01-15",
      description: "Khách hàng phát hiện vết xước trên thân xe sau khi nhận xe từ dịch vụ sửa chữa",
      assignedTo: "Quản lý B"
    },
    {
      id: "3",
      disputeCode: "TRANHCHAP-2024-003",
      customerName: "Lê Văn C",
      vehicle: "Audi Q7 - 51C-54321",
      serviceCode: "DV-2024-003",
      type: 'payment',
      status: 'resolved',
      priority: 'medium',
      createdDate: "2024-01-08",
      resolvedDate: "2024-01-10",
      description: "Khách hàng khiếu nại về chi phí phát sinh không được thông báo trước",
      assignedTo: "Quản lý C",
      resolution: "Đã hoàn lại 50% chi phí phát sinh và gửi lời xin lỗi đến khách hàng"
    },
    {
      id: "4",
      disputeCode: "TRANHCHAP-2024-004",
      customerName: "Phạm Thị D",
      vehicle: "Toyota Camry - 51D-98765",
      serviceCode: "DV-2024-004",
      type: 'other',
      status: 'closed',
      priority: 'low',
      createdDate: "2024-01-05",
      resolvedDate: "2024-01-07",
      description: "Khách hàng không hài lòng về thái độ phục vụ của nhân viên",
      assignedTo: "Quản lý A",
      resolution: "Đã đào tạo lại nhân viên và tặng voucher giảm giá 10% cho lần dịch vụ tiếp theo"
    }
  ]);

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [filter, setFilter] = useState('all');

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'quality':
        return { label: 'Chất lượng', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' };
      case 'payment':
        return { label: 'Thanh toán', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' };
      case 'damage':
        return { label: 'Hư hại', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' };
      default:
        return { label: 'Khác', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Mở';
      case 'investigating':
        return 'Đang điều tra';
      case 'resolved':
        return 'Đã giải quyết';
      case 'closed':
        return 'Đã đóng';
      default:
        return 'Không xác định';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Thấp';
      case 'medium':
        return 'Trung bình';
      case 'high':
        return 'Cao';
      case 'critical':
        return 'Khẩn cấp';
      default:
        return 'Không xác định';
    }
  };

  const filteredDisputes = filter === 'all'
    ? disputes
    : disputes.filter(dispute => dispute.status === filter);

  const updateDisputeStatus = (disputeId: string, newStatus: Dispute['status']) => {
    setDisputes(prev => prev.map(dispute =>
      dispute.id === disputeId
        ? {
            ...dispute,
            status: newStatus,
            ...(newStatus === 'resolved' && !dispute.resolvedDate ? { resolvedDate: new Date().toISOString().split('T')[0] } : {})
          }
        : dispute
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Theo dõi & Giám sát tranh chấp
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Quản lý và giải quyết các khiếu nại, tranh chấp từ khách hàng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Thống kê */}
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng tranh chấp</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{disputes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang mở</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {disputes.filter(d => d.status === 'open').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang điều tra</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {disputes.filter(d => d.status === 'investigating').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã giải quyết</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {disputes.filter(d => d.status === 'resolved' || d.status === 'closed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter('open')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'open'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Đang mở
              </button>
              <button
                onClick={() => setFilter('investigating')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'investigating'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Đang điều tra
              </button>
              <button
                onClick={() => setFilter('resolved')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'resolved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Đã giải quyết
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách tranh chấp */}
        <div className="col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Danh sách tranh chấp
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Mã tranh chấp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Khách hàng & Xe
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Ưu tiên
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
                  {filteredDisputes.map((dispute) => {
                    const typeBadge = getTypeBadge(dispute.type);
                    return (
                      <tr
                        key={dispute.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => setSelectedDispute(dispute)}
                      >
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {dispute.disputeCode}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {dispute.serviceCode}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {dispute.customerName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {dispute.vehicle}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeBadge.color}`}>
                            {typeBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(dispute.priority)}`}>
                            {getPriorityText(dispute.priority)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(dispute.status)}`}>
                            {getStatusText(dispute.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {dispute.status === 'open' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateDisputeStatus(dispute.id, 'investigating');
                                }}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                Bắt đầu điều tra
                              </button>
                            )}
                            {dispute.status === 'investigating' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateDisputeStatus(dispute.id, 'resolved');
                                }}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                Giải quyết
                              </button>
                            )}
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 text-sm"
                            >
                              Chi tiết
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chi tiết tranh chấp */}
        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow sticky top-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chi tiết tranh chấp
              </h2>
            </div>
            <div className="p-4">
              {selectedDispute ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Mã tranh chấp
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white font-semibold">
                      {selectedDispute.disputeCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Khách hàng & Xe
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedDispute.customerName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedDispute.vehicle}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Dịch vụ liên quan
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedDispute.serviceCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Người phụ trách
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedDispute.assignedTo}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Mô tả
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedDispute.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Ngày tạo
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedDispute.createdDate}
                    </p>
                  </div>
                  {selectedDispute.resolvedDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Ngày giải quyết
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {selectedDispute.resolvedDate}
                      </p>
                    </div>
                  )}
                  {selectedDispute.resolution && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Giải pháp
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {selectedDispute.resolution}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Chọn một tranh chấp để xem chi tiết
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoDoiVaGiamSatPage;