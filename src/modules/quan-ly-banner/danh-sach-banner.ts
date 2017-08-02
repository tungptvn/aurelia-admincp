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
    // pageSize = 5;
    items: Banner[];
    selectedItemItem: Banner;
    itemsCount
    selectedItem: Banner;
    selectedList: Banner[];
    filter: Filter = { skip: 0, limit: 10, where: {} };
    asyncTask // task control waiting view

    constructor(private bannerSrv: BannerService, private dialogService: DialogService) {

    }
    async activate(params, routeConfig, navigationInstruction) {
        await this.runFilter()

    }
    async currentPageChanged(event) {
        console.log(event)
        // this.filter.skip
        await this.runFilter()
    }
    async runFilter() {
        logger.info('runFilter', this.filter)
        await (this.asyncTask = Promise.all([
            this.bannerSrv.GetAll(this.filter).then(rec => this.items = rec),
            this.bannerSrv.GetCount(this.filter.where).then(rec => this.itemsCount = rec)
        ]))

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
        logger.info("runDeleteList()", this.selectedItemList)

        let deletedIds = this.selectedItemList.map(x => x.ID);
        await this.bannerSrv.DeleteMany(deletedIds)
    }
}