CREATE TABLE IF NOT EXISTS "categories" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"icon" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "merchants" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"name" VARCHAR(255) NOT NULL,
	"img" TEXT,
	"is_business" BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "cards" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"number" VARCHAR(255) NOT NULL,
	"title" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "autopay_types" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"icon" TEXT
);

CREATE TABLE IF NOT EXISTS "autopay" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"title" TEXT NOT NULL,
	"amount" DECIMAL NOT NULL,
	"merchant" UUID NOT NULL,
	"card" UUID NOT NULL,
	"type" INTEGER NOT NULL,
	"start" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"end" TIMESTAMP NOT NULL,
	"active" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("card") REFERENCES "cards"("id"),
	FOREIGN KEY("merchant") REFERENCES "merchants"("id"),
	FOREIGN KEY("type") REFERENCES "autopay_types"("id")
);

CREATE TABLE IF NOT EXISTS "necessity" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"icon" TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS "transaction_type" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"icon" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "transactions" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"title" VARCHAR(255) NOT NULL,
	"desc" TEXT,
	"amount" DECIMAL NOT NULL,
	"category" INTEGER NOT NULL,
	"merchant" UUID NOT NULL,
	"necessity" INTEGER NOT NULL,
	"card" UUID NOT NULL,
	"type" INTEGER NOT NULL,
	"autopay" UUID,
	"datetime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("category") REFERENCES "categories"("id"),
	FOREIGN KEY("merchant") REFERENCES "merchants"("id"),
	FOREIGN KEY("necessity") REFERENCES "necessity"("id"),
	FOREIGN KEY("card") REFERENCES "cards"("id"),
	FOREIGN KEY("type") REFERENCES "transaction_types"("id"),
	FOREIGN KEY("autopay") REFERENCES "autopay"("id")
);

CREATE TABLE IF NOT EXISTS "account" (
	"id" SERIAL PRIMARY KEY,
  	"title" VARCHAR(255) NOT NULL,
	"data" JSONB NOT NULL,
  	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE IF NOT EXISTS "account" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"amount" JSONB NOT NULL,
-- 	"charts" JSONB NOT NULL,
-- 	"cards" UUID NOT NULL,
-- 	"autopays" UUID NOT NULL,
-- 	FOREIGN KEY("cards") REFERENCES "cards"("id"),
-- 	FOREIGN KEY("autopays") REFERENCES "autopay"("id")
-- );
