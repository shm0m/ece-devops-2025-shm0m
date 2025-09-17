const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  beforeEach(() => {
    db.flushdb()
  })

  describe('Create', () => {
    it('create a new user', (done) => {
      const user = {
        username: 'shm0m',
        firstname: 'Shaima',
        lastname: 'DEROUICH'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Shaima',
        lastname: 'DEROUICH'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done) => {
      const user = {
        username: 'shm0m',
        firstname: 'Shaima',
        lastname: 'DEROUICH'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        userController.create(user, (err2, result2) => {
          expect(err2).to.not.be.equal(null)
          expect(result2).to.be.equal(null)
          done()
        })
      })
    })
  })

  describe('Get', () => {
    it('get a user by username', (done) => {
      const user = {
        username: 'skibidiohiobased',
        firstname: 'John',
        lastname: 'Pork'
      }
      // 1. create user
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        // 2. retrieve user
        userController.get('skibidiohiobased', (err2, found) => {
          expect(err2).to.be.equal(null)
          expect(found).to.include({
            username: 'skibidiohiobased',
            firstname: 'John',
            lastname: 'Pork'
          })
          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      userController.get('no_such_user', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  })
})
