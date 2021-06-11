class Product {
  constructor(
    categoryId,
    name,
    manufacturingDate,
    perishableProduct,
    expirationDate,
    price
  ) {
    this.categoryId = categoryId;
    this.name = name;
    this.manufacturingDate = manufacturingDate;
    this.perishableProduct = perishableProduct;
    this.expirationDate = expirationDate;
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
