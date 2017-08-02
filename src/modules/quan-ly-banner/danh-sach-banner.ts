import { InsertOrUpdateBanner } from './dialogs/banner-dialog';
import { Filter } from './../../resources/base/filter-base';
import { ViewModelBase } from './../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { BannerService, BannerServiceImpl } from './services/banner-service';
import { Banner } from "./models/banner";
import { logger } from "./logger";
import { DialogService } from "aurelia-dialog";
@inject(BannerServiceImpl, DialogService)
export class DanhSachKhachHang implements ViewModelBase<Banner> {
    entityList
    selected: Banner;
    selectedList: Banner[];
    pageSize = 5;
    filter: Filter = { skip: 0, limit: 10 };
    currentTask // task control waiting view

    constructor(private bannerSrv: BannerService, private dialogService: DialogService) {

    }
    async activate(params, routeConfig, navigationInstruction) {
        this.entityList = await this.bannerSrv.GetAll(this.filter)
        logger.info('this.entityList', this.entityList)
    }
    async runFilter() {
        logger.info('runFilter', this.filter)

        this.currentTask = this.bannerSrv.GetAll(this.filter)
        this.entityList = await this.bannerSrv.GetAll(this.filter)
    }
    async runCreate() {
        //torun gan select tu dialog tra ve
        this.selected = new Banner()
        this.dialogService.open({ viewModel: InsertOrUpdateBanner, model: this.selected }).whenClosed((result) => {
            if (!result.wasCancelled) {

                this.selected = result.output;

                let res;

            } else {
                logger.info("Cancel");
            }
        });

        logger.info("runCreate()", this.selected)
        //this.bannerSrv.Post(this.selected)
    }
    async runUpdate() {
        //torun gan select tu dialog tra ve
        logger.info("runUpdate()", this.selected)

        this.bannerSrv.Put(this.selected)
    }
    async runDelete() {
        logger.info("runDelete()", this.selected)

        let bannerId = this.selected.ID
        await this.bannerSrv.Delete(bannerId)
    }
    async runDeleteMany() {
        logger.info("runDeleteList()", this.selectedList)

        let deletedIds = this.selectedList.map(x => x.ID);
        await this.bannerSrv.DeleteMany(deletedIds)
    }
}