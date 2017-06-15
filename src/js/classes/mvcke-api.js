// =======================================================================
// Paper.js
// =======================================================================
// libs
import Vue from 'Vue'
import VueResource from 'vue-resource'
import hash from 'string-hash'
import Cookie from 'js-cookie'
// classes
import Painter from 'classes/painter'
import AudioParser from 'classes/audio-parser'
// env
import env from 'env'
// store
import store from 'store'

class MvckeApi {
  constructor () {
    Vue.use(VueResource)
    this.init()
  }

  // setUp
  // ============================================
  // extended pape.js init set sizes
  // bind event handlers, attaches event lsitener on Audiopareser
  // when ready registers track id and starts to draw

  init ($el) {
    AudioParser.on('ready', () => {
      this.id = hash(
        store.currentTrack.title + Painter.config.points + Painter.config.alanalyzedBandWidth + Painter.config.analyzerRanges + Painter.config.radialRepeaters + new Date().getTime()
      )
      this._registerId()
    })
  }

  // saveSvg
  // ============================================

  saveSvg (timeStamp) {
    // scaffold svg object
    let svg = {
      time: timeStamp,
      raw: paper.project.exportSVG({bounds: 'view', asString: true})
    }
    // ship it
    Vue.http.post(`${env.apiEndpoint}/track/save/svag/${this.id}`, svg, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(res => { return true }, err => { throw err })
  }

  // savePng
  // ============================================

  savePng (timeStamp) {
    Painter.$el.toBlob((blob) => {
      var formdata = new FormData()
      formdata.append('file', blob, timeStamp)
      // ship it
      Vue.http.post(`${env.apiEndpoint}/track/save/png/${this.id}`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data;' }
      }).then(res => { return true }, err => { throw err })
    })
  }

  // getZip
  // ============================================

  getZip () {
    Vue.http.get(`${env.apiEndpoint}/track/get/zip/${this.id}`).then(res => {
      let a = document.createElement('a')
      a.href = res.body
      a.click()
    })
  }

  // getPoster
  // ============================================

  getPoster (query) {
    Vue.http.get(`${env.apiEndpoint}/track/get/combined/${this.id}?text=${query}`).then(res => {
      let a = document.createElement('a')
      a.href = res.body
      a.target = '_blank'
      a.click()
    })
  }


  // _registerId
  // ============================================
  // ship song hash to the backend to create a track reference
  // passes in track data from soundcloud and this.config

  _registerId () {
    let data = {
      track: store.currentTrack,
      config: Painter.config
    }
    Vue.http.post(`${env.apiEndpoint}/track/register/${this.id}`, data, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(res => {
      this._setCookieID()
      return true
    },
      err => { throw err })
  }

  _setCookieID () {
    if (Cookie.get('track-ids')) {
      let ids = JSON.parse(Cookie.get('track-ids'))
      ids.push(this.id)
      console.log(ids);
      JSON.stringify(ids)
      Cookie.set('track-ids', ids)
      // do something with cookie
    }
    else {
      let ids = JSON.stringify([this.id])
      Cookie.set('track-ids', ids)
    }
    Cookie.set('current-track-id', this.id)
  }


}

export default new MvckeApi()
