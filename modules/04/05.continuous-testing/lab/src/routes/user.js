const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// POST /user
router.post('/', (req, res) => {
  userController.create(req.body, (err, result) => {
    if (err) {
      return res.status(err.message === 'User already exists' ? 409 : 400)
        .json({ status: 'error', error: err.message })
    }
    res.status(201).json({ status: 'success', data: result })
  })
})

// GET /user/:username
router.get('/:username', (req, res) => {
  userController.get(req.params.username, (err, user) => {
    if (err) {
      return res.status(404).json({ status: 'error', error: err.message })
    }
    res.status(200).json({ status: 'success', data: user })
  })
})

module.exports = router
