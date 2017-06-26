import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { User } from './../models/user';

import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import {
  QuanLyUserLocalService
} from './../services/QuanLyUserLocalService';
import {
  QuanLyUserServiceInterface
} from './../services/QuanLyUserServiceInterface';
import { DialogController } from "aurelia-dialog";
@inject(DialogController,QuanLyUserLocalService)

export class HistoryUserDlg {
  selectedItem:User;
 
 constructor(private dialogcontroller: DialogController, private controllerFactory,private quanLyUserServiceInterface:QuanLyUserServiceInterface) {
  
  }
 importExcel(){
    this.dialogcontroller.ok();
 }

}