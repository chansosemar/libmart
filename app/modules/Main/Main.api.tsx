import axios from 'axios';

const timeoutAxios = 30000;

const API_GET_SUBJECT = `/subjects/{param}.json?details=true`;
const API_GET_COVERS = `/b/olid/{value}-L.jpg`;

const apiMain = axios.create({
  baseURL: 'http://openlibrary.org',
  timeout: timeoutAxios,
});
const apiCover = axios.create({
  baseURL: 'https://covers.openlibrary.org',
  timeout: timeoutAxios,
});

const getListSubject = (subject: string) =>
  apiMain.get<any>(API_GET_SUBJECT.replace('{param}', subject));

const getCover = (value: string) => {
  apiCover.get<any>(API_GET_COVERS.replace('{value}', value));
};

export default {getListSubject, getCover};
