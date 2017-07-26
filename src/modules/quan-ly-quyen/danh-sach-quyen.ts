import {
  PLATFORM
} from 'aurelia-pal';
import {
  logger
} from './logger';
import {
  inject
} from "aurelia-dependency-injection";
import {
  Role,
  FilterRole
} from "./models/role";
import {
  DialogService
} from 'aurelia-dialog';
import {
  GridOptions
} from "ag-grid";
import {
  QuanLyQuyenLocalService
} from './services/QuanLyQuyenLocalService';
import {
  QuanLyQuyenServiceInterface
} from './services/QuanLyQuyenServiceInterface';
import {
  Router
} from 'aurelia-router';

import swal from 'sweetalert';
const $ = PLATFORM.global.$

@inject(QuanLyQuyenLocalService, DialogService, Router)
export class DanhSachQuyen {
  private gridOptions: GridOptions;
  private listGroupRoles = [];

  private listRoles = [];
  private selectedRole: Role = new Role();
  private filterModel: FilterRole;
  private listTreeRoles = [];
  router: Router;
  constructor(private quanLyQuyenServiceInterface: QuanLyQuyenServiceInterface, private dialogService, router) {

    (this as any).gridOptions = Role.gridOptions;
    this.router = router;
    $("#jstree-tree").jstree('open_all');
  }
  async activate() {
    this.listRoles = await this.quanLyQuyenServiceInterface.GetRoles(this.filterModel);
    this.listGroupRoles = await this.quanLyQuyenServiceInterface.GetGroupRoles();

    this.listTreeRoles = await this.quanLyQuyenServiceInterface.GetTreeGroupRoles();

    await this.onReady();
  }
  attached() {


    $('#jstree-tree-search').keyup(function () {
      $('#jstree-tree').jstree('search', $(this).val());
    });
    $('#jstree-tree')
      .jstree({
        core: {

          themes: {
            "responsive": false
          },
          data: this.listTreeRoles
        },

        "types": {
          "default": {
            "icon": "icon-lg"
          },
          "file": {
            "icon": "icon-lg"
          }
        },
        'search': {
          "case_insensitive": true,
          "show_only_matches": true
        },
        'plugins': ['search', "checkbox", "types", "state"]
      }).on('loaded.jstree', function() {
         
  });
   $("#jstree-tree").jstree('open_all');
           $('#jstree-tree').jstree(true).refresh();
   

  }

  onReady() {
    this.createNewDatasource();

  }
  onRowSelected(event) {

  }
  onRowClicked(e) {
    if (e.event.target !== undefined) {
      this.selectedRole = e.node == undefined ? new Role() : new Role(e.node.data);
      console.log('selectedRole', this.selectedRole);
      console.log('e', e.node.data);
      let actionType = e.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "EditRole":
          return this.EditRole();
        case "linKUser":
          return this.linkUser();
      }
    }
  }
  createRole() {
     $('#jstree-tree').jstree(true).deselect_all();

  }
  EditRole() {

    $('#jstree-tree').jstree("select_node", '#' + this.selectedRole.RoleId, true);

  }
  linkUser() {
    this.router.navigateToRoute('quan-ly-user')
  }
  createNewDatasource() {
    if (!this.listRoles) {
      return;
    }
    let dataSource = {
      getRows: (params) => {

        params.successCallback(this.listRoles.slice(params.startRow, params.endRow), this.listRoles.length);
      },
      rowCount: this.listRoles.length
    };
    setTimeout(() => this.gridOptions.api.setDatasource(dataSource), 1000);
  }

}
