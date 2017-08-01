import { Filter } from './../../../resources/base/filter-base';
import { BaseService } from './../../../resources/base/service-base';
import { Banner } from "../models/banner"
import axios from 'axios';

export interface BannerService extends BaseService<Banner> {
    // tung mo rong service cho banner o day
    ApproveList(Ids: Array<number>): Promise<boolean>
}
export class BannerServiceImpl implements BannerService {
    ApproveList(Ids: number[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Banners/count', {
            params: filter.where
        })
        return rec.data.count
    }
    async GetAll(filter?: Filter): Promise<any> {
        let recBanners = await axios.get('api/Banners', {
            params: filter
        })
        return recBanners.data
    }
    Get(id: number): Promise<Banner> {
        throw new Error("Method not implemented.");
    }

    Post(T: Banner): Promise<Banner> {
        throw new Error("Method not implemented.");
    }
    Put(T: Banner): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    Delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    DeleteMany(Ids: Array<number>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

