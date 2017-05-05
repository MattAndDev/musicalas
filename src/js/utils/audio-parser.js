// =======================================================================
// audio-parser.js
// =======================================================================

import _ from 'lodash'
import settings from 'settings'


class AudioParser {

  constructor ($el) {
    this._testAudioContext((err) => {
      if (!err) {
        this._init()
      }
    })
  }

  _init () {
    console.log(this.context);
  }

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
