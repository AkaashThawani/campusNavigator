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
import { ApiService } from '../../api.service';

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

  constructor(private authService: AuthService, private dialog: MatDialog, private apiService: ApiService) { }

  login(username: string, password: string): void {
    // Call the login service method based on userType
    if (this.userType === 'user') {
      this.authService.loginUser(username, password).subscribe((res) => {
        console.log(res)
        if (res.status == 'success') {
          this.apiService.setLoginDetails(res,'normal')
          this.dialog.closeAll()
        } else {
          this.apiService.openSnackBar(res.message)
        }
      });
    } else {
      this.authService.loginAdmin(username, password).subscribe((res) => {
        console.log(res)
        if (res.status == 'success') {
          this.apiService.setLoginDetails(res,'admin')
          this.dialog.closeAll()
        } else {
          this.apiService.openSnackBar(res.message)
        }
      })
    }
  }

  openSignUp() {
    this.dialog.open(SignIpComponent)
  }

}
