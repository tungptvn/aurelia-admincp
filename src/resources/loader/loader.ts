import { PLATFORM } from 'aurelia-pal';
import { bindable, inject } from 'aurelia-framework';
@inject(Element)
export class LoaderCustomElement {
    @bindable loading
    @bindable asyncTask
    /**
     *
     */
    constructor(private el) {
    }
    async asyncTaskChanged() {
        console.log('this.el', this.el)

        if (typeof this.asyncTask.then == 'function') {

            PLATFORM.global.$('#loader').fadeIn(200)
            await this.asyncTask
            PLATFORM.global.$('#loader').fadeOut(200)


        }

    }
}
