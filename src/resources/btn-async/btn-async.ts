import {
  bindable,
  bindingMode,
  inject,
  customAttribute
} from 'aurelia-framework';
@inject(Element)
@customAttribute('btn-async')

export class BtnAsyncAttribute {
  element: any;
  @bindable task;
  constructor(element) {
    this.element = element; //button
  }
  attached() {
      this.element.addEventListener('click', () => {
       this.element.disabled = true;
       this.element.children[0].style.display = "block";
    this.task().then(rs=>{
        console.log('task',rs)
        if(rs==true)
          {
               this.element.disabled = false;
               this.element.children[0].style.display = "none";
          return;
          }
    });
    });
   
  }
  detached() {}

}
