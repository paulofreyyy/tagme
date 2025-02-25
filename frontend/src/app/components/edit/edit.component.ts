import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSnackBarModule
    ]
})
export class EditComponent implements OnInit {
    editForm: FormGroup;
    isLoading = false;
    itemId!: string;

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.editForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            image: ['', [Validators.required, Validators.pattern('https?://.+')]],
        });
    }

    ngOnInit(): void {
        this.itemId = this.route.snapshot.paramMap.get('id')!;
        this.loadItemData();
    }

    loadItemData(): void {
        this.apiService.getItemById(this.itemId).subscribe({
            next: (item) => {
                this.editForm.setValue({
                    title: item.title,
                    description: item.description,
                    image: item.image,
                });
            },
            error: (err) => {
                console.error("Erro ao carregar item", err);
                this.snackBar.open('Erro ao carregar item!', 'Fechar', { duration: 3000 });
            }
        });
    }

    onSubmit(): void {
        if (this.editForm.valid) {
            this.isLoading = true;
            this.apiService.updateItem(this.itemId, this.editForm.value).subscribe({
                next: () => {
                    this.snackBar.open('Item atualizado com sucesso!', 'Fechar');
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error("Erro ao atualizar item", err);
                    this.snackBar.open('Erro ao atualizar item!', 'Fechar');
                },
                complete: () => this.isLoading = false
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/']);
    }
}
