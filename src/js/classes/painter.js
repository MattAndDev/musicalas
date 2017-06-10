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
      sections: 6,
      children: 5
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

      // loop trough children
      _.each(children, (path, index) => {
        // set the first point
        _.each(path, (subPath, subIndex) => {
          let point = new paper.Point(
            paper.view.center.x - AudioParser.getByteAverageFrequency(this.ranges[mainIndex][subIndex].x[0], this.ranges[mainIndex][subIndex].x[1]),
            paper.view.center.y - AudioParser.getByteAverageFrequency(this.ranges[mainIndex][subIndex].y[0], this.ranges[mainIndex][subIndex].y[1])
          )
          let deg = index * (360 / this.pathsConfig.children)
          point = point.rotate(deg, paper.view.center)
          subPath.add(point)
          subPath.smooth()
          if (subPath.segments.length > this.pathsConfig.points) {
            subPath.removeSegment(0)
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
    this.paths = []
    this.ranges = []
    // set step
    // NOTE: we want to analyze a range between 0 and 10000 Hz.
    // therefore the follwoing: range / each range of array (24) / numebr of sections
    let step = (15000 / AudioParser.arrayBandwidth) / this.pathsConfig.sections  // should be about 100 herz
    console.log('each path analyzes with increment of' + (step * AudioParser.arrayBandwidth) )
    let lastStep = 0
    // iterate trugh paths
    for (var i = 0; i < this.pathsConfig.sections; i++) {
      // scaffold
      this.paths[i] = []
      // assign to every section an x/y analyzer point
      // let randIncrement = Math.floor(Math.random() * 300) + 1
      this.ranges[i] = [{
        x: [ lastStep, lastStep + step / 2 ],
        y: [ lastStep + step / 2, lastStep + step ]
      },
      {
        y: [ lastStep, lastStep + step / 2 ],
        x: [ lastStep + step / 2, lastStep + step ]
      }]
      lastStep = lastStep + step
      // loop trough children and just scaffold path
      for (var y = 0; y < this.pathsConfig.children; y++) {
        let pathConfig = {
          fillColor: '#333333',
          closed: true,
          opacity: 0.5
        }
        this.paths[i][y] = [new paper.Path(pathConfig), new paper.Path(pathConfig)]
      }
    }
  }


  onMouseMove = (e) => {
  }

  onResize = (e) => {
  }


}

export default new Painter()
