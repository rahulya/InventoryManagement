import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductSubGroup } from 'src/app/Model/ProductSubGroup';
import { ProductsService } from '../../../Service/products.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductGroup } from 'src/app/Model/ProductGroup';
@Component({
    selector: 'product-sub-group',
    templateUrl: './productsubgroupsave.component.html',
    styleUrls: ['./productsubgroupsave.component.css']
})

export class ProductSubGroupComponent {
    actionType: string;
    productGroup: ProductGroup[];
    submitted = false;
    selectedValue:any;
    selectedValueee:number;
    constructor( private _service: ProductsService , private avRoute: ActivatedRoute, private router: Router,private dialogRef:MatDialogRef<ProductSubGroupComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) {

        this.productGroup = data;
        this.actionType = 'Add';

    }

    ngAfterViewInit() {
        this.productGroup ;
        this.selectedValue= this.productGroup [0].prGrpDesc;
        this.selectedValueee= this.productGroup [0].prGroupCode;

    }

    form = new FormGroup({
        prSubGrpDesc : new FormControl('', [Validators.required, Validators.maxLength(50)]),
        prGroupCode: new FormControl(null, [Validators.required]),
    });

    get f() { return this.form.controls; }

    submit() { 
        
        this.submitted = true;
        if (!this.form.valid) {
            return;
        }
        if (this.actionType === 'Add') {
            let proGrp: ProductSubGroup = {
                prSubGrpDesc: this.form.get("prSubGrpDesc").value,
                prGroupCode:  this.selectedValueee,
            }
            
            this._service.saveProductSubGroup(proGrp).subscribe((data) => {
               
                this.dialogRef.close(this.selectedValueee);
              
               
            });
        }
    };//end save

    onClose() {
        this.dialogRef.close();
    }
    onReset() {
        this.submitted = false;
        this.form.reset();
      }
    
}
