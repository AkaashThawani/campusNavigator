import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../api.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatButtonModule, FormsModule, ReactiveFormsModule,MatCardModule,MatDividerModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  name: FormControl = new FormControl(null)
  email: FormControl = new FormControl(null)
  comments: FormControl = new FormControl(null)
  constructor(private apiService: ApiService) { }

  saveFB() {
    this.apiService.saveFeedback({ name: this.name.value, email: this.email.value, comments: this.comments.value }).subscribe((res: any) => {
      if (res.status == 'success') {
        this.name.reset(null)
        this.email.reset(null)
        this.comments.reset(null)
        this.apiService.openSnackBar(res.message)
      } else {
        this.apiService.openSnackBar('Failed to save data')
      }
    })
  }

}
