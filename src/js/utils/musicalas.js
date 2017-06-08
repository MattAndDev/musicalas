// =======================================================================
// Paper.js
// =======================================================================
// utils
import AudioParser from 'utils/audio-parser'
import Painter from 'utils/painter'
import ScApi from 'utils/sc-api'

class Musicalas {

  constructor ($el) {
    // loud pipes - ratatt - 32529450
    // hide & seek - imogen heap - 225430320
    //9th - beetoven - 78615577
    let streamUrl = ScApi.getTrack('/tracks/225430320').then((data) => {
      this.currentSong = data
      AudioParser.setupTrack(this.currentSong.stream_url)
      this.painter = new Painter($el)
    })
  }

}

export default Musicalas
