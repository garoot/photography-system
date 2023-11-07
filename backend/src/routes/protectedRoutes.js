const express = require('express');
const router = express.Router();

// Example of a protected route
router.get('/protected', (req, res) => {
    res.json({ message: "You have accessed a protected route!" });
});

module.exports = router;
