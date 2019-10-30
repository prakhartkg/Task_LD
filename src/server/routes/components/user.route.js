const express = require('express');
const { authenticate, handler, payloadHandler: payload } = require('../../middleware');
const { userController: user } = require('./../../controller');

const router = express.Router();

// Login Route
router.post('/login', handler(user.login, payload.login));

router.post('/', authenticate, handler(user.addUser, payload.addUser));
router.put('/:id', authenticate, handler(user.updateUser, payload.updateUser));
router.delete('/:id', authenticate, handler(user.deleteUser, payload.deleteUser));
router.get('/all', authenticate, handler(user.getAllUsers, payload.getAllUsers));

module.exports = router;
