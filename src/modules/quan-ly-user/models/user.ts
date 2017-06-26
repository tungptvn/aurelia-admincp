export class User {
  EmployeeId: number;
  DatedRegister: string;
  UserName: string;
  Phone: string;
  Position: string;
  EmployeeName: string;
  Department: string;
  Status: string;
  constructor(user: any = {
    EmployeeId: 0
  }) {
    this.EmployeeId = user.EmployeeId;
    this.DatedRegister = user.DatedRegister;
    this.UserName = user.UserName;
    this.Phone = user.Phone;
    this.Position = user.Position;
    this.EmployeeName = user.EmployeeName;
    this.Department = user.Department;
    this.Status = user.Status;
  }

  static columnDefs = [ {
      headerName: "Ngày đăng ký",
      field: "DatedRegister",
      filter: 'number'
    },
    {
      headerName: "Tên đăng nhập",
      field: "UserName",
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Mã nhân viên",
      field: "EmployeeId",
      filter: 'text',
      filterParams: {
        apply: true,
        newRowsAction: 'keep'
      },
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Tên nhân viên",
      field: "EmployeeName",
      filter: 'text',
      filterParams: {
        newRowsAction: 'keep'
      },
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Số điện thoại",
      field: "Phone",
      filter: 'text',
      filterParams: {
        newRowsAction: 'keep'
      },
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Chức vụ",
      field: "Position",
      filter: 'text',
      filterParams: {
        newRowsAction: 'keep'
      },
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Phòng ban",
      field: "Department",
      filter: 'text',
      filterParams: {
        newRowsAction: 'keep'
      },
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Trạng thái",
      field: "Status",
      filter: 'text',
      filterParams: {
        newRowsAction: 'keep'
      },
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Hành động",
      suppressMenu: true,
      suppressSorting: true,
      template: `
      <div class="btn-group">
          <button type="button" uib-dropdown="" dropdown-append-to-body="" class="btn btn-complete  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <i class="pg-settings_small_1"></i>   Hành động <span class="caret"></span>
          </button>
          <ul class="dropdown-menu"  style="width: 137px;">
          <li style="position:relative"><i class="fa fa-user" style="position: absolute;margin-top: 10px;margin-left: 17px;"></i><a data-action-type="detail" style="padding-left: 37px;">Chi tiết</a></li>
          <li style="position:relative"><i class="fa fa-history" style="position: absolute;margin-top: 10px;margin-left: 17px;"></i><a data-action-type="history" style="padding-left: 37px;">Lịch sử Login</a></li>
            
          </ul>
      </div>
      `
    }
    
  ];
  static gridOptions = {
    rowHeight: 50,
    rowSelection: 'multiple',
    columnDefs: User.columnDefs,
    rowModelType: 'pagination',
    localeText: {noRowsToShow: 'Không tìm thấy danh sách thỏa điều kiện',
   next: '>',
        last: 'Cuối',
        first: 'Đầu',
        previous: '<',
      page: 'Trang',
     to: 'Đến',
        of: '/',}
   
  };
  get IsExit() {
    return !!this.EmployeeId;
  }

}
export class FilterUser {

  EmployeeId: string;
  UserName: string;
  DateTo: string;
  DateFrom: string;
  Phone: string;
  Position: string;
  EmployeeName: string;
  Department: string;
  Status: string;
  constructor(user: any = {
    EmployeeId: '0'
  }) {
    this.EmployeeId = user.EmployeeId;
    this.DateTo = user.DateTo;
    this.DateFrom = user.DateFrom;
    this.UserName = user.UserName;
    this.Phone = user.Phone;
    this.Position = user.Position;
    this.EmployeeName = user.EmployeeName;
    this.Department = user.Department;
    this.Status = user.Status;
  }
}
