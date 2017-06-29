import {
  PLATFORM
} from 'aurelia-pal';
import {
  logger
} from './logger';
import {
  inject
} from "aurelia-dependency-injection";
import {
  Role,
  FilterRole
} from "./models/role";
import {
  DialogService
} from 'aurelia-dialog';
import {
  GridOptions
} from "ag-grid";
import {
  QuanLyQuyenLocalService
} from './services/QuanLyQuyenLocalService';
import {
  QuanLyQuyenServiceInterface
} from './services/QuanLyQuyenServiceInterface';
// import {
//   UserDlg
// } from './dialogs/user-dlg';
// import {
//   HistoryUserDlg
// } from './dialogs/history-user-dlg';
// import { SignUpUserDlg} from './dialogs/signup-user-dlg';
import swal from 'sweetalert';
import * as $ from 'jquery';

@inject(QuanLyQuyenLocalService, DialogService)
export class DanhSachQuyen {
  private gridOptions: GridOptions;
  private listGroupRoles = [];
  private listDePartment = [];
  private listRoles = [];
  // private selectedUser: User = new User();
  private filterModel: FilterRole;
  private listStatus = [];
  constructor(private quanLyQuyenServiceInterface: QuanLyQuyenServiceInterface, private dialogService) {

    (this as any).gridOptions = Role.gridOptions;

  }
  async activate() {
    this.listRoles = await this.quanLyQuyenServiceInterface.GetRoles(this.filterModel);
    this.listGroupRoles = await this.quanLyQuyenServiceInterface.GetGroupRoles();
    logger.info('listRoless', this.listRoles);
    logger.info('listGroupRoles', this.listGroupRoles);
    await this.onReady();
  }
  //   signUpUser(){
  //     logger.info('signUpUser');
  //       this.dialogService.open({
  //       viewModel: SignUpUserDlg,
  //       model: new User({})
  //     }).whenClosed((result) => {
  //       if (!result.wasCancelled) {
  //         logger.info('result.output',!result.wasCancelled,'modelDialog',JSON.stringify(result.output));
  //          //this.updateUser(result.output);
  //       }
  //     })
  //   }
  //   attached(){


  //   }
  onReady() {
      this.createNewDatasource();

  }
  //   onRowSelected(event) {
  //     }
  //  onRowClicked(e) {
  //    if (e.event.target !== undefined) {
  //       this.selectedUser=e.node==undefined?new User():new User(e.node.data);
  //       let actionType = e.event.target.getAttribute("data-action-type");
  //       switch (actionType) {
  //         case "history":
  //           return this.historyUser();
  //         case "detail":
  //          return this.detailUser(); 
  //       }
  //     }




  //   }
  //   historyUser(){
  //        this.dialogService.open({
  //       viewModel: HistoryUserDlg,
  //      }).whenClosed((result) => {
  //       if (!result.wasCancelled) {

  //       }
  //     })
  //   }
  //   detailUser(){
  //        this.dialogService.open({
  //       viewModel: UserDlg,
  //       model: new User(this.selectedUser)
  //     }).whenClosed((result) => {
  //       if (!result.wasCancelled) {
  //         logger.info('result.output',!result.wasCancelled,'modelDialog',JSON.stringify(result.output));
  //          this.updateUser(result.output);
  //       }
  //     })
  //   }

  //   updateUser(selectedUser) {
  //     if (new User(selectedUser).IsExit) {

  //       this.quanLyUserServiceInterface.PutUser(selectedUser).then(rs => {
  //         this.showSuccessMessage('Thông báo', 'Cập nhật user thành công');
  //         this.createNewDatasource();
  //       }).catch(err => {
  //         this.showErrorMessage('Thông báo', 'Cập nhật user thất bại')
  //       });

  //     } else {

  //       this.quanLyUserServiceInterface.PostUser(selectedUser).then(rs => {
  //         this.showSuccessMessage('Thông báo', 'Tạo mới user thành công')
  //         this.createNewDatasource();
  //       }).catch(err => {
  //         this.showErrorMessage('Thông báo', 'Tạo mới user thất bại')
  //       });
  //     }
  //   }
  //   showErrorMessage(mes1: string, mes2: string) {
  //     swal(mes1, mes2, "error");
  //   }
  //   showSuccessMessage(mes1: string, mes2: string) {
  //     swal(mes1, mes2, "success");
  //   }
  createNewDatasource() {
    if (!this.listRoles) {
      return;
    }
    let dataSource = {
      getRows: (params) => {

        params.successCallback(this.listRoles.slice(params.startRow, params.endRow), this.listRoles.length);
      },
      rowCount: this.listRoles.length
    };
    setTimeout(() => this.gridOptions.api.setDatasource(dataSource), 200);
  }

}
