import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/Service/products.service';
@Component({
    selector: 'delete-dialog',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})

export class DeleteDialog implements OnInit {
    actionType: any;
    ngOnInit(): void {


    }


    ngAfterViewInit() {
        this.actionType = "Product"
    }
    message: string = "Are you sure?"
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DeleteDialog>, private snackBar: MatSnackBar,
        private _productService: ProductsService) {
        debugger
        if (data) {

            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
           
        }
    }

    onConfirmClick(): void {
        debugger
       
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
        //const snack = this.snackBar.open('Snack bar open before dialog');
    }



}

