package com.example.demo.modal;

public class AdminManagement {
    private String danhSoHangThang;
    private String soNguoiDangKy;
    private String tongDoanhSo;
    private String soLuongBanRa;
    public AdminManagement() {  }

    public AdminManagement(String danhSoHangThang, String soNguoiDangKy, String tongDoanhSo, String soLuongBanRa) {
        this.danhSoHangThang = danhSoHangThang;
        this.soNguoiDangKy = soNguoiDangKy;
        this.tongDoanhSo = tongDoanhSo;
        this.soLuongBanRa = soLuongBanRa;
    }

    public String getDanhSoHangThang() {
        return danhSoHangThang;
    }

    public void setDanhSoHangThang(String danhSoHangThang) {
        this.danhSoHangThang = danhSoHangThang;
    }

    public String getSoNguoiDangKy() {
        return soNguoiDangKy;
    }

    public void setSoNguoiDangKy(String soNguoiDangKy) {
        this.soNguoiDangKy = soNguoiDangKy;
    }

    public String getTongDoanhSo() {
        return tongDoanhSo;
    }

    public void setTongDoanhSo(String tongDoanhSo) {
        this.tongDoanhSo = tongDoanhSo;
    }

    public String getSoLuongBanRa() {
        return soLuongBanRa;
    }

    public void setSoLuongBanRa(String soLuongBanRa) {
        this.soLuongBanRa = soLuongBanRa;
    }
}
