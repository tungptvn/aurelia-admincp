import {
  User,
  FilterUser
} from './../models/user';
import {
  QuanLyUserServiceInterface
} from './QuanLyUserServiceInterface';
import * as _ from 'lodash';
export class QuanLyUserLocalService implements QuanLyUserServiceInterface {
  private lstUser: User[] = [];
  EmployeeId: number;
  DatedRegister: string;
  UserName: string;
  Phone: string;
  Position: string;
  EmployeeName: string;
  Department: string;
  Status: string;
  listPosision: any = [{
    'PositionId': undefined,
    'Name': 'Tất cả'
  }, {
    'PositionId': 'Admin',
    'Name': 'Admin'
  }, {
    'PositionId': 'Quản lý cao cấp',
    'Name': 'Quản lý cao cấp'
  }, {
    'PositionId': 'Quản lý',
    'Name': 'Quản lý'
  }, {
    'PositionId': 'Nhân viên',
    'Name': 'Nhân viên'
  }]
  listDePartment = [{
    'DepartmentId': undefined,
    'Name': 'Tất cả'
  }, {
    'DepartmentId': 'IT',
    'Name': 'IT'
  }, {
    'DepartmentId': 'Marketting',
    'Name': 'Marketting'
  }]
  listUser: any = [{
    "EmployeeId": "1",
    "DatedRegister": "",
    "UserName": "test",
    "Phone": "123456",
    "Position": "Nhân viên",
    "EmployeeName": "IT",
    "Department": "IT",
    "Status": "Hoạt động",

  }, {
    "EmployeeId": "2",
    "DatedRegister": "",
    "UserName": "test1",
    "Phone": "1234567",
    "Position": "Nhân viên",
    "EmployeeName": "Bank",
    "Department": "IT",
    "Status": "Khóa",

  }];
  listStatus: any = [{
    'StatusId': undefined,
    'Name': 'Tất cả'
  }, {
    'StatusId': 'Hoạt động',
    'Name': 'Hoạt động'
  }, {
    'StatusId': 'Khóa',
    'Name': 'Khóa'
  }];
  
  GetStatus(): Promise < Array < any >> {
    return Promise.resolve(this.listStatus);
  }
  GetPositons(): Promise < Array < any >> {
    return Promise.resolve(this.listPosision);
  }
  GetDepartments(): Promise < Array < any >> {
    return Promise.resolve(this.listDePartment);
  }
  GetUsers(filterModel): Promise < Array < User >> {
    console.log('filterModel',filterModel);
    if(filterModel==undefined)
     return Promise.resolve(this.listUser);
    return Promise.resolve(this.searchUsers(filterModel));
  }
  searchUsers(model) {
    let deleteModelUserUnderfine = _(new FilterUser(model)).omitBy(_.isUndefined).omitBy(_.isNull).value()
    let filter = _.filter(this.listUser, (user) => {
      if (_.isMatch(user, deleteModelUserUnderfine) == true)
        return user;
    })
    return filter;
  }
   PostUser(user: User): Promise<User> {
        this.listUser.push(user);
        return Promise.resolve(user);
    }
    PutUser(user: User): Promise<boolean> {
        this.listUser.forEach((c, i, arr) => {
            if (c.EmployeeId == user.EmployeeId) {
                arr[i] = user;
            }
        })
        return Promise.resolve(true);
    }
  

}
