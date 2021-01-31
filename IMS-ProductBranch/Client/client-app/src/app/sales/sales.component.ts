import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm, NumberValueAccessor } from '@angular/forms'
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { ProductsService } from '../Service/products.service';
import { GlobalService } from '../Service/GlobalService';
import { salesDetail } from '../Model/Entry/databaseDb/salesModule/salesDetail';
import { globalfunction } from '../GlobalFunction/Mainfunction';
import { element } from 'protractor';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ProductwisetermComponent } from './productwiseterm/productwiseterm.component';
import { Product } from '../Model/Product';
import { ProductListComponent } from '../product/ProductList/productList.componenet';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  actionType: string;
  TabAction: string;
  public addForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private _service: ProductsService,
    private _httpGlobal: GlobalService,
    private _fun: globalfunction,
    private _matDialog: MatDialog,
    ) {

    this.actionType = 'Add';
    this.TabAction = "Save";

  }
  tableIndex: any;
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows()])



    });
    this.indexxx = 0;
  }
  indexxx: number;
  getindex: any;

  get formArr() {
    return this.addForm.get('itemRows') as FormArray;
  }

  initItemRows(): FormGroup {


    return this.formBuilder.group({
      p_Code: [''],
      p_Desc: [''],
      gdn: [''],
      alt_Qty: [''],
      alt_Unit: [''],
      qty: [Number],
      unit: [''],
      altStock_Qty: [''],
      stockQty: [''],
      rate: [Number],
      basic_Amt: [Number],
      term_Amt: [Number],
      net_Amt: [Number],
      add_desc: ['']

    });
  }

  onAddRow() {
    debugger

    var sas = this.indexxx;
    const facontrol = (<FormArray>this.addForm.controls["itemRows"]);
    var mainValue = facontrol.value;
    console.log("saa", mainValue)
    var pcode = mainValue.p_Code;
    var pcode = mainValue.qty;
    this.formArr.push(this.initItemRows());


  }


  deleteRow(index) {

    this.formArr.removeAt(index);
  }

  ngAfterViewInit() {

  }

  openChallanPurchase(): void {
  }

  saveProduct(): void {

    console.log('save', this.addForm.value)
  }

  onReset(): void {

  }
  openOrderPurchase(): void {

  }


  AutocompleteForProduct = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        this.getproductAuto(term)),
      distinctUntilChanged(),
    )

  getproductAuto(term: string) {

    if (term.length < 2) {
      return this._httpGlobal.getProductAutocomplete('')
        .pipe(map(test => test.map(a => a.productDesc).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    } else {
      return this._httpGlobal.getProductAutocomplete(term)

        .pipe(map(test => test.map(a => a.productDesc).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    }
  }


  formatter = (result: string) => result.toLowerCase();


  selectedPCode: string;
  selectproduct($event, key) {
debugger
    if ($event != '') {

      this._fun.getProductDetail($event.item).subscribe((data) => {

        this.selectedPCode = data.productCode;
        let rate = data.sales_Rate;

        const facontrol = (<FormArray>this.addForm.controls["itemRows"]).at(key);
        facontrol['controls'].p_Code.setValue(this.selectedPCode);
        facontrol['controls'].rate.setValue(rate);



      });

    } else {
      return

    }

  }

  changeqQty(key) {

    const facontrol = (<FormArray>this.addForm.controls["itemRows"]).at(key);

    var FormValue = facontrol.value;
    var qty = FormValue.qty;
    var rate = FormValue.rate
    if (qty == 0) {
      qty = '';
      facontrol['controls'].qty.setValue(qty);

      return
    }
    // var rate=FormValue.rate ? FormValue.rate:0;
    if (rate > 0) {

      var amount = qty * rate;
    }
    facontrol['controls'].basic_Amt.setValue(amount);

  }
  changeqRate(key) {
    const facontrol = (<FormArray>this.addForm.controls["itemRows"]).at(key);
    var FormValue = facontrol.value;
    var qty = FormValue.qty;

    var rate = FormValue.rate;

    if (rate == 0) {
      rate = '';
      facontrol['controls'].rate.setValue(rate);

      return
    }

    if (rate > 0) {

      var amount = qty * rate;
    }
    facontrol['controls'].basic_Amt.setValue(amount);



  }
  NetAmtValue:Number;
  changeProductWiseBill(key, model) {

    const facontrol = (<FormArray>this.addForm.controls["itemRows"]).at(key);
    var FormValue = facontrol.value;
    var basicAmt = FormValue.basic_Amt;
    var qty = FormValue.qty;

    let ST_ProductWise = "Y"
    this._fun.getSalesBillingTerm(ST_ProductWise).subscribe((data) => {

      let productWiseTermList = data;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "700px";
      dialogConfig.height = "480px";
      dialogConfig.maxWidth = '96vw';
      dialogConfig.data = { dataList: productWiseTermList, amount: basicAmt, qty: qty };
      const dialogref = this._matDialog.open(ProductwisetermComponent, dialogConfig)
      dialogref.afterClosed().subscribe(result => {

        debugger
        facontrol['controls'].term_Amt.setValue(result);
        let termValue=FormValue.term_Amt;
        let netAmt = (basicAmt + termValue);

     facontrol['controls'].net_Amt.setValue(netAmt);
    this. NetAmtValue=netAmt;

      });

    });
  }
  blurNetAmt(key){
    const facontrol = (<FormArray>this.addForm.controls["itemRows"]).at(key);
    
    var FormValue = facontrol.value;
    let termValue=FormValue.term_Amt;
    var basicAmt = FormValue.basic_Amt;
    let netAmt = (basicAmt + termValue);

 facontrol['controls'].net_Amt.setValue(netAmt);


  }
  doubleClkSelectedPrCode:any;
  openProductModel(key){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1200px";
    dialogConfig.height = "620px";
    panelClass: 'my-class'
    dialogConfig.maxWidth = '100vw';
    dialogConfig.position = {
      'top': '56px',
      left: ''
  };
    dialogConfig.data="productAdvanceSearchSBilling";
    const dialogref = this._matDialog.open(ProductListComponent, dialogConfig)
    dialogref.afterClosed().subscribe(result => {
      debugger
      if(result !=null){

      let productModelSelectedModel=[result.data];
      let doubleClkSelectedPrDesc = productModelSelectedModel[0].productDesc;
      let doubleClkSelectedPrCode = productModelSelectedModel[0].productCode; 
      let saleRate=productModelSelectedModel[0].sales_Rate;


      const facontrol = (<FormArray>this.addForm.controls["itemRows"]).at(key);

      facontrol['controls'].p_Desc.setValue(doubleClkSelectedPrDesc);
      facontrol['controls'].p_Code.setValue(doubleClkSelectedPrCode);
      facontrol['controls'].rate.setValue(saleRate);

      }

    });

  }

}
