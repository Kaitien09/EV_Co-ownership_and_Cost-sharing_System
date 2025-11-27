import { useState } from "react";

interface FinancialReport {
  id: string;
  reportCode: string;
  period: string;
  group: string;
  totalRevenue: number;
  totalCost: number;
  profit: number;
  status: 'draft' | 'published' | 'archived';
  createdDate: string;
  createdBy: string;
}

const BaoCaoPage: React.FC = () => {
  const [reports, setReports] = useState<FinancialReport[]>([
    {
      id: "1",
      reportCode: "BC-TC-2024-01",
      period: "Tháng 1/2024",
      group: "Nhóm Dịch vụ Cao cấp",
      totalRevenue: 250000000,
      totalCost: 150000000,
      profit: 100000000,
      status: 'published',
      createdDate: "2024-01-31",
      createdBy: "Admin A"
    },
    {
      id: "2",
      reportCode: "BC-TC-2024-02",
      period: "Tháng 1/2024",
      group: "Nhóm Dịch vụ Thường",
      totalRevenue: 180000000,
      totalCost: 120000000,
      profit: 60000000,
      status: 'published',
      createdDate: "2024-01-31",
      createdBy: "Admin B"
    },
    {
      id: "3",
      reportCode: "BC-TC-2023-12",
      period: "Tháng 12/2023",
      group: "Nhóm Dịch vụ Cao cấp",
      totalRevenue: 230000000,
      totalCost: 140000000,
      profit: 90000000,
      status: 'archived',
      createdDate: "2023-12-31",
      createdBy: "Admin A"
    },
    {
      id: "4",
      reportCode: "BC-TC-2024-03",
      period: "Tháng 2/2024",
      group: "Nhóm Dịch vụ Cao cấp",
      totalRevenue: 0,
      totalCost: 0,
      profit: 0,
      status: 'draft',
      createdDate: "2024-02-01",
      createdBy: "Admin A"
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Bản nháp';
      case 'published':
        return 'Đã công bố';
      case 'archived':
        return 'Đã lưu trữ';
      default:
        return 'Không xác định';
    }
  };

  // Dữ liệu biểu đồ
  const chartData = {
    labels: ['Dịch vụ Cao cấp', 'Dịch vụ Thường', 'Phụ tùng', 'Khác'],
    revenue: [120000000, 80000000, 30000000, 20000000],
    cost: [70000000, 50000000, 20000000, 10000000]
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Báo cáo tài chính
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Xuất báo cáo tài chính minh bạch cho từng nhóm
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Thống kê tổng quan */}
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(430000000)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng chi phí</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(270000000)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lợi nhuận</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(160000000)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng báo cáo</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {reports.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ và bộ lọc */}
        <div className="col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Phân tích doanh thu & chi phí
              </h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="2024-01">Tháng 1/2024</option>
                <option value="2023-12">Tháng 12/2023</option>
                <option value="2023-11">Tháng 11/2023</option>
              </select>
            </div>

            {/* Biểu đồ đơn giản */}
            <div className="space-y-4">
              {chartData.labels.map((label, index) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(chartData.revenue[index])}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(chartData.revenue[index] / Math.max(...chartData.revenue)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Chi phí: {formatCurrency(chartData.cost[index])}</span>
                    <span>LN: {formatCurrency(chartData.revenue[index] - chartData.cost[index])}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tổng quan nhanh */}
        <div className="col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Tổng quan theo nhóm
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Nhóm Cao cấp</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-200">
                    {formatCurrency(100000000)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 dark:text-green-400">Lợi nhuận</p>
                  <p className="text-sm text-green-700 dark:text-green-300">+25% so T12</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Nhóm Thường</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    {formatCurrency(60000000)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Lợi nhuận</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">+15% so T12</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Tỷ lệ lợi nhuận</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    37.2%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-600 dark:text-purple-400">Trung bình</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">+2.1% so T12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách báo cáo */}
        <div className="col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Danh sách báo cáo
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tạo báo cáo mới
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Mã báo cáo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Kỳ báo cáo & Nhóm
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Doanh thu
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Chi phí
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Lợi nhuận
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
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.reportCode}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {report.createdDate}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.period}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {report.group}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(report.totalRevenue)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
                        {formatCurrency(report.totalCost)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                        {formatCurrency(report.profit)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                            Xuất PDF
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-sm">
                            Xem
                          </button>
                          {report.status === 'draft' && (
                            <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 text-sm">
                              Chỉnh sửa
                            </button>
                          )}
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

export default BaoCaoPage;