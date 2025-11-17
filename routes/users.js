var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

// Initialize users
var users = require('../init_data.json').data || {};
var curId = _.size(users);

// Hardcoded admin user (created once on server start)
if (!Object.values(users).some(u => u.email === 'admin@yodlr.com')) {
  const adminUser = {
    id: curId++,
    email: 'admin@yodlr.com',
    firstName: 'Admin',
    lastName: 'User',
    state: 'active',
    isAdmin: true
  };
  users[adminUser.id] = adminUser;
  log.info('Created admin user', adminUser);
}

/* GET all users */
router.get('/', function(req, res) {
  res.json(_.toArray(users));
});

/* POST: Create a new user */
router.post('/', function(req, res) {
  const user = req.body;
  user.id = curId++;
  user.state = 'pending';      // default state
  user.isAdmin = false;        // regular users are not admin
  users[user.id] = user;
  log.info('Created user', user);
  res.json(user);
});

/* GET: Specific user by ID */
router.get('/:id', function(req, res, next) {
  const user = users[req.params.id];
  if (!user) return next();
  res.json(user);
});

/* DELETE: User by ID (admin only) */
router.delete('/:id', function(req, res) {
  const user = users[req.params.id];

  // Optional: check for admin rights here (pseudo-example)
  // if (!req.user.isAdmin) return res.status(403).send('Forbidden');

  delete users[req.params.id];
  log.info('Deleted user', user);
  res.status(204).json(user);
});

/* PUT: Update a user by ID (admin only for state change) */
router.put('/:id', function(req, res, next) {
  const updatedUser = req.body;

  if (updatedUser.id != req.params.id) {
    return next(new Error('ID parameter does not match body'));
  }

  // Only allow admin to update 'state' or 'isAdmin'
  if (!req.user.isAdmin) { 
    return next(new Error('Only admins can delete users!'))
   }

  users[updatedUser.id] = updatedUser;
  log.info('Updated user', updatedUser);
  res.json(updatedUser);
});

module.exports = router;
