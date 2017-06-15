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
  User,
  FilterUser
} from "./models/user";
import {
  DialogService
} from 'aurelia-dialog';
import {
  GridOptions
} from "ag-grid";
import {
  QuanLyUserLocalService
} from './services/QuanLyUserLocalService';
import {
  QuanLyUserServiceInterface
} from './services/QuanLyUserServiceInterface';
import {
  UserDlg
} from './dialogs/user-dlg';
import { SignUpUserDlg} from './dialogs/signup-user-dlg';
import swal from 'sweetalert';
import * as $ from 'jquery';
@inject(QuanLyUserLocalService, DialogService)
export class DanhSachUser {
  private gridOptions: GridOptions;
  private listPosition = [];
  private listDePartment = [];
  private listUser = [];
  private selectedUser: User = new User();
  private filterModel: FilterUser;
  private listStatus=[];
  constructor(private quanLyUserServiceInterface: QuanLyUserServiceInterface, private dialogService) {
    (this as any).gridOptions = User.gridOptions;
     
  }

 
  async activate() {
   
  
    this.listUser = await this.quanLyUserServiceInterface.GetUsers(this.filterModel);
    this.listPosition = await this.quanLyUserServiceInterface.GetPositons();
    this.listDePartment = await this.quanLyUserServiceInterface.GetDepartments();
    this.listStatus=await this.quanLyUserServiceInterface.GetStatus();
   
    $(".ag-overlay-wrapper span").text('Không tìm thấy danh sách thỏa điều kiện');
    //  {
    //    $(".ag-overlay-wrapper span").text('Không tìm thấy danh sách thỏa điều kiện')
    //  }
    //  logger.info('users',this.listUser);
    //  logger.info('positions',this.listPosition);
    //  logger.info('Department',this.listPosition);
   
     
    await this.onReady();
       
       
  }
  signUpUser(){
    logger.info('signUpUser');
      this.dialogService.open({
      viewModel: SignUpUserDlg,
      model: new User({})
    }).whenClosed((result) => {
      if (!result.wasCancelled) {
        logger.info('result.output',!result.wasCancelled,'modelDialog',JSON.stringify(result.output));
         //this.updateUser(result.output);
      }
    })
  }
  attached(){
    
  }


  onReady() {
    this.createNewDatasource();
    
  }
  onRowSelected(event) {
    }

 onRowClicked(event) {
 
   this.selectedUser=event.node==undefined?new User():new User(event.node.data);
     this.dialogService.open({
      viewModel: UserDlg,
      model: new User(this.selectedUser)
    }).whenClosed((result) => {
      if (!result.wasCancelled) {
        logger.info('result.output',!result.wasCancelled,'modelDialog',JSON.stringify(result.output));
         this.updateUser(result.output);
      }
    })
    

  }
 
  updateUser(selectedUser) {
    if (new User(selectedUser).IsExit) {

      this.quanLyUserServiceInterface.PutUser(selectedUser).then(rs => {
        this.showSuccessMessage('Thông báo', 'Cập nhật user thành công');
        this.createNewDatasource();
      }).catch(err => {
        this.showErrorMessage('Thông báo', 'Cập nhật user thất bại')
      });

    } else {

      this.quanLyUserServiceInterface.PostUser(selectedUser).then(rs => {
        this.showSuccessMessage('Thông báo', 'Tạo mới user thành công')
        this.createNewDatasource();
      }).catch(err => {
        this.showErrorMessage('Thông báo', 'Tạo mới user thất bại')
      });
    }
  }
  showErrorMessage(mes1: string, mes2: string) {
    swal(mes1, mes2, "error");
  }
  showSuccessMessage(mes1: string, mes2: string) {
    swal(mes1, mes2, "success");
  }
  createNewDatasource() {
    if (!this.listUser) {
      return;
    }
    let dataSource = {
      getRows: (params) => {

        params.successCallback(this.listUser.slice(params.startRow, params.endRow), this.listUser.length);
      },
      rowCount: this.listUser.length
    };
    setTimeout(() => this.gridOptions.api.setDatasource(dataSource), 200);
  }

}
