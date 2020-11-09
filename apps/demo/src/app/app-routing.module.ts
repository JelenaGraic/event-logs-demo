import { HomeComponent, UiEventLogsComponent } from '@event-logs/event-log';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
    { path: 'event-logs', component: HomeComponent },
    { path: 'event-logs/:type/:id', component: UiEventLogsComponent },
    { path: '', redirectTo: 'event-logs', pathMatch: 'full' }
]

@NgModule ({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
    