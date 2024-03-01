const getConnection = require('../libs/postgres');

class UsersService {

  constructor (){
    this.users = [];
    // this.generate();
  }

  // async generate() {
  //   this.users = require('./../routes/db.json'.users);
  // }

  async find() {
    const client = await getConnection();
    const res = await client.query('SELECT * FROM tasks')
    return res.rows;
  }

  async insert() {

  }

  async update() {

  }

  async delete() {

  }
}


module.exports = UsersService;
