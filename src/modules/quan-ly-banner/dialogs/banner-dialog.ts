import { Banner } from './../models/banner';
import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
@inject(DialogController, ValidationControllerFactory)

export class InsertOrUpdateBanner {
  validationcontroller: ValidationController;
  constructor(private dialogcontroller: DialogController, private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    switch (this.bannerDto.ID) {
      case 0:
        return "Thêm mới banner";

      default:
        return "Cập nhật banner";
    }
  }
  bannerDto: Banner;
  activate(dto: Banner) {
    logger.info('dto', dto);
    this.bannerDto = dto;
  }
  save() {
    this.validationcontroller.validate().then((result) => {
      if (result.valid) {
        this.dialogcontroller.ok(this.bannerDto);
      }
    })

  }

}
