#! /usr/bin/env node

console.log('This script populates some test user, finance to your database. Specified database in const.js as MONGO_ENDPOINT');

// Get mongo endpoint in const.js
var mongoDB = require('../config').MONGO_ENDPOINT
if (!mongoDB.startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var User = require('../models/User')
var Finance = require('../models/Finance')

var mongoose = require('mongoose');
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var finances = []

function userCreate(user_id, password, name, grade, student_id, status, 
    position, is_active, phone, email, lastlogin, reg_date, cb) {

  userdetail = {user_id:user_id , password: password, name: name, grade: grade, 
    student_id: student_id, status: status, position: position, is_active: is_active, 
    phone: phone, email: email, lastlogin: lastlogin, reg_date: reg_date}
  
  var user = new User(userdetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );

}

function financeCreate(use_date, usage, detail, user, income, outcome, total, cb) {
  var finance = new Finance({ use_date: use_date, usage: usage, detail: detail,
    user: user, income: income, outcome: outcome, total: total});
       
    finance.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Finance: ' + finance);
    finances.push(finance)
    cb(null, finance);
  }   );
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate("admin1", "password", "admin1name", 4, "2015104184", "Attending", "Admin", true, "01033334444", "kairos@adsfas.com", Date.now(), Date.now(), callback)
        },
        function(callback) {
            userCreate("user1", "password2", "user1name", 2, "2013106183", "Leave", "Member", true, "01011114444", "user1@adsfas.com", Date.now(), Date.now(), callback)
          },
          function(callback) {
            userCreate("user2", "password3", "user2name", 2, "2017104122", "Military leave", "Member", false, "01011114444", "user2@adsfas.com", Date.now(), Date.now(), callback)
          },
        ],
        // Optional callback
        cb);
}

function createFinances(cb){
    async.parallel([
        function(callback) {
            financeCreate(Date.now(), "dues", "spring sem dues", users[0], 30000, 0, 30000, callback)
        },
        function(callback) {
            financeCreate(Date.now(), "study subsidy", "deep learning study", users[1], 0, 20000, 10000, callback)
        }
    ],
    cb);
}

async.series([
    createUsers,
    createFinances,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Users: '+users);
        console.log('Finances: '+finances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

