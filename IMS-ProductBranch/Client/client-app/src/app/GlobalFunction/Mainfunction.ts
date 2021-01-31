import { Injectable } from '@angular/core';
import { GlobalService } from '../Service/GlobalService';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class globalfunction {
  productDetail: any;
  productWiseTerm:any;
  constructor(private _http: GlobalService) {

  }


  getProductDetail(PDesc: string) {

    return this._http.getProductDetail(PDesc).pipe(map((data) => {
      this.productDetail = data;
      return this.productDetail;
    }));
  }

  getSalesBillingTerm(stProductWise: string) {
debugger
    return this._http.getSalesBillingTerm(stProductWise).pipe(map((data) => {
      this.productWiseTerm = data;
      return this.productWiseTerm;
    }));
  }

}
