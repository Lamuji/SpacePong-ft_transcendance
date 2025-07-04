import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { StarsComponent } from './components/stars/stars.component';
import { StarsInteractiveComponent } from './components/stars-interactive/stars-interactive.component';
import { WINDOW_PROVIDERS } from './window-token';

// Import UI Module
import { UiModule } from './shared/ui/ui.module';

export function tokenGetter() {
	return localStorage.getItem("access_token");
  }

@NgModule({
  declarations: [
    AppComponent,
    StarsComponent,
    StarsInteractiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    UiModule, // Add UI Module
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [`${window.location.protocol}//${window.location.hostname}:3000`, `${window.location.protocol}//${window.location.hostname}:3001`]
      }
    }),
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
