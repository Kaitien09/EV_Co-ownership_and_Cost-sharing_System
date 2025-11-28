const API_BASE = 'http://localhost:8080/api';

export interface NhomDongSoHuu {
    nhomId: number;
    tenNhom: string;
    trangThai: 'HOAT_DONG' | 'NGUNG_HOAT_DONG';
    ngayTao: string;
    thanhVien: any[];
}

export const nhomService = {
    // Lấy tất cả nhóm
    getAllNhom: async (): Promise<NhomDongSoHuu[]> => {
        const response = await fetch(`${API_BASE}/nhom`);
        if (!response.ok) throw new Error('Không thể lấy danh sách nhóm');
        return response.json();
    },

    // Lấy nhóm theo id
    getNhomById: async (id: number): Promise<NhomDongSoHuu> => {
        const response = await fetch(`${API_BASE}/nhom/${id}`);
        if (!response.ok) throw new Error('Không tìm thấy nhóm');
        return response.json();
    },

    // Tạo nhóm mới
    createNhom: async (nhom: { tenNhom: string }): Promise<NhomDongSoHuu> => {
        const response = await fetch(`${API_BASE}/nhom`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nhom),
        });
        if (!response.ok) throw new Error('Tạo nhóm thất bại');
        return response.json();
    },

    // Cập nhật nhóm
    updateNhom: async (id: number, nhom: Partial<NhomDongSoHuu>): Promise<NhomDongSoHuu> => {
        const response = await fetch(`${API_BASE}/nhom/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nhom),
        });
        if (!response.ok) throw new Error('Cập nhật nhóm thất bại');
        return response.json();
    },

    // Xóa nhóm
    deleteNhom: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE}/nhom/${id}`, { 
            method: 'DELETE' 
        });
        if (!response.ok) throw new Error('Xóa nhóm thất bại');
    }
};