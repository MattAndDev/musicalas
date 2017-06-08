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
      width: Math.round(settings.window.y / 4),
      points: 40
    }
    // hook paper to provided el
    paper.setup($el)

    // pass on event handlers
    paper.view.onResize = this.onResize
    paper.view.onMouseMove = this.onMouseMove
    paper.view.onFrame = this.render.bind(this)

    AudioParser.on('ready', () => {
      this._addPath()
    })


  }

  render () {
    if (this.path) {
      _.each(this.path.segments, (segment, index) => {
        if (index === 1) {
          this.path.segments[index].point.x = this.pathReference[index].point.x - AudioParser.getAverageFrequency(100, 130)
          this.path.segments[index].point.y = this.pathReference[index].point.y - AudioParser.getAverageFrequency(100, 130)
        }
      })
    }
  }
  // _addPath
  // ============================================
  // takes care of drawing a path along a quarter of circle line

  _addPath () {

    // set fir/last point for stencilPath
    let firstPoint = new paper.Segment(paper.view.center.subtract([0, this.pathConfig.width]), null, null)
    let lastPoint = new paper.Segment(paper.view.center.subtract([this.pathConfig.width, 0], null, null))

    // draw an arc (stencilPath)
    // this is used to get all necessary point along the arc line with getPointAt
    this.stencilPath = new paper.Path.Arc({
      from: new paper.Point(paper.view.center.subtract([0, this.pathConfig.width])),
      through: new paper.Point(paper.view.center.subtract([this.pathConfig.width, this.pathConfig.width - this.pathConfig.width / 2])),
      to: new paper.Point(paper.view.center.subtract([this.pathConfig.width, 0]))
    })

    // init the poitns toconstruct the real path
    let points = []
    // push the firstpoint
    points.push(firstPoint)

    // for items in path config, add points on path at regular distance
    // distance calculated based on stencilPath lenght and points in pathConfig
    for (var i = 0; i < this.pathConfig.points; i++) {
      // calculate
      let point = new paper.Segment(new paper.Point(this.stencilPath.getPointAt((this.stencilPath.length / this.pathConfig.points) * i)), null, null)
      // push it
      points.push(point)
    }
    // push the last point
    points.push(lastPoint)

    // last but not least, add the reall last point in view center
    points.push(paper.view.center)

    // all ready, add the path
    this.path = new paper.Path({
      segments: points,
      strokeColor: 'black',
      // fillColor: 'black',
      closed: true,
      strokeWidth: 1
    })
    this.pathReference = _.cloneDeep(this.path.segments)
    // _.each(this.path.segments, (segment, index) => {
    //   console.log(segment);
    // })
    // _.each(this.path.roots, (segment, index) => {
    //   console.log(segment);
    // })
  }

    // _drawPoints (pathCluster) {
    //   _.each(pathCluster, (path, index) => {
    //     var angle = index * 2 * Math.PI / path.segments.length - Math.PI / 500;
    //     // set top left
    //     let point = new paper.Point(settings.window.x / 2 - AudioParser.getAverageFrequency(100, 200), settings.window.x / 2 - AudioParser.getAverageFrequency(100, 200))
    //     if (index === 1) {
    //       path.add(new paper.Point(settings.window.x / 2 - AudioParser.getAverageFrequency(100, 200), settings.window.x / 2 - AudioParser.getAverageFrequency(100, 200)))
    //     }
    //     else {
    //       // path.add(new paper.Point(settings.window.x / 2 + AudioParser.getAverageFrequency(100, 200), settings.window.x / 2 + AudioParser.getAverageFrequency(200, 300)));
    //     }
    //   })
    // }
    //
    //
    //
    // // _addPath
    // // ============================================
    // // takes care of drawing a path along a quarter of circle line
    //
    // _addPaths () {
    //   this.paths = []
    //   for (var i = 0; i < this.pathConfig.sections; i++) {
    //     this.paths[i] = []
    //     for (var y = 0; y < this.pathConfig.sectionRepeaters; y++) {
    //       this.paths[i][y] = new paper.Path()
    //       this.paths[i][y].fillColor = new paper.Color(1, 0, 0)
    //       this.paths[i][y].strokeWidth = 10
    //     }
    //   }
    // }
  onMouseMove = (e) => {
    // _.each(this.path.segments, (segment, index) => {
    //   if (index >= 1 && index <= this.path.segments.length - 3) {
    //     var plusOrMinus = Math.random() < 0.5 ? false : true
    //     let vector
    //     let rand1 = Math.floor(Math.random() * 10)
    //     let rand2 = Math.floor(Math.random() * 10)
    //     if (!plusOrMinus) {
    //       vector = this.roots[index].point.subtract(new paper.Point(rand1, rand2))
    //       vector.length = 2
    //       segment.point = segment.point.subtract(vector)
    //     }
    //     else {
    //       vector = segment.point.add(new paper.Point(rand1, rand2))
    //       vector.length = 2
    //       segment.point = segment.point.add(vector)
    //     }
    //   }
    // })
    // this.path.segments[0]
    // this.path.smooth({
    //   type: 'continuous',
    //   from: 1,
    //   to: this.path.segments.length - 3
    // })
  }

  onResize = (e) => {
  }


}

export default Painter
