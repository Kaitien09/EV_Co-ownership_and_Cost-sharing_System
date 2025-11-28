import { useState } from "react";

interface QuyReport {
  id: string;
  reportCode: string;
  period: string;
  group: string;
  thuQuy: number;
  chiQuy: number;
  soDu: number;
  status: 'draft' | 'published' | 'archived';
  createdDate: string;
  createdBy: string;
  description?: string;
}

const BaoCaoPage: React.FC = () => {
  const [reports, setReports] = useState<QuyReport[]>([
    {
      id: "1",
      reportCode: "BC-Q-2024-01",
      period: "Tháng 1/2024",
      group: "Nhóm Đồng Sở Hữu A",
      thuQuy: 3500000,
      chiQuy: 2500000,
      soDu: 10000000,
      status: 'published',
      createdDate: "2024-01-31",
      createdBy: "Admin A",
      description: "Báo cáo thu chi quỹ tháng 1 - Chi phí bảo dưỡng và bảo hiểm"
    },
    {
      id: "2",
      reportCode: "BC-Q-2024-02",
      period: "Tháng 1/2024",
      group: "Nhóm Đồng Sở Hữu B",
      thuQuy: 7000000,
      chiQuy: 4900000,
      soDu: 8000000,
      status: 'published',
      createdDate: "2024-01-31",
      createdBy: "Admin B",
      description: "Báo cáo thu chi quỹ tháng 1 - Chi phí sửa chữa và phí đường"
    },
    {
      id: "3",
      reportCode: "BC-Q-2023-12",
      period: "Tháng 12/2023",
      group: "Nhóm Đồng Sở Hữu C",
      thuQuy: 2200000,
      chiQuy: 1800000,
      soDu: 5000000,
      status: 'archived',
      createdDate: "2023-12-31",
      createdBy: "Admin A",
      description: "Báo cáo thu chi quỹ tháng 12 - Chi phí nhiên liệu"
    },
    {
      id: "4",
      reportCode: "BC-Q-2024-03",
      period: "Tháng 2/2024",
      group: "Nhóm Đồng Sở Hữu A",
      thuQuy: 0,
      chiQuy: 0,
      soDu: 10000000,
      status: 'draft',
      createdDate: "2024-02-01",
      createdBy: "Admin A",
      description: "Báo cáo dự kiến cho tháng 2"
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<QuyReport | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newReport, setNewReport] = useState<Partial<QuyReport>>({
    period: "Tháng 2/2024",
    group: "Nhóm Đồng Sở Hữu A",
    thuQuy: 0,
    chiQuy: 0,
    soDu: 0,
    description: ""
  });

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

  // Chức năng xuất PDF
  const handleExportPDF = async (report: QuyReport) => {
    try {
      console.log('Bắt đầu xuất PDF cho:', report.reportCode);
      alert(`Đang xuất PDF cho báo cáo: ${report.reportCode}\nTệp sẽ được tải xuống trong giây lát...`);

      const pdfContent = `
        BÁO CÁO THU CHI QUỸ NHÓM ĐỒNG SỞ HỮU
        ===================================

        Mã báo cáo: ${report.reportCode}
        Kỳ báo cáo: ${report.period}
        Nhóm: ${report.group}

        TÌNH HÌNH THU CHI QUỸ
        --------------------
        Thu quỹ: ${formatCurrency(report.thuQuy)}
        Chi quỹ: ${formatCurrency(report.chiQuy)}
        Số dư quỹ: ${formatCurrency(report.soDu)}
        Chênh lệch thu chi: ${formatCurrency(report.thuQuy - report.chiQuy)}

        Thông tin khác:
        - Người tạo: ${report.createdBy}
        - Ngày tạo: ${report.createdDate}
        - Trạng thái: ${getStatusText(report.status)}
        ${report.description ? `- Ghi chú: ${report.description}` : ''}
      `;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report.reportCode}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('Xuất PDF thành công:', report.reportCode);

    } catch (error) {
      console.error('Lỗi khi xuất PDF:', error);
      alert('Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại.');
    }
  };

  // Chức năng xem chi tiết
  const handleViewReport = (report: QuyReport) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  // Chức năng chỉnh sửa
  const handleEditReport = (report: QuyReport) => {
    setSelectedReport(report);
    setNewReport({
      period: report.period,
      group: report.group,
      thuQuy: report.thuQuy,
      chiQuy: report.chiQuy,
      soDu: report.soDu,
      description: report.description || ""
    });
    setShowEditModal(true);
  };

  // Chức năng tạo báo cáo mới
  const handleCreateReport = () => {
    const reportId = (reports.length + 1).toString();
    const newReportData: QuyReport = {
      id: reportId,
      reportCode: `BC-Q-${new Date().getFullYear()}-${String(reports.length + 1).padStart(2, '0')}`,
      period: newReport.period || "Tháng 2/2024",
      group: newReport.group || "Nhóm Đồng Sở Hữu A",
      thuQuy: newReport.thuQuy || 0,
      chiQuy: newReport.chiQuy || 0,
      soDu: newReport.soDu || 0,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      createdBy: "Admin A",
      description: newReport.description
    };

    setReports(prev => [newReportData, ...prev]);
    setShowCreateModal(false);
    setNewReport({
      period: "Tháng 2/2024",
      group: "Nhóm Đồng Sở Hữu A",
      thuQuy: 0,
      chiQuy: 0,
      soDu: 0,
      description: ""
    });
    alert("Đã tạo báo cáo mới thành công!");
  };

  // Chức năng cập nhật báo cáo
  const handleUpdateReport = () => {
    if (!selectedReport) return;

    const updatedReport: QuyReport = {
      ...selectedReport,
      period: newReport.period || selectedReport.period,
      group: newReport.group || selectedReport.group,
      thuQuy: newReport.thuQuy || selectedReport.thuQuy,
      chiQuy: newReport.chiQuy || selectedReport.chiQuy,
      soDu: newReport.soDu || selectedReport.soDu,
      description: newReport.description || selectedReport.description
    };

    setReports(prev => prev.map(report =>
      report.id === selectedReport.id ? updatedReport : report
    ));
    setShowEditModal(false);
    setSelectedReport(null);
    alert("Đã cập nhật báo cáo thành công!");
  };

  // Chức năng xuất bản báo cáo
  const handlePublishReport = (reportId: string) => {
    setReports(prev => prev.map(report =>
      report.id === reportId ? { ...report, status: 'published' as const } : report
    ));
    alert("Đã xuất bản báo cáo!");
  };

  // Chức năng lưu trữ báo cáo
  const handleArchiveReport = (reportId: string) => {
    setReports(prev => prev.map(report =>
      report.id === reportId ? { ...report, status: 'archived' as const } : report
    ));
    alert("Đã lưu trữ báo cáo!");
  };

  // Dữ liệu biểu đồ dựa trên database
  const chartData = {
    labels: ['Nhóm Đồng Sở Hữu A', 'Nhóm Đồng Sở Hữu B', 'Nhóm Đồng Sở Hữu C'],
    thuQuy: [3500000, 7000000, 2200000],
    chiQuy: [2500000, 4900000, 1800000],
    soDu: [10000000, 8000000, 5000000]
  };

  // Tính toán tổng quan từ dữ liệu thực tế
  const totalThuQuy = reports.reduce((sum, report) => sum + report.thuQuy, 0);
  const totalChiQuy = reports.reduce((sum, report) => sum + report.chiQuy, 0);
  const totalSoDu = reports.reduce((sum, report) => sum + report.soDu, 0) / reports.length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Báo cáo thu chi quỹ nhóm đồng sở hữu
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Theo dõi và báo cáo tình hình thu chi quỹ của các nhóm đồng sở hữu xe điện
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng thu quỹ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalThuQuy)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng chi quỹ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalChiQuy)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Số dư trung bình</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalSoDu)}
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
                Phân tích thu chi quỹ theo nhóm
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
                      Thu: {formatCurrency(chartData.thuQuy[index])}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(chartData.thuQuy[index] / Math.max(...chartData.thuQuy)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Chi: {formatCurrency(chartData.chiQuy[index])}</span>
                    <span>Số dư: {formatCurrency(chartData.soDu[index])}</span>
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
              Tổng quan số dư quỹ
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Nhóm Đồng Sở Hữu A</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-200">
                    {formatCurrency(10000000)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 dark:text-green-400">Số dư quỹ</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Thu: 3.5M - Chi: 2.5M</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Nhóm Đồng Sở Hữu B</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    {formatCurrency(8000000)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Số dư quỹ</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Thu: 7M - Chi: 4.9M</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Nhóm Đồng Sở Hữu C</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    {formatCurrency(5000000)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-600 dark:text-purple-400">Số dư quỹ</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Thu: 2.2M - Chi: 1.8M</p>
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
                Danh sách báo cáo thu chi quỹ
              </h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
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
                      Thu quỹ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Chi quỹ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Số dư
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
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
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
                        {formatCurrency(report.thuQuy)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
                        {formatCurrency(report.chiQuy)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                        {formatCurrency(report.soDu)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleExportPDF(report)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                          >
                            Xuất PDF
                          </button>
                          <button
                            onClick={() => handleViewReport(report)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-sm"
                          >
                            Xem
                          </button>
                          {report.status === 'draft' && (
                            <button
                              onClick={() => handleEditReport(report)}
                              className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 text-sm"
                            >
                              Chỉnh sửa
                            </button>
                          )}
                          {report.status === 'draft' && (
                            <button
                              onClick={() => handlePublishReport(report.id)}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-sm"
                            >
                              Xuất bản
                            </button>
                          )}
                          {report.status === 'published' && (
                            <button
                              onClick={() => handleArchiveReport(report.id)}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 text-sm"
                            >
                              Lưu trữ
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

      {/* Modal tạo báo cáo mới */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tạo báo cáo thu chi quỹ mới
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kỳ báo cáo
                </label>
                <select
                  value={newReport.period}
                  onChange={(e) => setNewReport({...newReport, period: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Tháng 1/2024">Tháng 1/2024</option>
                  <option value="Tháng 2/2024">Tháng 2/2024</option>
                  <option value="Tháng 3/2024">Tháng 3/2024</option>
                  <option value="Quý 1/2024">Quý 1/2024</option>
                  <option value="Quý 2/2024">Quý 2/2024</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nhóm đồng sở hữu
                </label>
                <select
                  value={newReport.group}
                  onChange={(e) => setNewReport({...newReport, group: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Nhóm Đồng Sở Hữu A">Nhóm Đồng Sở Hữu A</option>
                  <option value="Nhóm Đồng Sở Hữu B">Nhóm Đồng Sở Hữu B</option>
                  <option value="Nhóm Đồng Sở Hữu C">Nhóm Đồng Sở Hữu C</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Thu quỹ (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={newReport.thuQuy}
                    onChange={(e) => setNewReport({...newReport, thuQuy: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chi quỹ (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={newReport.chiQuy}
                    onChange={(e) => setNewReport({...newReport, chiQuy: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số dư (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={newReport.soDu}
                    onChange={(e) => setNewReport({...newReport, soDu: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Mô tả chi tiết về các khoản thu chi..."
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateReport}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo báo cáo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {showViewModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedReport.reportCode}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedReport.period} • {selectedReport.group}
                </p>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">Thu quỹ</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-200">
                  {formatCurrency(selectedReport.thuQuy)}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">Chi quỹ</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-200">
                  {formatCurrency(selectedReport.chiQuy)}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Số dư quỹ</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                  {formatCurrency(selectedReport.soDu)}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Chênh lệch</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                  {formatCurrency(selectedReport.thuQuy - selectedReport.chiQuy)}
                </p>
              </div>
            </div>

            {selectedReport.description && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ghi chú</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedReport.description}</p>
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <div>
                <p>Người tạo: {selectedReport.createdBy}</p>
                <p>Ngày tạo: {selectedReport.createdDate}</p>
              </div>
              <div className="text-right">
                <p>Trạng thái: {getStatusText(selectedReport.status)}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={() => handleExportPDF(selectedReport)}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Xuất PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa */}
      {showEditModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chỉnh sửa báo cáo thu chi quỹ
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kỳ báo cáo
                </label>
                <select
                  value={newReport.period}
                  onChange={(e) => setNewReport({...newReport, period: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Tháng 1/2024">Tháng 1/2024</option>
                  <option value="Tháng 2/2024">Tháng 2/2024</option>
                  <option value="Tháng 3/2024">Tháng 3/2024</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nhóm đồng sở hữu
                </label>
                <select
                  value={newReport.group}
                  onChange={(e) => setNewReport({...newReport, group: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Nhóm Đồng Sở Hữu A">Nhóm Đồng Sở Hữu A</option>
                  <option value="Nhóm Đồng Sở Hữu B">Nhóm Đồng Sở Hữu B</option>
                  <option value="Nhóm Đồng Sở Hữu C">Nhóm Đồng Sở Hữu C</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Thu quỹ (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={newReport.thuQuy}
                    onChange={(e) => setNewReport({...newReport, thuQuy: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chi quỹ (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={newReport.chiQuy}
                    onChange={(e) => setNewReport({...newReport, chiQuy: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số dư (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={newReport.soDu}
                    onChange={(e) => setNewReport({...newReport, soDu: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Mô tả chi tiết về các khoản thu chi..."
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateReport}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaoCaoPage;