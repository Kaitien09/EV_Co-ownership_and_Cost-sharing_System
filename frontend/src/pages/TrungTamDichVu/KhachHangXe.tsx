import { useState, useEffect, useRef } from "react";

const KhachHangXe = () => {
  const [activeTab, setActiveTab] = useState<'khachhang' | 'xe'>('khachhang');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    ten: "",
    sdt: "",
    email: "",
    nhom: "",
    ngayThamGia: new Date().toLocaleDateString('vi-VN')
  });
  const [newCar, setNewCar] = useState({
    bienSo: "",
    model: "",
    VIN: "",
    chuSoHuu: "",
    ngayDangKy: new Date().toLocaleDateString('vi-VN')
  });

  // State cho chat
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // DỮ LIỆU STATE
  const [khachHangData, setKhachHangData] = useState([
    {
      id: "1",
      ten: "Nguyễn Văn A",
      sdt: "0912345678",
      email: "a.nguyen@email.com",
      nhom: "Nhóm đồng sở hữu 3",
      ngayThamGia: "15/08/2025",
      tongXe: 8
    },
    {
      id: "2",
      ten: "Trần Thị B",
      sdt: "0923456789",
      email: "b.tran@email.com",
      nhom: "Nhóm đồng sở hữu 1",
      ngayThamGia: "20/09/2025",
      tongXe: 5
    }
  ]);

  const [xeData, setXeData] = useState([
    {
      id: "1",
      bienSo: "29A-12345",
      model: "VinFast VF e34",
      VIN: "VF123456789012345",
      chuSoHuu: "Nguyễn Văn A",
      ngayDangKy: "15/08/2025",
      lichSuDichVu: [
        { ngay: "10/11/2024", dichVu: "Bảo dưỡng định kỳ", chiPhi: 1500000 },
        { ngay: "15/10/2024", dichVu: "Thay lốp", chiPhi: 2500000 }
      ]
    },
    {
      id: "2",
      bienSo: "29A-67890",
      model: "VinFast VF 8",
      VIN: "VF987654321098765",
      chuSoHuu: "Trần Thị B",
      ngayDangKy: "20/09/2025",
      lichSuDichVu: [
        { ngay: "12/11/2024", dichVu: "Sửa phanh", chiPhi: 1800000 }
      ]
    }
  ]);

  // Auto scroll xuống tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Chức năng thêm khách hàng
  const handleAddCustomer = () => {
    if (newCustomer.ten && newCustomer.sdt) {
      const customer = {
        id: (khachHangData.length + 1).toString(),
        ...newCustomer,
        tongXe: 0
      };

      setKhachHangData(prev => [...prev, customer]);
      setShowAddCustomerModal(false);
      setNewCustomer({
        ten: "",
        sdt: "",
        email: "",
        nhom: "",
        ngayThamGia: new Date().toLocaleDateString('vi-VN')
      });

      // Tự động chọn khách hàng vừa thêm để chat
      setSelectedCustomer(customer);
      setMessages([
        {
          id: 1,
          text: `Xin chào! Tôi là ${customer.ten}. Tôi có thể giúp gì cho bạn?`,
          sender: "customer",
          time: new Date().toLocaleTimeString('vi-VN')
        }
      ]);

      alert("Đã thêm khách hàng thành công!");
    } else {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
    }
  };

  // Chức năng thêm xe
  const handleAddCar = () => {
    if (newCar.bienSo && newCar.model && newCar.VIN && newCar.chuSoHuu) {
      const car = {
        id: (xeData.length + 1).toString(),
        ...newCar,
        lichSuDichVu: []
      };

      setXeData(prev => [...prev, car]);
      setShowAddCarModal(false);
      setNewCar({
        bienSo: "",
        model: "",
        VIN: "",
        chuSoHuu: "",
        ngayDangKy: new Date().toLocaleDateString('vi-VN')
      });
      alert("Đã thêm xe thành công!");
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  // Chọn khách hàng để chat
  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    // Khởi tạo tin nhắn mặc định khi chọn khách hàng
    setMessages([
      {
        id: 1,
        text: `Xin chào! Tôi là ${customer.ten}. Tôi có thể giúp gì cho bạn?`,
        sender: "customer",
        time: new Date().toLocaleTimeString('vi-VN')
      }
    ]);
  };

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString('vi-VN')
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Giả lập phản hồi từ khách hàng sau 1 giây
    setTimeout(() => {
      const customerMessage = {
        id: messages.length + 2,
        text: "Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.",
        sender: "customer",
        time: new Date().toLocaleTimeString('vi-VN')
      };
      setMessages(prev => [...prev, customerMessage]);
    }, 1000);
  };

  // Gửi tin nhắn bằng phím Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý Khách hàng & Xe
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hồ sơ khách hàng, thông tin xe và lịch sử dịch vụ
        </p>
      </div>

      {/* Tab điều hướng */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('khachhang')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'khachhang'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Khách hàng ({khachHangData.length})
            </button>
            <button
              onClick={() => setActiveTab('xe')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'xe'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Xe ({xeData.length})
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'khachhang' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Danh sách khách hàng */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Danh sách Khách hàng
                </h3>
                <button
                  onClick={() => setShowAddCustomerModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                >
                  + Thêm khách hàng
                </button>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {khachHangData.map((khachHang) => (
                  <div
                    key={khachHang.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                      selectedCustomer?.id === khachHang.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => handleSelectCustomer(khachHang)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {khachHang.ten}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {khachHang.sdt} • {khachHang.email}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {khachHang.nhom} • {khachHang.tongXe} xe
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {khachHang.ngayThamGia}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat trực tuyến */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Chat trực tuyến
                </h3>
                {selectedCustomer && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Đang chat với: {selectedCustomer.ten}
                  </p>
                )}
              </div>

              <div className="flex-1 p-4 overflow-y-auto max-h-96">
                {selectedCustomer ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Chọn khách hàng để bắt đầu chat
                  </div>
                )}
              </div>

              {selectedCustomer && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'xe' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Danh sách Xe
            </h3>
            <button
              onClick={() => setShowAddCarModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
            >
              + Thêm xe
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Biển số
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    VIN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Chủ sở hữu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ngày đăng ký
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Lịch sử dịch vụ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {xeData.map((xe) => (
                  <tr key={xe.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {xe.bienSo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {xe.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {xe.VIN}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {xe.chuSoHuu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {xe.ngayDangKy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="space-y-1">
                        {xe.lichSuDichVu.map((dichVu, index) => (
                          <div key={index} className="text-xs">
                            {dichVu.ngay}: {dichVu.dichVu} - {dichVu.chiPhi.toLocaleString()} VNĐ
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal thêm khách hàng */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Thêm khách hàng mới</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên khách hàng *</label>
                <input
                  type="text"
                  value={newCustomer.ten}
                  onChange={(e) => setNewCustomer({...newCustomer, ten: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập tên khách hàng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại *</label>
                <input
                  type="text"
                  value={newCustomer.sdt}
                  onChange={(e) => setNewCustomer({...newCustomer, sdt: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nhóm</label>
                <input
                  type="text"
                  value={newCustomer.nhom}
                  onChange={(e) => setNewCustomer({...newCustomer, nhom: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập nhóm"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddCustomer}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm xe */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Thêm xe mới</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Biển số *</label>
                <input
                  type="text"
                  value={newCar.bienSo}
                  onChange={(e) => setNewCar({...newCar, bienSo: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập biển số"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Model *</label>
                <input
                  type="text"
                  value={newCar.model}
                  onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập model"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">VIN *</label>
                <input
                  type="text"
                  value={newCar.VIN}
                  onChange={(e) => setNewCar({...newCar, VIN: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập số VIN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chủ sở hữu *</label>
                <input
                  type="text"
                  value={newCar.chuSoHuu}
                  onChange={(e) => setNewCar({...newCar, chuSoHuu: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Nhập tên chủ sở hữu"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddCar}
                className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowAddCarModal(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhachHangXe;