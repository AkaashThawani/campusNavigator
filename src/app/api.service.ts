import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  LOGIN: BehaviorSubject<boolean> = new BehaviorSubject(false)
  USERID: any = null
  USERTYPE: string = ''

  prevSearchData: BehaviorSubject<any> = new BehaviorSubject({})

  getPrevSearchData() {
    return this.prevSearchData.asObservable()
  }

  setPrevSearchData(data) {
    this.prevSearchData.next(data)
  }

  apiUrl = 'http://localhost:8000'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  loginCheck() {
    return this.LOGIN.asObservable()
  }

  setLogin(value: boolean) {
    this.LOGIN.next(value)
  }

  accessToken = ''

  openSnackBar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 1000
    });
  }

  openNotificationBar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }


  // Include CSRF token in the headers
  get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
  }



  saveLocation(locationData: any): Observable<any> {
    const url = `${this.apiUrl}/api/add_locations`;
    return this.http.post(url, locationData, { headers: this.headers });
  }

  getLocations(): Observable<any> {
    const url = `${this.apiUrl}/api/get_locations`;
    return this.http.get(url, { headers: this.headers });
  }

  userLogin(data: any): Observable<any> {
    const url = `${this.apiUrl}/api/login`;
    return this.http.post(url, data);
  }

  adminLogin(data: any): Observable<any> {
    const url = `${this.apiUrl}/api/adminLogin`;
    return this.http.post(url, data);
  }

  validateSession(): Observable<any> {
    const url = `${this.apiUrl}/api/validate-session`
    return this.http.get(url)
  }

  createUser(data: any) {
    const url = `${this.apiUrl}/api/create-user`
    return this.http.post(url, data)
  }

  getEvents() {
    const url = `${this.apiUrl}/api/get_campus_events`
    return this.http.get(url)
  }

  setLoginDetails(data: any, usertype: any) {
    this.setPrevSearchData({})
    this.LOGIN.next(true)
    this.accessToken = data.access_token
    this.USERTYPE = data.usertype || usertype
    this.USERID = data.user_id
    console.log("access", this.accessToken)
    console.log("LOGIN SUCCESS STTING DATA")
    sessionStorage.setItem('userData', JSON.stringify({ login: this.LOGIN.value, 'usertype': this.USERTYPE, userid: this.USERID, 'name': data.email, 'accessToken': data.access_token }))
  }

  logout() {
    const url = `${this.apiUrl}/api/logout`;
    return this.http.post(url, {}, { headers: this.headers });
  }

  saveFeedback(data: any) {
    const url = `${this.apiUrl}/api/save_feedback`;
    return this.http.post(url, data, { headers: this.headers });
  }

  getBuildings() {
    const url = `${this.apiUrl}/api/get_buildings`;
    return this.http.get(url, { headers: this.headers });
  }

  getCampusImage(imgURL) {
    const url = `${this.apiUrl}/api/get_image`;
    return this.http.post(url, imgURL, { headers: this.headers, responseType: 'blob' });
  }

  saveFavSearch(userid, data) {
    const url = `${this.apiUrl}/api/user/${userid}/fav-search/save`;
    return this.http.post(url, data, { headers: this.headers });
  }

  getUserFavSearch(userid) {
    const url = `${this.apiUrl}/api/user/${userid}/fav-search`;
    return this.http.get(url, { headers: this.headers });
  }
}
