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

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatButtonModule, RouterOutlet,MatIconModule,GoogleMapsModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
  encapsulation:ViewEncapsulation.None,
})
export class BaseComponent {

  public router = inject(Router);

  sideNavData = [{ name: 'Map', id: 'maps' }, { name: 'Events', id: 'events' }, { name: 'Resources', id: 'resources' }, { name: 'Contact Us', id: 'contactus' }];

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  // @ViewChild('drawer')
  // public drawer!: MatDrawer;
  isMenuOpen!: boolean;

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

}
