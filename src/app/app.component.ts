import { Component } from '@angular/core'
import { st } from '@angular/core/src/render3'

@Component({
  selector: 'app-root',
  template: `
    <chat-config [(theme)]="theme" [(visible)]="visible" [(user)]="user" [(username)]="username" [(token)]="token"></chat-config>
    <chat-widget [theme]="theme" [visible]="visible"></chat-widget>
  `,
})
export class AppComponent {
  public theme = 'blue'
  public visible = true
  public user: string = localStorage.user || ''
  public username: string = localStorage.username || ''
  public token: string = localStorage.token || ''
}
