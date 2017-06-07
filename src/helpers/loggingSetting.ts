import { LogManager } from 'aurelia-framework';

var loglevel = sessionStorage.getItem('loglevel') || 4;
LogManager.setLevel(loglevel);
