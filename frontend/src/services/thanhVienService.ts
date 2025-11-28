const API_BASE = 'http://localhost:8080/api';

export interface ThanhVienNhom {
    thanhVienNhomId: number;
    nhom: {
        nhomId: number;
        tenNhom: string;
    };
    chuXe: {
        chuXeId: number;
        hoTen: string;
        sdt: string;
    };
    xe: {
        xeId: number;
        model: string;
        bienSo: string;
    };
    tyLeSoHuu: number;
    vaiTro: 'TRUONG_NHOM' | 'THANH_VIEN';
    ngayThamGia: string;
}

export const thanhVienService = {
    // Lấy thành viên theo nhóm
    getByNhom: async (nhomId: number): Promise<ThanhVienNhom[]> => {
        const response = await fetch(`${API_BASE}/thanh-vien/nhom/${nhomId}`);
        if (!response.ok) throw new Error('Không thể lấy danh sách thành viên');
        return response.json();
    },

    // Thêm thành viên
    addThanhVien: async (data: {
        nhomId: number;
        chuXeId: number;
        xeId: number;
        tyLeSoHuu: number;
        vaiTro?: 'TRUONG_NHOM' | 'THANH_VIEN';
    }): Promise<ThanhVienNhom> => {
        const response = await fetch(`${API_BASE}/thanh-vien`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nhom: { nhomId: data.nhomId },
                chuXe: { chuXeId: data.chuXeId },
                xe: { xeId: data.xeId },
                tyLeSoHuu: data.tyLeSoHuu,
                vaiTro: data.vaiTro || 'THANH_VIEN'
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Thêm thành viên thất bại');
        }

        return response.json();
    },

    // Cập nhật vai trò
    updateVaiTro: async (thanhVienId: number, vaiTro: 'TRUONG_NHOM' | 'THANH_VIEN'): Promise<ThanhVienNhom> => {
        const response = await fetch(`${API_BASE}/thanh-vien/${thanhVienId}/vai-tro?vaiTro=${vaiTro}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error('Cập nhật vai trò thất bại');
        }

        return response.json();
    },

    // Xóa thành viên
    removeThanhVien: async (thanhVienId: number): Promise<void> => {
        const response = await fetch(`${API_BASE}/thanh-vien/${thanhVienId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Xóa thành viên thất bại');
        }
    },

    // Cập nhật tỷ lệ sở hữu
    updateTyLeSoHuu: async (thanhVienId: number, tyLeSoHuu: number): Promise<ThanhVienNhom> => {
        const response = await fetch(`${API_BASE}/thanh-vien/${thanhVienId}/ty-le-so-huu?tyLeSoHuu=${tyLeSoHuu}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error('Cập nhật tỷ lệ sở hữu thất bại');
        }

        return response.json();
    }
};