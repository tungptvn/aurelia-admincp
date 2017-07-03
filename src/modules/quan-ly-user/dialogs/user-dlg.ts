import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { User } from './../models/user';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import {
  QuanLyUserLocalService
} from './../services/QuanLyUserLocalService';
import {
  QuanLyUserServiceInterface
} from './../services/QuanLyUserServiceInterface';
import {
  PLATFORM
} from 'aurelia-pal';
const $ = PLATFORM.global.$
@inject(DialogController, ValidationControllerFactory,QuanLyUserLocalService)

export class UserDlg {
  selectedItem:User;
  validationcontroller: ValidationController;
  listPosition=[];
  listStatus=[];
  listDePartment=[]
  fileUpload
  constructor(private dialogcontroller: DialogController, private controllerFactory,private quanLyUserServiceInterface:QuanLyUserServiceInterface) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    return this.selectedItem.IsExit==false?"THÊM MỚI USER":"CẬP NHẬT THÔNG TIN USER"
  }
 async activate(dto: User) {
    this.selectedItem = new User(dto);
   
    this.listPosition = await this.quanLyUserServiceInterface.GetPositons();
    this.listDePartment = await this.quanLyUserServiceInterface.GetDepartments();
    this.listStatus=await this.quanLyUserServiceInterface.GetStatus();
  }
  save() {
    this.validationcontroller.validate().then((result) => {
      if (result.valid) {
           logger.info('submit show dialog user',this.selectedItem);
        this.dialogcontroller.ok(this.selectedItem);
      }
    })

  }
  deleteImgAvatar(){
  $('#img-avatar').removeAttr( "src" );
 
   $("#filename").val("")
  
 }
  HandleBrowseClick()
{
    var fileinput = document.getElementById("browse");
    fileinput.click();
}

Handlechange()
{
    var fileinput = (document as any).getElementById("browse");
    var textinput = (document as any).getElementById("filename");
    textinput.value = fileinput.value;
   var preview = document.querySelector('img');
  var file    = (document as any).querySelector('input[type=file]').files[0];
   var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

}