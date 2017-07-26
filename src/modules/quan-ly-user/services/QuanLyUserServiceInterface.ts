import {
  User
} from "../models/user";
export interface QuanLyUserServiceInterface {
   GetStatus(): Promise < Array < any >> ;
  GetPositons(): Promise < Array < any >> ;
  GetDepartments(): Promise < Array < any >>
  GetUsers(filterModel ? : any): Promise < Array < User >>
  PostUser(user: User): Promise<User> ;
  PutUser(user: User): Promise<boolean>;
 

}
