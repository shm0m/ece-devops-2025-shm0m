const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    if (!user.username) {
      return callback(new Error('Wrong user parameters'), null)
    }

    db.exists(user.username, (err, reply) => {
      if (err) return callback(err, null)
      if (reply === 1) return callback(new Error('User already exists'), null)

      db.hset(
        user.username,
        'username', String(user.username),
        'firstname', String(user.firstname ?? ''),
        'lastname', String(user.lastname ?? ''),
        (err2) => {
          if (err2) return callback(err2, null)
          callback(null, 'OK')
        }
      )
    })
  },

  get: (username, callback) => {
    db.hgetall(username, (err, user) => {
      if (err) return callback(err, null)
      if (!user || Object.keys(user).length === 0) {
        return callback(new Error('User not found'), null)
      }
      callback(null, user)
    })
  }
}
