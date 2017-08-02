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
    items: Banner[];
    itemsCount: number
    selectedItem: Banner;
    selectedList: Banner[];
    filter: Filter = { skip: 0, limit: 10, where: {} };
    asyncTask // task control waiting view

    constructor(private bannerSrv: BannerService, private dialogService: DialogService) {

    }
    async activate(params, routeConfig, navigationInstruction) {
        await this.runFilter()

    }
    async paginationChanged(event) {
        await this.runFilter()
    }
    async runFilter() {
        logger.info('runFilter', this.filter)
        await (this.asyncTask = Promise.all([
            this.bannerSrv.GetAll(this.filter).then(rec => this.items = rec),
            this.bannerSrv.GetCount(this.filter).then(rec => this.itemsCount = rec),
            // this.timerDo(1000) 

        ]))

    }
      timerDo(ms = 0) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, ms) });
  }
    async runCreate() {
        //torun gan select tu dialog tra ve
        this.selectedItem = new Banner()
        this.dialogService.open({ viewModel: InsertOrUpdateBanner, model: this.selectedItem }).whenClosed((result) => {
            if (!result.wasCancelled) {

                this.selectedItem = result.output;

                let res;

            } else {
                logger.info("Cancel");
            }
        });

        logger.info("runCreate()", this.selectedItem)
        //this.bannerSrv.Post(this.selectedItem)
    }
    async runUpdate() {
        //torun gan select tu dialog tra ve
        logger.info("runUpdate()", this.selectedItem)

        this.bannerSrv.Put(this.selectedItem)
    }
    async runDelete() {
        logger.info("runDelete()", this.selectedItem)

        let bannerId = this.selectedItem.ID
        await this.bannerSrv.Delete(bannerId)
    }
    async runDeleteMany() {
        logger.info("runDeleteList()", this.selectedList)

        let deletedIds = this.selectedList.map(x => x.ID);
        await this.bannerSrv.DeleteMany(deletedIds)
    }
}