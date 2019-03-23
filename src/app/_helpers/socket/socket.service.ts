import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {
  socket: any

  constructor() {
    const options: any = {
      disconnectOnUnload: true,
      'sync disconnect on unload': true,
    }

    if (localStorage.user) {
      options.query = `userId=${localStorage.user}&access_token=${localStorage.token}`
    }

    // - socket.io now auto-configures its connection when we ommit a connection url
    this.socket = io('https://staging-parcel-api.shoppre.com' || window.location.origin, options)

    // this.socket = io.connect()
  }

  syncUpdates(route, items, appendAtBeginning) { console.log('syncupdates route', route)
    /**
     * Syncs item creation/updates on 'model:save'
     */
    this.socket.on(route, (item) => { console.log(route, item)
      items[appendAtBeginning ? 'push' : 'unshift'](item)
    })
  }

  emit(tag, data) {
    this.socket.emit(tag, data)
  }

  /**
   * Removes listeners for a models updates on the socket
   *
   * @param modelName
   */
  unsyncUpdates(modelName) {
    this.socket.removeAllListeners(`${modelName}:create`)
    this.socket.removeAllListeners(`${modelName}:remove`)
  }
}
