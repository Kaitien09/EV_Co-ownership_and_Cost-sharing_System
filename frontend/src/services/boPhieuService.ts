const API_BASE = 'http://localhost:8080/api';

export interface BoPhieuNhom {
    boPhieuId: number;
    nhom: {
        nhomId: number;
        tenNhom: string;
    };
    tieuDe: string;
    moTa?: string;
    trangThai: 'DANG_THUC_HIEN' | 'HOAN_THANH';
    ngayTao: string;
    ngayKetThuc?: string;
}

export const boPhieuService = {
    // Lấy bỏ phiếu theo nhóm
    getByNhom: async (nhomId: number): Promise<BoPhieuNhom[]> => {
        const response = await fetch(`${API_BASE}/bo-phieu/nhom/${nhomId}`);
        if (!response.ok) throw new Error('Không thể lấy danh sách bỏ phiếu');
        return response.json();
    },

    // Tạo bỏ phiếu mới
    create: async (data: {
        nhomId: number;
        tieuDe: string;
        moTa?: string;
        ngayKetThuc?: string;
    }): Promise<BoPhieuNhom> => {
        const response = await fetch(`${API_BASE}/bo-phieu`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nhom: { nhomId: data.nhomId },
                tieuDe: data.tieuDe,
                moTa: data.moTa,
                ngayKetThuc: data.ngayKetThuc
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Tạo bỏ phiếu thất bại');
        }

        return response.json();
    },

    // Kết thúc bỏ phiếu
    ketThuc: async (boPhieuId: number): Promise<BoPhieuNhom> => {
        const response = await fetch(`${API_BASE}/bo-phieu/${boPhieuId}/ket-thuc`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Kết thúc bỏ phiếu thất bại');
        }

        return response.json();
    },

    // Xóa bỏ phiếu
    delete: async (boPhieuId: number): Promise<void> => {
        const response = await fetch(`${API_BASE}/bo-phieu/${boPhieuId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Xóa bỏ phiếu thất bại');
        }
    }
};