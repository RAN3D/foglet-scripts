/**
 * Clear all foglets to undefined
 * @param  {Foglet[]}  peers - Foglet peers to connect with the centeral peer.
 * @return {Promise} A Promise fullfilled when all peers are cleared, means equal to undefined
 */
const clearFoglets = (peers) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(peers.map(p => undefined))
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = { clearFoglets };
