import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSnackBarModule
    ]
})
export class CreateComponent {
    createForm: FormGroup;
    isLoading = false;

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.createForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            image: ['', [Validators.required, Validators.pattern('https?://.+')]],
        });
    }

    onSubmit() {
        if (this.createForm.valid) {
            this.isLoading = true;
            this.apiService.createItem(this.createForm.value).subscribe({
                next: () => {
                    console.log('Chamando snackBar e redirecionamento');
                    this.snackBar.open('Item criado com sucesso!', 'Fechar')
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error("Erro ao criar item", err);
                    this.snackBar.open('Erro ao criar item!', 'Fechar')
                },
                complete: () => this.isLoading = false
            })
        }
    }
    cancel() {
        this.router.navigateByUrl('/')
    }
}
