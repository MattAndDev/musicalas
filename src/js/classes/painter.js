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
      analyzerRanges: 6,
      children: 10
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
    if (this.ranges) {
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
    _.each(this.ranges, (range, rangeIndex) => {
      // set reference coordinates
      _.each(range.paths, (doublePath, degreeIndex) => {
        // set the first point
        _.each(doublePath, (path, index) => {
          let point = new paper.Point(
            paper.view.center.x - AudioParser.getByteAverageFrequency(this.ranges[rangeIndex].frequencies[index].x[0], this.ranges[rangeIndex].frequencies[index].x[1]),
            paper.view.center.y - AudioParser.getByteAverageFrequency(this.ranges[rangeIndex].frequencies[index].y[0], this.ranges[rangeIndex].frequencies[index].y[1])
          )
          let deg = degreeIndex * (360 / this.pathsConfig.children)
          point = point.rotate(deg, paper.view.center)
          path.add(point)
          if (path.segments.length > this.pathsConfig.points) {
            path.removeSegment(0)
          }
        })
      })
    })

  }


  // _drawPaths
  // ============================================
  // takes care of drawing the paths to be aniamted
  // note that this is configured via the this.pathsConfig

  _drawPaths () {
    // scaffold
    this.ranges = []
    // set step
    // NOTE: we want to analyze a range between 0 and 15000 Hz.
    // therefore the follwoing: range / each range of array (24) / numebr of analyzerRanges
    let step = (15000 / AudioParser.arrayBandwidth) / this.pathsConfig.analyzerRanges  // should be about 100 herz
    console.log('each path analyzes with increment of' + (step * AudioParser.arrayBandwidth) )
    let lastStep = 0
    // iterate trugh paths
    for (var i = 0; i < this.pathsConfig.analyzerRanges; i++) {
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
      // let randIncrement = Math.floor(Math.random() * 300) + 1
      lastStep = lastStep + step
      this.ranges[i].paths = []
      // loop trough children and just scaffold path
      for (var y = 0; y < this.pathsConfig.children; y++) {
        let pathConfig = {
          fillColor: '#333333',
          opacity: 0.5
        }
        this.ranges[i].paths[y] = [new paper.Path(pathConfig), new paper.Path(pathConfig)]
      }
    }
  }


  onMouseMove = (e) => {
  }

  onResize = (e) => {
  }


}

export default new Painter()
