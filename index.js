//SETTING UP SERVER:

//WE NEED TO REQUIRE OUR DEPENDENCIES which we install before
const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const router         = require('./config/routes');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
mongoose.promise     = require('bluebird');
const port           = process.env.PORT || 3000;
const app            = express();
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');

const databaseURL = 'mongodb://localhost/foodbank-database';
mongoose.connect(databaseURL, { useMongoClient: true} );


//add settings such as which view engine we are going to use or where to find out views
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//add middleware: which is stuff that is going to happened between the request and the response being sent back
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

//this but be placed last.
app.use(router);

//specify the port
app.listen(port, () => console.log('express is running'));
