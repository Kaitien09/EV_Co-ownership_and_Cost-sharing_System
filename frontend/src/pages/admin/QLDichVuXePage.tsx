import { useState, useEffect } from "react";

interface Service {
  id: string;
  serviceCode: string;
  serviceName: string;
  vehicle: string;
  customerName: string;
  serviceType: 'BAO_DUONG' | 'KIEM_TRA' | 'THAY_THE_PHU_TUNG' | 'SUA_CHUA' | 'KHAC';
  status: 'CHO_XAC_NHAN' | 'DA_XAC_NHAN' | 'DANG_THUC_HIEN' | 'HOAN_TAT' | 'DA_HUY';
  priority: 'THAP' | 'TRUNG_BINH' | 'CAO' | 'KHAN_CAP';
  startDate: string;
  endDate?: string;
  cost: number;
  deposit: number;
  technician: string;
  description: string;
  customerPhone?: string;
  licensePlate?: string;
  groupName?: string;
  technicianSpecialty?: string;
  batteryCapacity?: number;
  carColor?: string;
  maxRange?: number;
  manufacturingYear?: number;
  vin?: string;
  carStatus?: string;
  estimatedCompletion?: string;
  partsUsed?: Part[];
  notes?: string;
  customerFeedback?: string;
  rating?: number;
}

