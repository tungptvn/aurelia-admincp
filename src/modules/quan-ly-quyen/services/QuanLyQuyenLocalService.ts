import {
  Role,
  FilterRole
} from './../models/role';
import {
  QuanLyQuyenServiceInterface
} from './QuanLyQuyenServiceInterface';
import * as _ from 'lodash';
export class QuanLyQuyenLocalService implements QuanLyQuyenServiceInterface {
  private lstRole: Role[] = [];
  EmployeeId: number;
  DatedRegister: string;
  UserName: string;
  Phone: string;
  Position: string;
  EmployeeName: string;
  Department: string;
  Status: string;
  listGroupRole: any = [{
    'RoleId': undefined,
    'Name': 'Tất cả'
  }, {
    'RoleId': 0,
    'Name': 'Admin'
  }, {
    'RoleId': 1,
    'Name': 'Quản lý'
  }, {
    'RoleId': 2,
    'Name': 'Nhân viên'
  }]

  listRole: any = [{
    "RoleId": 1,
    "CreatedByDate": "",
    "Name": "Nhóm quyền A",
    "Position": "Chăm sóc khách hàng"

  }, {
    "RoleId": 2,
    "CreatedByDate": "",
    "Name": "Nhóm quyền B",
    "Position": 'OMNI'

  },
  {"RoleId": 3,
    "CreatedByDate": "",
    "Name": "Nhóm quyền C",
    "Position": "FI"},
     {"RoleId": 4,
    "CreatedByDate": "",
    "Name": "Nhóm quyền D",
    "Position": "Kinh Doanh Mạng"}
  ];
  
  
  GetGroupRoles(): Promise < Array < any >> {
    return Promise.resolve(this.listGroupRole);
  }
  
  GetRoles(filterModel): Promise < Array < Role >> {
    console.log('filterModel', filterModel);
    if (filterModel == undefined)
      return Promise.resolve(this.listRole);
    return Promise.resolve(this.searchRoles(filterModel));
  }
  searchRoles(model) {
    let deleteModelUserUnderfine = _(new FilterRole(model)).omitBy(_.isUndefined).omitBy(_.isNull).value()
    let filter = _.filter(this.listRole, (user) => {
      if (_.isMatch(user, deleteModelUserUnderfine) == true)
        return user;
    })
    return filter;
  }
  PostRole(role: Role): Promise < Role > {
    this.listRole.push(role);
    return Promise.resolve(role);
  }
  PutRole(role: Role): Promise < boolean > {
    this.listRole.forEach((c, i, arr) => {
      if (c.RoleId == role.RoleId) {
        arr[i] = Role;
      }
    })
    return Promise.resolve(true);
  }


}
