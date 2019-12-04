'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = require('chai').should()

chai.use(chaiHttp)

let request

describe('apiRoute tests', function () {
  beforeEach(function () {
    request = chai.request(server)
  })

  it('root route should return welcome message', function (done) {
    request.get('/').end(function (err, res) {
      res.body.should.be.a('string')
      res.body.should.equal('Welcome to Blobber Royale!')
      done()
    })
  })
  it('root route should be in JSON format and return status 200', function (done) {
    request.get('/').end(function (err, res) {
      res.should.have.status(200)
      res.should.be.json
      done()
    })
  })
})
