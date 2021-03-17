
DROP DATABASE IF EXISTS commodify;
CREATE DATABASE commodify;
USE commodify;

CREATE TABLE Political_Entity(
    id int,
    name varchar(30),
    is_country bool,
    abbrev varchar(3),
    PRIMARY KEY(id)
);

CREATE TABLE Commodity (
    name varchar(120),
    year int,
    month int,
    pe_id int,
    beginning_stocks int,
    ending_stocks int,
    imports int,
    exports int,
    acreage int,
    yield decimal(6,2),
    production int,
    domestic_consumption int,
    PRIMARY KEY(name, year, pe_id),
    FOREIGN KEY(pe_id) REFERENCES Political_Entity(id)
);

CREATE TABLE Commodity_Group(
    name varchar(20),
    group_name varchar(30),
    PRIMARY KEY (group_name),
    FOREIGN KEY (name) REFERENCES Commodity(name)
);

CREATE TABLE Weather(
    pe_id int,
    year int,
    month int,
    temp numeric(2,1),
    rainfall numeric(2,1),
    PRIMARY KEY (pe_id, year, month),
    FOREIGN KEY (pe_id) REFERENCES Political_Entity(id)
);

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/political_entity.csv"
INTO TABLE Political_Entity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	id, name, is_country,
    @vabbrev
)
SET abbrev = NULLIF(@vabbrev,'')
;

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/commodity.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	name, year, month, pe_id, 
	@vbeginning_stocks, @vending_stocks,
    @vimports, @vexports, 
    @vacerage, @vyield, 
    @vproduction, @vdomestic_consumption
)
SET 
beginning_stocks = NULLIF(@vbeginning_stocks,''),
ending_stocks = NULLIF(@vending_stocks,''),
imports = NULLIF(@vimports,''),
exports = NULLIF(@vexports,''),
acreage = NULLIF(@vacreage,''),
yield = NULLIF(@vyield,''),
production = NULLIF(@vproduction,''),
domestic_consumption = NULLIF(@vdomestic_consumption,'')
;