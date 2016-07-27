const models = require('../models/models');

const postUser = require('../controllers/userController').postUser;

postUser('Gene', 'Belcher')
.then(user => {
  console.log('user', user);
})
.catch(err => { console.log(err); });


postUser('Tina', 'Horses4Life')
.then(user => {
  console.log('user', user);
})
.catch(err => { console.log(err); });

/*
User.create({username: 'Louise', password: 'Belcher'})
  .then(() => User.findOne({username: 'Louise'}))
  .then(user => user.comparePassword('lcher'))
  .then(match => { console.log(match); })
*/
