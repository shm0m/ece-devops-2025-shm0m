const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User Controller', () => {
  beforeEach(() => db.flushdb())

  describe('Create', () => {
    it('create a new user', (done) => {
      const user = { username: 'john', firstname: 'John', lastname: 'Doe' }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const bad = { firstname: 'No', lastname: 'Username' }
      userController.create(bad, (err, result) => {
        expect(err).to.not.be.null
        expect(result).to.be.null
        done()
      })
    })

    it('avoid creating an existing user', (done) => {
      const user = { username: 'john', firstname: 'John', lastname: 'Doe' }
      userController.create(user, () => {
        userController.create(user, (err2, result2) => {
          expect(err2).to.not.be.null
          expect(result2).to.be.null
          done()
        })
      })
    })
  })

  describe('Get', () => {
    it('get a user by username', (done) => {
      const user = { username: 'alice', firstname: 'Alice', lastname: 'Wonder' }
      userController.create(user, (err, result) => {
        expect(err).to.be.null
        expect(result).to.equal('OK')

        userController.get('alice', (err2, found) => {
          expect(err2).to.be.null
          expect(found).to.include(user)
          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      userController.get('ghost', (err, result) => {
        expect(err).to.not.be.null
        expect(result).to.be.null
        done()
      })
    })
  })
})
