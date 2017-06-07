// =======================================================================
// Paper.js
// =======================================================================
// utils
import AudioParser from 'utils/audio-parser'
import Painter from 'utils/painter'

class Musicalas {

  constructor ($el) {
    this.audioParser = new AudioParser()
    this.painter = new Painter($el)
  }

}

export default Musicalas
