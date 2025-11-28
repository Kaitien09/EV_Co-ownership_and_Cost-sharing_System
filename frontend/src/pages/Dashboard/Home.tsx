import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";

// Interface dựa trên database
interface UserBooking {
  id: number;
  licensePlate: string;
  startDate: string;
  endDate: string;
  distance: number;
  energyConsumed: number;
  startLocation: string;
  endLocation: string;
  status: string;
}

interface VehicleDistanceData {
  vehicle: string;
  userDistance: number;
  totalDistance: number;
  ownership: number;
  model: string;
  maxRange: number;
}

interface DailyUsageData {
  day: string;
  vehicles: {
    licensePlate: string;
    hours: number;
    distance: number;
    energyConsumed: number;
  }[];
}

// Mock data dựa trên database thực tế
const mockUserBookings: UserBooking[] = [
  {
    id: 1,
    licensePlate: "30A-11111",
    startDate: "2025-11-26T08:00:00",
    endDate: "2025-11-26T12:00:00",
    distance: 50,
    energyConsumed: 20,
    startLocation: "Diem xuat phat A",
    endLocation: "Tram A",
    status: "DA_XAC_NHAN"
  },
  {
    id: 2,
    licensePlate: "30A-11111",
    startDate: "2025-11-27T09:00:00",
    endDate: "2025-11-27T13:00:00",
    distance: 60,
    energyConsumed: 25,
    startLocation: "Diem xuat phat B",
    endLocation: "Tram B",
    status: "CHO_XAC_NHAN"
  },
  {
    id: 3,
    licensePlate: "30A-22222",
    startDate: "2025-11-28T10:00:00",
    endDate: "2025-11-28T14:00:00",
    distance: 70,
    energyConsumed: 30,
    startLocation: "Diem xuat phat C",
    endLocation: "Tram C",
    status: "DA_XAC_NHAN"
  },
];

// Dữ liệu quãng đường theo xe từ database
const mockDistanceData: VehicleDistanceData[] = [
  {
    vehicle: "30A-11111",
    userDistance: 110,
    totalDistance: 300,
    ownership: 50,
    model: "Model X1",
    maxRange: 300
  },
  {
    vehicle: "30A-22222",
    userDistance: 70,
    totalDistance: 350,
    ownership: 70,
    model: "Model X2",
    maxRange: 350
  },
  {
    vehicle: "30A-33333",
    userDistance: 0,
    totalDistance: 320,
    ownership: 60,
    model: "Model X3",
    maxRange: 320
  },
];

// Dữ liệu thời gian sử dụng theo ngày trong tuần cho từng xe
const mockUsageData: DailyUsageData[] = [
  {
    day: "Thứ 2",
    vehicles: [
      { licensePlate: "30A-11111", hours: 4, distance: 45, energyConsumed: 18 },
      { licensePlate: "30A-22222", hours: 2, distance: 25, energyConsumed: 10 },
      { licensePlate: "30A-33333", hours: 0, distance: 0, energyConsumed: 0 }
    ]
  },
  {
    day: "Thứ 3",
    vehicles: [
      { licensePlate: "30A-11111", hours: 3, distance: 35, energyConsumed: 14 },
      { licensePlate: "30A-22222", hours: 6, distance: 65, energyConsumed: 26 },
      { licensePlate: "30A-33333", hours: 1, distance: 15, energyConsumed: 6 }
    ]
  },
  {
    day: "Thứ 4",
    vehicles: [
      { licensePlate: "30A-11111", hours: 8, distance: 90, energyConsumed: 36 },
      { licensePlate: "30A-22222", hours: 0, distance: 0, energyConsumed: 0 },
      { licensePlate: "30A-33333", hours: 2, distance: 25, energyConsumed: 10 }
    ]
  },
  {
    day: "Thứ 5",
    vehicles: [
      { licensePlate: "30A-11111", hours: 2, distance: 20, energyConsumed: 8 },
      { licensePlate: "30A-22222", hours: 5, distance: 55, energyConsumed: 22 },
      { licensePlate: "30A-33333", hours: 3, distance: 35, energyConsumed: 14 }
    ]
  },
  {
    day: "Thứ 6",
    vehicles: [
      { licensePlate: "30A-11111", hours: 7, distance: 80, energyConsumed: 32 },
      { licensePlate: "30A-22222", hours: 4, distance: 45, energyConsumed: 18 },
      { licensePlate: "30A-33333", hours: 1, distance: 15, energyConsumed: 6 }
    ]
  },
  {
    day: "Thứ 7",
    vehicles: [
      { licensePlate: "30A-11111", hours: 9, distance: 100, energyConsumed: 40 },
      { licensePlate: "30A-22222", hours: 3, distance: 35, energyConsumed: 14 },
      { licensePlate: "30A-33333", hours: 0, distance: 0, energyConsumed: 0 }
    ]
  },
  {
    day: "CN",
    vehicles: [
      { licensePlate: "30A-11111", hours: 1, distance: 10, energyConsumed: 4 },
      { licensePlate: "30A-22222", hours: 2, distance: 25, energyConsumed: 10 },
      { licensePlate: "30A-33333", hours: 3, distance: 35, energyConsumed: 14 }
    ]
  },
];

