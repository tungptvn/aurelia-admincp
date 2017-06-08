import {
  DoiTac
} from "../models/doi-tac";
export interface QuanLyDoiTacServiceInterface {
  SelectDoiTacs(): Promise < Array < any >> ;
  GetDoiTacs(filterModel ? : any): Promise < Array < DoiTac >>
  PostDoiTac(doitac: DoiTac): Promise < DoiTac > ;
  PutDoiTac(doitac: DoiTac): Promise < boolean > ;

}
