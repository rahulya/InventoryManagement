import {Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
selector:'app-ledgerCreate',
templateUrl:'./generalLedgerInsert.component.html',
styleUrls:['./generalLedgerInsert.component.css']

})

export class InsertGeneralLedger implements OnInit{

actionType:string;
TabAction:string;
form: FormGroup;
constructor(){

}

ngOnInit():void{

    this.actionType="Add";
    this.TabAction="Save"

}


}

