import { useState } from "react";

interface Service {
  id: string;
  serviceCode: string;
  serviceName: string;
  vehicle: string;
  customerName: string;
  serviceType: 'maintenance' | 'repair' | 'inspection' | 'other';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  cost: number;
  technician: string;
  description: string;
}

const QLDichVuXePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      serviceCode: "DV-2024-001",
      serviceName: "Bảo dưỡng định kỳ 15,000km",
      vehicle: "BMW X5 - 51A-12345",
      customerName: "Nguyễn Văn A",
      serviceType: 'maintenance',
      status: 'completed',
      startDate: "2024-01-10",
      endDate: "2024-01-10",
      cost: 2500000,
      technician: "Kỹ thuật viên A",
      description: "Thay dầu máy, lọc gió, kiểm tra hệ thống phanh"
    },
    {
      id: "2",
      serviceCode: "DV-2024-002",
      serviceName: "Sửa chữa hệ thống phanh",
      vehicle: "Mercedes C300 - 51B-67890",
      customerName: "Trần Thị B",
      serviceType: 'repair',
      status: 'in-progress',
      startDate: "2024-01-15",
      cost: 4500000,
      technician: "Kỹ thuật viên B",
      description: "Thay má phanh trước, kiểm tra dầu phanh"
    },
    {
      id: "3",
      serviceCode: "DV-2024-003",
      serviceName: "Đăng kiểm định kỳ",
      vehicle: "Audi Q7 - 51C-54321",
      customerName: "Lê Văn C",
      serviceType: 'inspection',
      status: 'pending',
      startDate: "2024-01-20",
      cost: 500000,
      technician: "-",
      description: "Đăng kiểm theo quy định"
    },
    {
      id: "4",
      serviceCode: "DV-2024-004",
      serviceName: "Thay vỏ xe mới",
      vehicle: "Toyota Camry - 51D-98765",
      customerName: "Phạm Thị D",
      serviceType: 'repair',
      status: 'in-progress',
      startDate: "2024-01-14",
      cost: 3800000,
      technician: "Kỹ thuật viên C",
      description: "Thay 4 vỏ xe mới, cân bằng góc lái"
    }
  ]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filter, setFilter] = useState('all');

  const getServiceTypeBadge = (type: string) => {
    switch (type) {
      case 'maintenance':
        return { label: 'Bảo dưỡng', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' };
      case 'repair':
        return { label: 'Sửa chữa', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' };
      case 'inspection':
        return { label: 'Đăng kiểm', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' };
      default:
        return { label: 'Khác', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'in-progress':
        return 'Đang thực hiện';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const filteredServices = filter === 'all'
    ? services
    : services.filter(service => service.status === filter);

  const updateServiceStatus = (serviceId: string, newStatus: Service['status']) => {
    setServices(prev => prev.map(service =>
      service.id === serviceId
        ? {
            ...service,
            status: newStatus,
            ...(newStatus === 'completed' && !service.endDate ? { endDate: new Date().toISOString().split('T')[0] } : {})
          }
        : service
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quản lý dịch vụ xe
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Theo dõi và quản lý các dịch vụ bảo dưỡng, sửa chữa xe
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Thống kê và bộ lọc */}
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng dịch vụ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{services.length}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {services.filter(s => s.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang thực hiện</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {services.filter(s => s.status === 'in-progress').length}
                </p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chờ xử lý</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {services.filter(s => s.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã hủy</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {services.filter(s => s.status === 'cancelled').length}
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
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Chờ xử lý
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'in-progress'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Đang thực hiện
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách dịch vụ */}
        <div className="col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Danh sách dịch vụ
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Mã DV
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Dịch vụ & Xe
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Chi phí
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
                  {filteredServices.map((service) => {
                    const typeBadge = getServiceTypeBadge(service.serviceType);
                    return (
                      <tr
                        key={service.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => setSelectedService(service)}
                      >
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {service.serviceCode}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {service.serviceName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {service.vehicle} - {service.customerName}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeBadge.color}`}>
                            {typeBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(service.cost)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(service.status)}`}>
                            {getStatusText(service.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {service.status === 'pending' && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateServiceStatus(service.id, 'in-progress');
                                  }}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                >
                                  Bắt đầu
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateServiceStatus(service.id, 'cancelled');
                                  }}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                >
                                  Hủy
                                </button>
                              </>
                            )}
                            {service.status === 'in-progress' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateServiceStatus(service.id, 'completed');
                                }}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                Hoàn thành
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

        {/* Chi tiết dịch vụ */}
        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow sticky top-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chi tiết dịch vụ
              </h2>
            </div>
            <div className="p-4">
              {selectedService ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Mã dịch vụ
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white font-semibold">
                      {selectedService.serviceCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Tên dịch vụ
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedService.serviceName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Khách hàng & Xe
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedService.customerName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedService.vehicle}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Kỹ thuật viên
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedService.technician}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Mô tả
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedService.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Chi phí
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white font-semibold">
                      {formatCurrency(selectedService.cost)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Thời gian
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Bắt đầu: {selectedService.startDate}
                    </p>
                    {selectedService.endDate && (
                      <p className="text-sm text-gray-900 dark:text-white">
                        Kết thúc: {selectedService.endDate}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Chọn một dịch vụ để xem chi tiết
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

export default QLDichVuXePage;