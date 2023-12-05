import { Routes } from '@angular/router';
import { ResourcesComponent } from './components/resources/resources.component';
import { EventsComponent } from './components/events/events.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { GmapsComponent } from './components/gmaps/gmaps.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'maps',
        pathMatch: 'full'
    },
    {
        path: 'maps',
        component: GmapsComponent
    },
    {
        path: 'resources',
        component: ResourcesComponent
    },
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'contactus',
        component: ContactusComponent
    }
];
