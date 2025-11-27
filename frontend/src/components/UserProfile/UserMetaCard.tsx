import { useEffect, useState } from "react";

interface ChuXe {
  chuXeId: number;
  hoTen: string;
  cccd: string;
  sdt: string;
  gplx: string;
  gplxAnh?: string;
  diaChi: string;
}

export default function UserAvatarCard() {
  const [chuXe, setChuXe] = useState<ChuXe | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      if (currentUser.loaiNguoiDung === "KHACH_HANG" && currentUser.chuXeId) {
        setChuXe({
          chuXeId: currentUser.chuXeId,
          hoTen: currentUser.hoTen,
          cccd: currentUser.cccd,
          sdt: currentUser.sdt,
          gplx: currentUser.gplx,
          gplxAnh: currentUser.gplxAnh,
          diaChi: currentUser.diaChi
        });
      }
    }
  }, []);

  if (!chuXe) return <div>Không tìm thấy thông tin chủ xe</div>;

  return (
    <div className="p-6 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white shadow-sm w-full max-w-2xl mx-auto flex flex-col items-center gap-4">

      {/* Avatar mặc định */}
      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
        <img
          src="http://localhost:8080/uploads/avatar.jpg"
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Họ tên lấy từ localStorage */}
      <h2 className="text-lg font-semibold text-gray-800">{chuXe.hoTen}</h2>
    </div>
  );
}
