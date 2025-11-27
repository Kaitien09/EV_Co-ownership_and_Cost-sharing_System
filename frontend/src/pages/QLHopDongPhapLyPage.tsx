import { useState } from "react";

interface Contract {
  id: string;
  contractNumber: string;
  customerName: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  value: number;
  signedDate?: string;
}

const QLHopDongPhapLyPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      contractNumber: "HD-2024-001",
      customerName: "Nguyễn Văn A",
      vehicle: "BMW X5 - 51A-12345",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: 'active',
      value: 50000000,
      signedDate: "2024-01-01"
    },
    {
      id: "2",
      contractNumber: "HD-2024-002",
      customerName: "Trần Thị B",
      vehicle: "Mercedes C300 - 51B-67890",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      status: 'active',
      value: 45000000,
      signedDate: "2024-02-01"
    },
    {
      id: "3",
      contractNumber: "HD-2024-003",
      customerName: "Lê Văn C",
      vehicle: "Audi Q7 - 51C-54321",
      startDate: "2023-12-01",
      endDate: "2024-05-31",
      status: 'expired',
      value: 60000000,
      signedDate: "2023-12-01"
    },
    {
      id: "4",
      contractNumber: "HD-2024-004",
      customerName: "Phạm Thị D",
      vehicle: "Toyota Camry - 51D-98765",
      startDate: "2024-03-15",
      endDate: "2024-09-14",
      status: 'pending',
      value: 35000000
    }
  ]);

  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang hoạt động';
      case 'expired':
        return 'Đã hết hạn';
      case 'pending':
        return 'Chờ ký';
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

  const handleSignContract = (contractId: string) => {
    setContracts(prev => prev.map(contract =>
      contract.id === contractId
        ? { ...contract, status: 'active', signedDate: new Date().toISOString().split('T')[0] }
        : contract
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quản lý hợp đồng pháp lý điện tử
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Quản lý và theo dõi các hợp đồng điện tử đã ký số
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thống kê */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng hợp đồng</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contracts.length}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang hoạt động</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {contracts.filter(c => c.status === 'active').length}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chờ ký</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {contracts.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã hết hạn</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {contracts.filter(c => c.status === 'expired').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách hợp đồng */}
        <div className="col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Danh sách hợp đồng
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Số hợp đồng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Khách hàng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Giá trị
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
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {contract.contractNumber}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contract.vehicle}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {contract.customerName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contract.startDate} - {contract.endDate}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {formatCurrency(contract.value)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(contract.status)}`}>
                          {getStatusText(contract.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedContract(contract)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                          >
                            Xem
                          </button>
                          {contract.status === 'pending' && (
                            <button
                              onClick={() => handleSignContract(contract.id)}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-sm"
                            >
                              Ký số
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
                            Tải xuống
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

        {/* Chi tiết hợp đồng */}
        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow sticky top-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chi tiết hợp đồng
              </h2>
            </div>
            <div className="p-4">
              {selectedContract ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Số hợp đồng
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white font-semibold">
                      {selectedContract.contractNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Khách hàng
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedContract.customerName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Xe
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedContract.vehicle}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Thời hạn
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedContract.startDate} đến {selectedContract.endDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Giá trị
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white font-semibold">
                      {formatCurrency(selectedContract.value)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Trạng thái
                    </label>
                    <p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedContract.status)}`}>
                        {getStatusText(selectedContract.status)}
                      </span>
                    </p>
                  </div>
                  {selectedContract.signedDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Ngày ký
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {selectedContract.signedDate}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Chọn một hợp đồng để xem chi tiết
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

export default QLHopDongPhapLyPage;