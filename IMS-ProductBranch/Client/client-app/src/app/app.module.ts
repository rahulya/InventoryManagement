import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ConfigResult, OidcConfigService, OidcSecurityService, OpenIdConfiguration, AuthWellKnownEndpoints, AuthModule } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
// import { AuthorizationGuardService } from './authorization-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
// import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeComponent } from './Home/home.component';
import { CustomerComponent } from './Customer/customer.component';
import { AngularMaterialModule } from './app-angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/ProductList/productList.componenet';
import { ProductsService } from './Service/products.service';
import { ProductGroupComponent } from './product/ProductDialog/ProductGroupSave/productgroup.component';
import { ProductGroupListComponent } from './product/ProductDialog/ProductGroupList/productgrouplist.component';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { ProductSubGroupListComponent } from './product/ProductDialog/ProductSubGroupList/productSubGroupList.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductSubGroupComponent } from './product/ProductDialog/ProductSubGroupSave/productsubgroupsave.component';
import {DeleteDialog} from './deletedialog/delete.component';

import { DatePipe } from '@angular/common';
import { InsertGeneralLedger } from './GeneraLedger/Create/generalLedgerInsert.component';
import { SalesComponent } from './sales/sales.component';
import { ProductwisetermComponent } from './sales/productwiseterm/productwiseterm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LedgerListComponent } from './GeneraLedger/List/ledger-list.component';
//const oidc_configuration = 'assets/auth.clientConfiguration.json';

// export function loadConfig(oidcConfigService: OidcConfigService) {
//     return () => oidcConfigService.load(oidc_configuration);
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CustomerComponent,
    ProductComponent,
    ProductListComponent,
    ProductGroupComponent,
    ProductGroupListComponent,
    ProductSubGroupListComponent,
    ProductSubGroupComponent,
    DeleteDialog,
    InsertGeneralLedger,
    SalesComponent,
    ProductwisetermComponent,
    LedgerListComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    MalihuScrollbarModule.forRoot(),
    AngularMaterialModule ,
    ToastNotificationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
    
    //ToastNotificationsModule.forRoot({duration: 2000, type: 'primary'})
  
  ],
  providers: [
    OidcConfigService,ProductsService,ProductGroupListComponent,DatePipe,ProductListComponent,
    {
      provide: MatDialogRef,
      useValue: {}
    }, 
    {
       provide: MAT_DIALOG_DATA, useValue: {}
      
    }
    
    // {
    //     provide: APP_INITIALIZER,
    //     useFactory: loadConfig,
    //     deps: [OidcConfigService],
    //     multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // },
    // AuthorizationGuardService
],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
  //     this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {
  
  //         // Use the configResult to set the configurations
    
  //         const config: OpenIdConfiguration = {
  //             stsServer: configResult.customConfig.stsServer,
  //             redirect_url: 'http://localhost:4200',
  //             client_id: 'ims_angular',
  //             scope: 'openid profile ims_api',
  //             response_type: 'code',
  //             silent_renew: true,
  //             silent_renew_url: 'http://localhost:4200/silent-renew.html',
  //             log_console_debug_active: true,
  //         };

  //         this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
  //     });
  // }
}
