import { Component, EventEmitter, Input, Output } from '@angular/core'
import { st } from '@angular/core/src/render3'
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component'

@Component({
  selector: 'chat-instance',
  template: `
    <button (click)="startChat(itemvalue)">{{itemvalue}}</button>
  `,
  styles: [`
    .chat-config {
      padding: 20px;
    }
    .btn {
      padding: 5px;
      margin: 0px 2px;
      border: 1px solid #dedede;
      outline: none;
    }
    .btn-active {
      border: 1px solid #a0a0a0;
    }
    .btn:focus {
      border: 1px solid #333;
    }
  `],
})
export class ChatInstanceComponent {
  @Input() public widget1: ChatWidgetComponent
  @Input() public item: number
  @Input() public user: number
  @Input() public itemvalue: number
  @Input() public username: string
  @Input() public token: string
  @Input() public visible: boolean
  @Input() public theme: string
  @Input() public text = 'Select theme'
  @Output() public themeChange: EventEmitter<any> = new EventEmitter()
  @Output() public visibleChange: EventEmitter<any> = new EventEmitter()
  @Output() public itemChange: EventEmitter<any> = new EventEmitter()

  public themes = ['blue', 'grey', 'red']

  public startChat(id: number) {
    console.log('startchat')
    this.widget1._item = id
    this.widget1.getMessages()
    this.widget1.visible = !this.widget1.visible
    // this.itemChange.emit(this.itemvalue)
  }
}
