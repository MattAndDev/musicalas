// =======================================================================
// Paper.js
// =======================================================================
// libs
import _ from 'lodash'
import paper from 'paper'
// utils
import settings from 'settings'
import AudioParser from 'utils/audio-parser'
// env
import env from 'env'

class Painter {
  constructor ($el) {
    // configuration object for path
    this.pathConfig = {
      width: 5,
      points: 40
    }
    // hook paper to provided el
    paper.setup($el)

    // pass on event handlers
    paper.view.onResize = this.onResize.bind(this)
    paper.view.onMouseMove = this.onMouseMove.bind(this)
    paper.view.onFrame = this.render.bind(this)

    AudioParser.on('ready', () => {
      this._drawCircle()
    //   this._addPath()
    })


  }

  render () {
    if (this.circle) {
      // let r = this.pathConfig.width
      // for (let i = 0; i < this.circle.segments.length; i++) {
      //   let t = 2 * Math.PI * i / this.circle.segments.length
      //   let x = Math.round(this.pathConfig.width + r * Math.cos(t) + AudioParser.getAverageFrequency(100, 130))
      //   let y = Math.round(this.pathConfig.width + r * Math.sin(t) + AudioParser.getAverageFrequency(100, 130))
      //   this.circle.segments[i].point.x = this.circle.rootSegments[i].point.x + x
      //   this.circle.segments[i].point.y = this.circle.rootSegments[i].point.y + y
      // }
    }
  }
  // _addPath
  // ============================================
  // takes care of drawing a path along a quarter of circle line


  _drawCircle () {
    let segments = []
    let r = this.pathConfig.width
    for (let i = 0; i < this.pathConfig.points; i++) {
      let t = 2 * Math.PI * i / this.pathConfig.points
      let x = Math.round(this.pathConfig.width + r * Math.cos(t))
      let y = Math.round(this.pathConfig.width + r * Math.sin(t))
      segments.push(new paper.Segment(new paper.Point(x, y)))
    }
    this.circle = new paper.Path({
      segments: segments,
      strokeColor: 'black',
      fillColor: 'black',
      closed: true,
      strokeWidth: 1
    })
    this._positionCircle()
    this.circle.rootSegments = _.cloneDeep(this.circle.segments)
  }

  _positionCircle () {
    this.circle.translate(paper.view.center.x - this.pathConfig.width / 2, paper.view.center.y - this.pathConfig.width / 2)
  }

  onMouseMove = (e) => {
  }

  onResize = (e) => {
    // this._positionCircle()
  }


}

export default Painter
