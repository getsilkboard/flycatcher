import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { ElementModule } from './element.module'
import { AppComponent } from './app.component'
import { URLInterceptor } from './_helpers/URLInterceptor'

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: URLInterceptor, multi: true },
  ],

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ElementModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
