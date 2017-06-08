import { NhanVien } from './../models/nhan-vien';
import { QuanLyNhanVienServiceInterface } from './QuanLyNhanVienServiceInterface';
export class QuanLyNhanVienLocalService implements QuanLyNhanVienServiceInterface {
    private lstNhanVien: NhanVien[] = [];
    data: any = [{
        "MaNv": 1,
        "ChucVu": "Junior Executive",
        "Email": "vfloresem@newsvine.com",
        "HoTen": "Victor Flores"
    }, {
        "MaNv": 2,
        "ChucVu": "Help Desk Operator",
        "Email": "sgordonen@blinklist.com",
        "HoTen": "Sandra Gordon"
    }, {
        "MaNv": 3,
        "ChucVu": "Clinical Specialist",
        "Email": "ccoleeo@soundcloud.com",
        "HoTen": "Christine Cole"
    }];
    constructor() {
        this.lstNhanVien = (this.data as NhanVien[]);

    }
    GetNhanVien(maNv: number): Promise<NhanVien> {
        let result: NhanVien;
        result = this.lstNhanVien.filter(x => x.MaNv == maNv).pop();
        return Promise.resolve(result);

    }
    GetNhanViens(filterModel?: any): Promise<NhanVien[]> {
        return Promise.resolve(this.lstNhanVien)
    }
    PostNhanVien(nhanVien: NhanVien): Promise<NhanVien> {
        this.lstNhanVien.push(nhanVien);
        return Promise.resolve(nhanVien);
    }
    PutNhanVien(nhanVien: NhanVien): Promise<boolean> {
        this.lstNhanVien.forEach((c, i, arr) => {
            if (c.MaNv == nhanVien.MaNv) {
                arr[i] = nhanVien;
            }
        })
        return Promise.resolve(true);
    }
    DeleteNhanVien(maNv: number): Promise<boolean> {
        this.lstNhanVien.forEach((c, i, arr) => {
            if (c.MaNv == maNv) {
                arr.splice(i, 1)
            }
        })
        return Promise.resolve(true);
    }
    DeleteNhanViens(maNvs: number[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}