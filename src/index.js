'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const SimpleChain = require('./simpleChain')
const HTTP_PORT = 5034
const WS_PORT = 6666

const initializeExpressServer = () => {
  const app = express()
  app.use(bodyParser.json())

  const genesisData = {
    height: 0,
    timestamp: Date.now(),
    next: null,
    data: {
      title: 'Genesis Block',
      message: 'Block initialized in tandem with the simpleChain object',
    }
  }
  const chain = new SimpleChain(genesisData)
  app.listen(HTTP_PORT, () => console.log(`Server running on port ${HTTP_PORT}`))

  app.get('/', (req, res) => {
    res.send(JSON.stringify(chain))
  })

  app.get('/latest', (req, res) => {
    res.send(JSON.stringify(chain.getLastBlock()))
  })

  app.post('/newBlock', (req, res) => {
    chain.appendToChain(req.body.block)
    setTimeout(() => {
      res.send({
        message: 'Block mined successfully'
      })
    }, 500)
  })

  app.get('/block/:hash', (req, res) => {
    res.send(JSON.stringify(chain.getBlockByHash(req.params.hash.toString())))
  })

  app.get('/block/:hash/next', (req, res) => {
    res.send(JSON.stringify(chain.getNextBlock(req.params.hash.toString())))
  })

  app.get('/block/:hash/previous', (req, res) => {
    res.send(JSON.stringify(chain.getPreviousBlock(req.params.hash.toString())))
  })
}

initializeExpressServer()
