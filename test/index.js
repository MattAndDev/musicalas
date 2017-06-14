import sinonChai from 'sinon-chai'
import chai from 'chai'
chai.use(sinonChai)
chai.should()
var expect = require('chai').expect
import sinon from 'sinon'
import jsdom from 'mocha-jsdom'
global.window = jsdom()
import Painter from '../src/js/classes/painter'

// init jsdom
global.document = jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;describe('Musicalas', () => {
  describe('Painter', () => {
    describe('constructor', () => {
      it('should have valid config', () => {
        expect(Painter.config).to.be.an('object')
        expect(Painter.config.points).to.be.a('number')
        expect(Painter.config.analyzerRanges).to.be.a('number')
        expect(Painter.config.radialRepeaters).to.be.a('number')
        expect(Painter.config.alanalyzedBandWidth).to.be.a('number')
        expect(Painter.config.hasMirrors).to.be.a('boolean')
        expect(Painter.config.size).to.be.a('boolean')

      })
    })
  })
})
