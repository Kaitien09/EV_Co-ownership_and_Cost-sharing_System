// src/services/nhomService.ts
const API_BASE = 'http://localhost:8080/api';

export interface NhomDongSoHuu {
    nhomId: number;
    tenNhom: string;
    soThanhVien: number;
}

export const nhomService = {
    // Lấy tất cả nhóm
    getAllNhom: async (): Promise<NhomDongSoHuu[]> => {
        const res = await fetch(`${API_BASE}/nhom`);
        if (!res.ok) throw new Error('Không thể lấy danh sách nhóm');
        return res.json();
    },

    // Lấy nhóm theo id
    getNhomById: async (id: number): Promise<NhomDongSoHuu> => {
        const res = await fetch(`${API_BASE}/nhom/${id}`);
        if (!res.ok) throw new Error('Không tìm thấy nhóm');
        return res.json();
    },

    // Tạo nhóm mới
    createNhom: async (nhom: Partial<NhomDongSoHuu>): Promise<NhomDongSoHuu> => {
        const res = await fetch(`${API_BASE}/nhom`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nhom),
        });
        if (!res.ok) throw new Error('Tạo nhóm thất bại');
        return res.json();
    },

    // Cập nhật nhóm
    updateNhom: async (id: number, nhom: Partial<NhomDongSoHuu>): Promise<NhomDongSoHuu> => {
        const res = await fetch(`${API_BASE}/nhom/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nhom),
        });
        if (!res.ok) throw new Error('Cập nhật nhóm thất bại');
        return res.json();
    },

    // Xóa nhóm
    deleteNhom: async (id: number): Promise<void> => {
        const res = await fetch(`${API_BASE}/nhom/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Xóa nhóm thất bại');
    }
};
