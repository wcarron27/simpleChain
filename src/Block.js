class Block {
  constructor(height, hash, previousBlockHash, data) {
    this.height = height
    this.hash = hash
    this.previousBlockHash = previousBlockHash
    this.data = data
    this.timestamp = Date.now()
  }

  data () {
    return this.data
  }

  hash () {
    return this.hash
  }

  BlockHeight () {
    return this.height
  }

  timestamp () {
    return this.timestamp
  }
}

module.exports = Block

