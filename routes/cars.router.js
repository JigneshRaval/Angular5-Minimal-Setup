// cars.router.js
var express = require('express')
    , router = express.Router()

// Car brands page
router.get('/brands', function (req, res) {
    res.status(200).json({ brands: 'Audi, BMW, Mercedes' });
});

// Car models page
router.get('/models', function (req, res) {
    res.send('Audi Q7, BMW X5, Mercedes GL')
});

module.exports = router
