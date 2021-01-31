import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Product } from '../../Model/Product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from 'src/app/Service/products.service';
import { DeleteDialog } from '../../../app/deletedialog/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-product',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {

  TagForAdvance: string;
  displayedColumns: string[] = ['index', 'productDesc', 'uniqueName', 'prGroupCode', 'unit', 'buy_Rate', 'sales_Rate', 'action', 'actionn'];
  product: Product[];
  products = new MatTableDataSource(this.product);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ProductCode: number;
  constructor(private _productService: ProductsService, private _router: Router, private avRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, private dialogRef: MatDialogRef<ProductListComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.ProductCode = this.avRoute.snapshot.params[idParam];
    }
    this.TagForAdvance = data
  }

  ngOnInit(): void {
    
    if (this.TagForAdvance == "productAdvanceSearchSBilling") {

      this.displayedColumns = ['index', 'productDesc', 'uniqueName', 'prGroupCode', 'unit', 'buy_Rate', 'sales_Rate'];
    }
  }

  panelOpenState = false;
  isSeen: boolean;
  loadproductList() {
    this._productService.getAllProduct().subscribe((data) => {
      this.products.data = data;
      this.products.paginator = this.paginator;
      this.products.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.loadproductList();
  }

  deleteProduct(value) {

    let productCodee = value.productCode;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '240px';
    dialogConfig.height = "117px";
    dialogConfig.maxWidth = '96vw';
    dialogConfig.data = {
      message: 'Are you sure want to delete?',
      buttonText: {
        ok: 'Yes',
        cancel: 'No'

      },
    };
    const dialogref = this.dialog.open(DeleteDialog, dialogConfig);
    const snack = this.snackBar.open('Snack bar open before dialog');
    dialogref.afterClosed().subscribe((confirmed: boolean) => {
      
      if (confirmed) {
        this._productService.deleteProduct(productCodee).subscribe((data) => {
          this.loadproductList();
        });
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      } else {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    })
  };

  closeProductList() {
    this.dialogRef.close();
  }

  ClickopenProductModel() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1200px";
    dialogConfig.height = "620px";
    dialogConfig.maxWidth = '100vw';
    dialogConfig.position = {
      'top': '56px',
      left: ''
    };
    dialogConfig.data = "productAdvanceSearchSBilling";
    const dialogref = this.dialog.open(ProductComponent, dialogConfig)
    dialogref.afterClosed().subscribe(result => {

      this.loadproductList();

    });

  }

  doubleClick(model, index) {

    this.dialogRef.close({ data: model });

  }

}
