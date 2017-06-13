// =======================================================================
// Paper.js
// =======================================================================
// libs
import _ from 'lodash'
import paper from 'paper'
import Vue from 'Vue'
import VueResource from 'vue-resource'
import hash from 'string-hash'
// utils
import settings from 'settings'
import AudioParser from 'classes/audio-parser'
// env
import env from 'env'
// store
import store from 'store'

class Painter {
  constructor ($el) {

    this.config = {
      points: 25,
      analyzerRanges: 6,
      radialRepeaters: 10,
      alanalyzedBandWidth: 15000,
      hasMirrors: false,
      size: 1200 // arbtrary in px
    }
    Vue.use(VueResource)
  }

  setUp ($el) {
    $el.style.width = `${this.config.size}px`
    $el.style.height = `${this.config.size}px`
    paper.setup($el)
    paper.view.onResize = this.onResize.bind(this)
    paper.view.onMouseMove = this.onMouseMove.bind(this)
    paper.view.onFrame = this.render.bind(this)
    AudioParser.on('ready', () => {
      this.id = hash(
        store.currentTrack.title + this.config.points + this.config.alanalyzedBandWidth + this.config.analyzerRanges + this.config.radialRepeaters + new Date().getTime()
      )
      this._registerId()
      this._drawPaths()
    })
  }
  // render
  // ============================================
  // pass on for paper render

  render (e) {
    if (this.ranges) {
      this._animatePaths(e)
    }
  }

  // saveSvg
  // ============================================

  saveSvg (timeStamp) {
    let svg = {
      time: timeStamp,
      raw: paper.project.exportSVG({bounds: 'view', asString: true})
    }
    Vue.http.post(`${env.apiEndpoint}/track/save/svg/${this.id}`, svg, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(res => {
      // console.log(res)
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
  // saveSvg
  // ============================================

  _registerId () {
    let data = {
      track: store.currentTrack,
      config: this.config
    }
    Vue.http.post(`${env.apiEndpoint}/track/register/${this.id}`, data, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(res => {
      // console.log(res)
    })
  }


  // _animatePath
  // ============================================
  // handles animatons for this.paths

  _animatePaths (renderEvent) {
    // each group
    _.each(this.ranges, (range, rangeIndex) => {
      // set reference coordinates
      _.each(range.paths, (doublePath, degreeIndex) => {
        // set the first point
        _.each(doublePath, (path, index) => {
          let point = new paper.Point(
            paper.view.center.x - AudioParser.getByteAverageFrequency(this.ranges[rangeIndex].frequencies[index].x[0], this.ranges[rangeIndex].frequencies[index].x[1]),
            paper.view.center.y - AudioParser.getByteAverageFrequency(this.ranges[rangeIndex].frequencies[index].y[0], this.ranges[rangeIndex].frequencies[index].y[1])
          )
          let deg = degreeIndex * (360 / this.config.radialRepeaters) - 8.5
          point = point.rotate(deg, paper.view.center)
          path.add(point)
          if (path.segments.length > this.config.points) {
            path.removeSegment(0)
          }
        })
      })
    })

  }


  // _drawPaths
  // ============================================
  // takes care of drawing the paths to be aniamted
  // note that this is configured via the this.config

  _drawPaths () {
    // scaffold
    this.ranges = []
    // step -> total analized bandwidth / bandwidth of each array buffer in Audioparse / sections to be analized
    let step = (this.config.alanalyzedBandWidth / AudioParser.arrayBandwidth) / this.config.analyzerRanges
    console.log(`Each range is analyzing ~ ${step * AudioParser.arrayBandwidth}Hz`)
    let lastStep = 0
    // iterate trugh paths
    for (var i = 0; i < this.config.analyzerRanges; i++) {
      this.ranges[i] = {}
      // scaffold
      this.ranges[i].frequencies =
        [{
          x: [ lastStep, lastStep + step / 2 ],
          y: [ lastStep + step / 2, lastStep + step ]
        },
        {
          y: [ lastStep, lastStep + step / 2 ],
          x: [ lastStep + step / 2, lastStep + step ]
        }]
      // assign to every section an x/y analyzer point
      lastStep = lastStep + step
      this.ranges[i].paths = []
      // loop trough radialRepeaters and just scaffold path
      for (var y = 0; y < this.config.radialRepeaters; y++) {
        let pathConfig = {
          fillColor: '#333333',
          opacity: 0.5
        }
        this.ranges[i].paths[y] = this.config.hasMirrors ? [new paper.Path(pathConfig), new paper.Path(pathConfig)] : [new paper.Path(pathConfig)]
      }
    }
  }


  onMouseMove = (e) => {
  }

  onResize = (e) => {
  }


}

export default new Painter()
