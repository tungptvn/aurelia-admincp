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
      'RoleId': 0,
      'Name': 'Tất cả'
    }, {
      'RoleId': 1,
      'Name': 'Quản lý Landing Page'
    }, {
      'RoleId': 2,
      'Name': 'Quản lý banner'
    }, {
      'RoleId': 3,
      'Name': 'Quản lý comment'
    },
    {
      'RoleId': 4,
      'Name': 'Quản lý user'
    }, {
      'RoleId': 5,
      'Name': 'Quản lý quyền'
    }, {
      'RoleId': 6,
      'Name': 'Quản lý log'
    }
  ]

  listRole: any = [{
      "RoleId": 1,
      "CreatedByDate": "",
      "Name": "Quản lý Landing Page",
      "Department": "Chăm sóc khách hàng"

    }, {
      "RoleId": 2,
      "CreatedByDate": "",
      "Name": "Quản lý banner",
      "Department": 'OMNI'

    },
    {
      "RoleId": 3,
      "CreatedByDate": "",
      "Name": "Quản lý comment",
      "Department": "FI"
    },
    {
      "RoleId": 4,
      "CreatedByDate": "",
      "Name": "Quản lý user",
      "Department": "Kinh Doanh Mạng"
    },
    {
      "RoleId": 5,
      "CreatedByDate": "",
      "Name": "Quản lý quyền",
      "Department": "FI"
    },
    {
      "RoleId": 6,
      "CreatedByDate": "",
      "Name": "Quản lý log",
      "Department": "Kinh Doanh Mạng"
    }
  ];
  treeRole = [{
    id: 1,
    text: "Quản lý Landing Page",
    state: {
      selected: false
    },
    children: [{
                        id: 12,
                        text: "Tìm kiếm và xem danh sách Landing Page",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 13,
                        text: "Tạo mới Landing Page",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 14,
                        text: "Chỉnh sửa Landing Page",
                        state: {
                          selected: false
                        }
               }]
  },
  {
    id: 2,
    text: "Quản lý Banner",
    state: {
      selected: false
    },
    children: [{
                       id: 21,
                        text: "Tìm kiếm và xem danh sách banner",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 22,
                        text: "Tạo mới banner",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 23,
                        text: "Chỉnh sửa thông tin Banner",
                        state: {
                          selected: false
                        }
               }]
  },
  {
    id: 3,
    text: "Quản lý comment",
    state: {
      selected: false
    },
    children: [{
                       id: 31,
                        text: "Tìm kiếm và xem danh sách comment",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 32,
                        text: "Xuất Excel",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 33,
                        text: "Trả lời comment",
                        state: {
                          selected: false
                        }
               },
                {
                        id: 34,
                        text: "Chuyển SO",
                        state: {
                          selected: false
                        }
               }
               
               ]
  },
   {
    id: 4,
    text: "Quản lý user",
    state: {
      selected: false
    },
    children: [{
                       id: 41,
                        text: "Tìm kiếm và xem danh sách user",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 42,
                        text: "Xuất Excel danh sách user",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 43,
                        text: "Đăng ký user",
                        state: {
                          selected: false
                        }
               },
                {
                        id: 44,
                        text: "Chỉnh sửa thông tin user",
                        state: {
                          selected: false
                        }
               }
               
               ]
  },
  {
    id: 5,
    text: "Quản lý quyền",
    state: {
      selected: false
    },
    children: [{
                       id: 51,
                        text: "Tìm kiếm và xem danh sách nhóm quyền",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 52,
                        text: "Tạo mới nhóm quyền",
                        state: {
                          selected: false
                        }
                      },
                      {
                        id: 53,
                        text: "Chỉnh sửa nhóm quyền",
                        state: {
                          selected: false
                        }
               }]
  },
  {
    id: 6,
    text: "Quản lý log",
    state: {
      selected: false
    },
    children: [{
                       id: 61,
                        text: "Tìm kiếm và xem log người dùng",
                        state: {
                          selected: false
                        }
                      }
               ]
  }
  ];
GetTreeGroupRoles(): Promise < Array < any >> {
    return Promise.resolve(this.treeRole);
  }
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
