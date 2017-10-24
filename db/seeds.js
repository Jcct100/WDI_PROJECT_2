const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Foodbank = require('../models/foodbank');
const User = require('../models/user');


const dbURL = 'mongodb://localhost/foodbank-database';
mongoose.connect(dbURL);

Foodbank.collection.drop();

Foodbank
  .create([{
    name: 'Rainham Foodbank',
    address: 'Rainham Foodbank 35A New Road Rainham Essex RM13 8DR',
    phone: '01708397484',
    email: 'info@rainham.foodbank.org.uk',
    website: 'www.rainham.foodbank.org.uk',
    createdBy: User[0]
  },{
    name: 'Swanley and District Foodbank',
    address: '11 Lynden Way Swanley Kent BR8 7DN',
    phone: '07798 872 573',
    email: 'info@swanleydistrict.foodbank.org.uk',
    website: 'www.swanleydistrict.foodbank.org.uk/',
    createdBy: User[0]
  },{
    name: 'Dagenham Foodbank',
    address: 'RCCG House Of Faith Connections. The BEACON 104 New Road,Dagenham.Essex. RM9 6PE',
    phone: '020 8595 0122 OR 07983431070',
    email: 'info@dagenham.foodbank.org.uk',
    website: 'www.dagenham.foodbank.org.uk',
    createdBy: User[0]
  },{
    name: 'Bexley Foodbank',
    address: 'c/o Avery Hill Christian Fellowship,Southspring,Sidcup, DA15 8EA ',
    phone: '07932 431 350',
    email: 'info@bexley.foodbank.org.uk',
    website: 'www.bexley.foodbank.org.uk',
    createdBy: User[0]
  },{
    name: 'Gravesham Foodbank',
    address: 'Riverside Community Centre, Dickens Road,Gravesend, Kent, DA12 2JY',
    phone: '07940 089643',
    email: 'graveshamfoodbank@gmail.com',
    website: 'www.gravesham.foodbank.org.uk',
    createdBy: User[0]
  },{
    name: 'Greenwich Foodbank',
    address: '20 Orangery Lane, Greenwich, London, SE9 1HN',
    phone: '07771 830549',
    email: 'contact@greenwichfoodbank.co.uk',
    website: 'www.greenwich.foodbank.org.uk/',
    createdBy: User[0]
  }])
  .then((foodbanks) =>  {
    console.log(`${foodbanks.length}
  foodbanks were created`);
  })
  .catch((err) =>  {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
