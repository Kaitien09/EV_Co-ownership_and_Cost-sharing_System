const API_BASE = 'http://localhost:8080/api';

export const chiaChiPhiService = {
  getByNhom: async (nhomId: number) => {
    const response = await fetch(`${API_BASE}/chia-chi-phi/nhom/${nhomId}`);
    if (!response.ok) throw new Error('Không thể lấy chia chi phí');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${API_BASE}/chia-chi-phi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chiPhi: { chiPhiId: Number(data.chiPhiId) },
        chuXe: { chuXeId: Number(data.chuXeId) },
        soTienPhaiTra: Number(data.soTienPhaiTra),
        ghiChu: data.ghiChu
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Chia chi phí thất bại");
    }

    return response.json();
  }
};
