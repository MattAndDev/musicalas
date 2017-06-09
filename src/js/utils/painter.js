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
      points: 120
    }

    this.pathsConfig = {
      points: 30,
      sections: 1,
      children: 22
    }

    // hook paper to provided el
    paper.setup($el)

    // pass on event handlers
    paper.view.onResize = this.onResize.bind(this)
    paper.view.onMouseMove = this.onMouseMove.bind(this)
    paper.view.onFrame = this.render.bind(this)

    AudioParser.on('ready', () => {
      // this._drawCircle()
      this._drawPaths()
    })


  }

  // render
  // ============================================
  // pass on for paper render

  render (e) {
    if (this.circle) {
      this._animateCircle()
    }
    if (this.paths) {
      this._animatePaths(e)
    }
  }


  // _animatePath
  // ============================================
  // handles animatons for this.paths
  // wip version
  _animatePaths (renderEvent) {
    // each group
    _.each(this.paths, (children) => {
      // set reference coordinates
      let referenceX = AudioParser.getByteAverageFrequency(150, 190)
      let referenceY = AudioParser.getByteAverageFrequency(300, 640)
      // each path in group
      _.each(children, (path, index) => {
        let referencePoint = new paper.Point(paper.view.center.x - referenceX, paper.view.center.y - referenceY)
        let deg = index * (360 / this.pathsConfig.children)
        let point = referencePoint.rotate(deg, paper.view.center)
        path.add(point)
        // path.add(new paper.Point(paper.view.center.x - AudioParser.getByteAverageFrequency(150,300),paper.view.center.y - AudioParser.getByteAverageFrequency(300,340)))
        if (path.segments.length > this.pathsConfig.points) {
          path.removeSegment(0)
        }
      })
    })

  }

  _setPathLenght () {
    if (renderEvent.count >= this.pathsConfig.points) {
    }
    else {
    }
  }

  _drawPaths () {
    this.paths = []
    for (var i = 0; i < this.pathsConfig.sections; i++) {
      this.paths[i] = []
      for (var y = 0; y < this.pathsConfig.children; y++) {
        this.paths[i][y] = new paper.Path()
        this.paths[i][y].fillColor = 'black'
        this.paths[i][y].strokeWidth = 1
        this.paths[i][y].smooth()
      }
    }
  }

  _animateCircle () {
    let step = Math.round(AudioParser.context.byteFrequencyData.length / 30 / this.circleConfig.points)
    for (let i = 0; i < this.circle.segments.length; i++) {
      let freq = AudioParser.getByteAverageFrequency(i * step, i * step + 30)
      let r = this.circleConfig.radius + freq
      let t = 2 * Math.PI * i / this.circle.segments.length
      let x = Math.round(r + r * Math.cos(t))
      let y = Math.round(r + r * Math.sin(t))
      this.circle.segments[i].point.x = this.circle.rootSegments[i].point.x + x
      this.circle.segments[i].point.y = this.circle.rootSegments[i].point.y + y
    }
    this.circle.smooth()
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
      // fillColor: 'black',
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
