import { Component, OnInit, ViewChild, ElementRef ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Model/Product';
import { ProductsService } from '../Service/products.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog'
import { ProductGroupComponent } from './ProductDialog/ProductGroupSave/productgroup.component';
import { ProductGroupListComponent } from './ProductDialog/ProductGroupList/productgrouplist.component';
import { ProductSubGroupListComponent } from './ProductDialog/ProductSubGroupList/productSubGroupList.component';
// import { NotifierService } from 'angular-notifier'; // import NotifierService
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { variable } from '@angular/compiler/src/output/output_ast';
import { Observable, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { element } from 'protractor';
import { ProductViewModel } from '../Model/ProductViewModel';
import { AngularMaterialModule } from '../app-angular-material.module';
import { DatePipe } from '@angular/common';
import { ProductSubGroup } from '../Model/ProductSubGroup';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  TabAction:string;
  form: FormGroup;
  submitted = false;
  actionType: string;
  errorMessage: any;
  modelData: any = Product;
  ProductGroups = [];
  ProductSubGroups = [];
  productGrpModel: any;
  filteredPgroup = [];
  productCode: number;
  SelectedPrGpName?: number = null;
  SelectedPrSubGpName?: number = null;
  selectedProductType: string;
  productCodeID: number;
  existingProduct: ProductViewModel;

  TagForAdvance:string;

  productType = [{ name: "Inventory", ID: "1" },
  { name: "Service", ID: "2" }]

  valuationType = [{ name: "FIFO", ID: "1" },
  { name: "LIFO", ID: "2" }]

  


  constructor(private _service: ProductsService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router, private dialog: MatDialog,
    private toaster: Toaster, private datepipe: DatePipe, private dialogRef: MatDialogRef<ProductComponent>,@Inject(MAT_DIALOG_DATA) private data:any)
      {

    this.actionType = 'Add';
    this.TabAction="Save";
    var id = this.avRoute.snapshot.paramMap.get('id');
    this.productCodeID = Number(id);
    if (id) {

      this.productCode = this.productCodeID;
      this.TabAction="Update";
    }
    
    this.TagForAdvance=data


  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productDesc: ['', [Validators.required]],
      uniqueName: ['', [Validators.required]],
      productType: [null],
      prGroupCode: [null, [Validators.required]],
      prtSubGrpCode: [null],
      prGroupCode1: [null],
      prGroupCode2: [null],
      unit: [null],
      factor: [null],
      valuationType: [null],
      altUnit: [null],
      conv_Ratio: [null],
      buy_Rate: [null],
      sales_Rate: [null],
      max_Stock: [null],
      min_Stock: [null],
      reorder_Level: [null],
      reorder_Qty: [null],
      product_Rate: [null],
      product_MRP: [null],
      trade_Price: [null],
      min_Qty: [null],
      min_Bonus: [null],
      max_Qty: [null],
      max_Bonus: [null],
      addProductDescription: [null],
      product_Lock: [null],
      product_photo: [null],
      barcodeName: [null],
      action_Date: [null],
      action_Time: [null],
      action_Miti: [null],
      action: [null],
      document_Date: [null],
      productImage_Name: [null],
      warranty_Period: [null],
    });

    this.selectedProSubGrpValue = 0;

    ///for update

    if (this.productCode > 0) {

      this.actionType = 'Edit';
      this._service.GetEditProduct(this.productCode).subscribe((data) => {

        if (data != null) {
          this.existingProduct = data;
          
          this.form.controls["productDesc"].setValue(this.existingProduct.productDesc)
          this.form.controls["uniqueName"].setValue(this.existingProduct.uniqueName)
          this.ProductGroups=[{prGroupCode: this.existingProduct.prGroupCode,prGrpDesc:this.existingProduct.prGrpDesc}]


          this.productGrpModel = this.ProductGroups[0].prGrpDesc;
          this.SelectedPrGpName=this.ProductGroups[0].prGroupCode;
          if ( this.existingProduct.prtSubGrpCode !=null){
            this.ProductSubGroups = [{ prSubGrpCode: this.existingProduct.prtSubGrpCode, prSubGrpDesc: this.existingProduct.prSubGrpDesc, prGroupCode: this.existingProduct.prGroupCode }]
            this.selectedProSubGrpValue = this.ProductSubGroups[0];

            this.SelectedPrSubGpName =this.ProductSubGroups[0].prSubGrpCode;
          }   
          let productType = this.existingProduct.productType.trim();
          let valuationType = this.existingProduct.valuationType.trim();
          this.changeProductType(productType);
          this.changevaluationType(valuationType);
          let date = new Date(this.existingProduct.warranty_Period);
          this.form.controls["unit"].setValue(this.existingProduct.unit)
          this.form.controls["factor"].setValue(this.existingProduct.factor)
          this.form.controls["altUnit"].setValue(this.existingProduct.altUnit)
          this.form.controls["conv_Ratio"].setValue(this.existingProduct.conv_Ratio)
          this.form.controls["buy_Rate"].setValue(this.existingProduct.buy_Rate)
          this.form.controls["sales_Rate"].setValue(this.existingProduct.sales_Rate)
          this.form.controls["max_Bonus"].setValue(this.existingProduct.max_Bonus)
          this.form.controls["max_Stock"].setValue(this.existingProduct.max_Stock)
          this.form.controls["min_Stock"].setValue(this.existingProduct.min_Stock)
          this.form.controls["reorder_Level"].setValue(this.existingProduct.reorder_Level)
          this.form.controls["reorder_Qty"].setValue(this.existingProduct.reorder_Qty)
          this.form.controls["product_Rate"].setValue(this.existingProduct.product_Rate)
          this.form.controls["product_MRP"].setValue(this.existingProduct.product_MRP)
          this.form.controls["trade_Price"].setValue(this.existingProduct.trade_Price)
          this.form.controls["min_Bonus"].setValue(this.existingProduct.min_Bonus)
          this.form.controls["addProductDescription"].setValue(this.existingProduct.addProductDescription)
          this.form.controls["warranty_Period"].setValue(this.datepipe.transform(date, "yyyy-MM-dd"));

        }
      })
    }
  }

  get f() { return this.form.controls; }

  saveProduct() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.actionType === 'Add') {
      //if add thn
      let pro: Product = {
       
        productDesc: this.form.get("productDesc").value,
        uniqueName: this.form.get("uniqueName").value,
        productType: this.ForFormselectedProductTypee,
        // prGroupCode: this.form.get("prGroupCode").value,
        prGroupCode: this.SelectedPrGpName,
        // prtSubGrpCode: this.form.get("prtSubGrpCode").value,
        prtSubGrpCode: this.SelectedPrSubGpName,
        prGroupCode1: this.form.get("prGroupCode1").value,
        prGroupCode2: this.form.get("prGroupCode2").value,
        unit: this.form.get("unit").value,
        factor: this.form.get("factor").value,
        valuationType: this.ForFormselectedValuationTypee,
        altUnit: this.form.get("altUnit").value,
        conv_Ratio: this.form.get("conv_Ratio").value,
        buy_Rate: this.form.get("buy_Rate").value,
        sales_Rate: this.form.get("sales_Rate").value,
        max_Stock: this.form.get("max_Stock").value,
        min_Stock: this.form.get("min_Stock").value,
        reorder_Level: this.form.get("reorder_Level").value,
        reorder_Qty: this.form.get("reorder_Qty").value,
        product_Rate: this.form.get("product_Rate").value,
        product_MRP: this.form.get("product_MRP").value,
        trade_Price: this.form.get("trade_Price").value,
        min_Qty: this.form.get("min_Qty").value,
        min_Bonus: this.form.get("min_Bonus").value,
        max_Qty: this.form.get("max_Qty").value,
        max_Bonus: this.form.get("max_Bonus").value,
        addProductDescription: this.form.get("addProductDescription").value,
        product_Lock: this.form.get("product_Lock").value,
        product_photo: this.form.get("product_photo").value,
        barcodeName: this.form.get("barcodeName").value,
        action_Date: this.form.get("action_Date").value,
        action_Time: this.form.get("action_Time").value,
        action_Miti: this.form.get("action_Miti").value,
        action: this.form.get("action").value,
        document_Date: this.form.get("document_Date").value,
        productImage_Name: this.form.get("productImage_Name").value,
        warranty_Period: this.form.get("warranty_Period").value,
      };
debugger
      this._service.saveProduct(pro).subscribe((data) => {
        this.showToast();
      if(this.TagForAdvance=="productAdvanceSearchSBilling"){
        this.dialogRef.close();
        
      }else{
        this.router.navigate(['Product'])
      }
       
        this.onReset()
        //this.router.navigate(['/blogpost', data.postId])
      });
    }else{


      let prooo: Product = {
        productCode: this.productCode,
        productDesc: this.form.get("productDesc").value,
        uniqueName: this.form.get("uniqueName").value,
        productType: this.ForFormselectedProductTypee,
        prGroupCode: this.SelectedPrGpName,
        prtSubGrpCode: this.SelectedPrSubGpName,
        prGroupCode1: this.form.get("prGroupCode1").value,
        prGroupCode2: this.form.get("prGroupCode2").value,
        unit: this.form.get("unit").value,
        factor: this.form.get("factor").value,
        valuationType: this.ForFormselectedValuationTypee,
        altUnit: this.form.get("altUnit").value,
        conv_Ratio: this.form.get("conv_Ratio").value,
        buy_Rate: this.form.get("buy_Rate").value,
        sales_Rate: this.form.get("sales_Rate").value,
        max_Stock: this.form.get("max_Stock").value,
        min_Stock: this.form.get("min_Stock").value,
        reorder_Level: this.form.get("reorder_Level").value,
        reorder_Qty: this.form.get("reorder_Qty").value,
        product_Rate: this.form.get("product_Rate").value,
        product_MRP: this.form.get("product_MRP").value,
        trade_Price: this.form.get("trade_Price").value,
        min_Qty: this.form.get("min_Qty").value,
        min_Bonus: this.form.get("min_Bonus").value,
        max_Qty: this.form.get("max_Qty").value,
        max_Bonus: this.form.get("max_Bonus").value,
        addProductDescription: this.form.get("addProductDescription").value,
        product_Lock: this.form.get("product_Lock").value,
        product_photo: this.form.get("product_photo").value,
        barcodeName: this.form.get("barcodeName").value,
        action_Date: this.form.get("action_Date").value,
        action_Time: this.form.get("action_Time").value,
        action_Miti: this.form.get("action_Miti").value,
        action: this.form.get("action").value,
        document_Date: this.form.get("document_Date").value,
        productImage_Name: this.form.get("productImage_Name").value,
        warranty_Period: this.form.get("warranty_Period").value,
      };

this._service.updateProduct(this.productCode,prooo).subscribe((data) => {
  
  this.showToastUpdate();
  this.router.navigate(['ProductList'])
  //this.onReset()
  //this.router.navigate(['/blogpost', data.postId])
});


    }
  };


  ngAfterViewInit() {
    this.productType;

    this.selectedProSubGrpValue = 0;

    this.ForFormselectedProductTypee = "PO";
    this.ForFormselectedValuationTypee = "F";
    
  }

  changePrGroup(filterVal: string): void {
    if (filterVal == "0") {
      this.SelectedPrGpName = null;
      return
    }
    else {
      this._service.getProGrpAutocomplete(filterVal).subscribe((data) => {
        this.ProductGroups = data;
        if (this.ProductGroups.length > 0) {
          this.ProductGroups.forEach(element => {

            this.SelectedPrGpName = element.prGroupCode;
            this.changePrGrpDrop(this.SelectedPrGpName);
            if (this.SelectedPrGpName == undefined) {
              this.SelectedPrGpName = null;
            };
          });
        };
      })
    };
  };

  changePrSubGroup(filterVal: string): void {
    
    if (filterVal == "0") {
      this.SelectedPrSubGpName = 0;
    }
    else {
      var prSubGrpId = this.ProductSubGroups.filter((item) => item.prSubGrpDesc == filterVal);
      if (prSubGrpId.length > 0) {
        prSubGrpId.forEach(element => {
          this.SelectedPrSubGpName = element.prSubGrpCode;
          if (this.SelectedPrSubGpName == undefined) {
            this.SelectedPrSubGpName = null;
          }
        });
      };
    };

  };

  //change product group dropdown and sub product
  changePrGrpDrop(prGrpCode: number) {
    this._service.getPrSubGrpListByprGrpCode(prGrpCode).subscribe((data) => {
      
      this.ProductSubGroups = data;
      this.nameField.nativeElement.focus();

    });
  }

  

  array: [];
  selectedValue: any;
  openPrGroupModel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.height = "580px";
    dialogConfig.maxWidth = '96vw';
    const dialogref = this.dialog.open(ProductGroupListComponent, dialogConfig)
    dialogref.afterClosed().subscribe(result => {

      this.productGrpModel = [result.data.prGrpDesc];
      this.ProductGroups = [result.data]//what to do when modal is closed
      if (this.ProductGroups.length > 0) {
        this.SelectedPrGpName = this.ProductGroups[0].prGroupCode;
        this.changePrGrpDrop(this.SelectedPrGpName);
        if (this.SelectedPrGpName == undefined) {
          this.SelectedPrGpName = null;
        };
      };
    });
  }

  //produc sub group popup
  selectedProSubGrpValue: any;
  openPrSubGroupModel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.height = "580px";
    dialogConfig.maxWidth = '96vw';
    // dialogConfig.data = this.ProductSubGroups;
    dialogConfig.data = this.ProductGroups;
    const dialogref = this.dialog.open(ProductSubGroupListComponent, dialogConfig);
    dialogref.afterClosed().subscribe(result => {
      debugger
      this.ProductSubGroups = [result.data]//what to do when modal is closed
      this.selectedProSubGrpValue = this.ProductSubGroups[0];

     this.SelectedPrSubGpName=this.ProductSubGroups[0].prSubGrpCode;
    });

  }

  AutocompleteProGrp = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        this.getData(term)),
      distinctUntilChanged(),
    )

  getData(term: string) {

    if (term.length < 2) {
      return this._service.getProGrpAutocomplete('')
        .pipe(map(test => test.map(a => a.prGrpDesc).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    } else {
      return this._service.getProGrpAutocomplete(term)

        .pipe(map(test => test.map(a => a.prGrpDesc).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    }
  }


  formatter = (result: string) => result.toLowerCase();

  selectproductGrp($event) {
    if ($event != '') {
      this.changePrGroup($event.item)
    } else {
      return

    }
  }



  //other parts
  private types: Array<ToastType> = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];
  private text = 'Save Success';
  private onErrorText = 'Error While Saving';



  showToast() {
    const type = this.types[0];
    this.toaster.open({
      position: 'top-right',
      text: 'Product Has been Save',
      caption: 'Product Entry',
      duration: 2000,
      type: 'success',
    });
  };
  showToastUpdate() {
    const type = this.types[0];
    this.toaster.open({
      position: 'top-right',
      text: 'Product Has been Update',
      caption: 'Product Entry',
      duration: 2000,
      type: 'success',
    });
  };
  selectedProductTypee: any;
  selectedValuationTypee: any;
  ForFormselectedProductTypee:any;
  ForFormselectedValuationTypee: any;
 

  changeProductType(value) {

    if (value == "Inventory" ) {
      this.ForFormselectedProductTypee = "PO";

    }else if (value == "PO"){

      this.selectedProductTypee = "Inventory";
      this.ForFormselectedProductTypee = "PO";

    }else if(value == "Service"){
      this.ForFormselectedProductTypee = "SV";

    }
    else if(value == "SV") {
      this.selectedProductTypee = "Service";
      this.ForFormselectedProductTypee = "PO";
    }

  }

  changevaluationType(value) {

    if (value == "FIFO" ) {

      this.ForFormselectedValuationTypee = "F";

    } else if(value == "F"){

      this.selectedValuationTypee = "FIFO";
      this.ForFormselectedValuationTypee = "F";
     
    }else if(value == "L"){

      this.selectedValuationTypee = "LIFO";
      this.ForFormselectedValuationTypee = "F";

    }else if(value == "LIFO"){

      this.ForFormselectedValuationTypee = "L";

    }
  };

  onError() {
    const type = this.types[2];
    this.toaster.open({
      position: 'top-right',
      text: this.onErrorText,
      caption: type + ' notification',
      type: type,
    });
  };

  @ViewChild("proSubGrp") nameField: ElementRef;

  onReset() {
    this.submitted = false;
    this.form.reset();

    //this.productGrpModel=0;
    this.selectedProSubGrpValue = 0;
    //this.selectedProductTypee = 0;
    //this.selectedValuationTypee = 0;
  }

  OnCloseProductModel(){
    this.dialogRef.close();
  }


};

