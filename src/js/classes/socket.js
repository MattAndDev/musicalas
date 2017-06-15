// =======================================================================
// Paper.js
// =======================================================================
// libs
import _ from 'lodash'
import SocketIo from 'socket.io-client'
// env
import env from 'env'

class Socket {
  constructor () {
    this.socket = new SocketIo(env.socketEndpoint)
    this.socket.on('test', () => {
      console.log('er');
    })
  }

}

export default new Socket()
