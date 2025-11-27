import { useEffect, useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";

interface NguoiDung {
  nguoiDungId: number;
  tenDangNhap: string;
  matKhau: string;
  email: string;
}

export default function UserAccountCard() {
  const [user, setUser] = useState<NguoiDung | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      setUser({
        nguoiDungId: currentUser.nguoiDungId,
        tenDangNhap: currentUser.tenDangNhap,
        matKhau: currentUser.matKhau,
        email: currentUser.email,
      });
    }
  }, []);

  if (!user) return <div>Không tìm thấy thông tin người dùng</div>;

  return (
    <div className="p-6 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white shadow-sm w-full mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-6">Tài khoản</h2>
      {/* Thông tin */}
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs text-gray-500">Tên đăng nhập</p>
          <p className="text-sm font-medium text-gray-800">{user.tenDangNhap}</p>
        </div>

        <div>
          <p className="mb-1 text-xs text-gray-500">Email</p>
          <p className="text-sm font-medium text-gray-800">{user.email}</p>
        </div>

        <div>
          <p className="mb-1 text-xs text-gray-500">Mật khẩu</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-800">
              {showPassword ? "123" : "********"}
            </p>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
              {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
