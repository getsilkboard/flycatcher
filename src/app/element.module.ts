import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Injector, NgModule } from '@angular/core'

import { createCustomElement } from '@angular/elements'
import { ChatModule, ChatWidgetComponent, ChatConfigComponent, ChatInstanceComponent } from './chat/'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { URLInterceptor } from './_helpers/URLInterceptor'

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: URLInterceptor, multi: true },
  ],
  imports: [BrowserModule, BrowserAnimationsModule, ChatModule],
  exports: [ChatModule]
})
export class ElementModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const chatConfig = <any>createCustomElement(ChatConfigComponent, {
      injector: this.injector,
    })

    const chatWidget = <any>createCustomElement(ChatWidgetComponent, {
      injector: this.injector,
    })

    const chatInstance = <any>createCustomElement(ChatInstanceComponent, {
      injector: this.injector,
    })

    customElements.define('chat-config', chatConfig)
    customElements.define('chat-widget', chatWidget)
    customElements.define('chat-instance', chatInstance)
  }
}
