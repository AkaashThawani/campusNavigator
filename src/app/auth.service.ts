import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(username: string, password: string) {

  }

  logout(): void {
    // Clear user session data from local storage
    sessionStorage.removeItem('userData');
    this.resetUD()
  }
  resetUD() {
    this.apiService.setLogin(false)
    this.apiService.USERID = ''
    this.apiService.USERTYPE = ''
  }

  loginUser(id: string, pass: string) {
    sessionStorage.setItem('userData', JSON.stringify({ 'user': id, 'login': true, 'usertype': 'normal' }))
    this.setUD({ 'user': id, 'login': true, 'usertype': 'normal' })
    return
  }
  setUD(userData: any) {
    this.apiService.setLogin(true)
    this.apiService.USERID = userData.user
    this.apiService.USERTYPE = userData.usertype
  }

  loginAdmin(id: string, pass: string) {
    sessionStorage.setItem('userData', JSON.stringify({ 'user': id, 'login': true, 'usertype': 'admin' }))
    this.setUD({ 'user': id, 'login': true, 'usertype': 'admin' })
    return
  }

}
