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
    this._testAudioContext((err) => {
      if (!err) {
        this._getStream(streamUrl)
        .then(this._buildSource.bind(this))
        .then(this._createAalyser.bind(this))
        .then(() => {})
      }
    })
  }


  // _buildSource
  // ============================================
  // builds the source of the adio node
  // @params
  // arrayBuffer -> valid arrayBuffer

  _buildSource () {
    return new Promise((resolve, reject) => {
      return this.context.decodeAudioData(this.arrayBuffer, (buffer) => {
        this.source = this.context.createBufferSource()
        this.source.buffer = buffer
        this.source.start(0)
        console.log('eueue');
        resolve()
      })
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
        this.arrayBuffer = response.body
        response.status === 200 ? resolve(response.body /* <- arraybuffer */) : reject(response)
      })
    })
  }


  // Set up the Analiser node
  _createAalyser () {
    // Create the analyser
    this.analyser = this.context.createAnalyser()
    this.analyser.smoothingTimeConstant = 0.7

    // Connect it to the source
    this.source.connect(this.analyser)

    // Parse the data
    this.context.frequencyData = new Uint8Array(this.analyser.fftSize)

    // recalculate the data every 20 ms
    setTimeout(() => {
      this.analyser.getByteFrequencyData(this.context.frequencyData)
      this.getAverageFrequency(100, 120)
    }, 20)
  }


  getAverageFrequency (start, end) {
    if (isNaN(start) || isNaN(end)) return false
    let total = 0
    let length = Math.abs(start, end)
    for (var i = start; i < end; i++) {
      total = total + this.context.frequencyData[i]
    }
    return total / length
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
