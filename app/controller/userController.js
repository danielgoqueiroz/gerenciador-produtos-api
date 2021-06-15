let UserDB = require("../db/userDB");

class UserContoller {
  constructor() {
    this.userDB = new UserDB();
  }

  getUser(id) {}
  async saveUser(user) {
    return this.userDB.save(user);
  }
  async login(user) {
    const userLoged = await this.userDB.isCredentialValid(
      user.name,
      user.password
    );
    return userLoged;
  }
  async saveUser(user) {
    return this.userDB.save(user);
  }
}

module.exports = UserContoller;
