import { PLATFORM } from 'aurelia-pal';
import { childViewer } from './../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
@inlineView(childViewer)
export class QuanLyDoiTac {
    router: Router;
    heading = 'Quản lý đối tác';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'danh-sach-doi-tac'], name: 'danh-sach-doi-tac', moduleId: PLATFORM.moduleName( './danh-sach-doi-tac'), nav: true, title: 'Danh sách đối tác' }]);
        this.router = router;
    }
}