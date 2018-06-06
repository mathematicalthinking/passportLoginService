const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const needle = require('needle');

const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const LOGIN_COOKIE = 'loginSessionUser';


router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('https://localhost:3000');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // Redirect if it succeeds
      return res.redirect('http://localhost:8080');
    });
  })(req, res, next);
});


// router.post('/login', function (req, res) {
//   var username = req.body.username;
//   var pass = req.body.password;
//   var token = 's87af97auo8fj9';
//   res.cookie(LOGIN_COOKIE, username);
//   var redirectUrl = req.body.redirectUrl + "?token=" + token + "&tmfUserName=" + username;
//   res.redirect(redirectUrl);
// });


// router.post('/SSO/TmfCheckToken.ashx', function (req, res) {
//   var token = req.body.token;

//   console.log("Validating token " + token);
//   if (token === 's87af97auo8fj9') {
//     res.send('<status>Success</status>');
//   } else {
//     res.send('failed');
//   }
// });

// router.post('/linkTmf', function (req, res) {
//   var nctmUserId = req.body.nctmId;
//   var tmfUserName = req.body.tmfId;

//   console.log("Recieved link for " + nctmUserId + " to " + tmfUserName);

//   res.sendStatus(200);
// });





//signUp
router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('auth/signup');
});

// router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
//   successReturnToOrRedirect: '/profile',
//   failureRedirect: '/signup',
//   passReqToCallback: true
// }));


router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('https://localhost:3000');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // Redirect if it succeeds
      return res.redirect('http://localhost:8080');
    });
  })(req, res, next);
});





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


//This has the loginService code added
router.get('/logout', ensureLoggedIn('/'), (req, res) => {
  res.clearCookie(LOGIN_COOKIE);
  needle.get('http://localhost:8080/pows/logout.htm?token=s87af97auo8fj9&tmfUserName=arm353', function (error, response) {
    console.log("Send get request to pow logout " + response.statusCode);
    console.log(response.body);
  });
  req.logout();
  res.redirect("http://localhost:8080/");
});


module.exports = router;