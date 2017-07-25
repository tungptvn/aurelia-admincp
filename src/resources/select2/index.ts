import { element } from 'aurelia-protractor-plugin/protractor';
import {
  bindable,
  bindingMode,
  inject,
  customAttribute
} from 'aurelia-framework';
import $ from "jquery";
import 'select2';
@inject(Element)
@customAttribute('select2')

export class Select2CustomAttribute {
  element: any;
  @bindable cData = null;
  @bindable cText
  @bindable cValue
  constructor(element) {
    this.element = element;
  }
  async attached() {
    if (this.cData) {
      this.cData = this.toPromise(this.cData)
      let data = await this.cData
      data = await data.json()
      let me = this


      data.forEach(element => {
        var opt: any = document.createElement("option")
        opt.text = element[me.cText]
        this.element.options.add(opt, element[me.cValue])
      });
       $(this.element).select2()
      .on('select2:select', (e) => {
        this.element.dispatchEvent(new Event('change'));
      })
    }
  }
  detached() {
    $(this.element).select2('destroy');
  }

  private toPromise(obj) {
    if (!obj) return Promise.resolve(obj)
    if ('function' !== typeof obj.then) {
      return Promise.resolve(obj)
    }
    return obj
  }
}
