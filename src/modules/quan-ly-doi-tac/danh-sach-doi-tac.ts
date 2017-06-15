import {
  QuanLyDoiTacLocalService
} from './services/QuanLyDoiTacLocalService';
import {
  PLATFORM
} from 'aurelia-pal';
import {
  logger
} from './logger';
import {
  QuanLyDoiTacServiceInterface
} from './services/QuanLyDoiTacServiceInterface';

import {
  inject
} from "aurelia-dependency-injection";

import {
  DoiTac,
  FilterModel
} from "./models/doi-tac";
import {
  DialogService
} from 'aurelia-dialog';
import {
  GridOptions
} from "ag-grid";
import {
  DoiTacDlg
} from './dialogs/doi-tac-dlg';
import swal from 'sweetalert';
import {
  BindingEngine
} from 'aurelia-binding';
@inject(QuanLyDoiTacLocalService, DialogService, BindingEngine)
export class DanhSachDoitac {
  private gridOptions: GridOptions;
  private listDoiTac: any = [];
  private selectedListDoiTac: DoiTac[] = [];
  private selectedDoiTac: DoiTac = new DoiTac();
  private filterModel: FilterModel;
  private listImportanDoiTac: any[];

  constructor(private quanLyDoiTacService: QuanLyDoiTacServiceInterface, private dialogService: DialogService, private bindingEngine: BindingEngine) {
    this.gridOptions = DoiTac.gridOptions;
    this.filterModel = new FilterModel({});

    let subscription = this.bindingEngine.propertyObserver(this.filterModel, 'BusinessId')
      .subscribe((newValue, oldValue) => {

        this.quanLyDoiTacService.GetDoiTacs(this.filterModel).then(rs => {
          this.listDoiTac = rs;
          setTimeout(() => {
            this.onReady()
          }, 1000)
        });


      });
  }
  activate() {

    this.quanLyDoiTacService.SelectDoiTacs().then(rs => {
      this.listImportanDoiTac = rs;
    });

  }
  onReady() {
    this.createNewDatasource();
  }
  createNewDatasource() {
    if (!this.listDoiTac) {
      return;
    }
    let dataSource = {
      getRows: (params) => {

        params.successCallback(this.listDoiTac.slice(params.startRow, params.endRow), this.listDoiTac.length);
      },
      rowCount: this.listDoiTac.length
    };
    setTimeout(() => (this as any).gridOptions.api.setDatasource(dataSource), 1000);
  }

  public onRowClicked(e) {
    this.selectedDoiTac = new DoiTac(e.data);
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "edit":
          return this.saveDoiTac();
      }
    }
  }
  public onActionViewClick(data: DoiTac) {
    logger.info("View action clicked", data);
  }

  onRowDoubleClicked(e) {
    this.selectedDoiTac = new DoiTac(e.data);
    this.saveDoiTac();
    this.selectedDoiTac = new DoiTac();
  }
  saveDoiTac() {
    this.dialogService.open({
      viewModel: DoiTacDlg,
      model: new DoiTac(this.selectedDoiTac)
    }).whenClosed((result) => {
      if (!result.wasCancelled) {

        this.updateDoiTac(result.output);
        this.selectedDoiTac = new DoiTac();
      }
    })
  }
  updateDoiTac(selectedDoiTac) {
    if (new DoiTac(selectedDoiTac).IsExit) {

      this.quanLyDoiTacService.PutDoiTac(new DoiTac(selectedDoiTac)).then(rs => {
        this.showSuccessMessage('Thông báo', 'Cập nhật đối tác thành công');
        this.createNewDatasource();
      }).catch(err => {
        this.showErrorMessage('Thông báo', 'Cập nhật đối tác thất bại')
      });

    } else {

      this.quanLyDoiTacService.PostDoiTac(new DoiTac(selectedDoiTac)).then(rs => {
        this.showSuccessMessage('Thông báo', 'Tạo mới đối tác thành công')
        this.createNewDatasource();
      }).catch(err => {
        this.showErrorMessage('Thông báo', 'Tạo mới đối tác thất bại')
      });
    }
  }
  showErrorMessage(mes1: string, mes2: string) {
    swal(mes1, mes2, "error");
  }
  showSuccessMessage(mes1: string, mes2: string) {
    swal(mes1, mes2, "success");
  }
  onRowSelected(e) {
  
    this.selectedListDoiTac = (this as any).gridOptions.api.getSelectedRows().map(x => new DoiTac(x));
  }
  
}
