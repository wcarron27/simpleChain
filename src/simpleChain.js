const Block = require('./Block')
const sha256 = require('sha256')

class SimpleChain {
  constructor(data) {
    const hash = this.generateNewHash(data)
    data.hash = hash
    this.chain = {}
    this.chain[hash] = data
    this.lastHash = hash
  }

  buildNewBlock (newBlockData, hash) {
    return new Block(
      this.getBlockchainHeight(),
      hash,
      this.getLastBlock().hash,
      newBlockData
    )
  }

  appendToChain (newBlockData) {
    const hash = this.generateNewHash(newBlockData)
    this.chain[hash] = this.buildNewBlock(newBlockData, hash)
    this.chain[this.lastHash].next = hash
    this.lastHash = hash
  }

  getLastBlock () {
    return this.chain[this.lastHash]
  }
  
  getBlockchainHeight () {
    return Object.keys(this.chain).length
  }

  getBlockByHash (hash) {
    return this.chain[hash]
  }

  getNextBlock(hash) {
    const newHash = this.chain[hash].next
    return newHash ? this.chain[newHash] : null
  }

  getPreviousBlock (hash) {
    const prevHash = this.chain[hash].previousBlockHash
    return prevHash ? this.chain[prevHash] : null
  }


  // Utility method
  generateNewHash (data) {
    return sha256(Date.now().toString() + JSON.stringify(data))
  }


}

module.exports = SimpleChain
