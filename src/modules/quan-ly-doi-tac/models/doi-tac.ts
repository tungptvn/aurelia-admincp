export class DoiTac {
  public Business_id: number;
  User: string;
  Name: string;
  Banner: string;
  Descriptions: string;
  Date_reg: number;
  Position: number;
  Status: string;
  Pass: string;
  Loyalty_id: string;
  Affiliate_branch_id: number;
  Userweb_id: string
  constructor(entity: any = {
    Business_id: 0
  }) {
    this.Business_id = entity.Business_id;
    this.User = entity.User;
    this.Name = entity.Name;
    this.Banner = entity.Banner;
    this.Descriptions = entity.Descriptions;
    this.Date_reg = entity.Date_reg;
    this.Position = entity.Position;
    this.Status = entity.Status;
    this.Pass = entity.Pass;
    this.Loyalty_id = entity.Loyalty_id;
    this.Affiliate_branch_id = entity.Affiliate_branch_id;
    this.Userweb_id = entity.Userweb_id;
  }
  static columnDefs = [{
      headerName: "Chọn",
      width: 30,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },

    {
      headerName: "Mã Chương Trình",
      field: "Business_id"
    },
    {
      headerName: "Tài khoản",
      field: "User"
    },
    {
      headerName: "Tên",
      field: "Name"
    },
    {
      headerName: "Ngày tạo",
      field: "Date_reg"

    },
    {
      headerName: "Ảnh",
      field: "Banner"
    },
    {
      headerName: "Vị Trí",
      field: "Position"
    },
    {
      headerName: "Trạng Thái",
      field: "Status"
    },
    {
      headerName: "Hành động",
      suppressMenu: true,
      suppressSorting: true,
      template: ` 
        <button type="button" class="btn btn-default btn-xs" data-action-type="edit">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Chi tiết
        </button>
        `

    },

  ];
  static gridOptions = {
    enableSorting: false,
    enableFilter: false,
    enableColResize: true,
    paginationPageSize: 20,
    columnDefs: DoiTac.columnDefs,
    rowModelType: 'pagination',
    rowSelection: 'multiple',
    animateRows: true,
    getRowNodeId: function (item) {
      return item.Business_id;
    }
  };
  get IsExit() {
    return !!this.Business_id;
  }

}
export class FilterModel {
  BusinessId: number;
  constructor(entity: any = {
    BusinessId: 0
  }) {
       this.BusinessId=entity.BusinessId | 0;

  }
}
// define validation model
import {
  ValidationRules
} from 'aurelia-validation';
ValidationRules
  .ensure((x: DoiTac) => x.User).required()
  .on(DoiTac);
