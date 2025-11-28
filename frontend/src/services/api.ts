const API_BASE = 'http://localhost:8080/api';

export const authService = {
  login: async (tenDangNhap: string, matKhau: string) => {
    const response = await fetch(`${API_BASE}/auth/dang-nhap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenDangNhap, matKhau }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Đăng nhập thất bại");
    }

    return response.json();
  },

  register: async (userData: any) => {
    const response = await fetch(`${API_BASE}/auth/dang-ky`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Đăng ký thất bại");
    }

    return response.json();
  }
};

export const chuXeService = {
  // Lấy danh sách chủ xe
  getAllChuXe: async () => {
    const response = await fetch(`${API_BASE}/chu-xe`);

    if (!response.ok) {
      throw new Error('Không thể lấy danh sách chủ xe');
    }

    return response.json();
  },

  // Lấy thông tin chủ xe cụ thể
  getChuXeById: async (chuXeId: number) => {
    const response = await fetch(`${API_BASE}/chu-xe/${chuXeId}`);

    if (!response.ok) {
      throw new Error('Không thể lấy thông tin chủ xe');
    }

    return response.json();
  },

  // Cập nhật thông tin chủ xe
  updateChuXe: async (chuXeId: number, data: any) => {
    const response = await fetch(`${API_BASE}/chu-xe/${chuXeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Cập nhật thông tin thất bại");
    }

    return response.json();
  }
};

export const uploadService = {
  uploadGplx: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE}/upload/gplx`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload ảnh thất bại");
    }

    return response.json();
  }
};

export const xeService = {
  getXeByChuXe: async (chuXeId: number) => {
    const response = await fetch(`${API_BASE}/chu-xe/${chuXeId}/xe`);

    if (!response.ok) {
      throw new Error('Không thể lấy danh sách xe');
    }

    return response.json();
  }
};



