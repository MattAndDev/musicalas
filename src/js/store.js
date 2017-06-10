// ============================================
// Store
// ============================================

export default {
  setCurrentTrack (track) {
    if (this.debug) console.log(`setting current store track with id ${track.id}`)
    this.currentTrack = track
  },
  id: Math.floor(Math.random() * 90000) + 10000
}
