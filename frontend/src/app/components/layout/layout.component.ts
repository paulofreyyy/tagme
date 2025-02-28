import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        RouterModule
    ]
})
export class LayoutComponent {
    currentRoute: string = "";

    constructor(private route: Router) {
        this.route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.url
            }
        })
    }

    isActive(route: string) {
        return this.currentRoute === route
    }
}
