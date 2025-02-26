import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatDialogModule,
        MatIconModule,
    ]
})
export class ListComponent implements OnInit {
    items: any[] = [];
    cols = 4;

    constructor(private apiService: ApiService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.apiService.getItems().subscribe((data) => {
            this.items = data;
        });
    }

    deleteItem(id: string): void {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            width: '500px',
            data: { id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteItem(id).subscribe(() => {
                    this.items = this.items.filter((item) => item.id !== id);
                });
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.updateGridCols();
    }

    updateGridCols() {
        const width = window.innerWidth;
        if (width < 600) {
            this.cols = 1;
        } else if (width < 960) {
            this.cols = 2;
        } else if (width < 1280) {
            this.cols = 3;
        } else {
            this.cols = 4;
        }
    }
}
