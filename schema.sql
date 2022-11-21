CREATE DATABASE ng_cash;

DROP TABLE IF EXISTS Accounts;

DROP TABLE IF EXISTS Users;

DROP TABLE IF EXISTS Transactions;

CREATE TABLE IF NOT EXISTS Accounts (
	id serial primary key,
  	balance decimal not null 
);

CREATE TABLE IF NOT EXISTS Users (
	id serial primary key,
  	username text unique not null,
  	password text not null,
  	accountId integer references Accounts(id) not null
);

CREATE TABLE IF NOT EXISTS Transactions (
	id serial primary key,
  	debitedAccountId integer references Accounts(id) not null,
  	creditedAccountId integer references Accounts(id) not null,
  	value decimal not null,
  	createdAt text not null
);