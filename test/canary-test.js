const expect = require('chai').expect

describe('canary test', function () {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly
  it('this test should always pass', function () {
    expect(true).to.be.true
  })
})
