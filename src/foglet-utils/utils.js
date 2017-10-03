/*
MIT License

Copyright (c) 2017 Thomas Minier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use strict'

const pathConnect = (peers, duplex = false) => {
  const pairs = []
  for (let ind = 0; ind < peers.length - 1; ind++) {
    pairs.push([ peers[ind], peers[ind + 1] ])
  }
  return Promise.all(pairs.map(pair => {
    return pair[0].connection(pair[1])
    .then(() => {
      if (duplex) return pair[1].connection(pair[0])
      return Promise.resolve()
    })
  }))
}

const overlayConnect = (index, ...peers) => {
  return peers.reduce((prev, peer) => {
    return prev.then(() => {
      peer.share(index)
      return peer.connection(null, index)
    })
  }, Promise.resolve())
}

const doneAfter = (limit, done) => {
  let cpt = 0
  return () => {
    cpt++
    if (cpt >= limit) done()
  }
}

module.exports = {
  pathConnect,
  overlayConnect,
  doneAfter
}
