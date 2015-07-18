/**
 * Created by ben on 7/17/15.
 */
var express = require('express'),
    router = express.Router();

router.post('/comments', function(req,res) {
    console.info(req.body);
    res.send('ok');
});

module.exports = router;