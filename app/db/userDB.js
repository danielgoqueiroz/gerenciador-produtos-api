const getConnection = require("./dbConnect");

class UserDB {
  constructor() {
    this.client;
  }

  async isCredentialValid(name, password) {
    this.client = await getConnection();
    try {
      const response = await this.client.query(
        `SELECT * FROM \"USER\" WHERE name = '${name}' AND password = '${password}';`
      );
      return response.rowCount == 1;
    } catch (err) {
      throw new Error("Erro ao acessar db de usuário.", err);
    } finally {
      this.client.end();
    }
  }

  async save(user) {
    const userLoad = await this.getByName(user.name);
    if (userLoad) {
      throw new Error("Usuário já cadastrada");
    }

    this.client = await getConnection();

    try {
      const response = await this.client.query(
        `INSERT INTO \"USER\" (name, password) VALUES ('${user.name}', '${user.password}') RETURNING *`
      );
      return response.rows[0];
    } catch (err) {
      throw new Error("Erro ao acessar db de usuário.", err);
    } finally {
      this.client.end();
    }
  }

  async getOne(id) {
    const isValid = new Number(id);

    if (isValid === undefined) {
      throw new Error("Id precisa ser numérico");
    }
    this.client = await getConnection();
    try {
      const users = await this.client.query(
        `SELECT * FROM \"USER\" WHERE id = ${id}`
      );
      return users.rows.length == 1 ? users.rows[0] : users.rows;
    } catch (err) {
      throw new Error("Erro ao buscar item do banco de dados");
    } finally {
      this.client.end();
    }
  }

  async getByName(name) {
    if (name === undefined || name.length < 3) {
      throw new Error("Nome inválido");
    }

    this.client = await getConnection();
    try {
      const users = await this.client.query(
        `SELECT * FROM \"USER\" WHERE name = '${name}'`
      );
      return users.rows.length == 1 ? users.rows[0] : null;
    } catch (err) {
      throw new Error("Erro ao buscar item do banco de dados");
    } finally {
      this.client.end();
    }
  }

  async getList() {
    this.client = await getConnection();
    try {
      const users = await this.client.query(`SELECT * FROM \"USER\"`);
      return users.rows;
    } catch (err) {
      throw new Error("Erro ao buscar usuários no banco de dados.", err);
    } finally {
      this.client.end();
    }
  }

  async delete(id) {
    const isValid = new Number(id);
    if (isValid === undefined) {
      throw new Error("Id precisa ser numérico");
    }
    this.client = await getConnection();
    try {
      const users = await this.client.query(
        `DELETE FROM \"USER\" WHERE id = ${id} RETURNING *`
      );
      return users.rows.length == 1;
    } catch (err) {
      throw new Error("Erro ao buscar usuários no banco de dados.", err);
    } finally {
      this.client.end();
    }
  }

  async update(user) {
    if (!user.id) {
      throw new Error("O id é obrigatório para realização do update");
    }
    this.client = await getConnection();
    try {
      const response = await this.client.query(
        `UPDATE \"USER\" SET name = '${user.name}' where id = ${user.id} RETURNING *`
      );
      return response.rows[0];
    } catch (err) {
      throw new Error("Erro ao acessar db de usuário.", err);
    } finally {
      this.client.end();
    }
  }
}

module.exports = UserDB;
