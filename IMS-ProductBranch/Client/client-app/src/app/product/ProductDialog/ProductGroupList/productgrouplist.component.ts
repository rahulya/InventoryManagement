import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ProductGroupComponent } from '../ProductGroupSave/productgroup.component';
import { ProductsService } from '../../../Service/products.service';
import { ProductGroup } from 'src/app/Model/ProductGroup';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-productgrouplist',
  templateUrl: './productgrouplist.component.html',
  styleUrls: ['./productgrouplist.component.css']
})
export class ProductGroupListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'prGrpDesc', 'prGrpShortName'];
  productgroup: ProductGroup[];
  productGroupLists = new MatTableDataSource(this.productgroup);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cd: ChangeDetectorRef, private dialog: MatDialog, private _service: ProductsService, private dialogRef: MatDialogRef<ProductGroupListComponent>
    , @Inject(MAT_DIALOG_DATA) public data: []) { }

  //method for retrive data from api.
  getProductGroupList() {
    this._service.getProductGroupList().subscribe((data) => {
      this.productGroupLists.data = data;
      this.productGroupLists.paginator = this.paginator;
      this.productGroupLists.sort = this.sort;
    });
    this.cd.detectChanges();
  };

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getProductGroupList();

  }
  ClkCreateProGroupModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.maxWidth = '90vw';


    const dialogref = this.dialog.open(ProductGroupComponent, dialogConfig); //open modal
    dialogref.afterClosed().subscribe(result => {
      this.getProductGroupList();  //what to do when modal is closed
    });
  }
  ClkDone() {


  }

  selectRow(index): void {


  }

  NewData = [];
  doubleClick(value, index) {

    this.dialogRef.close({ data: value });
  }

  OncloseProductGroupList() {
    this.dialogRef.close();

  }

}
