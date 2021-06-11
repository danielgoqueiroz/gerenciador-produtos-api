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