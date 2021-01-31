import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { ProductSubGroup } from 'src/app/Model/ProductSubGroup';
import { ProductsService } from '../../../Service/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Product } from 'src/app/Model/Product';

import { ProductSubGroupComponent } from '../ProductSubGroupSave/productsubgroupsave.component';
import { ProductGroup } from 'src/app/Model/ProductGroup';
@Component({
    selector: 'app-productSubGroupList',
    templateUrl: './ProductSubGroupList.component.html',
    styleUrls: ['./ProductSubGroupList.component.css']
})

export class ProductSubGroupListComponent implements OnInit {
    displayedColumns: string[] = ['index', 'prSubGrpCode', 'prSubGrpDesc', 'prGroupCode'];

    productSubGroup: ProductSubGroup[];
    productGroup: ProductGroup[];
    productSubGroupList = new MatTableDataSource(this.productSubGroup);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    prGroupCode:any;
    //constructor
    constructor(private _service: ProductsService, private dialog: MatDialog, private dialogRef: MatDialogRef<ProductSubGroupListComponent>
        , @Inject(MAT_DIALOG_DATA) private data: any) {
        debugger
        //this.productSubGroup = data.data1;
        this.productGroup = data;
        this.prGroupCode= this.productGroup[0].prGroupCode;


    }

    ngOnInit(): void {
    }
    getProductSubGrpList(prGroupCode: number) {
        this._service.getPrSubGrpListByprGrpCode(prGroupCode).subscribe((data) => {
        this.productSubGroup = data;
        this.productSubGroupList.data = this.productSubGroup;
        this.productSubGroupList.paginator = this.paginator;
        this.productSubGroupList.sort = this.sort;
       
    
        });
      }


    ngAfterViewInit() {
        this.getProductSubGrpList(this.prGroupCode);

    }


    selectRow(index): void {

    }

    //NewData=[];
    doubleClick(value, index) {
        debugger
        this.dialogRef.close({ data: value });
    }

    OncloseProductSubGroupList() {
        this.dialogRef.close();

    }
    ClkCreateProSubGroupModal() {      
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "520px";
        dialogConfig.maxWidth = '90vw';
        dialogConfig.data = this.productGroup;

        const dialogref = this.dialog.open(ProductSubGroupComponent, dialogConfig); //open modal
        dialogref.afterClosed().subscribe(result => {
            this._service.getPrSubGrpListByprGrpCode(result).subscribe((data) => {
                this.productSubGroupList.data = data;
            });
        });
    }
}