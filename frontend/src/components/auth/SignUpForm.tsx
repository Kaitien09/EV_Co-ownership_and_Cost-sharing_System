import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function SignUpForm() {
  const navigate = useNavigate();

  // States cho form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cccd, setCccd] = useState("");
  const [sdt, setSdt] = useState("");
  const [gplx, setGplx] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/dang-ky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenDangNhap: email,
          email,
          matKhau: password,
          loaiNguoiDung: "KHACH_HANG",
          hoTen: firstName + " " + lastName,
          cccd,
          sdt,
          gplx,
          diaChi,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Đăng ký thất bại");
        return;
      }

      // Thành công -> chuyển sang SignIn
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setError("Lỗi server, vui lòng thử lại sau");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 text-title-md font-semibold text-gray-800 dark:text-white/90">
            Sign Up
          </h1>
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            Enter your information to create an account.
          </p>
          {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm">
              <div>
                <Label>Họ và tên *</Label>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label>Password *</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </span>
              </div>
            </div>
            <div>
              <Label>CCCD *</Label>
              <Input
                type="text"
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
                placeholder="Nhập CCCD"
              />
            </div>
            <div>
              <Label>Số điện thoại *</Label>
              <Input
                type="text"
                value={sdt}
                onChange={(e) => setSdt(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <Label>GPLX *</Label>
              <Input
                type="text"
                value={gplx}
                onChange={(e) => setGplx(e.target.value)}
                placeholder="Nhập GPLX"
              />
            </div>
            <div>
              <Label>Địa chỉ *</Label>
              <Input
                type="text"
                value={diaChi}
                onChange={(e) => setDiaChi(e.target.value)}
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                I agree to the Terms and Privacy Policy
              </p>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-brand-500 hover:text-brand-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
