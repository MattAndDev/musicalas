// ============================================
// Store
// ============================================
export default {
  debug: true,
  setCurrentTrack (track) {
    if (this.debug) console.log(`setting current store track with id ${track.id}`)
    this.currentTrack = track
  },
  setId (id) {
    if (this.debug) console.log(`adding poster id ${id}`)
    this.id = id
  },
  setOldIds (ids) {
    if (this.debug) console.log(`adding old ids ${ids}`)
    this.ids = ids
  }
}
