//SETTING UP SERVER:

//WE NEED TO REQUIRE OUR DEPENDENCIES which we install before
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/routes');

const port = process.env.PORT || 3000;
const app = express();

//add settings such as which view engine we are going to use or where to find out views
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//add middleware: which is stuff that is going to happened between the request and the response being sent back
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(router);

//specify the port
app.listen(port, () => console.log('express is running'));
