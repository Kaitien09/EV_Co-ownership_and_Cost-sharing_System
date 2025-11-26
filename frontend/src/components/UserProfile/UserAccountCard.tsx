import { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
//import { nguoiDungService } from "../../services/api";

export default function UserAccountCard() {
  const [userData, setUserData] = useState<any>(null);
  const [editingField, setEditingField] = useState<"email" | "password" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy user hiện tại
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await nguoiDungService.getCurrentUser();
        setUserData(user);
      } catch (err: any) {
        console.error("Không lấy được thông tin user", err);
        setError("Không lấy được thông tin user");
      }
    };
    fetchUser();
  }, []);

  if (!userData) return <div>Loading...</div>;

  // ==== Update email ====
  const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const newEmail = formData.get("email") as string;

    try {
      const updated = await nguoiDungService.updateMyEmail(newEmail);
      setUserData(updated);
      setEditingField(null);
    } catch (err: any) {
      setError(err.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  // ==== Update password ====
  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    try {
      await nguoiDungService.updateMyPassword(oldPassword, newPassword);
      alert("Đổi mật khẩu thành công!");
      setEditingField(null);
    } catch (err: any) {
      setError(err.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Tài khoản của bạn
      </h4>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="mb-2 text-xs text-gray-500">Tên đăng nhập</p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">{userData.tenDangNhap}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="mb-2 text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{userData.email}</p>
          </div>
          <Button size="sm" onClick={() => setEditingField("email")}>Chỉnh sửa</Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="mb-2 text-xs text-gray-500">Mật khẩu</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">********</p>
          </div>
          <Button size="sm" onClick={() => setEditingField("password")}>Đổi mật khẩu</Button>
        </div>
      </div>

      {/* Modal */}
      {editingField && (
        <Modal isOpen={true} onClose={() => setEditingField(null)} className="max-w-[500px] m-4">
          <div className="p-6 bg-white rounded-2xl dark:bg-gray-900">
            {editingField === "email" && (
              <form onSubmit={handleUpdateEmail} className="flex flex-col gap-4">
                <h4 className="text-xl font-semibold">Cập nhật Email</h4>
                {error && <p className="text-red-500">{error}</p>}
                <Label htmlFor="email">Email mới</Label>
                <Input id="email" name="email" type="email" defaultValue={userData.email} required />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => setEditingField(null)}>Hủy</Button>
                  <Button type="submit" disabled={loading}>{loading ? "Đang lưu..." : "Cập nhật"}</Button>
                </div>
              </form>
            )}

            {editingField === "password" && (
              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                <h4 className="text-xl font-semibold">Đổi mật khẩu</h4>
                {error && <p className="text-red-500">{error}</p>}
                <Label htmlFor="oldPassword">Mật khẩu cũ</Label>
                <Input id="oldPassword" name="oldPassword" type="password" required />
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input id="newPassword" name="newPassword" type="password" required />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => setEditingField(null)}>Hủy</Button>
                  <Button type="submit" disabled={loading}>{loading ? "Đang lưu..." : "Đổi mật khẩu"}</Button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
