export class Role {
  RoleId: number;
  CreatedByDate: string;
  Name: string;
  Department: string;
  constructor(role: any = {QuyenId: 0 }) {
    this.RoleId = role.RoleId;
    this.CreatedByDate = role.CreatedByDate;
    this.Name = role.Name;
    this.Department = role.Department;
  }

  static columnDefs = [{
      headerName: "STT",
      width: 100,
      cellRenderer: (params) => {
        return +params.node.id + 1;
      }
    }, {
      width: 140,
      headerName: "Ngày tạo",
      field: "CreatedByDate"

    },
    {
      headerName: "Tên nhóm quyền",
      field: "Name",
      width: 140,
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Department",
      field: "Department",
      filter: 'text',
      width: 140,
      filterParams: {
        apply: true,
        newRowsAction: 'keep'
      },
      suppressMenu: false,
      suppressSorting: true
    },
    {
      headerName: "Hành động",
      suppressMenu: true,
      suppressSorting: true,
      width: 200,
      template: `
          <button data-action-type="history" class="btn btn-tag  btn-tag-dark btn-action-role">Chỉnh sửa</button>
          <button data-action-type="detail" class="btn btn-tag  btn-tag-dark btn-action-role">DS User</button>
         `
    }

  ];
  static gridOptions = {
    rowHeight: 50,
    rowSelection: 'multiple',
    columnDefs: Role.columnDefs,
    rowModelType: 'pagination',
    localeText: {
      noRowsToShow: 'Không tìm thấy danh sách thỏa điều kiện',
      next: '>',
      last: 'Cuối',
      first: 'Đầu',
      previous: '<',
      page: 'Trang',
      to: 'Đến',
      of: '/',
    }

  };
  get IsExit() {
    return !!this.RoleId;
  }

}
export class FilterRole {
  Name: string;
  DateTo: string;
  DateFrom: string;
  
  constructor(role) {
    this.Name = role.Name;
    this.DateTo = role.DateTo;
    this.DateFrom = role.DateFrom;
  }
}
