import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductGroup } from 'src/app/Model/ProductGroup';
import { ProductsService } from '../../../Service/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'product-group',
    templateUrl: './productgroup.component.html',
    styleUrls: ['./productgroup.component.css']
})

export class ProductGroupComponent {
    actionType: string;
    //productGroupCode: number;
    constructor( private _service: ProductsService
        , private avRoute: ActivatedRoute, private router: Router,private dialogRef:MatDialogRef<ProductGroupComponent>) {
        this.actionType = 'Add';
    
    }
    
    form = new FormGroup({
        prGrpDesc: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        prGrpShortName: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    });

    get f() {
        return this.form.controls;
    }

    onClose() {
        this.dialogRef.close();
    }

    submit() { //save Product Group

        if (!this.form.valid) {
            return;
        }
        if (this.actionType === 'Add') {
            let proGrp: ProductGroup = {
                prGrpDesc: this.form.get("prGrpDesc").value,
                prGrpShortName: this.form.get("prGrpShortName").value,
            }
            this._service.saveProductGroup(proGrp).subscribe((data) => {
               
                this.dialogRef.close();
              
               
            });
        }
    };//end save

    
}//end