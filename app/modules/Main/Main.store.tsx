import {makeAutoObservable, observable} from 'mobx';
import ApiClient from './Main.api';
import {err} from 'react-native-svg/lib/typescript/xml';

type LoginType = {
  libId: string;
  pass: string;
};

type DataLoginType = {
  libId: string;
  pass: string;
  name: string;
  type: string;
};

type ListSubjectType = {
  count: number;
  name: string;
  key: string;
};

type AuthorsType = {
  key: string;
  name: string;
};

type ListBooksType = {
  title: string;
  cover_edition_key: string;
  cover: string;
  authors: AuthorsType[];
  edition_count: number;
};
type ListBooksResponseType = {
  title: string;
  cover_edition_key: string;
  cover: string;
  authors: string;
  edition_count: number;
};

type PickUpType = {
  data: ListBooksResponseType[] | null;
  date: Date;
};

export class MainStore {
  isSplashScreen: boolean = true;
  isSplashScreenLoading: boolean = true;
  isAuthenticated: boolean = false;
  isAuthenticatedLoading: boolean = false;
  isAuthenticaterdError: string = '';

  dataLogin: DataLoginType[] = [
    {
      libId: '123456',
      pass: 'admin123',
      name: 'Ajeng',
      type: 'member',
    },
    {
      libId: '098765',
      pass: 'admin123',
      name: 'Ajeng (Lib)',
      type: 'librarian',
    },
  ];

  userData: DataLoginType | null = null;

  getListSubjectResponse: ListSubjectType[] | null = null;
  getListSubjectLoading: boolean = false;
  getListSubjectError: string = '';

  getListBooksResponse: ListBooksResponseType[] | null = null;
  getListBooksLoading: boolean = false;
  getListBooksError: string = '';

  checkoutList: ListBooksResponseType[] | null = null;
  pickUpList: PickUpType[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFalseSplashScreen() {
    this.isSplashScreen = false;
  }

  setFalseSplashScreenLoading() {
    this.isSplashScreenLoading = false;
  }

  authenticated(data: LoginType) {
    this.isAuthenticatedLoading = true;
    for (let i = 0; i < this.dataLogin.length; i++) {
      if (
        this.dataLogin[i].libId === data.libId.toLowerCase() &&
        this.dataLogin[i].pass === data.pass.toLowerCase()
      ) {
        this.authenticatedSuccess(this.dataLogin[i]);
        this.isAuthenticatedLoading = false;
      }
    }
    this.isAuthenticatedLoading = false;
    this.authenticatedError();
  }

  authenticatedSuccess(data: DataLoginType) {
    this.isAuthenticaterdError = '';
    this.userData = data;
    this.isAuthenticated = true;
    this.isSplashScreen = false;
  }

  authenticatedError() {
    this.isAuthenticaterdError = 'WRONG LIBID / PASS';
  }

  clearAuthenticatedError() {
    this.isAuthenticaterdError = '';
  }

  async getListSubject() {
    this.getListSubjectLoading = true;
    try {
      const res = await ApiClient.getListSubject('love');
      console.log('GET LIST SUBJECT SUCCESS', res.data.subjects);
      this.getListSubjectSuccess(res.data.subjects);
    } catch (error) {
      console.log('GET LIST SUBJECT ERROR', error);
      this.getListSubjectFailed();
    } finally {
      this.getListSubjectLoading = false;
    }
  }

  getListSubjectSuccess(data: ListSubjectType[]) {
    this.getListSubjectResponse = data;
  }

  getListSubjectFailed() {
    this.getListSubjectError = 'ERROR';
  }

  async getListBooks(subject: string) {
    this.getListBooksLoading = true;
    try {
      const res = await ApiClient.getListSubject(subject);
      console.log('GET LIST BOOKS SUCCESS');
      this.getListBooksSuccess(res.data.works);
    } catch (error) {
      console.log('GET LIST BOOKS ERROR', error);
      this.getListBooksFailed();
    } finally {
      this.getListBooksLoading = false;
    }
  }

  getListBooksSuccess(data: ListBooksType[]) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      res.push({
        title: data[i].title,
        cover_edition_key: data[i].cover_edition_key,
        cover: `https://covers.openlibrary.org/b/olid/${data[i].cover_edition_key}-L.jpg`,
        authors: data[i].authors[0].name,
        edition_count: data[i].edition_count,
      });
    }
    this.getListBooksLoading = false;
    this.getListBooksResponse = res;
  }

  getListBooksFailed() {
    this.getListBooksError = 'ERROR';
  }

  setCheckoutList(data: ListBooksResponseType) {
    if (this.checkoutList !== null) {
      this.checkoutList = [...this.checkoutList, data];
    } else {
      this.checkoutList = [data];
    }
  }

  removeItemCheckoutList(title: string) {
    let res = this.checkoutList?.filter(item => item.title !== title);
    if (res) {
      if (res.length > 0) {
        this.checkoutList = res;
      } else {
        this.checkoutList = null;
      }
    }
  }

  setPickUpList(data: PickUpType) {
    this.checkoutList = null;
    if (this.pickUpList !== null) {
      this.pickUpList = [...this.pickUpList, data];
    } else {
      this.pickUpList = [data];
    }
  }
}
