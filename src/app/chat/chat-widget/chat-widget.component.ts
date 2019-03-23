import { Component, ElementRef, HostListener, Input, NgZone, OnInit, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import { SocketService } from '../../_helpers/socket/socket.service'

const randomMessages = [
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'Is there anything else I can help you with?',
  'That\'s awesome',
  'Angular Elements is the bomb 💣 ',
  'Can you explain in more detail?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure to chat with you',
  'We are happy to make you a custom offer!',
  'Bye',
  ':)',
]

const rand = max => Math.floor(Math.random() * max)

const getRandomMessage = () => randomMessages[rand(randomMessages.length)]

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {

  @ViewChild('bottom') bottom: ElementRef
  public _item: number
  @Input() public set item(item) { console.log('set item', item)
    this._item = item
    this.getMessages()
  }
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'
   // public visible: true | false = false
  public _visible = false

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new Subject()

  public userid = Number(localStorage.user)
  public user = {
    name: 'Swaroop',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  }

  avatar = `https://randomuser.me/api/portraits/men/55.jpg`
  public messages = []

  ngOnInit() {
    // setTimeout(() => this.visible = true, 1000)
    // setTimeout(() => {
    //   this.addMessage(this.operator, 'Hi, how can we help you?', 'received')
    // }, 1500)

    this.getMessages()
  }
  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  public randomMessage() {
    this.addMessage(this.user, getRandomMessage(), 'received')
  }

  constructor(private http: HttpClient,
              private socket: SocketService,
              private zone: NgZone
  ) {
  }

  async getMessages() { console.log('getMessages5', this._item)
    if (!this._item) {
      return
    }
    const route = `/packages/${this._item}/comments`
    const messages: any = await this.http
      .get(route)
      .toPromise()
    console.log('comments request completed')
    this.messages = []

    console.log('push completed calling sync')
    this.socket.syncUpdates(route, this.messages, false)

    console.log({ visible: this.visible, _visible: this._visible })
    this.messages.push(...messages)
    if (!this.visible) {
      this.visible = true
    }

    this.zone.run(() => {

    })

    console.log('Messages', messages)
  }

  public toggleChat() { console.log('toggleChat', this.visible)
    this.visible = !this.visible
  }

  public async sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }

    const route = `/packages/${this._item}/comments`
    const msg = await this.http
      .post(route, { comments: message })
      .toPromise()

    Object.assign(msg, { User: this.user })
    // this.messages.unshift(msg)
    // this.addMessage(this.client, message, 'sent')
    // setTimeout(() => this.randomMessage(), 1000)
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

}
