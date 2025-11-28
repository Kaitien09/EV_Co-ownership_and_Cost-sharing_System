const API_BASE = 'http://localhost:8080/api';

export const chiPhiService = {
  // Lấy chi phí theo nhóm
  getByNhom: async (nhomId: number) => {
    const response = await fetch(`${API_BASE}/chi-phi/nhom/${nhomId}`);
    if (!response.ok) throw new Error('Không thể lấy chi phí');
    return response.json();
  },

  // Tạo chi phí mới
  create: async (data: any) => {
    const response = await fetch(`${API_BASE}/chi-phi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nhom: { nhomId: Number(data.nhomId) },
        loaiChiPhi: data.loaiChiPhi,
        soTien: Number(data.soTien),
        ngayPhatSinh: data.ngayPhatSinh,
        ghiChu: data.ghiChu
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Tạo chi phí thất bại");
    }

    return response.json();
  }
};
