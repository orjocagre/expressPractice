class UsersService {

  constructor (){
    this.users = [];
    this.generate();
  }

  generate() {
    this.users = require('./../routes/db.json'.users);
  }

  find() {
    return this.users;
  }

  insert() {

  }

  update() {

  }

  delete() {

  }
}


module.exports = UsersService;
