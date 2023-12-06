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
    this.snackBar.open(message, 'X',{
      duration:1000
    });
  }

  openNotificationBar(message: any) {
    this.snackBar.open(message, 'X',{
      duration:3000,
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
    return this.http.get(url , {headers:this.headers});
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

  setLoginDetails(data: any, usertype: any) {
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
}
