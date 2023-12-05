import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SignIpComponent } from '../sign-ip/sign-ip.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDividerModule, MatDialogModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  username: string = ''
  password: string = ''
  @Input() userType: 'user' | 'admin' = 'user';

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  login(username: string, password: string): void {
    // Call the login service method based on userType
    if (this.userType === 'user') {
      this.authService.loginUser(username, password);
      this.dialog.closeAll()
    } else {
      this.authService.loginAdmin(username, password);
      this.dialog.closeAll()
    }
  }

  openSignUp() {
    this.dialog.open(SignIpComponent)
  }

}
