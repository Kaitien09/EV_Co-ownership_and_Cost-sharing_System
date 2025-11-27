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

export default function UserInfoCard() {
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
    <div className="p-6 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white shadow-sm w-full mx-auto space-y-6">

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs text-gray-500">CCCD</p>
          <p className="text-sm font-medium text-gray-800">{chuXe.cccd}</p>
        </div>

        <div>
          <p className="mb-1 text-xs text-gray-500">Số điện thoại</p>
          <p className="text-sm font-medium text-gray-800">{chuXe.sdt}</p>
        </div>

        <div>
          <p className="mb-1 text-xs text-gray-500">Địa chỉ</p>
          <p className="text-sm font-medium text-gray-800">{chuXe.diaChi}</p>
        </div>

        <div>
          <p className="mb-1 text-xs text-gray-500">GPLX</p>
          <p className="text-sm font-medium text-gray-800">{chuXe.gplx}</p>
        </div>
      </div>

      {/* Ảnh GPLX ở cuối */}
      {chuXe.gplxAnh && (
        <div className="mt-6">
          <img
            src={`http://localhost:8080/uploads/${chuXe.gplxAnh}`}
            alt="GPLX"
            className="w-32 h-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
}
