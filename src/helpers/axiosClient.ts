import { STORAGE } from './storage';
import { AppSetting } from './../appsettings/index';
import axios, { AxiosInstance } from 'axios';
import { Container } from "aurelia-dependency-injection";
let storage = Container.instance.get(STORAGE);
axios.defaults.baseURL = AppSetting.apiEndPoint;
storage.get(STORAGE.tokenKey) ? axios.defaults.headers.common['Authorization'] = storage.get(STORAGE.tokenKey) : null