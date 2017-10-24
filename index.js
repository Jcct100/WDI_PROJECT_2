//SETTING UP SERVER:
const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const router         = require('./config/routes');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
mongoose.promise     = require('bluebird');
const app            = express();
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const session        = require('express-session');
const { port, databaseURL, secret } = require('./config/environment');
const User = require('./models/user');
const flash = require('express-flash');
const authentication = require('./lib/authentication');

mongoose.connect(databaseURL, { useMongoClient: true } );

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use(authentication);
app.use(router);

app.listen(port, () => console.log('express is running'));
