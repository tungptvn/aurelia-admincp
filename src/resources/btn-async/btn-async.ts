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
        console.log('btn', this.element);
        this.element.addEventListener("click", function () {
            this.disabled = true;
            this.task(() => {
                this.disabled = false;
            });
        });


    }
    detached() {
    }

}
