import $ from 'jquery';
import * as moment from 'moment';
import {
  BindingEngine,
  computedFrom
} from "aurelia-binding";
import {
  inject
} from 'aurelia-dependency-injection';
import {
  bindable,CompositionTransaction 
} from 'aurelia-framework';
import * as _ from 'lodash';
import 'jstree';
import axios from 'axios';
@inject(BindingEngine,CompositionTransaction )
export class DashBoard {
  person: any = {
    fn: 'tung',
    ln: 'pham'
  };
  private personOrigin = Object.assign({}, this.person);
  loadingSelect:any=false;
  jsonData = [{
      id: 1,
      text: "Folder 1",
      state: {
        selected: false
      },
      children: [{
          id: 2,
          text: "Sub Folder 1",
          state: {
            selected: false
          },
          children: [{
            id: 5,
            text: "Sub children Folder 1 a",
            state: {
              selected: false
            }

          },{
            id: 6,
            text: "Sub children Folder 1 b",
            state: {
              selected: false
            }

          }]
        },
        {
          id: 3,
          text: "Sub Folder 2",
          state: {
            selected: false
          },
        }
      ]
    },
    {
      id: 4,
      text: "Folder 2",
      state: {
        selected: false
      },
      children: []
    }
  ];

  dataTable = [{
      id: 1,
      'name': 'Folder 1'
    }, {
      id: 2,
      'name': 'Sub Folder 1'
    }, {
      id: 3,
      'name': 'Sub Folder 2'
    }, {
      id: 4,
      'name': 'Folder 2'
    },
    {
      id: 5,
      'name': 'Sub children Folder 1 a'
    },
    {
      id: 6,
      'name': 'Sub children Folder 1 b'
    }
  ]
  products:any;
  itemDataTable;
  checkLoading:boolean=false;
  compositionTransactionNotifier :any;
  total:number=0;
  productss:any = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' },
  ];
  constructor(BindingEngine,compositionTransaction) {
   
  }
  get isDisable() {
    return _.isEqual(this.person, this.personOrigin);
  }
  async doClick() {
    let promise = await this.timerDo(1000);
    return promise;
  }
  timerDo(ms = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    });
  }
  setTimeDataTable(data,time){
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, time)
    });
  }
  GetWebsite(){
     return new Promise((resolve,reject)=>{
        axios.get('https://api.easywebhub.com/websites')
  .then(function(response){
   
     resolve(response);
  });  
     })
  }
bind(){
     this.GetWebsite().then(rs=>{
        console.log('resolve',rs);
        this.checkLoading=true;
         this.itemDataTable=(rs as any).data;
     })
      this.setTimeDataTable(this.productss,3000).then(rs=>{
         this.loadingSelect=true;
          this.products=rs;
          
      
     })
    //  this.setTimeDataTable(this.dataTable,5000).then(rs=>{
    //      this.checkLoading=true;
    //       this.itemDataTable=rs;
          
      
    //  })
}
  attached() {
    //this.total=this.itemDataTable.length;
    $('#jstree-tree-search').keyup(function () {
      $('#jstree-tree').jstree('search', $(this).val());
    });
    $('#jstree-tree')
      .jstree({
        core: {

          themes: {
            "responsive": false
          },
          data: this.jsonData
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
      });
     

  }
  convertData(item) {
    var node = $('#jstree-tree').jstree(true).get_node(item.id);
    console.log('no123123', '#' + node.id);
    console.log('node', $('#jstree-tree').jstree("select_node", '#' + node.id, true));
    // let tam=item.id;
    // var parentNode = $('#jstree-tree').find("[id='2']");
    // console.log('parentNode',parentNode);




  }
}
