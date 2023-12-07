import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterOutlet } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../dialogs/login-modal/login-modal.component';
import { ApiService } from '../../api.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth.service';
import { EventPageComponent } from "../event-page/event-page.component";

@Component({
  selector: 'app-base',
  standalone: true,
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatButtonModule, RouterOutlet, MatIconModule, GoogleMapsModule, FlexLayoutServerModule, FlexLayoutModule, MatMenuModule, EventPageComponent]
})
export class BaseComponent {

  public router = inject(Router);
  constructor(private dialog: MatDialog, private apiService: ApiService, private authService: AuthService) { }

  sideNavData = [{ name: 'Map', id: 'maps', 'user': 'normal', icon: 'map' }, { name: 'Events', id: 'events', 'user': 'normal', icon: 'event' }, { name: 'Buildings', id: 'resources', 'user': 'normal', icon: 'location_city' }, { name: 'Contact Us', id: 'feedback', 'user': 'normal', icon: 'feedback' }, { name: 'Analytics', id: 'reports', 'user': 'admin', icon: 'timeline' }];

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  logIn: boolean = false
  userData: any
  // @ViewChild('drawer')
  // public drawer!: MatDrawer;
  isMenuOpen!: boolean;

  ngOnInit() {
    // this.openNotification()
    this.userData = JSON.parse(sessionStorage.getItem('userData') as any) || null
    if (this.userData.login) {
      this.logIn = true
    }
    else {
      this.apiService.loginCheck().subscribe((res) => {
        this.logIn = res
        if (this.logIn) {
          this.userData = JSON.parse(sessionStorage.getItem('userData') as any)
        }
      })
    }
    this.authService.validateLogin().subscribe((res) => {
      if (res.status == 'success' && res.login) {
        this.logIn = true
        this.apiService.setLogin(true)
        this.apiService.USERID = this.userData.userid;
        this.apiService.USERTYPE = this.userData.usertype
      }
    })

  }

  ngAfterViewInit() {
    this.sidenav.open()
  }

  toggle() {
    this.sidenav.toggle();
    // this.drawer.toggle();
  }

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  navigate(data: any) {
    this.router.navigate([data.id])
  }

  openLogin() {
    const dialog = this.dialog.open(LoginModalComponent)
    dialog.afterClosed().subscribe((res) => {
      this.apiService.loginCheck().subscribe((res) => {
        this.logIn = res
        this.userData = JSON.parse(sessionStorage.getItem('userData') as any)
      })
    })
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      if (res.status == 'success') {
        this.apiService.openSnackBar(res.message);
        sessionStorage.removeItem('userData');
        this.router.navigate(["maps"])
        this.apiService.setLogin(false)
        this.logIn = false
        this.sideNavData = [...this.sideNavData]
      } else {
        this.apiService.setLogin(false)
        this.router.navigate(["maps"])
        this.logIn = false
        this.sideNavData = [...this.sideNavData]
        this.apiService.openSnackBar(res?.message)
        sessionStorage.removeItem('userData')
      }
    }, (error) => {
      this.apiService.setLogin(false)
      this.sideNavData = [...this.sideNavData]
      this.router.navigate(["maps"])
      sessionStorage.removeItem('userData');
      this.logIn = false
    })

  }

  openNotification() {
    this.apiService.openNotificationBar('THIS IS A NOTIFICATION !!')
  }

  gotobase() {
    this.router.navigate(["maps"])
  }

}
