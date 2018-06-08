let express = require("express");
let router = express.Router();

router.route('/:key')
.get(function(req, res, next) {
    req.params.key = {
        'string': req.params.key,
        'length': req.params.key.length
    };
    res.json(req.params.key)
});

router.route('/')
.post(function (req, res, next) {
    let obj = {
        'string': req.body.string,
        'length': req.body.string.length
    };
    res.json(obj)
});

module.exports = router;