CREATE SEQUENCE "administrators_id_sequence" START 102;
CREATE SEQUENCE "users_id_sequence" START 201;
CREATE SEQUENCE "customers_id_sequence" START 301;
CREATE SEQUENCE "addresses_id_sequence" START 401;
CREATE SEQUENCE "categories_id_sequence" START 501;
CREATE SEQUENCE "categories_ads_id_sequence" START 601;
CREATE SEQUENCE "categories_ads_actions_id_sequence" START 701;
CREATE SEQUENCE "categories_ads_files_id_sequence" START 801;
CREATE SEQUENCE "categories_ads_phones_id_sequence" START 901;
CREATE SEQUENCE "categories_ads_addresses_id_sequence" START 1001;
CREATE SEQUENCE "contacts_id_sequence" START 1101;
CREATE SEQUENCE "icons_id_sequence" START 1201;

CREATE TABLE "administrators" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('administrators_id_sequence'),
  "is_master" BOOLEAN NOT NULL,
  "name" VARCHAR(1024) NOT NULL,
  "phone" VARCHAR(1024) NOT NULL,
  "email" VARCHAR(1024) NOT NULL,
  "password" VARCHAR(1024) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id")
);

CREATE TABLE "customers" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('customers_id_sequence'),
  "name" VARCHAR(1024) NULL DEFAULT NULL,
  "phone" VARCHAR(1024) NULL DEFAULT NULL,
  "email" VARCHAR(1024) NOT NULL,
  "password" VARCHAR(1024) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id")
);

CREATE TABLE "users" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('users_id_sequence'),
  "name" VARCHAR(1024) NOT NULL,
  "phone" VARCHAR(1024) NOT NULL,
  "address_zip_code" VARCHAR(1024) NULL DEFAULT NULL,
  "address_city" VARCHAR(1024) NULL DEFAULT NULL,
  "address_state" VARCHAR(1024) NULL DEFAULT NULL,
  "address_country" VARCHAR(1024) NULL DEFAULT NULL,
  "address_coordinates" GEOMETRY NULL DEFAULT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at"  TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id")
);

CREATE TABLE "addresses" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('addresses_id_sequence'),
  "zip_code" VARCHAR(1024) NOT NULL,
  "city" VARCHAR(1024) NOT NULL,
  "state" VARCHAR(1024) NOT NULL,
  "country" VARCHAR(1024) NOT NULL,
  "coordinates" GEOMETRY NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id")
);

CREATE TABLE "icons" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('icons_id_sequence'),
  "name" VARCHAR(1024) NOT NULL,
  "file_type" VARCHAR(1024) NOT NULL,
  "relative_path" VARCHAR(1024) NOT NULL,
  "size_in_bytes" INTEGER NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id")
);

CREATE TABLE "categories" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('categories_id_sequence'),
  "name" VARCHAR(1024) NOT NULL,
  "category_id" INTEGER NULL DEFAULT NULL,
  "icon_id" INTEGER NOT NULL,
  "address_id" INTEGER NULL DEFAULT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_categories_category" FOREIGN KEY("category_id")
  REFERENCES "categories"("id"),
  CONSTRAINT "fk_categories_icon" FOREIGN KEY("icon_id")
  REFERENCES "icons"("id"),
  CONSTRAINT "fk_categories_address" FOREIGN KEY("address_id")
  REFERENCES "addresses"("id")
);

CREATE TABLE "categories_ads" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('categories_ads_id_sequence'),
  "category_id" INTEGER NOT NULL,
  "customer_id" INTEGER NOT NULL,
  "name" VARCHAR(1024) NOT NULL,
  "description" VARCHAR(1024) NULL DEFAULT NULL,
  "facebook" VARCHAR(1024) NULL DEFAULT NULL,
  "instagram" VARCHAR(1024) NULL DEFAULT NULL,
  "website" VARCHAR(1024) NULL DEFAULT NULL,
  "email" VARCHAR(1024) NULL DEFAULT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_categories_ads_category" FOREIGN KEY("category_id")
  REFERENCES "categories"("id"),
  CONSTRAINT "fk_categories_ads_customer" FOREIGN KEY("customer_id")
  REFERENCES "customers"("id")
);

CREATE TABLE "categories_ads_actions" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('categories_ads_actions_id_sequence'),
  "category_ad_id" INTEGER NOT NULL,
  "user_id" INTEGER NULL DEFAULT NULL,
  "uuid" VARCHAR(1024) NOT NULL,
  "type" VARCHAR(1024) NOT NULL,
  "description" VARCHAR(1024) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_categories_ads_actions_category_ads" FOREIGN KEY("category_ad_id")
  REFERENCES "categories_ads"("id"),
  CONSTRAINT "fk_categories_ads_actions_user" FOREIGN KEY("user_id")
  REFERENCES "users"("id")
);

CREATE TABLE "categories_ads_files" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('categories_ads_files_id_sequence'),
  "category_ad_id" INTEGER NOT NULL,
  "file_type" VARCHAR(1024) NOT NULL,
  "type" VARCHAR(1024) NULL DEFAULT NULL,
  "relative_path" VARCHAR(1024) NOT NULL,
  "size_in_bytes" INTEGER NOT NULL,
  "width" INTEGER NULL DEFAULT NULL,
  "height" INTEGER NULL DEFAULT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_categories_ads_files_category_ads" FOREIGN KEY("category_ad_id")
  REFERENCES "categories_ads"("id")
);

CREATE TABLE "categories_ads_phones" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('categories_ads_phones_id_sequence'),
  "category_ad_id" INTEGER NOT NULL,
  "is_whatsapp" BOOLEAN NOT NULL,
  "phone" VARCHAR(1024) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_categories_ads_phones_category_ad" FOREIGN KEY("category_ad_id")
  REFERENCES "categories_ads"("id")
);

CREATE TABLE "categories_ads_addresses" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('categories_ads_addresses_id_sequence'),
  "category_ad_id" INTEGER NOT NULL,
  "zip_code" VARCHAR(1024) NOT NULL,
  "city" VARCHAR(1024) NOT NULL,
  "state" VARCHAR(1024) NOT NULL,
  "country" VARCHAR(1024) NOT NULL,
  "coordinates" GEOMETRY NOT NULL,
  "street" VARCHAR(1024) NOT NULL,
  "complement" VARCHAR(1024) NULL DEFAULT NULL,
  "neighborhood" VARCHAR(1024) NULL DEFAULT NULL,
  "number" VARCHAR(1024) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_categories_ads_addresses_category_ad" FOREIGN KEY("category_ad_id")
  REFERENCES "categories_ads"("id")
);

CREATE TABLE "contacts" (
  "id" INTEGER NOT NULL DEFAULT NEXTVAL('contacts_id_sequence'),
  "name" VARCHAR(1024) NOT NULL,
  "phone" VARCHAR(1024) NOT NULL,
  "description" VARCHAR(1024) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
  PRIMARY KEY("id")
);

INSERT INTO "administrators"
VALUES (
  101, 
  true, 
  'Admin',	
  '51999999999', 
  'admin@admin.com', 
  '$2b$10$iSJin3py3fek3xe84Ywg0eNGPs4hwEQDfM6vRKf3J4gRVwMAGBnyG',	
  NOW(), 
  NULL, 
  NULL
);
