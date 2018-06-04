let express = require("express");
let router = express.Router();

// Get
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HW1' });
});

router.get("/*", function (req, res, next) {
    let obj = {
        'string': req.url.substring(1),
        'length': req.url.substring(1).length
    }
    res.send(obj);
})

router.post("/*", function (req, res, next) {
    let str = req.body[Object.keys(req.body)[0]];
    let obj = {
        'string': str,
        'length': str.length
    }
    res.send(obj);
})

module.exports = router;