// Màu sắc cho từng xe dựa trên database
const vehicleColors: { [key: string]: string } = {
  "30A-11111": "#FF6B6B", // Đỏ cam - Model X1
  "30A-22222": "#4ECDC4", // Xanh ngọc - Model X2
  "30A-33333": "#FFD93D", // Vàng - Model X3
  "30A-44444": "#6BCF7F", // Xanh lá - Model X4
  "30A-55555": "#FF8B94", // Hồng - Model X5
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<UserBooking[]>(mockUserBookings);
  const [distanceData, setDistanceData] = useState<VehicleDistanceData[]>(mockDistanceData);
  const [usageData, setUsageData] = useState<DailyUsageData[]>(mockUsageData);

  // Lấy ngày có lịch trong tháng
  const getBookedDates = () => {
    const bookedDates = new Set();
    bookings.forEach(booking => {
      const date = new Date(booking.startDate).getDate();
      bookedDates.add(date);
    });
    return bookedDates;
  };

  // Tạo lịch tháng
  const renderMiniCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const bookedDates = getBookedDates();

    const days = [];

    // Ô trống cho các ngày đầu tháng
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const isBooked = bookedDates.has(day);
      const isToday = new Date().getDate() === day &&
                     new Date().getMonth() === month &&
                     new Date().getFullYear() === year;

      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-full border ${
            isToday
              ? 'bg-blue-500 text-white border-blue-500'
              : isBooked
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'border-gray-200 text-gray-700'
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const calculateUsageHours = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    return Math.round(diffMs / (1000 * 60 * 60));
  };

  // Tính toán điểm cho biểu đồ đường của từng xe
  const calculateLinePoints = (vehiclePlate: string) => {
    const vehicleData = usageData.map(day =>
      day.vehicles.find(v => v.licensePlate === vehiclePlate)?.hours || 0
    );

    const maxHours = Math.max(...vehicleData);
    if (maxHours === 0) return "";

    const points = vehicleData.map((hours, index) => {
      const x = (index / (vehicleData.length - 1)) * 100;
      const y = 100 - (hours / maxHours) * 80; // Để lại 20% khoảng trống ở trên
      return `${x},${y}`;
    }).join(' ');
    return points;
  };

  // Lấy tổng thời gian sử dụng của một xe trong tuần
  const getTotalHoursByVehicle = (vehiclePlate: string) => {
    return usageData.reduce((total, day) => {
      const vehicle = day.vehicles.find(v => v.licensePlate === vehiclePlate);
      return total + (vehicle?.hours || 0);
    }, 0);
  };

  // Lấy tổng quãng đường của một xe trong tuần
  const getTotalDistanceByVehicle = (vehiclePlate: string) => {
    return usageData.reduce((total, day) => {
      const vehicle = day.vehicles.find(v => v.licensePlate === vehiclePlate);
      return total + (vehicle?.distance || 0);
    }, 0);
  };

  // Lấy thông tin xe từ distanceData
  const getVehicleInfo = (licensePlate: string) => {
    return distanceData.find(vehicle => vehicle.vehicle === licensePlate);
  };

  // Tính hiệu suất sử dụng (km/kWh)
  const calculateEfficiency = (distance: number, energy: number) => {
    if (energy === 0) return 0;
    return distance / energy;
  };

  return (
    <>
      <PageMeta
        title="Dashboard Quản lý Đồng Sở hữu Xe | Hệ thống chia sẻ chi phí xe điện"
        description="Dashboard quản lý đồng sở hữu và chia sẻ chi phí xe điện"
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Bên trái - Lịch và danh sách lịch đặt */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          {/* Lịch nhỏ */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Hôm nay
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderMiniCalendar()}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-gray-600">Có lịch đặt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-600">Hôm nay</span>
              </div>
            </div>
          </div>

          {/* Danh sách lịch đặt của tôi */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Lịch đặt của tôi</h3>
            <div className="space-y-3">
              {bookings.slice(0, 10).map(booking => {
                const start = formatDateTime(booking.startDate);
                const end = formatDateTime(booking.endDate);
                const usageHours = calculateUsageHours(booking.startDate, booking.endDate);
                const vehicleInfo = getVehicleInfo(booking.licensePlate);

                return (
                  <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${vehicleColors[booking.licensePlate]}20` }}
                      >
                        <span
                          className="font-semibold text-sm"
                          style={{ color: vehicleColors[booking.licensePlate] }}
                        >
                          🚗
                        </span>
                      </div>
                      <div>
                        <div
                          className="font-medium"
                          style={{ color: vehicleColors[booking.licensePlate] }}
                        >
                          {booking.licensePlate}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicleInfo?.model} • {start.date} • {start.time} - {end.time}
                        </div>
                        <div className="text-xs text-gray-400">
                          {booking.startLocation} → {booking.endLocation}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">{usageHours}h</div>
                      <div className="text-sm text-gray-500">{booking.distance}km</div>
                      <div className="text-xs text-blue-500">{booking.energyConsumed}kWh</div>
                      <div className={`text-xs ${booking.status === 'DA_XAC_NHAN' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {booking.status === 'DA_XAC_NHAN' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bên phải - Biểu đồ thống kê */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          {/* Biểu đồ cột ngang - Quãng đường vs Tỷ lệ sở hữu */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quãng đường sử dụng vs Tỷ lệ sở hữu
            </h3>
            <div className="space-y-4">
              {distanceData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span
                        className="font-medium"
                        style={{ color: vehicleColors[item.vehicle] }}
                      >
                        {item.vehicle}
                      </span>
                      <span className="text-gray-500 ml-2">({item.model})</span>
                    </div>
                    <span className="text-gray-500">
                      {item.userDistance}km / {item.totalDistance}km ({item.ownership}% sở hữu)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${(item.userDistance / item.maxRange) * 100}%`,
                        backgroundColor: vehicleColors[item.vehicle]
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Tỷ lệ sử dụng: {Math.round((item.userDistance / item.maxRange) * 100)}%</span>
                    <span>Còn lại: {item.maxRange - item.userDistance}km</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biểu đồ đường - Thời gian sử dụng theo ngày trong tuần */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thời gian sử dụng xe trong tuần (giờ/ngày)
            </h3>
            <div className="h-64 relative">
              {/* Biểu đồ đường */}
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Đường lưới ngang */}
                {[0, 20, 40, 60, 80, 100].map((y, index) => (
                  <line
                    key={`grid-h-${index}`}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Đường lưới dọc */}
                {usageData.map((_, index) => {
                  const x = (index / (usageData.length - 1)) * 100;
                  return (
                    <line
                      key={`grid-v-${index}`}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="100"
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                  );
                })}

                {/* Vẽ đường cho từng xe */}
                {distanceData.map(vehicle => (
                  <polyline
                    key={vehicle.vehicle}
                    fill="none"
                    stroke={vehicleColors[vehicle.vehicle]}
                    strokeWidth="1.5"
                    points={calculateLinePoints(vehicle.vehicle)}
                  />
                ))}

                {/* Điểm trên biểu đồ cho từng xe */}
                {distanceData.map(vehicle => {
                  const vehicleData = usageData.map(day =>
                    day.vehicles.find(v => v.licensePlate === vehicle.vehicle)?.hours || 0
                  );

                  const maxHours = Math.max(...vehicleData);
                  if (maxHours === 0) return null;

                  return vehicleData.map((hours, index) => {
                    if (hours === 0) return null;

                    const x = (index / (vehicleData.length - 1)) * 100;
                    const y = 100 - (hours / maxHours) * 80;

                    return (
                      <circle
                        key={`${vehicle.vehicle}-${index}`}
                        cx={x}
                        cy={y}
                        r="1.5"
                        fill={vehicleColors[vehicle.vehicle]}
                        className="hover:r-2 transition-all"
                      />
                    );
                  });
                })}
              </svg>

              {/* Trục X - Các ngày trong tuần */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                {usageData.map((day, index) => (
                  <div key={index} className="text-center flex-1">
                    {day.day}
                  </div>
                ))}
              </div>

              {/* Trục Y - Giờ sử dụng */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>10h</span>
                <span>8h</span>
                <span>6h</span>
                <span>4h</span>
                <span>2h</span>
                <span>0h</span>
              </div>
            </div>

            {/* Chú thích màu xe */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs flex-wrap">
              {distanceData.map(vehicle => {
                const totalHours = getTotalHoursByVehicle(vehicle.vehicle);
                const totalDistance = getTotalDistanceByVehicle(vehicle.vehicle);
                const totalEnergy = usageData.reduce((sum, day) => {
                  const vehicleData = day.vehicles.find(v => v.licensePlate === vehicle.vehicle);
                  return sum + (vehicleData?.energyConsumed || 0);
                }, 0);
                const efficiency = calculateEfficiency(totalDistance, totalEnergy);

                return (
                  <div key={vehicle.vehicle} className="flex items-center gap-2">
                    <div
                      className="w-3 h-1.5 rounded-full"
                      style={{ backgroundColor: vehicleColors[vehicle.vehicle] }}
                    ></div>
                    <span className="text-gray-600">
                      {vehicle.vehicle} ({totalHours}h, {totalDistance}km, {efficiency.toFixed(1)}km/kWh)
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Thống kê chi tiết */}
            <div className="mt-4 grid grid-cols-7 gap-2 text-xs">
              {usageData.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-gray-400 mb-1">{day.day}</div>
                  {day.vehicles.map(vehicle => (
                    vehicle.hours > 0 && (
                      <div
                        key={vehicle.licensePlate}
                        className="text-[10px] font-medium mb-0.5"
                        style={{ color: vehicleColors[vehicle.licensePlate] }}
                      >
                        {vehicle.hours}h
                        <br />
                        <span className="text-gray-400">{vehicle.distance}km</span>
                      </div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}