// =======================================================================
// audio-parser.js
// =======================================================================

// libs
import _ from 'lodash'
import EventEmitter from 'eventemitter3'
import Vue from 'Vue'
import VueResource from 'vue-resource'
// utils
import settings from 'settings'
// env
import env from 'env'



class AudioParser extends EventEmitter {

  constructor () {
    // EE are always fancy
    super()
    // tell vue to use vue resource
    Vue.use(VueResource)
    // first syncronious check for audiocontext
    this._testAudioContext()
  }


  // setupTrack()
  // ============================================
  // takes care of handling requests for new soundcloud stream urls
  // @params
  // streamUrl -> string
  // @emits
  // ready

  setupTrack (streamUrl) {
    // get an array bufferFrom provided url
    this._getArrayBufferFromUrl(streamUrl)
    // build audioCotnext source from buffer
    .then(this._buildSourceFromBuffer.bind(this))
    // reate an analyzer node
    .then(this._createAalyser.bind(this))
    // all ready -> ship it
    .then(() => { this.emit('ready'); this.play() })
  }

  // getAverageFrequency()
  // ============================================
  // simpla calc of average frequency within range
  // @params
  // start -> integer
  // end -> integer
  // @returns
  // total -> integer

  getByteAverageFrequency (start, end) {
    this.analyser.getByteFrequencyData(this.context.byteFrequencyData)
    if (isNaN(start) || isNaN(end)) return false
    let total = 0
    let length = Math.abs(start, end)
    for (var i = start; i < end; i++) {
      total = total + this.context.byteFrequencyData[i]
    }
    return parseInt(total / length)
  }



  // play()
  // ============================================
  // just connecting source to destination

  play () {
    this.source.connect(this.context.destination)
  }

  // _buildSourceFromBuffer
  // ============================================
  // builds the source of the adio node
  // @params
  // arrayBuffer -> valid arrayBuffer

  _buildSourceFromBuffer () {
    return new Promise((resolve, reject) => {
      return this.context.decodeAudioData(this.arrayBuffer, (buffer) => {
        this.source = this.context.createBufferSource()
        this.source.buffer = buffer
        this.source.start(0)
        resolve()
      })
    })
  }



  // _getArrayBufferFromUrl()

  // ============================================
  // uses vue-resource to get array buffer from passed url
  // @params:
  // streamUrl -> strign
  // @resolve
  // response -> response object with arraybuffer


  _getArrayBufferFromUrl (streamUrl) {
    return new Promise((resolve, reject) => {
      Vue.http.get(streamUrl + `?client_id=${env.scClientId}`, {responseType: 'arraybuffer'}).then(response => {
        this.arrayBuffer = response.body
        response.status === 200 ? resolve(response.body /* <- arraybuffer */) : reject(response)
      })
    })
  }

  // _getStream()
  // ============================================
  // uses vue-resource to get array buffer from passed url
  // @params:
  // streamUrl -> strign
  // @resolve
  // response -> response object with arraybuffer


  // Set up the Analiser node
  _createAalyser () {
    // Create the analyser
    this.analyser = this.context.createAnalyser()
    this.analyser.smoothingTimeConstant = 0.3
    // Connect it to the source
    this.source.connect(this.analyser)
    // Parse the data
    this.context.byteFrequencyData = new Uint8Array(this.analyser.fftSize)
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
      throw e
    }
  }

}

export default new AudioParser()
