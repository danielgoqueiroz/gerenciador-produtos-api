class User {
  constructor(id, name, password) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
  validate() {
    if (!this.name) {
      throw new Error("Nome de usuário inválido.");
    }
    if (!this.password) {
      throw new Error("Senha de usuário invalido");
    }
  }
}

module.exports = User;