interface Part {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const QLDichVuXePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      serviceCode: "DV-2025-001",
      serviceName: "Bảo dưỡng định kỳ 20,000km",
      vehicle: "Hyundai Kona EV",
      licensePlate: "30A-11111",
      customerName: "Nguyễn Văn A",
      customerPhone: "0903000001",
      groupName: "Nhóm Đồng Sở Hữu A",
      serviceType: 'BAO_DUONG',
      status: 'DANG_THUC_HIEN',
      priority: 'TRUNG_BINH',
      startDate: "2025-11-15T08:00:00.000Z",
      estimatedCompletion: "2025-1-17T17:00:00.000Z",
      cost: 2500000,
      deposit: 1000000,
      technician: "Nguyễn Văn A",
      technicianSpecialty: "Điện - Điện tử",
      description: "Thay dầu máy, lọc gió, kiểm tra hệ thống phanh và ắc quy",
      batteryCapacity: 50,
      carColor: "Đỏ",
      maxRange: 300,
      manufacturingYear: 2022,
      vin: "VIN00000000000001",
      carStatus: "ĐANG BẢO DƯỠNG",
      partsUsed: [
        { id: "1", name: "Dầu động cơ điện 5W-30", quantity: 1, unitPrice: 450000, total: 450000 },
        { id: "2", name: "Lọc gió cabin", quantity: 1, unitPrice: 250000, total: 250000 },
        { id: "3", name: "Lọc gió động cơ", quantity: 1, unitPrice: 350000, total: 350000 }
      ],
      notes: "Khách hàng yêu cầu kiểm tra thêm hệ thống điều hòa"
    },
    {
      id: "2",
      serviceCode: "DV-2025-002",
      serviceName: "Thay thế má phanh trước",
      vehicle: "VinFast VF e34",
      licensePlate: "30A-22222",
      customerName: "Trần Thị B",
      customerPhone: "0903000002",
      groupName: "Nhóm Đồng Sở Hữu B",
      serviceType: 'SUA_CHUA',
      status: 'DANG_THUC_HIEN',
      priority: 'CAO',
      startDate: "2025-1-16T09:00:00.000Z",
      estimatedCompletion: "2025-1-18T16:00:00.000Z",
      cost: 4500000,
      deposit: 2000000,
      technician: "Lê Thị Cơ Khí",
      technicianSpecialty: "Cơ khí - Gầm",
      description: "Thay má phanh trước, kiểm tra dầu phanh, cân chỉnh hệ thống phanh",
      batteryCapacity: 60,
      carColor: "Trắng",
      maxRange: 350,
      manufacturingYear: 2023,
      vin: "VIN00000000000002",
      carStatus: "ĐANG SỬA CHỮA",
      partsUsed: [
        { id: "4", name: "Má phanh trước chính hãng", quantity: 2, unitPrice: 850000, total: 1700000 },
        { id: "5", name: "Dầu phanh DOT4", quantity: 1, unitPrice: 350000, total: 350000 }
      ]
    },
    {
      id: "3",
      serviceCode: "DV-2025-003",
      serviceName: "Kiểm tra sự cố sạc chậm",
      vehicle: "Tesla Model 3",
      licensePlate: "30A-33333",
      customerName: "Lê Văn C",
      customerPhone: "0903000003",
      groupName: "Nhóm Đồng Sở Hữu C",
      serviceType: 'KIEM_TRA',
      status: 'DA_XAC_NHAN',
      priority: 'KHAN_CAP',
      startDate: "2025-11-17T10:00:00.000Z",
      estimatedCompletion: "2025-1-19T15:00:00.000Z",
      cost: 1200000,
      deposit: 500000,
      technician: "Phạm Văn Điện",
      technicianSpecialty: "Hệ thống sạc",
      description: "Chẩn đoán nguyên nhân sạc chậm, kiểm tra cổng sạc và hệ thống quản lý nhiệt",
      batteryCapacity: 55,
      carColor: "Đen",
      maxRange: 320,
      manufacturingYear: 2022,
      vin: "VIN00000000000003",
      carStatus: "CHỜ KIỂM TRA",
      notes: "Khách hàng báo sạc từ 20-80% mất hơn 8 giờ"
    },
    {
      id: "4",
      serviceCode: "DV-2025-004",
      serviceName: "Thay pin cao áp",
      vehicle: "Kia EV6",
      licensePlate: "30A-44444",
      customerName: "Phạm Thị D",
      customerPhone: "0903000004",
      groupName: "Nhóm Đồng Sở Hữu A",
      serviceType: 'THAY_THE_PHU_TUNG',
      status: 'CHO_XAC_NHAN',
      priority: 'CAO',
      startDate: "2025-1-18T11:00:00.000Z",
      cost: 185000000,
      deposit: 50000000,
      technician: "Chưa phân công",
      description: "Thay thế pin cao áp do lỗi cell, bảo hành nhà sản xuất",
      batteryCapacity: 65,
      carColor: "Xám",
      maxRange: 360,
      manufacturingYear: 2023,
      vin: "VIN00000000000004",
      carStatus: "CHỜ XÁC NHẬN",
      partsUsed: [
        { id: "6", name: "Pin cao áp 77.4kWh", quantity: 1, unitPrice: 180000000, total: 180000000 }
      ]
    },
    {
      id: "5",
      serviceCode: "DV-2025-005",
      serviceName: "Bảo dưỡng điều hòa",
      vehicle: "MG ZS EV",
      licensePlate: "30A-55555",
      customerName: "Hoàng Văn E",
      customerPhone: "0903000005",
      groupName: "Nhóm Đồng Sở Hữu B",
      serviceType: 'BAO_DUONG',
      status: 'HOAN_TAT',
      priority: 'THAP',
      startDate: "2025-11-14T13:00:00.000Z",
      endDate: "2025-11-15T16:30:00.000Z",
      cost: 1800000,
      deposit: 1800000,
      technician: "Nguyễn Thị Điện Lạnh",
      technicianSpecialty: "Điện lạnh",
      description: "Vệ sinh dàn lạnh, nạp gas, kiểm tra máy nén",
      batteryCapacity: 70,
      carColor: "Xanh",
      maxRange: 400,
      manufacturingYear: 2024,
      vin: "VIN00000000000005",
      carStatus: "SẴN SÀNG",
      partsUsed: [
        { id: "7", name: "Gas lạnh R134a", quantity: 1, unitPrice: 450000, total: 450000 },
        { id: "8", name: "Lọc gió điều hòa", quantity: 1, unitPrice: 180000, total: 180000 }
      ],
      customerFeedback: "Dịch vụ tốt, nhân viên nhiệt tình",
      rating: 5
    }
  ]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filter, setFilter] = useState<'all' | 'active'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const getServiceTypeBadge = (type: string) => {
    switch (type) {
      case 'BAO_DUONG':
        return { label: 'Bảo dưỡng', color: 'bg-blue-100 text-blue-800 border border-blue-200' };
      case 'KIEM_TRA':
        return { label: 'Kiểm tra', color: 'bg-green-100 text-green-800 border border-green-200' };
      case 'THAY_THE_PHU_TUNG':
        return { label: 'Thay phụ tùng', color: 'bg-orange-100 text-orange-800 border border-orange-200' };
      case 'SUA_CHUA':
        return { label: 'Sửa chữa', color: 'bg-red-100 text-red-800 border border-red-200' };
      default:
        return { label: 'Khác', color: 'bg-gray-100 text-gray-800 border border-gray-200' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CHO_XAC_NHAN':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'DA_XAC_NHAN':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'DANG_THUC_HIEN':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'HOAN_TAT':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'DA_HUY':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'THAP':
        return { label: 'Thấp', color: 'bg-gray-100 text-gray-800 border border-gray-200' };
      case 'TRUNG_BINH':
        return { label: 'Trung bình', color: 'bg-blue-100 text-blue-800 border border-blue-200' };
      case 'CAO':
        return { label: 'Cao', color: 'bg-orange-100 text-orange-800 border border-orange-200' };
      case 'KHAN_CAP':
        return { label: 'Khẩn cấp', color: 'bg-red-100 text-red-800 border border-red-200' };
      default:
        return { label: 'Không xác định', color: 'bg-gray-100 text-gray-800 border border-gray-200' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CHO_XAC_NHAN':
        return 'Chờ xác nhận';
      case 'DA_XAC_NHAN':
        return 'Đã xác nhận';
      case 'DANG_THUC_HIEN':
        return 'Đang thực hiện';
      case 'HOAN_TAT':
        return 'Hoàn tất';
      case 'DA_HUY':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getProgressPercentage = (service: Service) => {
    switch (service.status) {
      case 'CHO_XAC_NHAN':
        return 25;
      case 'DA_XAC_NHAN':
        return 50;
      case 'DANG_THUC_HIEN':
        return 75;
      case 'HOAN_TAT':
        return 100;
      case 'DA_HUY':
        return 0;
      default:
        return 0;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysInService = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Tính toán các thống kê
  const totalServices = services.length;
  const activeServices = services.filter(s => s.status !== 'HOAN_TAT' && s.status !== 'DA_HUY').length;
  const inProgressServices = services.filter(s => s.status === 'DANG_THUC_HIEN').length;
  const completedServices = services.filter(s => s.status === 'HOAN_TAT').length;
  const totalRevenue = services
    .filter(s => s.status === 'HOAN_TAT')
    .reduce((sum, service) => sum + service.cost, 0);

  // Lọc dịch vụ
  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' ||
      (filter === 'active' && service.status !== 'HOAN_TAT' && service.status !== 'DA_HUY');

    const matchesSearch = service.serviceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || service.priority === priorityFilter;

    return matchesFilter && matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Quản lý dịch vụ xe điện
              </h1>
              <p className="text-gray-600">
                Theo dõi và quản lý tình trạng sửa chữa, bảo dưỡng xe điện
              </p>
            </div>
            <div className="text-sm text-gray-500 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
              Chế độ xem - Chỉ đọc
            </div>
          </div>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Tổng dịch vụ</p>
                <p className="text-lg font-bold text-gray-900">{totalServices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Đang thực hiện</p>
                <p className="text-lg font-bold text-gray-900">{inProgressServices}</p>
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
                <p className="text-xs font-medium text-gray-600">Hoàn thành</p>
                <p className="text-lg font-bold text-gray-900">{completedServices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-50 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Doanh thu</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã DV, tên KH, biển số xe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="CHO_XAC_NHAN">Chờ xác nhận</option>
                <option value="DA_XAC_NHAN">Đã xác nhận</option>
                <option value="DANG_THUC_HIEN">Đang thực hiện</option>
                <option value="HOAN_TAT">Hoàn tất</option>
                <option value="DA_HUY">Đã hủy</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả độ ưu tiên</option>
                <option value="THAP">Thấp</option>
                <option value="TRUNG_BINH">Trung bình</option>
                <option value="CAO">Cao</option>
                <option value="KHAN_CAP">Khẩn cấp</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đang xử lý
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách dịch vụ */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Tình trạng dịch vụ
              </h2>
              <span className="text-sm text-gray-500">
                {filteredServices.length} dịch vụ
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredServices.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Không tìm thấy dịch vụ nào</p>
              </div>
            ) : (
              filteredServices.map((service) => {
                const typeBadge = getServiceTypeBadge(service.serviceType);
                const priorityBadge = getPriorityBadge(service.priority);
                const progress = getProgressPercentage(service);
                const daysInService = getDaysInService(service.startDate);

                return (
                  <div
                    key={service.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedService(service)}
                  >
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
                            {service.serviceCode}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {service.serviceName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {service.customerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            {service.technician}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            {service.groupName}
                          </span>
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(service.status)} mb-2`}>
                          {getStatusText(service.status)}
                        </span>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(service.cost)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Đã đặt cọc: {formatCurrency(service.deposit)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {daysInService} ngày trong dịch vụ
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-8">
                        {progress}%
                      </span>
                    </div>

                    {/* Timeline info */}
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>Bắt đầu: {formatDate(service.startDate)}</span>
                      {service.estimatedCompletion && (
                        <span>Dự kiến hoàn thành: {formatDate(service.estimatedCompletion)}</span>
                      )}
                      {service.endDate && (
                        <span className="text-green-600 font-medium">Đã hoàn thành: {formatDate(service.endDate)}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal chi tiết dịch vụ - Chỉ xem */}
      {selectedService && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Chi tiết dịch vụ
                </h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Thông tin cơ bản */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Mã dịch vụ</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedService.serviceCode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedService.status)}`}>
                      {getStatusText(selectedService.status)}
                    </span>
                  </div>
                </div>

                {/* Thông tin dịch vụ */}
                <div>
                  <label className="text-sm font-medium text-gray-600">Dịch vụ</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedService.serviceName}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedService.description}</p>
                  {selectedService.notes && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm text-yellow-800">
                        <span className="font-medium">Ghi chú:</span> {selectedService.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Thông tin xe */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Thông tin xe</label>
                    <p className="text-sm text-gray-900">{selectedService.vehicle} - {selectedService.licensePlate}</p>
                    <p className="text-xs text-gray-500">
                      {selectedService.carColor} • {selectedService.manufacturingYear} • {selectedService.carStatus}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Thông số kỹ thuật</label>
                    <p className="text-sm text-gray-900">{selectedService.batteryCapacity} kWh • {selectedService.maxRange} km</p>
                    <p className="text-xs text-gray-500 font-mono">VIN: {selectedService.vin}</p>
                  </div>
                </div>

                {/* Thông tin khách hàng & kỹ thuật viên */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Khách hàng</label>
                    <p className="text-sm text-gray-900">{selectedService.customerName}</p>
                    <p className="text-sm text-gray-600">{selectedService.customerPhone}</p>
                    <p className="text-xs text-gray-500">{selectedService.groupName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Kỹ thuật viên</label>
                    <p className="text-sm text-gray-900">{selectedService.technician}</p>
                    <p className="text-sm text-gray-600">{selectedService.technicianSpecialty}</p>
                  </div>
                </div>

                {/* Vật tư sử dụng */}
                {selectedService.partsUsed && selectedService.partsUsed.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Vật tư sử dụng</label>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-3 font-medium text-gray-600">Tên vật tư</th>
                            <th className="text-right p-3 font-medium text-gray-600">Số lượng</th>
                            <th className="text-right p-3 font-medium text-gray-600">Đơn giá</th>
                            <th className="text-right p-3 font-medium text-gray-600">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedService.partsUsed.map((part) => (
                            <tr key={part.id}>
                              <td className="p-3">{part.name}</td>
                              <td className="p-3 text-right">{part.quantity}</td>
                              <td className="p-3 text-right">{formatCurrency(part.unitPrice)}</td>
                              <td className="p-3 text-right font-medium">{formatCurrency(part.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Thông tin tài chính */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Chi phí dịch vụ</label>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(selectedService.cost)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Đã đặt cọc</label>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(selectedService.deposit)}</p>
                  </div>
                </div>

                {/* Thời gian */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Bắt đầu</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedService.startDate)}</p>
                  </div>
                  {selectedService.estimatedCompletion && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Dự kiến hoàn thành</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedService.estimatedCompletion)}</p>
                    </div>
                  )}
                  {selectedService.endDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Hoàn thành</label>
                      <p className="text-sm text-green-600 font-medium">{formatDate(selectedService.endDate)}</p>
                    </div>
                  )}
                </div>

                {/* Đánh giá của khách hàng */}
                {selectedService.customerFeedback && (
                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-600">Đánh giá của khách hàng</label>
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedService.rating && (
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < selectedService.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{selectedService.customerFeedback}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QLDichVuXePage;