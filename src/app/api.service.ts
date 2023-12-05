import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  LOGIN: BehaviorSubject<boolean> = new BehaviorSubject(false)
  USERID: string = ''
  USERTYPE: string = ''

  apiUrl = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  loginCheck() {
    return this.LOGIN.asObservable()
  }

  setLogin(value: boolean) {
    this.LOGIN.next(value)
  }

  csrftoken = 'OWY4NmQwODE4ODRjN2Q2NTlhMmZlYWEwYzU1YWQwMTVhM2JmNGYxYjJiMGI4MjJjZDE1ZDZMGYwMGEwOA=='
  accessToken = 'pk.eyJ1IjoiYWthYXNodGhhd2FuaTEyMyIsImEiOiJjbG9yZm4zbWwwbmx6Mm5wNjZyNnNmZnl2In0.AslSvwdgMzQk9-pM36YuLw'

  // Include CSRF token in the headers
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.csrftoken
  });



  saveLocation(locationData: any): Observable<any> {
    const url = `${this.apiUrl}/api/add_locations`;
    return this.http.post(url, locationData, { headers: this.headers });
  }

  getLocations(): Observable<any> {
    const url = `${this.apiUrl}/api/get_locations`;
    return this.http.get(url);
  }


}
