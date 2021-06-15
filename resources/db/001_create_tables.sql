CREATE TABLE "CATEGORY"(
    id INT GENERATED ALWAYS AS IDENTITY,
    description VARCHAR(30) not null,
    PRIMARY KEY(id)
);

CREATE TABLE "PRODUCT"(
    id INT generated always as IDENTITY,
    category_id bigint,
    name varchar(85),
    manufacturingDate  TIMESTAMP ,
    perishableProduct boolean,
    expirationDate TIMESTAMP ,
    price bigint,
    primary KEY(id),
    CONSTRAINT fk_category
    	FOREIGN KEY(category_id) 
	  		REFERENCES "CATEGORY"(id)
);

CREATE TABLE "USER"(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) not null,
    password VARCHAR(30) not null,
    primary key(id)
);

INSERT INTO "USER" (name, password) VALUES ('Usuario Teste', 'teste123');
INSERT INTO "CATEGORY" (  description ) VALUES ('Eletrônico');
INSERT INTO "PRODUCT" (  category_id,   name,  manufacturingDate,  perishableProduct,  expirationDate,  price  ) VALUES (      1,      'Tv',       to_timestamp(1577836800),       false,       to_timestamp(1655251200),       1200.01      );
INSERT INTO "PRODUCT" (  category_id,   name,  manufacturingDate,  perishableProduct,  expirationDate,  price  ) VALUES (      1,      'Teclado',       to_timestamp(1577836800),       false,       to_timestamp(1655251200),       99.01      );