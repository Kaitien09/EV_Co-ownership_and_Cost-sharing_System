const API_BASE = 'http://localhost:8080/api';

export const thanhToanService = {
  getByChuXe: async (chuXeId: number) => {
    const response = await fetch(`${API_BASE}/thanh-toan/chu-xe/${chuXeId}`);
    if (!response.ok) throw new Error('Không thể lấy thanh toán');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${API_BASE}/thanh-toan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chuXe: { chuXeId: Number(data.chuXeId) },
        chiaChiPhi: { chiaChiPhiId: Number(data.chiaChiPhiId) },
        maGiaoDich: data.maGiaoDich || null
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Tạo thanh toán thất bại");
    }

    return response.json();
  }
};
