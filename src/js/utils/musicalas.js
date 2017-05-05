// =======================================================================
// Paper.js
// =======================================================================

import _ from 'lodash'
import paper from 'paper'
import settings from 'settings'
class Musicalas {

  constructor ($el) {

    // configuration object for path
    this.pathConfig = {
      width: Math.round(settings.window.x / 4),
      points: 40
    }

    // hook paper to provided el
    paper.setup($el)

    this._addPath()


    // pass on event handlers
    paper.view.onResize = this.onResize
    paper.view.onMouseMove = this.onMouseMove
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
      to: new paper.Point(paper.view.center.subtract([this.pathConfig.width, 0])),
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
  }

  onMouseMove = (e) => {
    _.each(this.path.segments, (segment, index) => {
      if (index >= 1 && index <= this.path.segments.length - 3) {
        var plusOrMinus = Math.random() < 0.5 ? false : true
        let vector
        let rand1 = Math.floor(Math.random() * 10)
        let rand2 = Math.floor(Math.random() * 10)
        if (!plusOrMinus) {
          vector = segment.point.subtract(new paper.Point(rand1, rand2))
          vector.length = 2
          segment.point = segment.point.subtract(vector)
        }
        else {
          vector = segment.point.add(new paper.Point(rand1, rand2))
          vector.length = 2
          segment.point = segment.point.add(vector)
        }
      }
    })
    this.path.segments[0]
    this.path.smooth({
      type: 'continuous',
      from: 1,
      to: this.path.segments.length - 3
    })
  }
  onResize = (e) => {
  }

}

export default Musicalas
