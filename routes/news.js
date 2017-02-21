var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.json({message: 'news list'});
});

export default router;