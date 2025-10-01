const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/index')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  beforeEach(() => db.flushdb())
  after(() => { app.close(); db.quit() })

  describe('POST /user', () => {
    it('create a new user', async () => {
      const user = { username: 'bob', firstname: 'Bob', lastname: 'Builder' }
      const res = await chai.request(app).post('/user').send(user)
      chai.expect(res).to.have.status(201)
      chai.expect(res.body.status).to.equal('success')
    })

    it('pass wrong parameters', async () => {
      const bad = { firstname: 'Bob' }
      const res = await chai.request(app).post('/user').send(bad)
      chai.expect(res).to.have.status(400)
      chai.expect(res.body.status).to.equal('error')
    })
  })

  describe('GET /user/:username', () => {
    it('successfully get user', async () => {
      const user = { username: 'eva', firstname: 'Eva', lastname: 'Green' }
      await chai.request(app).post('/user').send(user)
      const res = await chai.request(app).get('/user/eva')
      chai.expect(res).to.have.status(200)
      chai.expect(res.body.data).to.include(user)
    })

    it('cannot get a user when it does not exist', async () => {
      const res = await chai.request(app).get('/user/notthere')
      chai.expect(res).to.have.status(404)
      chai.expect(res.body.status).to.equal('error')
    })
  })
})
