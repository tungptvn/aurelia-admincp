import {
  Role
} from "../models/role";
export interface QuanLyQuyenServiceInterface {
  GetGroupRoles(): Promise < Array < any >>
  GetRoles(filterModel ? : any): Promise < Array < Role >>
  PostRole(role: Role): Promise<Role> ;
  PutRole(role: Role): Promise<boolean>;
 }
