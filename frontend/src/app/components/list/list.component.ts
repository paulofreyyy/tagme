import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'; // Importe o MatGridListModule

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    imports:[
        CommonModule, 
        RouterModule, 
        MatCardModule, 
        MatButtonModule,
        MatGridListModule
    ]
})
export class ListComponent implements OnInit {
    items: any[] = [];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getItems().subscribe((data) => {
            this.items = data;
        });
    }

    deleteItem(id: string): void {
        if(confirm('Tem certeza que deseja excluir este item?')){
            this.apiService.deleteItem(id).subscribe(()=>{
                this.items = this.items.filter((item) => item.id !== id);
            })
        }
    }
}
