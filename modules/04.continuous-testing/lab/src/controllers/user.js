const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    if (!user.username) {
      return callback(new Error('Wrong user parameters'), null)
    }

    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    db.exists(user.username, (err, reply) => {
      if (err) return callback(err, null)
      if (reply === 1) return callback(new Error('User already exists'), null)

      db.hmset(user.username, userObj, (err2, res) => {
        if (err2) return callback(err2, null)
        callback(null, res)
      })
    })
  },

  get: (username, callback) => {
    db.hgetall(username, (err, user) => {
      if (err) return callback(err, null)
      if (!user) return callback(new Error('User not found'), null)
      callback(null, user)
    })
  }
}
