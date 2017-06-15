import $ from 'jquery';
import * as moment from 'moment';
export class DashBoard {
  myvl = '2';

  doClick(){
 let promise = new Promise((resolve, reject)=> {
     setTimeout(()=> {
        resolve(true);
     },5000);
   });
   return promise;
  }
 
 }
