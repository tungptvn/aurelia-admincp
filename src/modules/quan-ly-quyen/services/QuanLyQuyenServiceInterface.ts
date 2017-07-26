import {
  Role
} from "../models/role";
export interface QuanLyQuyenServiceInterface {
  GetTreeGroupRoles(): Promise < Array < any >>;
  GetGroupRoles(): Promise < Array < any >>;
  GetRoles(filterModel ? : any): Promise < Array < Role >>;
  PostRole(role: Role): Promise<Role> ;
  PutRole(role: Role): Promise<boolean>;
 }
