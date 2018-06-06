const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//signIn
router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/login',
  passReqToCallback: true
}));

//signUp
router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
}));


//FACEBOOK AUTH ROUTE
router.get("/auth/facebook", passport.authenticate("facebook", {
  scope: 'email'
}));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}));


//GOOGLE AUTH ROUTE
router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.profile.emails.read"
  ]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/profile",
    failureRedirect: "/login"
}));

router.get('/logout', ensureLoggedIn('/'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;




/*


//app.get('/login', function (req, res) {
app.get('/NCTM-TMF-Login-Page', function (req, res) {
  //console.log('Login, then go back to ' + req.params.returnUrl );
  var loggedInUser = req.cookies[LOGIN_COOKIE];

  if (loggedInUser) {
    var redirectUrl = req.query.SsoReturnUrl + '?token=s87af97auo8fj9' + "&tmfUserName=" + loggedInUser;
    console.log("found cookie, sending back to " + redirectUrl);
    res.redirect(redirectUrl);
    return;
  }

  console.log('Login, then go back to ' + req.query.SsoReturnUrl);
  res.render('login', {
    message: 'Login in so you can go back to ' + req.query.SsoReturnUrl,
    redirect: req.query.SsoReturnUrl
  });
});

app.post('/doLogin', function (req, res) {
  var username = req.body.username;
  var pass = req.body.password;
  console.log("Login attempt by " + username + " with pass: " + pass);
  console.log("Need to send them to: " + req.body.redirectUrl);
  var token = 's87af97auo8fj9';
  res.cookie(LOGIN_COOKIE, username);
  //res.redirect( req.body.redirectUrl + "?token=" + token + "&userId=" + username  );
  var redirectUrl = req.body.redirectUrl + "?token=" + token + "&tmfUserName=" + username;
  //console.log("NEED AN ACCOUNT LINK: " + redirectUrl );
  //var tempRedirect ="http://localhost:8080/products/fulfiller/linkNctmAccount.htm?redirectUrl=" + encodeURIComponent(redirectUrl);
  //console.log("Link redirect: " + tempRedirect );
  //res.redirect( tempRedirect  );
  res.redirect(redirectUrl);
});

app.post('/SSO/TmfCheckToken.ashx', function (req, res) {
  var token = req.body.token;

  console.log("Validating token " + token);
  if (token === 's87af97auo8fj9') {
    res.send('<status>Success</status>');
  } else {
    res.send('failed');
  }
});

app.post('/linkTmf', function (req, res) {
  var nctmUserId = req.body.nctmId;
  var tmfUserName = req.body.tmfId;

  console.log("Recieved link for " + nctmUserId + " to " + tmfUserName);

  res.sendStatus(200);
});

app.get('/logout', function (req, res) {
  res.clearCookie(LOGIN_COOKIE);
  needle.get('http://localhost:8080/pows/logout.htm?token=s87af97auo8fj9&tmfUserName=arm353', function (error, response) {
    console.log("Send get request to pow logout " + response.statusCode);
    console.log(response.body);
  });

  console.log("returning to pows");
  res.redirect("http://localhost:8080/");
});

function handleError(req) {
  req.on('error', function (e) {
    console.log('ERROR: ' + e.message);
  });
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

*/