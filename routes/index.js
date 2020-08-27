var router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function (req, res) {
  res.redirect('/makers');
});

//User wants to log in
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/makers',
    failureRedirect: '/makers'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/makers');
});

module.exports = router;
