// =======================================================================
// Paper.js
// =======================================================================
// libs
import _ from 'lodash'
import paper from 'paper'
// utils
import settings from 'settings'
import AudioParser from 'classes/audio-parser'
// env
import env from 'env'

class Painter {
  constructor ($el) {

    this.pathsConfig = {
      points: 25,
      sections: 15,
      children: 14
    }


  }

  setUp ($el) {
    paper.setup($el)
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

  // downloadSvg
  // ============================================
  // wip, basic export for svg

  downloadSvg () {
    var url = 'data:image/svg+xml;utf8,' + encodeURIComponent(paper.project.exportSVG({asString: true}))
    window.open(url)
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
        // smooth it
        path.smooth()
        // if path has reached it's masximum length, remove last
        if (path.segments.length > this.pathsConfig.points - mainIndex) {
          path.removeSegment(0)
        }
      })
    })

  }


  // _drawPaths
  // ============================================
  // takes care of drawing the paths to be aniamted
  // note that this is configured via the this.pathsConfig

  _drawPaths () {
    // scaffold
    this.paths = []
    this.ranges = []
    // set step
    // NOTE: we want to analyze a range between 0 and 10000 Hz.
    // therefore the follwoing: range / each range of array (24) / numebr of sections
    let step = (15000 / AudioParser.arrayBandwidth) / this.pathsConfig.sections  // should be about 100 herz
    console.log('each path analyzes with increment of' + (step * AudioParser.arrayBandwidth) );
    let lastStep = 0
    // iterate trugh paths
    for (var i = 0; i < this.pathsConfig.sections; i++) {
      // scaffold
      this.paths[i] = []
      // assign to every section an x/y analyzer point
      // let randIncrement = Math.floor(Math.random() * 300) + 1
      this.ranges[i] = {
        x: [
          lastStep,
          lastStep + step / 2
        ],
        y: [
          lastStep + step / 2,
          lastStep + step
        ]
      }
      lastStep = lastStep + step
      // loop trough children and just scaffold path
      for (var y = 0; y < this.pathsConfig.children; y++) {
        this.paths[i][y] = new paper.Path()
        this.paths[i][y].fillColor = 'black'
        this.paths[i][y].strokeWidth = 1
        this.paths[i][y].smooth()
      }
    }
  }


  onMouseMove = (e) => {
  }

  onResize = (e) => {
  }


}

export default new Painter()
