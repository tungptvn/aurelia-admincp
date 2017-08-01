import { Filter } from './../../../resources/base/filter-base';
import axios from 'axios';
import { BannerService } from './banner-service';
import { Banner } from "../models/banner";
import { logger } from "../logger";
export class BannerServiceImpl implements BannerService {
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
}