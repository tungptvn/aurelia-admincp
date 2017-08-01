import { Filter } from './../../resources/base/filter-base';
import { ViewModelBase } from './../../resources/base/viewmodel-base';
import { BannerServiceImpl } from './services/banner-service-impl';
import { inject } from 'aurelia-framework';
import { BannerService } from './services/banner-service';
import { Banner } from "./models/banner";
import { logger } from "./logger";

@inject(BannerServiceImpl)
export class DanhSachKhachHang implements ViewModelBase<Banner> {
    entityList
    selected: Banner;
    selectedList: Banner[];
    filter: Filter = { skip: 1 };

    constructor(private bannerSrv: BannerService) {

    }
    async activate(params, routeConfig, navigationInstruction) {
        this.entityList = await this.bannerSrv.GetAll(this.filter)
        logger.info('this.entityList', this.entityList)
    }
}