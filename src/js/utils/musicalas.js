// =======================================================================
// Paper.js
// =======================================================================

import _ from 'lodash'
import paper from 'paper'
import settings from 'settings'
class Musicalas {

  constructor ($el) {
    // this.paper = paper
    this.pathConfig = {
      width: Math.round(settings.window.x / 4),
      points: 40
    }
    paper.setup($el)
    this.addPath()
    // pass on event handlers
    paper.view.onResize = this.onResize
    paper.view.onMouseMove = this.onMouseMove
  }

  addPath () {

    let points = []
    let firstPoint = new paper.Segment(paper.view.center.subtract([0, this.pathConfig.width]), null, null)
    let lastPoint = new paper.Segment(paper.view.center.subtract([this.pathConfig.width, 0], null, null))
    this.line = new paper.Path.Arc({
      from: new paper.Point(paper.view.center.subtract([0, this.pathConfig.width])),
      through: new paper.Point(paper.view.center.subtract([this.pathConfig.width, this.pathConfig.width - this.pathConfig.width / 2])),
      to: new paper.Point(paper.view.center.subtract([this.pathConfig.width, 0])),
    })
    points.push(firstPoint)
    for (var i = 0; i < this.pathConfig.points; i++) {
      console.log(this.line.getPointAt((this.line.length / this.pathConfig.points) * i));
      let point = new paper.Segment(new paper.Point(this.line.getPointAt((this.line.length / this.pathConfig.points) * i)), null, null)
      points.push(point)
    }
    points.push(lastPoint)

    this.path = new paper.Path({
      segments: points,
      strokeColor: 'black',
      // fillColor: 'black',
      closed: true,
      strokeWidth: 1
    })
    this.path.add(paper.view.center)
  }

  onMouseMove = (e) => {
    _.each(this.path.segments, (segment, index) => {
      // console.log(index, this.path.segments.length )
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
