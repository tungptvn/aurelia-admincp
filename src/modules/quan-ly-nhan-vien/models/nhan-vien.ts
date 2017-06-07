export class NhanVien {
    public MaNv: number;
    HoTen: String;
    ChucVu: String;
    Email: String;
    constructor(nhanVien: any = { MaNv: 0 }) {
        this.MaNv = nhanVien.MaNv;
        this.ChucVu = nhanVien.ChucVu;
        this.Email = nhanVien.Email;
        this.HoTen = nhanVien.HoTen;

    }
    static columnDefs = [
        {
            headerName: "Chọn",
            width: 30,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true
        },
        {
            headerName: "Mã", field: "MaNv", filter: 'number'
        },
        { headerName: "Chức vụ", field: "ChucVu", suppressMenu: false, suppressSorting: true },
        { headerName: "Họ tên", field: "HoTen", filter: 'text', filterParams: { apply: true, newRowsAction: 'keep' }, suppressMenu: false, suppressSorting: true },
        { headerName: "Email", field: "Email", filter: 'text', filterParams: { newRowsAction: 'keep' }, suppressMenu: false, suppressSorting: true },
        {
            headerName: "Hành động",
            suppressMenu: true,
            suppressSorting: true,
            template:
            `<button type="button" class="btn btn-default btn-xs" data-action-type="edit">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Chi tiết
        </button>
        `
        }
    ];
    static gridOptions = {
        enableSorting: false,
        enableFilter: false,
        enableColResize: true,
        paginationPageSize: 20,
        columnDefs: NhanVien.columnDefs,
        rowModelType: 'pagination',
        rowSelection: 'multiple',
        animateRows: true,
        getRowNodeId: function (item) {
            return item.MaNv;
        }
    };
}

// define validation model
import { ValidationRules } from 'aurelia-validation';
ValidationRules
    .ensure((x: NhanVien) => x.HoTen).required()
    .ensure(x => x.ChucVu).required()
    .ensure(x => x.Email).required().email()
    .on(NhanVien);
