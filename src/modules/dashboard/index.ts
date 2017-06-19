import $ from 'jquery';
import * as moment from 'moment';
import { BindingEngine, computedFrom } from "aurelia-binding";
import { inject } from 'aurelia-dependency-injection';
import { bindable } from 'aurelia-framework';
import * as _ from 'lodash';
@inject(BindingEngine)
export class DashBoard {
  person: any = { fn: 'tung', ln: 'pham' };
  private personOrigin = Object.assign({}, this.person);
  constructor() {
  }
  get isDisable() {
    return _.isEqual(this.person, this.personOrigin);
  }
  async doClick() {
    let promise = await this.timerDo(1000);
    return promise;
  }
  timerDo(ms = 0) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, ms) });
  }
}
