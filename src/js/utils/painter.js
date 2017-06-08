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
    // configuration object for the circle
    this.circleConfig = {
      radius: 5,
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
    })


  }

  // render
  // ============================================
  // pass on for paper render

  render () {
    if (this.circle) {
      for (let i = 0; i < this.circle.segments.length; i++) {
        let freq = i <= 20 ? AudioParser.getAverageFrequency(100, 130) : AudioParser.getAverageFrequency(500, 930)
        let r = this.circleConfig.radius + freq
        let t = 2 * Math.PI * i / this.circle.segments.length
        let x = Math.round(this.circleConfig.radius + r * Math.cos(t))
        let y = Math.round(this.circleConfig.radius + r * Math.sin(t))
        this.circle.segments[i].point.x = this.circle.rootSegments[i].point.x + x
        this.circle.segments[i].point.y = this.circle.rootSegments[i].point.y + y
      }
    }
  }


  // _drawCircle
  // ============================================
  // creates a ricle with the radius of this.circleConfig.radius
  // adds n points (this.circleConfig.points) on the outline of the circle

  _drawCircle () {
    let segments = []
    let r = this.circleConfig.radius
    for (let i = 0; i < this.circleConfig.points; i++) {
      let t = 2 * Math.PI * i / this.circleConfig.points
      let x = Math.round(this.circleConfig.radius + r * Math.cos(t))
      let y = Math.round(this.circleConfig.radius + r * Math.sin(t))
      segments.push(new paper.Segment(new paper.Point(x, y)))
    }
    this.circle = new paper.Path({
      segments: segments,
      strokeColor: 'black',
      fillColor: 'black',
      closed: true,
      strokeWidth: 1
    })
    this.circle.translate(paper.view.center.x - this.circleConfig.radius / 2, paper.view.center.y - this.circleConfig.radius / 2)
    this.circle.rootSegments = _.cloneDeep(this.circle.segments)
  }

  onMouseMove = (e) => {
  }

  onResize = (e) => {
    // this._positionCircle()
  }


}

export default Painter
