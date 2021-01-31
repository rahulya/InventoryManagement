import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { CustomerComponent } from './Customer/customer.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/ProductList/productList.componenet';
import { InsertGeneralLedger } from './GeneraLedger/Create/generalLedgerInsert.component';
import { SalesComponent } from './sales/sales.component';
import { LedgerListComponent } from './GeneraLedger/List/ledger-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'Customer', component:CustomerComponent  },
  { path: 'ProductList', component:ProductListComponent  },
  { path: 'Product', component:ProductComponent  },
  { path: 'edit-product/:id', component:ProductComponent  },
  {path:'InsertLedger',component:InsertGeneralLedger},
  {path:'SalesSave',component:SalesComponent},
  {path:'LedgerList',component:LedgerListComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
