import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-confirm',
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.css',
    imports: [
        MatDialogModule,
        MatButtonModule
    ]
})
export class DialogConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any 
    ) { }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}
