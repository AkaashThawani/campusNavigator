import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenInterceptor } from './token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService,) {

  }

  APIURL = "http://localhost:8000/"


  logout():Observable<any> {
    return this.apiService.logout()
  }
  resetUD() {
    this.apiService.setLogin(false)
    this.apiService.USERID = ''
    this.apiService.USERTYPE = ''
  }

  loginUser(id: string, pass: string) {
    return this.apiService.userLogin({ 'username': id, 'password': pass })
  }
  setUD(userData: any) {
    this.apiService.setLogin(true)
    this.apiService.USERID = userData.user
    this.apiService.USERTYPE = userData.usertype
  }

  loginAdmin(id: string, pass: string) {
    return this.apiService.adminLogin({ username: id, password: pass })
  }

  validateLogin(){
    return this.apiService.validateSession()
  }

}
