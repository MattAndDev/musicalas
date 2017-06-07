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
  // streamUrl -> string
  getTrack (id) {
    return new Promise((resolve, reject) => {
      SC.get(id).then((data, err) => {
        resolve(data)
      })
    })
  }

}

export default new ScApi(env.clientId)
