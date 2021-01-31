import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders}from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { Product } from '../Model/Product';
import { retry, catchError } from 'rxjs/operators';
import { Sales_BillingTerm_Master } from '../Model/Master/Sales_BillingTerm_Master';
@Injectable({
    providedIn: 'root'
  })

  export class GlobalService {

    myAppApi: string;
    myAppUrlForProductAutocomplete:string;
    myAppUrlForProductDetail:string;
    myAppUrlForSalesBillingTerm:string;
    emptyProduct = of<Product[]>([]);
    constructor(private _httpGlobal: HttpClient){

        this.myAppApi = environment.appUrl;
        this.myAppUrlForProductAutocomplete = 'api/SalesModule/getProductListAutocomplete/';
        this.myAppUrlForProductDetail= 'api/SalesModule/getProductDetail/';
        this.myAppUrlForSalesBillingTerm= 'api/SalesModule/getSalesBillingTerm/';


    }


    getProductAutocomplete(productDesc: string): Observable<Product[]> {
        if(productDesc.length===0)
        {
          return  this.emptyProduct;
        }
        else{
          return this._httpGlobal.get<Product[]>(this.myAppApi + this.myAppUrlForProductAutocomplete + productDesc)
          .pipe(
            retry(1),
            catchError(this.errorHandler)
          )
        }
        
      };

      getProductDetail(productDesc: string): Observable<Product[]> {
        if(productDesc.length===0)
        {
          return  this.emptyProduct;
        }
        else{
            
          return this._httpGlobal.get<Product[]>(this.myAppApi + this.myAppUrlForProductDetail + productDesc)
          .pipe(
            retry(1),
            catchError(this.errorHandler)
          )
        }
        
      };

      getSalesBillingTerm(stProductWise: string): Observable<Sales_BillingTerm_Master[]> {   
        debugger           
          return this._httpGlobal.get<Sales_BillingTerm_Master[]>(this.myAppApi + this.myAppUrlForSalesBillingTerm + stProductWise)
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