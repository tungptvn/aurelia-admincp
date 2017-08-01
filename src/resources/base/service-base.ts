import { Filter } from './filter-base';
export interface BaseService<T> {
    Get(id: number): Promise<T>
    GetAll(filter?: Filter): Promise<any>
    GetCount(filter?: Filter): Promise<number>
    Post(T: T): Promise<T>
    Put(T: T): Promise<boolean>
    Delete(id: number): Promise<boolean>
    DeleteMany(Ids: Array<number>): Promise<boolean>
}


