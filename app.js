if (process.env.NODE_ENV !== 'production') {
  require('./secrets');
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressHbars = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { db, User } = require('./db');
const volleyball = require('volleyball');

// set view engine
app.engine('handlebars', expressHbars());
app.set('view engine', 'handlebars');

// common middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

//logging middleware
app.use(volleyball);

// sessions and passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' },
  async function(email, password, done) {
    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return done(null, false);
      }
      if (!user.validatePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    }
    catch (err) {
      done(err);
    }
  }));

// make user available to all tempaltes
app.use((req, res, next) => {
  app.locals.user = req.user;
  return next();
});

// landing page
app.get('/', (req, res, next) => {
  res.redirect('/listings');
});

// register all other routes
app.use(require('./routes'));

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return next();
  }
  res.status(500);
  console.error(err.message);
  res.render('error', { status: 500, message: 'Internal Server Error' });
});

app.use((req, res, next) => {
  res.status(404);
  res.render('error', { status: 404, message: 'Not Found' });
});

(async function() {
  try {
    const PORT = process.env.PORT || 3000;
    await db.sync();
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  }
  catch (err) {
    console.error(err.message);
  }
})();
