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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        FormsModule 
    ]
})
export class ListComponent implements OnInit {
    items: any[] = [];
    filteredItems: any[] = [];
    filterValue = '';
    cols = 4;
    pageSize = 8;
    pageIndex = 0;

    constructor(
        private apiService: ApiService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.apiService.getItems().subscribe((data) => {
            this.items = data;
            this.filteredItems = data;
        });
    }

    // Filtro dos itens
    applyFilter() {
        this.filteredItems = this.items.filter(item =>
            item.title.toLowerCase().includes(this.filterValue.toLowerCase()) ||
            item.description.toLowerCase().includes(this.filterValue.toLowerCase())
        );
        this.pageIndex = 0;
    }

    // Páginação dos itens
    getPagedItems() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredItems.slice(start, end);
    }

    // Função chamada ao mudar de página
    onPageChanged(event: any) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
    }

    // Função de deletar item
    deleteItem(id: string): void {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            width: '500px',
            data: { id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteItem(id).subscribe(() => {
                    this.apiService.getItems().subscribe((data) => {
                        this.items = data
                        this.applyFilter();
                    })
                });
            }
            this.snackBar.open('Item removido com sucesso!', 'Fechar');
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.updateGridCols();
    }

    // Atualizar o número de colunas da grid dependendo da largura da janela
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
