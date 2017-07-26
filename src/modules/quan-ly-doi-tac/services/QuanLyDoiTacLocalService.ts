import {
  DoiTac,FilterModel
} from './../models/doi-tac';
import {
  QuanLyDoiTacServiceInterface
} from './QuanLyDoiTacServiceInterface';
export class QuanLyDoiTacLocalService implements QuanLyDoiTacServiceInterface {
  private lstDoiTac: DoiTac[] = [];
  listDoiTac: any = 
     [{
      "Business_id": 1,
      "Loyalty_id": "e2565cc9-b283-4716-88e5-be1a53416f1f",
      "Affiliate_branch_id": 4,
      "User": "admin@vienthonga.com",
      "Pass": "123456",
      "Name": "Administrator",
      "Banner": "~/Upload/2015/11/1/banner-slide-acs.jpg",
      "Descriptions": "Quản trị hệ thống",
      "Date_reg": 0,
      "Position": 1,
      "Status": "D",
      "Userweb_id": ""
    }, {
      "Business_id": 42,
      "Loyalty_id": null,
      "Affiliate_branch_id": 0,
      "User": "SINHVIENTEST2",
      "Pass": "Admin@123",
      "Name": "SINHVIENTEST2",
      "Banner": null,
      "Descriptions": "test sv",
      "Date_reg": 0,
      "Position": 0,
      "Status": "A",
      "Userweb_id": null
    }, {
      "Business_id": 9,
      "Loyalty_id": "0fad31b2-30fc-4bd3-a399-8ea07dca7dc001",
      "Affiliate_branch_id": 0,
      "User": null,
      "Pass": "123456",
      "Name": "WEBVTA",
      "Banner": "~/Upload/2015/12/5/banner-tong-ambient-1920x537.jpg",
      "Descriptions": "Vienthonga",
      "Date_reg": 0,
      "Position": 0,
      "Status": "A",
      "Userweb_id": "39814"
    }, {
      "Business_id": 14,
      "Loyalty_id": "0fad31b2-30fc-4bd3-a399-8ea07dca7d19819",
      "Affiliate_branch_id": 0,
      "User": "vnpost@doanhnghiep.vta",
      "Pass": "123456",
      "Name": "Vnpost",
      "Banner": "",
      "Descriptions": "Vnpost",
      "Date_reg": 0,
      "Position": 0,
      "Status": "A",
      "Userweb_id": ""
    }, {
      "Business_id": 39,
      "Loyalty_id": null,
      "Affiliate_branch_id": 0,
      "User": "VTA",
      "Pass": "123456",
      "Name": "MOBILE_APP",
      "Banner": null,
      "Descriptions": "mobileapp.vienthonga.vn",
      "Date_reg": 0,
      "Position": 0,
      "Status": "A",
      "Userweb_id": null
    }, {
      "Business_id": 41,
      "Loyalty_id": null,
      "Affiliate_branch_id": 0,
      "User": "vplus",
      "Pass": "ÐÂ",
      "Name": "VPLUS",
      "Banner": null,
      "Descriptions": "DFASS",
      "Date_reg": 0,
      "Position": 0,
      "Status": "A",
      "Userweb_id": null
    }, {
      "Business_id": 27,
      "Loyalty_id": null,
      "Affiliate_branch_id": 0,
      "User": null,
      "Pass": null,
      "Name": "SINHVIEN",
      "Banner": null,
      "Descriptions": null,
      "Date_reg": 0,
      "Position": 0,
      "Status": "A",
      "Userweb_id": null
    }, {
      "Business_id": 40,
      "Loyalty_id": null,
      "Affiliate_branch_id": 0,
      "User": "SINHVIENTEST",
      "Pass": "SINHVIENTEST",
      "Name": "SINHVIENTEST",
      "Banner": null,
      "Descriptions": null,
      "Date_reg": 0,
      "Position": 0,
      "Status": "A",
      "Userweb_id": null
    }]
  
  filterDoiTac: any = 
     [{
      "BusinessId": 0,
      "Name": "Lọc đối tác"
    }, {
      "BusinessId": 1,
      "Name": "Administrator"
    }, {
      "BusinessId": 42,
      "Name": "SINHVIENTEST2"
    }, {
      "BusinessId": 9,
      "Name": "WEBVTA"
    }, {
      "BusinessId": 14,
      "Name": "Vnpost"
    }, {
      "BusinessId": 39,
      "Name": "MOBILE_APP"
    }, {
      "BusinessId": 41,
      "Name": "VPLUS"
    }, {
      "BusinessId": 27,
      "Name": "SINHVIEN"
    }, {
      "BusinessId": 40,
      "Name": "SINHVIENTEST"
    }]
  
  SelectDoiTacs(): Promise < Array < any >> {
    return Promise.resolve(this.filterDoiTac);
  };
  GetDoiTacs(filterModel): Promise < Array < DoiTac >> {
    var filtered:any;
    console.log('@@BusinessId',filterModel);
    if (filterModel.BusinessId == 0) {
       return Promise.resolve(this.listDoiTac);
    }
    else
     {
          filtered = this.listDoiTac.filter(x=>{
              if(x.Business_id==Number(filterModel.BusinessId))
                return x;
         })
         console.log('filter',filtered);
         return Promise.resolve(filtered);

     }

  }
  PostDoiTac(doitac: DoiTac): Promise<DoiTac> {
        this.listDoiTac.push(doitac);
        return Promise.resolve(doitac);
    }
    PutDoiTac(doitac: DoiTac): Promise<boolean> {
        this.listDoiTac.forEach((c, i, arr) => {
            if (c.Business_id == doitac.Business_id) {
                arr[i] = doitac;
            }
        })
        return Promise.resolve(true);
    }
}
