CREATE TABLE "CATEGORY"(
    id INT GENERATED ALWAYS AS IDENTITY,
    description VARCHAR(30) not null,
    PRIMARY KEY(id)
);

CREATE TABLE "PRODUCT"(
    id INT generated always as IDENTITY,
    category_id bigint,
    name varchar(85),
    manufacturing_date  TIMESTAMP ,
    perishable_product boolean,
    expiration_date TIMESTAMP ,
    price numeric,
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
INSERT INTO "CATEGORY" (  description ) VALUES ('Cozinha');
INSERT INTO "CATEGORY" (description) values ('Agropecuária');
INSERT INTO "CATEGORY" (description) values ('Alimentos');
INSERT INTO "CATEGORY" (description) values ('Bebidas');
INSERT INTO "CATEGORY" (description) values ('Artesanato');
INSERT INTO "CATEGORY" (description) values ('Automóveis');

INSERT INTO "PRODUCT" (  category_id,   name,  manufacturing_date,  perishable_product,  expiration_date,  price  ) VALUES (      1,      'Tv',       to_timestamp(1577836800),       false,       to_timestamp(1655251200),       1200.01      );
INSERT INTO "PRODUCT" (  category_id,   name,  manufacturing_date,  perishable_product,  expiration_date,  price ) VALUES (      1,      'Teclado',       to_timestamp(1577836800),       false,       to_timestamp(1655251200),       99.01      );
INSERT INTO "PRODUCT" (  category_id,   name,  manufacturing_date,  perishable_product,  expiration_date,  price  ) VALUES (      2,      'Fogão',       to_timestamp(1577836800),       false,  to_timestamp(1655251200),       599.99      );