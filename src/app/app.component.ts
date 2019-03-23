import { Component } from '@angular/core'
import { st } from '@angular/core/src/render3'

@Component({
  selector: 'app-root',
  template: `
    <chat-instance [widget1]="chatWidget" [itemvalue]="290"></chat-instance>
    <chat-instance [widget1]="chatWidget" [itemvalue]="291"></chat-instance>
    <chat-widget [theme]="theme" [visible]="visible" [item]="item" #chatWidget></chat-widget>
  `,
})
export class AppComponent {
  public theme = 'blue'
  public visible = false
  public user: string = localStorage.user || ''
  public username: string = localStorage.username || ''
  public token: string = localStorage.token || ''
  public item: number
}
