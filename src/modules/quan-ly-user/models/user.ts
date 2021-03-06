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

  static columnDefs = [  {
      headerName: "STT",
      width: 100,
      cellRenderer: (params) => {
        return +params.node.id + 1;
      }
    }, {
      width:100,
      headerName: "Ngày đăng ký",
      field: "DatedRegister",
      filter: 'number'
    },
    {
      headerName: "Tên đăng nhập",
      field: "UserName",
      width:100,
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Mã nhân viên",
      field: "EmployeeId",
      filter: 'text',
      width:100,
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
          <button data-action-type="history" class="btn btn-tag  btn-tag-dark btn-tag1">Lịch sử Login</button>
          <button data-action-type="detail" class="btn btn-tag  btn-tag-dark btn-tag1">Chi tiết</button>
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
