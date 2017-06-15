import $ from 'jquery';
import * as moment from 'moment';
export class DashBoard {
  myvl = '2';

 async doClick(){
    let promise=await this.timerDo(3000);
    return promise;
  }
 timerDo(ms = 0) {
   return new Promise((resolve, reject)=>{setTimeout(()=>{resolve(true)}, ms)});
  }
 }
