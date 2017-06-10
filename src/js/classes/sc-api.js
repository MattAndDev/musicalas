// =======================================================================
// Paper.js
// =======================================================================
// libs
import _ from 'lodash'
import SC from 'soundcloud'
// env
import env from 'env'

class ScApi {
  constructor () {
    SC.initialize({
      client_id: env.scClientId,
      redirect_uri: 'http://example.com/callback'
    })
  }


  // getTrack
  // ============================================
  // get's a track with the given id
  // @params:
  // id -> string
  // @return:
  // resolve -> object (song data)

  getTrack (id) {
    return new Promise((resolve, reject) => {
      SC.get(`tracks/${id}`).then((data, err) => {
        resolve(data)
      })
    })
  }

  // search
  // ============================================
  // searches soundcloud for given query
  // returns a filtered result (streamable -> true)
  // @params:
  // query -> string
  // @return:
  // resolve -> array (tracks)

  search (query) {
    return new Promise((resolve, reject) => {
      let queryParams = {
        q: query,
        streamable: true
      }
      SC.get('/tracks', queryParams).then((tracks) => {
        // remove not streamable tracks
        // there's no fitler opt for this
        tracks = _.remove(tracks, (o) => { return o.streamable === true })
        resolve(tracks)
      })
    })
  }

}

export default new ScApi(env.clientId)
