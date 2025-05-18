const express = require('express');
const router = express.Router();
const { login, signUp } = require('../controller/user');

router.post('/login',login);
router.post('/signup', signUp)
router.get('/logout', (req, res) => {
    res.clearCookie('jwt').json({ success: true });
});

module.exports = router;