import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule,LoginFormComponent,MatTabsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  
}
