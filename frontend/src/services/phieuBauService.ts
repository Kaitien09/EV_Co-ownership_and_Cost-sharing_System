const API_BASE = 'http://localhost:8080/api';

export interface PhieuBau {
    phieuBauId: number;
    boPhieu: {
        boPhieuId: number;
        tieuDe: string;
    };
    chuXe: {
        chuXeId: number;
        hoTen: string;
    };
    luaChon: 'DONG_Y' | 'TU_CHOI';
    thoiGianBau: string;
    ghiChu?: string;
}

export const phieuBauService = {
    // Lấy phiếu bầu theo bỏ phiếu
    getByBoPhieu: async (boPhieuId: number): Promise<PhieuBau[]> => {
        const response = await fetch(`${API_BASE}/phieu-bau/bo-phieu/${boPhieuId}`);
        if (!response.ok) throw new Error('Không thể lấy danh sách phiếu bầu');
        return response.json();
    },

    // Bỏ phiếu
    bauPhieu: async (data: {
        boPhieuId: number;
        chuXeId: number;
        luaChon: 'DONG_Y' | 'TU_CHOI';
        ghiChu?: string;
    }): Promise<PhieuBau> => {
        const response = await fetch(`${API_BASE}/phieu-bau`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                boPhieu: { boPhieuId: data.boPhieuId },
                chuXe: { chuXeId: data.chuXeId },
                luaChon: data.luaChon,
                ghiChu: data.ghiChu
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Bỏ phiếu thất bại');
        }

        return response.json();
    },

    // Xóa phiếu bầu
    delete: async (phieuBauId: number): Promise<void> => {
        const response = await fetch(`${API_BASE}/phieu-bau/${phieuBauId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Xóa phiếu bầu thất bại');
        }
    }
};