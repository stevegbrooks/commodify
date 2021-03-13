
DROP DATABASE IF EXISTS commodify;
CREATE DATABASE commodify;
USE commodify;

CREATE TABLE Political_Entity(
    name varchar(30),
    is_country bool,
    PRIMARY KEY(name)
);

CREATE TABLE Commodity (
    name varchar(20),
    year int,
    month int,
    political_entity varchar(14),
    beginning_stocks int,
    ending_stocks int,
    imports int,
    exports int,
    acreage int,
    yield decimal(3,1),
    production int,
    domestic_consumption int,
    PRIMARY KEY(name, year, political_entity),
    FOREIGN KEY(political_entity) REFERENCES Political_Entity(name)
);

CREATE TABLE Commodity_Group(
    name varchar(20),
    group_name varchar(30),
    PRIMARY KEY (group_name),
    FOREIGN KEY (name) REFERENCES Commodity(name)
);

CREATE TABLE Weather(
    political_entity varchar(30),
    year int,
    month int,
    temp numeric(2,1),
    rainfall numeric(2,1),
    PRIMARY KEY (political_entity, year, month),
    FOREIGN KEY (political_entity) REFERENCES Political_Entity(name)
);

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/noaa_usa_monthlymean_1929-2021.csv"
INTO TABLE Weather
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
