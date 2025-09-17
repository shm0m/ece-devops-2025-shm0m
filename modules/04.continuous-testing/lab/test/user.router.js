const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'shm0m',
        firstname: 'Shaima',
        lastname: 'DEROUICH'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Shaima',
        lastname: 'DEROUICH'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })


  describe('GET /user', () => {
    it('get a user by username', (done) => {
      const user = {
        username: 'skibidiohiobased',
        firstname: 'John',
        lastname: 'Pork'
      }

      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json

          chai.request(app)
            .get('/user/skibidiohiobased')
            .then((res2) => {
              chai.expect(res2).to.have.status(200)
              chai.expect(res2.body.status).to.equal('success')
              chai.expect(res2.body.data).to.include({
                username: 'skibidiohiobased',
                firstname: 'John',
                lastname: 'Pork'
              })
              chai.expect(res2).to.be.json
              done()
            })
            .catch((err) => {
              throw err
            })
        })
        .catch((err) => {
           throw err
        })
    })

    it('user not found', (done) => {
      chai.request(app)
        .get('/user/unknown_user')
        .then((res) => {
          chai.expect(res).to.have.status(404)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })    
})
})

