import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { ChatConfigComponent } from './chat-config/chat-config.component'
import { ChatInstanceComponent } from './chat-instance/chat-instance.component'
import { SocketService } from '../_helpers/socket/socket.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent, ChatInstanceComponent],
  exports: [ChatWidgetComponent, ChatConfigComponent, ChatInstanceComponent],
  providers: [SocketService],
  entryComponents: [ChatWidgetComponent, ChatConfigComponent, ChatInstanceComponent],
})
export class ChatModule {}
