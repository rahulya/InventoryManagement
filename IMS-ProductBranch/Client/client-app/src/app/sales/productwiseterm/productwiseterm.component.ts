import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';



@Component({
  selector: 'app-productwiseterm',
  templateUrl: './productwiseterm.component.html',
  styleUrls: ['./productwiseterm.component.css']
})
export class ProductwisetermComponent implements OnInit {
  actionType: string = "Product Wise Term";
  productWiseTermList: any[];
  productBasicAmt: number;
  formTerm: FormGroup;
  productQty:number;
  finalTermAmt:number ;
  constructor(
    private dialogRef: MatDialogRef<ProductwisetermComponent>, @Inject(MAT_DIALOG_DATA)
    private data: any, private formBuilder: FormBuilder) {

    debugger
    this.productWiseTermList = data.dataList;
    this.productBasicAmt = data.amount;
    this.productQty = data.qty;

  }

  ngOnInit(): void {

    this.productBasicAmt;
    this.productWiseTermList
  }
  termTotal:number;
 
  TermRate(rateChange, term) {
    debugger
    
    let basicamt = this.productBasicAmt;
    if (basicamt) {
      if (term.sT_Basis == "V") {
        this.termTotal = (rateChange * basicamt) / 100;

      } else {
        this.termTotal = (rateChange * this.productQty)
      }
      if (term.sT_Sign == "+") {
      //this.termTotal  = (basicamt +  this.termTotal);

      } else {
      //  this.finalTermAmt  = (basicamt -  this.termToal);
      }
      term.termValue= this.termTotal;
      this.finalTermAmt=this.termTotal;

    }

    }


    save(): void {
      this.dialogRef.close(this.finalTermAmt);
    }

    onClose(): void {
      this.dialogRef.close();
    }

  }
