import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-ip',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule],
  templateUrl: './sign-ip.component.html',
  styleUrl: './sign-ip.component.css'
})
export class SignIpComponent {

  constructor(private apiSerice: ApiService, private dialog: MatDialog) { }

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    // Implement your signup logic here
    this.apiSerice.createUser({ 'username': this.user.name, 'password': this.user.password, 'email': this.user.email, 'fName': this.user?.name?.split(" ")[0] || '', 'lName': this.user?.name?.split(" ")[1] || '' }).subscribe((res: any) => {
      console.log('res', res)
      if (res.status == "success") {
        this.dialog.closeAll()
        this.apiSerice.userLogin({ 'username': this.user.email, 'password': this.user.password }).subscribe((res2: any) => {
          if (res2.status == 'success') {
            this.dialog.closeAll();
            res2.usertype='normal'
            this.apiSerice.setLoginDetails(res2,'normal')
            this.apiSerice.openSnackBar('User Created and Logged In')
          } else {
            this.apiSerice.openSnackBar(res2.message)
          }
        })
      } else {
        this.apiSerice.openSnackBar(res.message)
      }
    })
  }

}
