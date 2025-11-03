# 📊 DATABASE ERD - EV CO-OWNERSHIP PLATFORM

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        EV CO-OWNERSHIP DATABASE SCHEMA                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│    nguoi_dung        │ ◄──────────────────────────────────────┐
├──────────────────────┤                                        │
│ PK nguoi_dung_id     │                                        │
│    ten_dang_nhap     │                                        │
│    email             │                                        │
│    mat_khau          │                                        │
│    loai_nguoi_dung   │ (Admin, CoOwner, Staff)              │
│    ngay_tao          │                                        │
│    trang_thai        │                                        │
└──────────────────────┘                                        │
         │                                                      │
         │ 1:1                                                  │
         ▼                                                      │
┌──────────────────────┐                                        │
│      chu_xe          │                                        │
├──────────────────────┤                                        │
│ PK chu_xe_id         │                                        │
│ FK nguoi_dung_id ────┼────┐                                  │
│    ho_ten            │    │                                  │
│    cccd              │    │                                  │
│    sdt               │    │                                  │
│    gplx              │    │                                  │
│    dia_chi           │    │                                  │
│    ngay_tao          │    │                                  │
│    ngay_cap_nhat     │    │                                  │
└──────────────────────┘    │                                  │
         │                  │                                  │
         │ 1:N              │                                  │
         ▼                  │                                  │
┌──────────────────────┐    │                                  │
│  giay_to_chu_xe      │    │                                  │
├──────────────────────┤    │                                  │
│ PK giay_to_id        │    │                                  │
│ FK chu_xe_id ────────┼────┤                                  │
│    loai_giay_to      │    │ (CCCD, GPLX, HoKhau)            │
│    so_giay_to        │    │                                  │
│    ngay_cap          │    │                                  │
│    noi_cap           │    │                                  │
│    hinh_anh_mat_truoc│    │                                  │
│    hinh_anh_mat_sau  │    │                                  │
│    trang_thai_xac_thuc│   │ (ChuaXacThuc, DangChoDuyet,     │
│ FK nguoi_duyet_id ───┼────┼─────────────────────────────────┘
│    ngay_duyet        │    │   DaXacThuc, TuChoi)
│    ly_do_tu_choi     │    │
│    ghi_chu           │    │
│    ngay_tao          │    │
│    ngay_cap_nhat     │    │
└──────────────────────┘    │
                            │
                            │
         ┌──────────────────┤
         │                  │
         │ 1:N              │
         ▼                  │
┌──────────────────────┐    │
│ hop_dong_dong_so_huu │    │
├──────────────────────┤    │
│ PK hop_dong_id       │    │
│ FK chu_xe_id ────────┼────┘
│ FK xe_id ────────────┼────┐
│    ngay_bat_dau      │    │
│    ngay_ket_thuc     │    │
│    trang_thai        │    │ (ChoDuyet, DaDuyet, TuChoi,
│ FK nguoi_duyet_id    │    │  DangHieuLuc, HetHan, DaHuy)
│    ngay_duyet        │    │
│    ly_do_tu_choi     │    │
│    ngay_tao          │    │
│    ngay_cap_nhat     │    │
└──────────────────────┘    │
         │                  │
         │ 1:1              │
         ▼                  │
┌──────────────────────────┐│
│hop_dong_phap_ly_dien_tu ││
├──────────────────────────┤│
│ PK hop_dong_phap_ly_id   ││
│ FK hop_dong_dong_so_huu_id│
│    noi_dung_hop_dong     ││
│    tep_hop_dong          ││ (LONGBLOB - PDF file)
│    chu_ky_dien_tu        ││ (SHA-256 hash)
│ FK nguoi_ky_id           ││
│    ngay_ky               ││
│    trang_thai            ││ (ChuaKy, DaKy, BiHuy)
│    ngay_tao              ││
│    ngay_cap_nhat         ││
└──────────────────────────┘│
                            │
         ┌──────────────────┘
         │
         │ N:1
         ▼
