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
      // Nếu là KHACH_HANG thì có chuXe thông tin
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
    <div className="user-info-card p-4 border rounded-md bg-white shadow-sm">
      <h2 className="font-semibold text-lg mb-2">{chuXe.hoTen}</h2>
      <p>Số CCCD: {chuXe.cccd}</p>
      <p>Số điện thoại: {chuXe.sdt}</p>
      <p>GPLX: {chuXe.gplx}</p>
      <p>Địa chỉ: {chuXe.diaChi}</p>
      {chuXe.gplxAnh && (
        <img
          src={`http://localhost:8080/uploads/${chuXe.gplxAnh}`} // URL đầy đủ
          alt="GPLX"
          className="mt-2 w-32 h-auto"
        />
      )}
    </div>
  );
}
