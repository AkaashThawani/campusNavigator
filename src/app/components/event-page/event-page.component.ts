import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiService } from '../../api.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FlexLayoutModule, MatCardModule,MatDividerModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

  @Input() selectedEvent: any
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log(this.selectedEvent)
    this.getImage()
  }

  getImage() {
    let fileUrl = (this.selectedEvent.event_image as string).slice(1,this.selectedEvent.event_image.length)
    this.apiService.getCampusImage({ 'image_filename': fileUrl }).subscribe((res: any) => {
      let blob = new Blob([res], { type: res.type });
      let url = URL.createObjectURL(blob)
      this.selectedEvent.image = url;
    })
  }
}
