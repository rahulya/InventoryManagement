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
import { generalLedger } from '../../Model/Master/GeneralLedger';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.css']
})
export class LedgerListComponent implements OnInit {

  TagForAdvance: string;
  displayedColumns: string[] = ['index', 'gl_Desc', 'gl_ShortName', 'ac_Desc', 'ac_SGrpDesc', 'gl_PanNo','agent_Desc', 'area_Desc','action','actionn'];
  ledgerList: generalLedger[];
  ledgerLists = new MatTableDataSource(this.ledgerList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ProductCode: number;
  constructor(private _LedgerService: ProductsService, private _router: Router, private avRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.ProductCode = this.avRoute.snapshot.params[idParam];
    }
    //this.TagForAdvance = data
  }

  ngOnInit(): void {
    
    // if (this.TagForAdvance == "productAdvanceSearchSBilling") {

    //   this.displayedColumns = ['index', 'productDesc', 'uniqueName', 'prGroupCode', 'unit', 'buy_Rate', 'sales_Rate'];
    // }
  }

  panelOpenState = false;
  isSeen: boolean;
  loadproductList() {
    debugger
    this._LedgerService.getAllLedger().subscribe((data) => {
      debugger
      this.ledgerLists.data=data;
      this.ledgerLists.paginator = this.paginator;
      this.ledgerLists.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.loadproductList();
  }

  

}
