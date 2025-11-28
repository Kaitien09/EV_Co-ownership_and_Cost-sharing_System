const API_BASE = 'http://localhost:8080/api';

export interface HopDongDongSoHuu {
    hopDongId: number;
    nhom: {
        nhomId: number;
        tenNhom: string;
    };
    xe: {
        xeId: number;
        model: string;
        bienSo: string;
        vin?: string;
    };
    ngayBatDau: string;
    ngayKetThuc?: string;
    trangThai: 'HIEU_LUC' | 'KET_THUC';
    fileHopDong?: string;
    ghiChu?: string;
}

export const hopDongService = {
    getAll: async (): Promise<HopDongDongSoHuu[]> => {
            const response = await fetch(`${API_BASE}/hop-dong`);
            if (!response.ok) throw new Error('Không thể lấy danh sách hợp đồng');
            return response.json();
    },

    // Lấy hợp đồng theo ID
    getById: async (hopDongId: number): Promise<HopDongDongSoHuu> => {
        const response = await fetch(`${API_BASE}/hop-dong/${hopDongId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Không tìm thấy hợp đồng');
            }
            throw new Error('Không thể lấy thông tin hợp đồng');
        }
        return response.json();
    },

    // Lấy hợp đồng theo nhóm
    getByNhom: async (nhomId: number): Promise<HopDongDongSoHuu[]> => {
        const response = await fetch(`${API_BASE}/hop-dong/nhom/${nhomId}`);
        if (!response.ok) throw new Error('Không thể lấy danh sách hợp đồng');
        return response.json();
    },

    // Tạo hợp đồng mới
    create: async (data: {
        nhomId: number;
        xeId: number;
        ngayBatDau: string;
        ngayKetThuc?: string;
        fileHopDong?: string;
        ghiChu?: string;
    }): Promise<HopDongDongSoHuu> => {
        const response = await fetch(`${API_BASE}/hop-dong`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nhom: { nhomId: data.nhomId },
                xe: { xeId: data.xeId },
                ngayBatDau: data.ngayBatDau,
                ngayKetThuc: data.ngayKetThuc,
                fileHopDong: data.fileHopDong,
                ghiChu: data.ghiChu
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Tạo hợp đồng thất bại');
        }

        return response.json();
    },

    // Kết thúc hợp đồng
    ketThuc: async (hopDongId: number): Promise<HopDongDongSoHuu> => {
        const response = await fetch(`${API_BASE}/hop-dong/${hopDongId}/ket-thuc`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Kết thúc hợp đồng thất bại');
        }

        return response.json();
    },

    // Xóa hợp đồng
    delete: async (hopDongId: number): Promise<void> => {
        const response = await fetch(`${API_BASE}/hop-dong/${hopDongId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Xóa hợp đồng thất bại');
        }
    }
};