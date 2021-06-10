CREATE TABLE [IF NOT EXISTS] user (
   id bignumber column_contraint,
   name biginteger,
   password string,
);

CREATE TABLE [IF NOT EXISTS] category (
   id bignumber,
   description string
);

CREATE TABLE [IF NOT EXISTS] product (
   id
   categoryId
   name
   manufacturingDate
   perishableProduct
   expirationDate
   price
);