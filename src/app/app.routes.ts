import { Routes } from '@angular/router';
import { ResourcesComponent } from './components/resources/resources.component';
import { EventsComponent } from './components/events/events.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { GmapsComponent } from './components/gmaps/gmaps.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MySearchHistoryComponent } from './components/my-search-history/my-search-history.component';

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
    }, {
        path: 'feedback',
        component: FeedbackComponent
    }, {
        path: 'history',
        component: MySearchHistoryComponent,
        canActivate: [() => { return JSON.parse(sessionStorage.getItem('userData') as any)?.login ? true : false }]
    }, {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [() => { return JSON.parse(sessionStorage.getItem('userData') as any)?.usertype == 'admin' ? true : false }]

    }
];
