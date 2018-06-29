import axios from 'axios';


let base = '/api';

export const _loginApi = p => { return axios.get(`${base}/login`,{ params: p}).then(res => res.data)};

export const _loginInApi = p => { return axios.post(`${base}/loginIn`,{ params: p}).then(res => res.data)};

export const _getUserInfo = p => { return axios.post(`${base}/getUserInfo`,{ params: p}).then(res => res.data)};

export const _formApi = p => { return axios.post(`${base}/form`,{ params: p }).then(res => res.data)};

