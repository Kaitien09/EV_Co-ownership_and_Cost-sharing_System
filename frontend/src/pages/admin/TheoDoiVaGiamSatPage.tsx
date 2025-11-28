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
      disputeCode: "TRANHCHAP-2025-001",
      customerName: "Nguyễn Văn A",
      vehicle: "Model X1 - 30A-11111",
      serviceCode: "DV-2025-001",
      type: 'quality',
      status: 'investigating',
      priority: 'high',
      createdDate: "2025-01-15T09:30:00.000Z",
      description: "Khách hàng phản ánh chất lượng dịch vụ bảo dưỡng không đạt yêu cầu, xe vẫn có tiếng ồn sau khi bảo dưỡng",
      assignedTo: "Nguyen Van A"
    },
    {
      id: "2",
      disputeCode: "TRANHCHAP-2025-002",
      customerName: "Trần Thị B",
      vehicle: "Model X1 - 30A-11111",
      serviceCode: "DV-2025-002",
      type: 'damage',
      status: 'open',
      priority: 'critical',
      createdDate: "2025-01-16T14:15:00.000Z",
      description: "Khách hàng phát hiện vết xước trên thân xe sau khi nhận xe từ dịch vụ sửa chữa",
      assignedTo: "Le Thi B"
    },
    {
      id: "3",
      disputeCode: "TRANHCHAP-2025-003",
      customerName: "Lê Văn C",
      vehicle: "Model X2 - 30A-22222",
      serviceCode: "DV-2025-003",
      type: 'payment',
      status: 'resolved',
      priority: 'medium',
      createdDate: "2025-01-14T11:00:00.000Z",
      resolvedDate: "2025-01-15T16:45:00.000Z",
      description: "Khách hàng khiếu nại về chi phí phát sinh không được thông báo trước",
      assignedTo: "Tran Van C",
      resolution: "Đã hoàn lại 50% chi phí phát sinh và gửi lời xin lỗi đến khách hàng"
    },
    {
      id: "4",
      disputeCode: "TRANHCHAP-2025-004",
      customerName: "Phạm Thị D",
      vehicle: "Model X2 - 30A-22222",
      serviceCode: "DV-2025-004",
      type: 'other',
      status: 'closed',
      priority: 'low',
      createdDate: "2025-01-13T08:20:00.000Z",
      resolvedDate: "2025-01-14T15:10:00.000Z",
      description: "Khách hàng không hài lòng về thái độ phục vụ của nhân viên",
      assignedTo: "Nguyen Van A",
      resolution: "Đã đào tạo lại nhân viên và tặng voucher giảm giá 10% cho lần dịch vụ tiếp theo"
    },
    {
      id: "5",
      disputeCode: "TRANHCHAP-2025-005",
      customerName: "Hoàng Văn E",
      vehicle: "Model X3 - 30A-33333",
      serviceCode: "DV-2025-005",
      type: 'quality',
      status: 'open',
      priority: 'high',
      createdDate: "2025-01-17T10:45:00.000Z",
      description: "Khách hàng phản ánh điều hòa không lạnh sau khi bảo dưỡng",
      assignedTo: "Le Thi B"
    }
  ]);

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [resolutionText, setResolutionText] = useState("");
  const [assignTo, setAssignTo] = useState("");

  const staffList = [
    "Nguyen Van A",
    "Le Thi B",
    "Tran Van C",
    "Pham Van Dien",
    "Nguyen Thi Dien Lanh"
  ];

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
      case 'open':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
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
        return { label: 'Thấp', color: 'bg-gray-100 text-gray-800 border border-gray-200' };
      case 'medium':
        return { label: 'Trung bình', color: 'bg-blue-100 text-blue-800 border border-blue-200' };
      case 'high':
        return { label: 'Cao', color: 'bg-orange-100 text-orange-800 border border-orange-200' };
      case 'critical':
        return { label: 'Khẩn cấp', color: 'bg-red-100 text-red-800 border border-red-200' };
      default:
        return { label: 'Không xác định', color: 'bg-gray-100 text-gray-800 border border-gray-200' };
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'quality':
        return { label: 'Chất lượng', color: 'bg-purple-100 text-purple-800 border border-purple-200' };
      case 'payment':
        return { label: 'Thanh toán', color: 'bg-indigo-100 text-indigo-800 border border-indigo-200' };
      case 'damage':
        return { label: 'Hư hại', color: 'bg-red-100 text-red-800 border border-red-200' };
      case 'other':
        return { label: 'Khác', color: 'bg-gray-100 text-gray-800 border border-gray-200' };
      default:
        return { label: 'Khác', color: 'bg-gray-100 text-gray-800 border border-gray-200' };
    }
  };

  // Hàm xử lý giải quyết khiếu nại
  const handleResolve = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setResolutionText(dispute.resolution || "");
    setIsResolveModalOpen(true);
  };

  const handleSaveResolution = () => {
    if (selectedDispute && resolutionText.trim()) {
      setDisputes(prev => prev.map(dispute =>
        dispute.id === selectedDispute.id
          ? {
              ...dispute,
              status: 'resolved' as const,
              resolution: resolutionText,
              resolvedDate: new Date().toISOString()
            }
          : dispute
      ));
      setIsResolveModalOpen(false);
      setResolutionText("");
      setSelectedDispute(null);
    }
  };

  // Hàm xử lý phân công
  const handleAssign = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setAssignTo(dispute.assignedTo);
    setIsAssignModalOpen(true);
  };

  const handleSaveAssignment = () => {
    if (selectedDispute && assignTo.trim()) {
      setDisputes(prev => prev.map(dispute =>
        dispute.id === selectedDispute.id
          ? {
              ...dispute,
              assignedTo: assignTo,
              status: dispute.status === 'open' ? 'investigating' as const : dispute.status
            }
          : dispute
      ));
      setIsAssignModalOpen(false);
      setAssignTo("");
      setSelectedDispute(null);
    }
  };

  // Hàm đóng khiếu nại
  const handleCloseDispute = (disputeId: string) => {
    setDisputes(prev => prev.map(dispute =>
      dispute.id === disputeId
        ? { ...dispute, status: 'closed' as const }
        : dispute
    ));
  };

  // Hàm thay đổi trạng thái
  const handleStatusChange = (disputeId: string, newStatus: Dispute['status']) => {
    setDisputes(prev => prev.map(dispute =>
      dispute.id === disputeId
        ? { ...dispute, status: newStatus }
        : dispute
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Theo dõi và Giám sát Khiếu nại
          </h1>
          <p className="text-gray-600">
            Quản lý và xử lý các khiếu nại, tranh chấp từ khách hàng
          </p>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Tổng khiếu nại</p>
                <p className="text-lg font-bold text-gray-900">{disputes.length}</p>
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
                <p className="text-xs font-medium text-gray-600">Đang xử lý</p>
                <p className="text-lg font-bold text-gray-900">
                  {disputes.filter(d => d.status === 'open' || d.status === 'investigating').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Đã giải quyết</p>
                <p className="text-lg font-bold text-gray-900">
                  {disputes.filter(d => d.status === 'resolved' || d.status === 'closed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-red-50 rounded-lg">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Khẩn cấp</p>
                <p className="text-lg font-bold text-gray-900">
                  {disputes.filter(d => d.priority === 'critical').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách khiếu nại */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Danh sách khiếu nại
              </h2>
              <span className="text-sm text-gray-500">
                {disputes.length} khiếu nại
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {disputes.map((dispute) => {
              const priorityBadge = getPriorityBadge(dispute.priority);
              const typeBadge = getTypeBadge(dispute.type);

              return (
                <div key={dispute.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeBadge.color}`}>
                          {typeBadge.label}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityBadge.color}`}>
                          {priorityBadge.label}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {dispute.disputeCode}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {dispute.customerName} - {dispute.vehicle}
                      </h3>

                      <p className="text-sm text-gray-600 mb-2">
                        {dispute.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Mã DV: {dispute.serviceCode}</span>
                        <span>•</span>
                        <span>•</span>
                        <span>Ngày tạo: {formatDate(dispute.createdDate)}</span>
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(dispute.status)} mb-2`}>
                        {getStatusText(dispute.status)}
                      </span>
                      {dispute.resolvedDate && (
                        <div className="text-xs text-green-600">
                          Giải quyết: {formatDate(dispute.resolvedDate)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <select
                        value={dispute.status}
                        onChange={(e) => handleStatusChange(dispute.id, e.target.value as Dispute['status'])}
                        className="text-xs border rounded px-2 py-1 bg-white"
                      >
                        <option value="open">Mở</option>
                        <option value="investigating">Đang điều tra</option>
                        <option value="resolved">Đã giải quyết</option>
                        <option value="closed">Đã đóng</option>
                      </select>
                    </div>

                    <div className="flex gap-2">


                      {dispute.status !== 'resolved' && dispute.status !== 'closed' && (
                        <button
                          onClick={() => handleResolve(dispute)}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                        >
                          Giải quyết
                        </button>
                      )}

                      {dispute.status === 'resolved' && (
                        <button
                          onClick={() => handleCloseDispute(dispute.id)}
                          className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                        >
                          Đóng
                        </button>
                      )}
                    </div>
                  </div>

                  {dispute.resolution && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Giải pháp:</span> {dispute.resolution}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal giải quyết khiếu nại */}
      {isResolveModalOpen && selectedDispute && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Giải quyết khiếu nại: {selectedDispute.disputeCode}
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giải pháp/Phản hồi
                </label>
                <textarea
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập giải pháp hoặc phản hồi cho khách hàng..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsResolveModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveResolution}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={!resolutionText.trim()}
                >
                  Lưu giải pháp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal phân công */}
      {isAssignModalOpen && selectedDispute && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Phân công khiếu nại: {selectedDispute.disputeCode}
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phân công cho
                </label>
                <select
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn nhân viên...</option>
                  {staffList.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveAssignment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!assignTo.trim()}
                >
                  Phân công
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheoDoiVaGiamSatPage;