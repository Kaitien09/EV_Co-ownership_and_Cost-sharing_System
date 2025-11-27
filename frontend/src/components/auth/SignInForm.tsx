import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { authService } from "../../services/api";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = await authService.login(username, password);

      localStorage.setItem("user", JSON.stringify(userData));

      const role = userData.loaiNguoiDung;
      if (role === "KHACH_HANG") {
        window.location.href = "/";
      } else if (role === "ADMIN") {
        window.location.href = "/admin";
      } else if (role === "NHAN_VIÊN") {
        window.location.href = "/nhanvien";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err.message || "Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Tiêu đề */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">
          Đăng nhập
        </h1>
        <h2 className="text-sm font-medium text-center text-blue-600 mb-6">
          Chào mừng bạn đến với EVCS<br />
          Hệ thống đồng sở hữu và chia sẻ chi phí xe điện!
        </h2>

        {error && (
          <div className="p-3 mb-4 text-red-500 bg-red-100 border border-red-400 rounded-md dark:bg-red-900/20 dark:border-red-800 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Tên đăng nhập *</Label>
            <Input
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <Label>Mật khẩu *</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          Bạn chưa có tài khoản?{" "}
          <Link to="/signup" className="text-brand-500 hover:text-brand-600">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
