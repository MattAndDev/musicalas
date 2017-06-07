// =======================================================================
// audio-parser.js
// =======================================================================

import _ from 'lodash'
import settings from 'settings'
import Vue from 'Vue'
import VueResource from 'vue-resource'
import env from 'env'

class AudioParser {

  constructor (streamUrl) {
    Vue.use(VueResource)
    // Vue.http.options.xhr = {withCredentials: true}
    this._testAudioContext((err) => {
      if (!err) {
        this._getStream(streamUrl).then((arrayBuffer) => {
          this._buildSource(arrayBuffer)
        })
      }
    })
  }


  // _buildSource
  // ============================================
  // builds the source of the adio node
  // @params
  // arrayBuffer -> valid arrayBuffer

  _buildSource (arrayBuffer) {
    this.context.decodeAudioData(arrayBuffer, (buffer) => {
      this.source = this.context.createBufferSource()
      this.source.buffer = buffer
      this.source.start(0)
      this.play()
    })
  }


  // play()
  // ============================================
  // just connecting source to destination
  play () {
    this.source.connect(this.context.destination)
  }

  // _getStream()
  // ============================================
  // uses vue-resource to get array buffer from passed url
  // @params:
  // streamUrl -> strign
  // @resolve
  // response -> response object with arraybuffer


  _getStream (streamUrl) {
    return new Promise((resolve, reject) => {
      Vue.http.get(streamUrl + `?client_id=${env.scClientId}`, {responseType: 'arraybuffer'}).then(response => {
        response.status === 200 ? resolve(response.body /* <- arraybuffer */) : reject(response)
      })
    })
  }


  // _testAudioContext()
  // ============================================
  // check for really old browsrs
  // @params:
  // cb -> function which first parameter represents the presence of audio pai

  _testAudioContext (cb) {
    try {
    // Fix up for prefixing
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.context = new AudioContext()
    }
    catch (e) {
      cb(true)
    }
    cb(false)
  }

}

export default AudioParser
