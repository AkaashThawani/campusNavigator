import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from "../event-page/event-page.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-events',
    standalone: true,
    templateUrl: './events.component.html',
    styleUrl: './events.component.css',
    imports: [CommonModule, EventPageComponent,MatButtonModule]
})
export class EventsComponent {
    eventData: boolean = false

}
