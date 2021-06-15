class Product {
  constructor(
    category_id,
    name,
    manufacturing_date,
    perishable_product,
    expiration_date,
    price
  ) {
    this.category_id = category_id;
    this.name = name;
    this.manufacturing_date = manufacturing_date;
    this.perishable_product = perishable_product;
    this.expiration_date = expiration_date;
    this.price = price;
  }
  validate() {
    // - A data de fabricação (manufacturingDate) deve ser maior que a data de validade (expirationDate)
    if (this.expirationDate > this.manufacturingDate) {
      throw new Error(
        "A data de fabricação não pode anterior a data de fabricação"
      );
    }
  }
}

module.exports = Product;
