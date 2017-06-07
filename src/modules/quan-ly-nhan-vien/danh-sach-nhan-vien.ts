import { logger } from './logger';
import { QuanLyNhanVienServiceInterface } from './services/QuanLyNhanVienServiceInterface';
import { SaveNhanVien } from './dialogs/luu-nhan-vien';
import { inject } from "aurelia-dependency-injection";
import { QuanLyNhanVienServicePrototype } from "./services/QuanLyNhanVienService.prototype";
import { NhanVien } from "./models/nhan-vien";
import { DialogService } from 'aurelia-dialog';
import { GridOptions, GridApi } from "ag-grid";
import swal from 'sweetalert';

@inject(QuanLyNhanVienServicePrototype, DialogService)
export class DanhSachNhanVien {
  private gridOptions: GridOptions;
  private api: GridApi;
  private columnDefs: any[];

  private listItem: any = [];
  private selectedList: NhanVien[] = [];
  private selectedItem: NhanVien;


  constructor(private quanLyNhanVienService: QuanLyNhanVienServiceInterface, private dialogService) {
    this.gridOptions = NhanVien.gridOptions;
  }

  activate() {
    return this.quanLyNhanVienService.GetNhanViens().then((res) => {
      this.listItem = res;
    })

  }
  onReady() {
    this.createNewDatasource();
  }
  createNewDatasource() {
    this.selectedList = [];
    if (!this.listItem) {
      return;
    }
    var dataSource = {
      getRows: (params) => {

        this.quanLyNhanVienService.GetNhanViens().then(res => {
          this.listItem = res;
          var rowsThisPage = this.listItem.slice(params.startRow, params.endRow);
          var lastRow = -1;
          if (this.listItem.length <= params.endRow) {
            lastRow = this.listItem.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        })
      },
      rowCount: this.listItem.length
    };

    this.gridOptions.api.setDatasource(dataSource);

  }
  public onRowClicked(e) {
    this.selectedItem = new NhanVien(e.data);
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "edit":
          return this.onActionEditClick();
      }
    }
  }
  public onActionViewClick(data: NhanVien) {
    logger.info("View action clicked", data);
  }


  public onActionEditClick() {
    this.dialogService.open({ viewModel: SaveNhanVien, model: this.selectedItem }).whenClosed((result) => {
      if (!result.wasCancelled) {
        logger.info('Save', result);
        let editedNhanVien = result.output;
        this.quanLyNhanVienService.PutNhanVien(editedNhanVien).then((res) => {
          swal("Thành công", "Lưu thành công", "success");
          this.createNewDatasource();
        }).catch((err) => {

          swal("Không thành công", `${err}`, "error")
        });
      } else {
        logger.info("Cancel");
      }
    });
  }

  themMoiNhanVien() {
    this.dialogService.open({ viewModel: SaveNhanVien, model: new NhanVien() }).whenClosed((result) => {
      if (!result.wasCancelled) {
        logger.info('Save', result.output);
        let themMoiNhanVien: NhanVien = result.output;
        this.quanLyNhanVienService.PostNhanVien(themMoiNhanVien)
          .then((res) => {
            swal("Thành công", "Lưu thành công", "success");
            this.createNewDatasource();
          }).catch((err) => {

            swal("Không thành công", `${err}`, "error")
          });
      } else {
        logger.info('Cancel');
      }
    });
  }

  //ag-grid events
  onRowDoubleClicked(e) {
    let nhanVien = new NhanVien(e.data);
    this.onActionEditClick();
  }
  onRowSelected(e) {
    this.selectedList = this.gridOptions.api.getSelectedRows().map(x => new NhanVien(x));
  }
  deselectAll() {
    this.gridOptions.api.deselectAll();
  }

  // view events
  deleteSelected() {
    let maNvs = this.selectedList.map(x => x.MaNv);
    swal({
      title: "Bạn có chắc xóa không",
      text: "Bạn sẽ không khôi phục lại được nhân viên nếu đã bị xóa",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Có, Xóa",
      cancelButtonText: "Không, hủy thao tác!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
      (isConfirm) => {
        if (isConfirm) {
          this.quanLyNhanVienService.DeleteNhanViens(maNvs)
            .then(res => {
              swal("Thành công", "Lưu thành công", "success");
              this.selectedList = [];
              this.createNewDatasource();
            }).catch((err) => {

              swal("Không thành công", `${err}`, "error")
            });
        } else {
          swal("Đã hủy", "đã hủy thao tác", "error");
        }
      })

  }

}
