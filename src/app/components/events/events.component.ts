import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from "../event-page/event-page.component";
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../api.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-events',
    standalone: true,
    templateUrl: './events.component.html',
    styleUrl: './events.component.css',
    imports: [CommonModule, EventPageComponent, MatButtonModule, MatTableModule, MatCardModule, MatIconModule]
})
export class EventsComponent {
    eventData: boolean = false
    eventList: any[] = []
    displayedColumns = ['ename', 'estart', 'eend', 'eloc', 'act']
    selectedEventData: any;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.getEventList()
    }

    getEventList() {
        this.apiService.getEvents().subscribe((res: any) => {
            console.log(res)
            this.eventList = res
        })
    }

    openSide(data) {
        this.eventData = true
        this.selectedEventData = data
    }

    closeSide(event) {
        this.eventData = false
    }
}


