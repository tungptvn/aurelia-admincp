import { PLATFORM } from 'aurelia-pal';

import { inject } from 'aurelia-dependency-injection';
import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import "../../helpers/loggingSetting";
// import "../../helpers/axiosInterceptor";
import { AuthenService } from "authen/authenService";

@inject(AuthenService,Router)
export class App {
    router: Router;
    userInfo: any;
    constructor(private authenSrv: AuthenService , router) {
        this.userInfo = this.authenSrv.userInfo;
        this.router = router;
    }
    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([
            {
                route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('../dashboard/index'), nav: true, title: 'Dashboard',
                settings: { icon: 'pg-home' }
            },
            {
                route: 'quan-ly-nhan-vien', name: 'quan-ly-nhan-vien', moduleId: PLATFORM.moduleName('../quan-ly-nhan-vien/index'), nav: true, title: 'Quản lý nhân viên',
                settings: { icon: 'pg-tables' }
            }

        ]);

        this.router = router;

    }
    attached() {
        var script = document.createElement("script");
        script.src = "assets/js/scripts.js";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}
