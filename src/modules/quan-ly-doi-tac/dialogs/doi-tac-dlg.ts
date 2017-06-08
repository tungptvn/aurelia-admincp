import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DoiTac } from './../models/doi-tac';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
@inject(DialogController, ValidationControllerFactory)

export class DoiTacDlg {
  selectedItem:DoiTac;
  validationcontroller: ValidationController;
  constructor(private dialogcontroller: DialogController, private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    return this.selectedItem.IsExit==true?"Thêm mới đối tác":"Cập nhật đối tác"
  }
 
  activate(dto: DoiTac) {
   
    this.selectedItem = new DoiTac(dto);
  }
  save() {
    this.validationcontroller.validate().then((result) => {
     
      if (result.valid) {
           logger.info('submit show dialog đối tác',this.selectedItem);
        this.dialogcontroller.ok(this.selectedItem);
      }
    })

  }

}