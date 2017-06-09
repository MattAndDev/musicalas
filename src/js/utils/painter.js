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
      points: 35,
      sections: 10,
      children: 10
    }

    // hook paper to provided el
    paper.setup($el)

    // pass on event handlers
    paper.view.onResize = this.onResize.bind(this)
    paper.view.onMouseMove = this.onMouseMove.bind(this)
    paper.view.onFrame = this.render.bind(this)

    AudioParser.on('ready', () => {
      this._drawPaths()
    })


  }

  // render
  // ============================================
  // pass on for paper render

  render (e) {
    if (this.paths) {
      this._animatePaths(e)
    }
  }


  // _animatePath
  // ============================================
  // handles animatons for this.paths

  _animatePaths (renderEvent) {
    // each group
    _.each(this.paths, (children, mainIndex) => {
      // set reference coordinates
      // each path in group
      let referenceX = AudioParser.getByteAverageFrequency(this.ranges[mainIndex].x[0], this.ranges[mainIndex].x[1])
      let referenceY = AudioParser.getByteAverageFrequency(this.ranges[mainIndex].y[0], this.ranges[mainIndex].y[1])
      // loop trough children
      _.each(children, (path, index) => {
        // set the first point
        let referencePoint = new paper.Point(paper.view.center.x - referenceX, paper.view.center.y - referenceY)
        // calculate degs
        let deg = index * (360 / this.pathsConfig.children)
        // rotate the point
        let point = referencePoint.rotate(deg, paper.view.center)
        // add it
        path.add(point)
        // if path has reached it's masximum length, remove last
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


  // _drawPaths
  // ============================================
  // takes care of drawing the paths to be aniamted
  // note that this is configured via the this.pathsConfig

  _drawPaths () {
    // scaffold
    this.paths = []
    this.ranges = []
    // iterate trugh paths
    for (var i = 0; i < this.pathsConfig.sections; i++) {
      // scaffold
      this.paths[i] = []
      // assign to every section an x/y analyzer point
      let randX = Math.floor(Math.random() * 1000) + 1
      let randY = Math.floor(Math.random() * 1000) + 1
      let randIncrement = Math.floor(Math.random() * 300) + 1
      this.ranges[i] = {
        x: [
          randX,
          randX + randIncrement
        ],
        y: [
          randY,
          randY + randIncrement
        ]
      }
      // loop trough children and just scaffold path
      for (var y = 0; y < this.pathsConfig.children; y++) {
        this.paths[i][y] = new paper.Path()
        this.paths[i][y].strokeColor = 'black'
        this.paths[i][y].strokeWidth = 1
        this.paths[i][y].smooth()
      }
    }
  }

  onMouseMove = (e) => {
  }

  onResize = (e) => {
    // this._positionCircle()
  }


}

export default Painter
