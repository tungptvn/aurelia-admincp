import { bindable } from 'aurelia-framework';
export class LoaderCustomElement {
    @bindable loading
    @bindable asyncTask
    async asyncTaskChanged() {
        if (typeof this.asyncTask.then == 'function') {
            this.loading = true
            await this.asyncTask
            this.loading = false
        }

    }
}
