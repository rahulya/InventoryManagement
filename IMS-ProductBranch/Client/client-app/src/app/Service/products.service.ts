import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { Product } from '../Model/Product';
import { ProductGroup } from '../Model/ProductGroup'

import { retry, catchError } from 'rxjs/operators';
import { ProductSubGroup } from '../Model/ProductSubGroup';
import { ProductViewModel } from '../Model/ProductViewModel';
import { generalLedger } from '../Model/Master/GeneralLedger';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  myAppUrl: string;
  myAppApi: string;
  myAppUrl1: string;
  myAppUrlForGetProductGroup: string;
  myAppUrlForSaveProductGroup: string;
  myAppUrlGetPrSubGrpListByPrGrpCode: string;
  myAppUrlForSaveProductSubGroup:string;
  myAppUrlForEditProduct:string;
  myAppUrlForUpdateProduct:string;
  myAppUrlForDeleteProduct:string;
  myAppUrlAllLedger:string;


  emptyProductGrp = of<ProductGroup[]>([]);

  constructor(private _http: HttpClient) {
    this.myAppApi = environment.appUrl;
    this.myAppUrl = 'api/Product/'
    this.myAppUrl1 = 'api/Product/GetProductGroup/';
    this.myAppUrlForGetProductGroup = 'api/Product/GetProductSubGroup/';
    this.myAppUrlForSaveProductGroup = 'api/Product/SaveProductGroup/';
    this.myAppUrlGetPrSubGrpListByPrGrpCode = 'api/Product/GetPrSubGrpListByPrGrpCode/';
    this.myAppUrlForSaveProductSubGroup = 'api/Product/SaveProductSubGroup/';
    this.myAppUrlForEditProduct='api/Product/EditProduct/';
    this.myAppUrlForUpdateProduct='api/Product/UpdateProduct/';
    this.myAppUrlForDeleteProduct='api/Product/Deleteproduct/';
    this.myAppUrlAllLedger='api/LedgerMaster/GetGeneralLegerList/';

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*'
    })

  }
  getAllProduct(): Observable<Product[]> {
    
    return this._http.get<Product[]>(this.myAppApi + this.myAppUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };

  //save
  saveProduct(product): Observable<Product> {
debugger
    return this._http.post<Product>(this.myAppApi + this.myAppUrl, JSON.stringify(product), this.httpOptions)
      .pipe(
        // retry(1),
        catchError(this.errorHandler)
      );
  };

  getProductGroupList(): Observable<ProductGroup[]> {

    return this._http.get<ProductGroup[]>(this.myAppApi + this.myAppUrl1 + "AllProductGroup")
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };

  getProductSubGroupList(): Observable<ProductSubGroup[]> {
    
    return this._http.get<ProductSubGroup[]>(this.myAppApi + this.myAppUrlForGetProductGroup)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };

  getPrSubGrpListByprGrpCode(prGrpCode: number): Observable<ProductSubGroup[]> {
    
    return this._http.get<ProductSubGroup[]>(this.myAppApi + this.myAppUrlGetPrSubGrpListByPrGrpCode + prGrpCode)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };

  getProGrpAutocomplete(proGrpDesc: string): Observable<ProductGroup[]> {
    if(proGrpDesc.length===0)
    {
      return  this.emptyProductGrp;
    }
    else{
      return this._http.get<ProductGroup[]>(this.myAppApi + this.myAppUrl1 + proGrpDesc)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
    }
    
  };




  //product Group
  saveProductGroup(productGroup): Observable<ProductGroup> {

    return this._http.post<ProductGroup>(this.myAppApi + this.myAppUrlForSaveProductGroup, JSON.stringify(productGroup), this.httpOptions)
      .pipe(
        // retry(1),
        catchError(this.errorHandler)
      );
  };

  //product Group
  saveProductSubGroup(productSubGroup): Observable<ProductSubGroup> {

    return this._http.post<ProductSubGroup>(this.myAppApi + this.myAppUrlForSaveProductSubGroup, JSON.stringify(productSubGroup), this.httpOptions)
      .pipe(
        // retry(1),
        catchError(this.errorHandler)
      );
  };


  GetEditProduct(ProductCode: number): Observable<ProductViewModel> {
    
    return this._http.get<ProductViewModel>(this.myAppApi + this.myAppUrlForEditProduct + ProductCode)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };

  ///product Update
  updateProduct(productCode: number, product): Observable<Product> {
    debugger
    return this._http.put<Product>(this.myAppApi +  this.myAppUrlForUpdateProduct + productCode, JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

//delete
deleteProduct(productCode: number): Observable<Product> {
  return this._http.delete<Product>(this.myAppApi + this.myAppUrlForDeleteProduct + productCode)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}

//ledger
getAllLedger(): Observable<generalLedger[]> {
    
  return this._http.get<generalLedger[]>(this.myAppApi + this.myAppUrlAllLedger)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
};

  errorHandler(error) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
