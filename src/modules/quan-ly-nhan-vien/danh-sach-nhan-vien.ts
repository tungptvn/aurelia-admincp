import { PLATFORM } from 'aurelia-pal';
import { logger } from './logger';
import { QuanLyNhanVienServiceInterface } from './services/QuanLyNhanVienServiceInterface';
import { SaveNhanVien } from './dialogs/luu-nhan-vien';
import { inject } from "aurelia-dependency-injection";
import { QuanLyNhanVienServicePrototype } from "./services/QuanLyNhanVienService.prototype";
import { NhanVien } from "./models/nhan-vien";
import { DialogService } from 'aurelia-dialog';
import { GridOptions } from "ag-grid";
// import PLATFORM.global.swal from 'sweetalert';

@inject(QuanLyNhanVienServicePrototype, DialogService)
export class DanhSachNhanVien {
  private gridOptions: GridOptions;

  private listNhanVien: any = [];
  private selectedListNhanVien: NhanVien[] = [];
  private selectedNhanVien: NhanVien = new NhanVien();
  private filterModel: any;
  constructor(private quanLyNhanVienService: QuanLyNhanVienServiceInterface, private dialogService) {
    this.gridOptions = NhanVien.gridOptions;
  }

  activate() {
    return this.quanLyNhanVienService.GetNhanViens().then((res) => {
      this.listNhanVien = res;
    })

  }
  onReady() {
    this.createNewDatasource();
  }
  createNewDatasource() {
    this.selectedListNhanVien = [];
    if (!this.listNhanVien) {
      return;
    }
    var dataSource = {
      getRows: async (params) => {

        logger.info('params', params)
        this.listNhanVien = await this.quanLyNhanVienService.GetNhanViens(this.filterModel);
        var rowsThisPage = this.listNhanVien.slice(params.startRow, params.endRow);
        var lastRow = -1;
        if (this.listNhanVien.length <= params.endRow) {
          lastRow = this.listNhanVien.length;
        }
        params.successCallback(rowsThisPage, lastRow);


      },
      rowCount: this.listNhanVien.length
    };

    this.gridOptions.api.setDatasource(dataSource);

  }
  public onRowClicked(e) {
    this.selectedNhanVien = new NhanVien(e.data);
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "edit":
          return this.saveNhanVien();
      }
    }
  }
  public onActionViewClick(data: NhanVien) {
    logger.info("View action clicked", data);
  }

  themMoiNhanVien() {
    this.selectedNhanVien = new NhanVien();
    this.saveNhanVien();
  }


  //ag-grid events
  onRowDoubleClicked(e) {
    this.selectedNhanVien = new NhanVien(e.data);
    this.saveNhanVien();
  }
  saveNhanVien() {
    this.dialogService.open({ viewModel: SaveNhanVien, model: this.selectedNhanVien }).whenClosed((result) => {
      if (!result.wasCancelled) {
        logger.info('Save', result);
        this.selectedNhanVien = result.output;
        let res;
        if (this.selectedNhanVien.IsExit) {
          this.quanLyNhanVienService.PutNhanVien(this.selectedNhanVien).then((res) => {
            PLATFORM.global.swal("Thành công", "Lưu thành công", "success");
            this.createNewDatasource();
          }).catch((err) => {

            PLATFORM.global.swal("Không thành công", `${err}`, "error")
          });
        }
        else {
          this.quanLyNhanVienService.PutNhanVien(this.selectedNhanVien).then((res) => {
            PLATFORM.global.swal("Thành công", "Lưu thành công", "success");
            this.createNewDatasource();
          }).catch((err) => {

            PLATFORM.global.swal("Không thành công", `${err}`, "error")
          });
        }
      } else {
        logger.info("Cancel");
      }
    });
  }
  onRowSelected(e) {
    this.selectedListNhanVien = this.gridOptions.api.getSelectedRows().map(x => new NhanVien(x));
  }
  deselectAll() {
    this.gridOptions.api.deselectAll();
  }

  // view events
  deleteSelected() {
    let maNvs = this.selectedListNhanVien.map(x => x.MaNv);
    PLATFORM.global.swal({
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
              PLATFORM.global.swal("Thành công", "Lưu thành công", "success");
              this.selectedListNhanVien = [];
              this.createNewDatasource();
            }).catch((err) => {

              PLATFORM.global.swal("Không thành công", `${err}`, "error")
            });
        } else {
          PLATFORM.global.swal("Đã hủy", "đã hủy thao tác", "error");
        }
      })

  }

}
