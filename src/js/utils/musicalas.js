// =======================================================================
// Paper.js
// =======================================================================
// utils
import AudioParser from 'utils/audio-parser'
import Painter from 'utils/painter'
import ScApi from 'utils/sc-api'

class Musicalas {

  constructor ($el) {
    let streamUrl = ScApi.getTrack('/tracks/225430320').then((data) => {
      this.currentSong = data
      AudioParser.setupTrack(this.currentSong.stream_url)
      this.painter = new Painter($el)
    })
  }

}

export default Musicalas
