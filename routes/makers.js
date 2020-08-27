var router = require('express').Router();
var makersCtrl = require('../controllers/makers');

// GET /students
router.get('/makers', makersCtrl.index);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/mantras', isLoggedIn, makersCtrl.addMantra);

// DELETE /facts/:id
router.delete('/mantras/:id', isLoggedIn, makersCtrl.delMantra);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}
module.exports = router;
