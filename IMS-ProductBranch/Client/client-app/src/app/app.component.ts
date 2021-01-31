import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigResult, OidcConfigService, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IMS';
  isAuthenticated: boolean;
  isConfigurationLoaded: boolean;
  userData: any;

  constructor(private oidcConfigService: OidcConfigService, public oidcSecurityService: OidcSecurityService) {
      if (this.oidcSecurityService.moduleSetup) {
          this.doCallbackLogicIfRequired();
      } else {
          this.oidcSecurityService.onModuleSetup.subscribe(() => {
              this.doCallbackLogicIfRequired();
          });
      }
  }

  ngOnInit() {
      this.oidcConfigService.onConfigurationLoaded.subscribe((value: ConfigResult) => {
          this.isConfigurationLoaded = true;
      });

      this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
          this.isAuthenticated = auth;
      });

      this.oidcSecurityService.getUserData().subscribe(userData => {
          this.userData = userData;
      });
  }

  ngOnDestroy(): void {}

  login() {
      this.oidcSecurityService.authorize();
  }

  logout() {
      this.oidcSecurityService.logoff();
  }

  private doCallbackLogicIfRequired() {
      this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }
}
