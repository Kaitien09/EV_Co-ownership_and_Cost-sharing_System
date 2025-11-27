import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { authService, uploadService } from "../../services/api";

export default function SignUpForm() {
  const navigate = useNavigate();

  // States cho form
  const [formData, setFormData] = useState({
    tenDangNhap: "",
    hoTen: "",
    email: "",
    matKhau: "",
    cccd: "",
    sdt: "",
    gplx: "",
    diaChi: ""
  });
  const [gplxFile, setGplxFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    if (!formData.tenDangNhap || !formData.email || !formData.matKhau || !gplxFile) {
      setError("Vui lòng điền đầy đủ thông tin và chọn ảnh GPLX");
      setUploading(false);
      return;
    }

    try {
      let gplxAnh = "";
      if (gplxFile) {
        const uploadResult = await uploadService.uploadGplx(gplxFile);
        gplxAnh = uploadResult.filePath;
      }

      await authService.register({
        tenDangNhap: formData.tenDangNhap,
        email: formData.email,
        matKhau: formData.matKhau,
        loaiNguoiDung: "KHACH_HANG",
        hoTen: formData.hoTen,
        cccd: formData.cccd,
        sdt: formData.sdt,
        gplx: formData.gplx,
        gplxAnh: gplxAnh,
        diaChi: formData.diaChi,
      });

      navigate("/signin");
    } catch (err: any) {
      setError(err.message || "Lỗi server, vui lòng thử lại sau");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Vui lòng chọn file ảnh");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File ảnh không được vượt quá 10MB");
        return;
      }
      setGplxFile(file);
      setError("");
    }
  };

  return (
    <div className="flex justify-center w-full p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Tiêu đề */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">
          Đăng ký
        </h1>
        <h2 className="text-sm font-medium text-center text-blue-600 mb-6">
          Chào mừng bạn đến với EVCS<br />
          Hệ thống đồng sở hữu và chia sẻ chi phí xe điện!
        </h2>

        {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên đăng nhập */}
          <div>
            <Label>Tên đăng nhập *</Label>
            <Input
              type="text"
              value={formData.tenDangNhap}
              onChange={(e) => handleChange("tenDangNhap")(e.target.value)}
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email")(e.target.value)}
              placeholder="Nhập email"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <Label>Mật khẩu *</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.matKhau}
                onChange={(e) => handleChange("matKhau")(e.target.value)}
                placeholder="Nhập mật khẩu"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
              </span>
            </div>
          </div>

          {/* Họ tên */}
          <div>
            <Label>Họ và tên *</Label>
            <Input
              type="text"
              value={formData.hoTen}
              onChange={(e) => handleChange("hoTen")(e.target.value)}
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* CCCD */}
          <div>
            <Label>CCCD *</Label>
            <Input
              type="text"
              value={formData.cccd}
              onChange={(e) => handleChange("cccd")(e.target.value)}
              placeholder="Nhập CCCD"
            />
          </div>

          {/* SĐT */}
          <div>
            <Label>Số điện thoại *</Label>
            <Input
              type="text"
              value={formData.sdt}
              onChange={(e) => handleChange("sdt")(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* GPLX */}
          <div>
            <Label>Số GPLX *</Label>
            <Input
              type="text"
              value={formData.gplx}
              onChange={(e) => handleChange("gplx")(e.target.value)}
              placeholder="Nhập số GPLX"
            />
          </div>

          {/* Ảnh GPLX */}
          <div>
            <Label>Ảnh GPLX *</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-900 dark:file:text-brand-300"
            />
            {gplxFile && (
              <p className="mt-1 text-sm text-green-600 text-center">
                Đã chọn: {gplxFile.name}
              </p>
            )}
          </div>

          {/* Địa chỉ */}
          <div>
            <Label>Địa chỉ *</Label>
            <Input
              type="text"
              value={formData.diaChi}
              onChange={(e) => handleChange("diaChi")(e.target.value)}
              placeholder="Nhập địa chỉ"
            />
          </div>

          {/* Nút submit */}
          <Button type="submit" className="w-full" disabled={uploading}>
            {uploading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          Bạn đã có tài khoản?{" "}
          <Link to="/signin" className="text-brand-500 hover:text-brand-600">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
