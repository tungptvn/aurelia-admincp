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
    entitiesCount
    selected: Banner;
    selectedList: Banner[];
    // pageSize = 5;
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
            this.bannerSrv.GetAll(this.filter).then(rec => this.entityList = rec),
            this.bannerSrv.GetCount(this.filter.where).then(rec => this.entitiesCount = rec)
        ]))

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