┌──────────────────────┐
│        xe            │
├──────────────────────┤
│ PK xe_id             │
│    ten_xe            │
│    hang_xe           │
│    model             │
│    nam_san_xuat      │
│    bien_so           │
│    gia_tri           │
│    mau_sac           │
│    loai_xe           │
│    dung_luong_pin    │
│    trang_thai        │ (SanSang, DangSuDung, 
│    ngay_tao          │  BaoTri, NgungHoatDong)
│    ngay_cap_nhat     │
└──────────────────────┘
         │
         │ 1:N (Optional)
         ▼
┌──────────────────────┐
│ lich_su_su_dung_xe   │
├──────────────────────┤
│ PK lich_su_id        │
│ FK hop_dong_id       │
│ FK chu_xe_id         │
│ FK xe_id             │
│    ngay_bat_dau      │
│    ngay_ket_thuc     │
│    so_km_bat_dau     │
│    so_km_ket_thuc    │
│    ghi_chu           │
│    ngay_tao          │
└──────────────────────┘

┌──────────────────────┐
│     thanh_toan       │ (Optional)
├──────────────────────┤
│ PK thanh_toan_id     │
│ FK hop_dong_id       │
│ FK chu_xe_id         │
│    so_tien           │
│    loai_thanh_toan   │ (PhiDongSoHuu, PhiSuDung, PhiBaoTri)
│    trang_thai        │ (ChuaThanhToan, DaThanhToan, 
│    ngay_thanh_toan   │  DaHoan, BiHuy)
│    phuong_thuc_tt    │
│    ghi_chu           │
│    ngay_tao          │
└──────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                              RELATIONSHIPS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  nguoi_dung (1) ──── (1) chu_xe                                            │
│     ↓                                                                        │
│     └──────────────┐                                                        │
│                     ↓                                                        │
│  chu_xe (1) ──── (N) giay_to_chu_xe                                        │
│                                                                              │
│  chu_xe (1) ──── (N) hop_dong_dong_so_huu                                  │
│                                                                              │
│  xe (1) ──── (N) hop_dong_dong_so_huu                                      │
│                                                                              │
│  hop_dong_dong_so_huu (1) ──── (1) hop_dong_phap_ly_dien_tu               │
│                                                                              │
│  hop_dong_dong_so_huu (1) ──── (N) lich_su_su_dung_xe                     │
│                                                                              │
│  hop_dong_dong_so_huu (1) ──── (N) thanh_toan                              │
│                                                                              │
│  nguoi_dung (Admin) (1) ──── (N) giay_to_chu_xe.nguoi_duyet_id            │
│  nguoi_dung (Admin) (1) ──── (N) hop_dong_dong_so_huu.nguoi_duyet_id      │
│  nguoi_dung (CoOwner) (1) ──── (N) hop_dong_phap_ly_dien_tu.nguoi_ky_id   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                              KEY FEATURES                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ✅ User Management: Admin, CoOwner, Staff roles                            │
│  ✅ Owner Profiles: Complete KYC information                                │
│  ✅ Document Verification: CCCD, GPLX, HoKhau with approval workflow        │
│  ✅ Vehicle Management: Electric vehicles with detailed specs               │
│  ✅ Contract Management: Co-ownership contracts with approval flow          │
│  ✅ Legal Contracts: Digital contracts with e-signature (SHA-256)           │
│  ✅ Usage Tracking: History of vehicle usage per contract (optional)        │
│  ✅ Payment Management: Track payments and fees (optional)                  │
│  ✅ Auto Timestamps: All tables have ngay_tao, ngay_cap_nhat                │
│  ✅ Auto Expire: Contracts auto-expire via scheduled event                  │
│  ✅ Data Integrity: Foreign keys, constraints, unique indexes               │
│  ✅ Performance: Strategic indexes on all query fields                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                           WORKFLOW EXAMPLE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. USER REGISTRATION                                                        │
│     nguoi_dung (create account) → chu_xe (create profile)                   │
│                                                                              │
│  2. DOCUMENT UPLOAD                                                          │
│     chu_xe → giay_to_chu_xe (upload CCCD, GPLX, HoKhau)                    │
│     Status: ChuaXacThuc → DangChoDuyet → DaXacThuc                          │
│                                                                              │
│  3. CONTRACT CREATION                                                        │
│     chu_xe + xe → hop_dong_dong_so_huu                                      │
│     Status: ChoDuyet → DaDuyet → DangHieuLuc                                │
│                                                                              │
│  4. LEGAL CONTRACT                                                           │
│     hop_dong_dong_so_huu → hop_dong_phap_ly_dien_tu                         │
│     Status: ChuaKy → DaKy (with e-signature)                                │
│                                                                              │
│  5. USAGE & PAYMENT                                                          │
│     hop_dong_dong_so_huu → lich_su_su_dung_xe                              │
│     hop_dong_dong_so_huu → thanh_toan                                       │
│                                                                              │
│  6. CONTRACT EXPIRY                                                          │
│     Auto-update: DangHieuLuc → HetHan (via scheduled event)                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                            INDEX SUMMARY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  nguoi_dung:                                                                 │
│    - idx_nguoi_dung_email (email)                                           │
│    - idx_nguoi_dung_ten_dang_nhap (ten_dang_nhap)                          │
│    - idx_nguoi_dung_loai (loai_nguoi_dung)                                 │
│    - idx_nguoi_dung_trang_thai (trang_thai)                                │
│                                                                              │
│  chu_xe:                                                                     │
│    - idx_chu_xe_nguoi_dung (nguoi_dung_id)                                 │
│    - idx_chu_xe_cccd (cccd)                                                │
│    - idx_chu_xe_sdt (sdt)                                                  │
│                                                                              │
│  xe:                                                                         │
│    - idx_xe_bien_so (bien_so)                                              │
│    - idx_xe_trang_thai (trang_thai)                                        │
│    - idx_xe_hang (hang_xe)                                                 │
│                                                                              │
│  giay_to_chu_xe:                                                            │
│    - idx_giay_to_chu_xe (chu_xe_id)                                        │
│    - idx_giay_to_trang_thai (trang_thai_xac_thuc)                          │
│    - idx_giay_to_loai (loai_giay_to)                                       │
│    - idx_giay_to_nguoi_duyet (nguoi_duyet_id)                              │
│                                                                              │
│  hop_dong_dong_so_huu:                                                       │
│    - idx_hop_dong_chu_xe (chu_xe_id)                                       │
│    - idx_hop_dong_xe (xe_id)                                               │
│    - idx_hop_dong_trang_thai (trang_thai)                                  │
│    - idx_hop_dong_ngay_bat_dau (ngay_bat_dau)                              │
│    - idx_hop_dong_ngay_ket_thuc (ngay_ket_thuc)                            │
│    - idx_hop_dong_nguoi_duyet (nguoi_duyet_id)                             │
│                                                                              │
│  hop_dong_phap_ly_dien_tu:                                                  │
│    - idx_hop_dong_phap_ly_trang_thai (trang_thai)                          │
│    - idx_hop_dong_phap_ly_nguoi_ky (nguoi_ky_id)                           │
│    - idx_hop_dong_phap_ly_ngay_ky (ngay_ky)                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                          STORAGE REQUIREMENTS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Small Scale (< 1000 users):                                                │
│    - Database Size: ~500 MB - 1 GB                                          │
│    - RAM: 2 GB minimum                                                      │
│    - Storage: 10 GB (with backups)                                          │
│                                                                              │
│  Medium Scale (1000 - 10000 users):                                         │
│    - Database Size: 1 GB - 10 GB                                            │
│    - RAM: 4 GB minimum                                                      │
│    - Storage: 50 GB (with backups)                                          │
│                                                                              │
│  Large Scale (> 10000 users):                                               │
│    - Database Size: > 10 GB                                                 │
│    - RAM: 8 GB+ recommended                                                 │
│    - Storage: 100 GB+ (with backups)                                        │
│                                                                              │
│  Note: LONGBLOB fields (images, PDFs) can significantly increase size       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Legend

- **PK** = Primary Key
- **FK** = Foreign Key
- **1:1** = One-to-One relationship
- **1:N** = One-to-Many relationship
- **N:1** = Many-to-One relationship

## Database Type

- **DBMS:** MySQL 8.0+
- **Character Set:** utf8mb4
- **Collation:** utf8mb4_unicode_ci
- **Engine:** InnoDB (supports transactions, foreign keys)

## Created

- **Date:** 2025-11-02
- **Version:** 1.0
- **Project:** EV Co-Ownership Platform
