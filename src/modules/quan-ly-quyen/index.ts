import { PLATFORM } from 'aurelia-pal';
import { childViewer } from './../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
@inlineView(childViewer)
export class QuanLyQuyen {
    router: Router;
    heading = 'Quản lý quyền';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'danh-sach-quyen'], name: 'danh-sach-quyen', moduleId: PLATFORM.moduleName( './danh-sach-quyen'), nav: true, title: 'DANH SÁCH QUYỀN' }]);
        this.router = router;
    }
}