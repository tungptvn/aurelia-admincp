import { PLATFORM } from 'aurelia-pal';
import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName("./select2/index"),
        PLATFORM.moduleName("./btn-async/btn-async"),
        PLATFORM.moduleName("./datepicker/datepicker"),
        PLATFORM.moduleName("./datepicker/date-range-picker")]);
}
