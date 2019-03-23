import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <chat-config [(theme)]="theme" [(visible)]="visible"></chat-config>
    <chat-widget [theme]="theme" [visible]="visible"></chat-widget>
  `,
})
export class AppComponent {
  public theme = 'blue'
  public visible = true
}
