import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignUpForm() {
  const navigate = useNavigate();

  // States cho form
  const [formData, setFormData] = useState({
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

  // Hàm upload ảnh GPLX
  const uploadGplxImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8080/api/upload/gplx", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Upload ảnh thất bại");
    }

    const data = await res.json();
    return data.filePath; // Trả về đường dẫn ảnh
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      let gplxAnh = "";

      // Upload ảnh GPLX nếu có file
      if (gplxFile) {
        try {
          gplxAnh = await uploadGplxImage(gplxFile);
          console.log("Ảnh GPLX uploaded:", gplxAnh);
        } catch (uploadError) {
          setError(`Lỗi upload ảnh: ${uploadError.message}`);
          setUploading(false);
          return;
        }
      } else {
        setError("Vui lòng chọn ảnh GPLX");
        setUploading(false);
        return;
      }

      // Gửi thông tin đăng ký
      const res = await fetch("http://localhost:8080/api/auth/dang-ky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenDangNhap: formData.email,
          email: formData.email,
          matKhau: formData.matKhau,
          loaiNguoiDung: "KHACH_HANG",
          hoTen: formData.hoTen,
          cccd: formData.cccd,
          sdt: formData.sdt,
          gplx: formData.gplx,
          gplxAnh: gplxAnh, // Thêm đường dẫn ảnh
          diaChi: formData.diaChi,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Đăng ký thất bại");
        return;
      }

      navigate("/signin");
    } catch (err) {
      console.error(err);
      setError("Lỗi server, vui lòng thử lại sau");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        setError("Vui lòng chọn file ảnh");
        return;
      }
      // Kiểm tra kích thước file (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File ảnh không được vượt quá 10MB");
        return;
      }
      setGplxFile(file);
      setError("");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 text-title-md font-semibold text-gray-800 dark:text-white/90">
            Đăng ký
          </h1>
          {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Họ và tên *</Label>
              <Input
                type="text"
                value={formData.hoTen}
                onChange={(e) => handleChange("hoTen")(e.target.value)}
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email")(e.target.value)}
                placeholder="Nhập email"
              />
            </div>
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
                value={formData.cccd}
                onChange={(e) => handleChange("cccd")(e.target.value)}
                placeholder="Nhập CCCD"
              />
            </div>
            <div>
              <Label>Số điện thoại *</Label>
              <Input
                type="text"
                value={formData.sdt}
                onChange={(e) => handleChange("sdt")(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <Label>Số GPLX *</Label>
              <Input
                type="text"
                value={formData.gplx}
                onChange={(e) => handleChange("gplx")(e.target.value)}
                placeholder="Nhập số GPLX"
              />
            </div>
            <div>
              <Label>Ảnh GPLX *</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-900 dark:file:text-brand-300"
              />
              {gplxFile && (
                <p className="mt-1 text-sm text-green-600">
                  Đã chọn: {gplxFile.name}
                </p>
              )}
            </div>
            <div>
              <Label>Địa chỉ *</Label>
              <Input
                type="text"
                value={formData.diaChi}
                onChange={(e) => handleChange("diaChi")(e.target.value)}
                placeholder="Nhập địa chỉ"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={uploading}
            >
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
    </div>
  );
}