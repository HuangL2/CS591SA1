let express = require("express");
let router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs411');
const db = mongoose.connection;
db.once('open', function () {
    console.log('Connection successful.')
});

const Schema = mongoose.Schema;
const stringSchema = new Schema({
    string: String,
    length: Number
});
const str = mongoose.model('String', stringSchema);

router.get('/:key', function (req, res, next) {
    str.find(
        {name: req.params.key},
        {_id: 0},
        function(error, result){
            // if the string does not exist in the database
            if (result.length === 0) {
                let newStr = new str({
                    string: req.params.key,
                    length: req.params.key.length
                });
                newStr.save();
                res.json(newStr)
            } else
                res.json(result)
        })
});

router.get('/', function (req, res, next) {
    str.find({}, {_id: 0}, function (error, result) {
        res.json(result)
    })
});

router.post('/', function (req, res, next) {
    str.find(
        {name: res.body.string},
        {_id: 0},
        function (error, result) {
            if (result.length === 0) {
                let newStr = new str({
                    string: req.params.key,
                    length: req.params.key.length
                });
                newStr.save();
                res.json(newStr)
            } else
                res.json(result)
        } 
    )
});

router.delete('/:key', function (req, res, next) {
    str.findOneAndRemove(
        {name: res.params.key},
        {},
        function (error, result) {
            if(result)
                res.json({string: 'String deleted'});
            else
                res.json({string: 'string not found'});
        }
    )
});

module.exports = router;