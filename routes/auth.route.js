const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', async (req, res) => {
  res.send('Login Route');
});

router.post('/refresh-token', async (req, res) => {
  res.send('Refresh Token Route');
});

router.delete('/logout', async (req, res) => {
  res.send('logout Route');
});

module.exports = router;
