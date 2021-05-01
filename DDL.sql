/*##########################*/
/*#### Create relations ####*/
/*##########################*/

DROP DATABASE IF EXISTS commodify;
CREATE DATABASE commodify;
USE commodify;

/*change to your path*/

CREATE TABLE Political_Entity(
    id int,
    name varchar(30),
    is_country bool,
    abbrev varchar(3),
    geo_id varchar(3),
    PRIMARY KEY(id)
);

CREATE TABLE Commodity_Group(
    name varchar(120),
    group_name varchar(30),
    PRIMARY KEY(name)
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
    production double,
    consumption double,
    PRIMARY KEY(name, year, pe_id),
    FOREIGN KEY(name) REFERENCES Commodity_Group(name),
    FOREIGN KEY(pe_id) REFERENCES Political_Entity(id)
);

CREATE TABLE Weather(
    pe_id int,
    year int,
    month int,
    temp decimal(4,2),
    rainfall numeric(4,2),
    PRIMARY KEY (pe_id, year, month),
    FOREIGN KEY (pe_id) REFERENCES Political_Entity(id)
);

/*##############################################*/
/*#### Load data - remember to change path! ####*/
/*##############################################*/

/*Commodity Group*/
LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/commodity_group.csv"
INTO TABLE Commodity_Group
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

/*Political Entity*/

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/political_entity.csv"
INTO TABLE Political_Entity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	id, name, is_country,
    @vabbrev, @vgeo_id
)
SET 
abbrev = NULLIF(@vabbrev,''),
geo_id = NULLIF(@vgeo_id,'')
;

/*Commodity*/

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
    @vproduction, @vconsumption
)
SET 
beginning_stocks = NULLIF(@vbeginning_stocks,''),
ending_stocks = NULLIF(@vending_stocks,''),
imports = NULLIF(@vimports,''),
exports = NULLIF(@vexports,''),
acreage = NULLIF(@vacreage,''),
yield = NULLIF(@vyield,''),
production = NULLIF(@vproduction,''),
consumption = NULLIF(@vconsumption,'')
;

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/corn_state_data.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
(name, pe_id, year, production, yield, beginning_stocks, ending_stocks);

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/soybean_state_data.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
(name, pe_id, year, production, yield, beginning_stocks, ending_stocks);

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/wheat_state_data.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
(name, pe_id, year, production, yield, beginning_stocks, ending_stocks);

/*CommodityNonAg*/

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/Crude oil_Formatted.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	name, year, month, pe_id, 
	@vproduction, @vconsumption
)
SET 
production = NULLIF(@vproduction,''),
consumption = NULLIF(@vconsumption,'')
;

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/Natural gas_Formatted.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	name, year, month, pe_id, 
	@vproduction, @vconsumption
)
SET 
production = NULLIF(@vproduction,''),
consumption = NULLIF(@vconsumption,'')
;


LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/Coal_Formatted.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	name, year, month, pe_id, 
	@vproduction, @vconsumption
)
SET 
production = NULLIF(@vproduction,''),
consumption = NULLIF(@vconsumption,'')
;

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/Renewable energy_Formatted.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	name, year, month, pe_id, 
	@vproduction, @vconsumption
)
SET 
production = NULLIF(@vproduction,''),
consumption = NULLIF(@vconsumption,'')
;

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/Electricity_AnnualByState_mWh_1990-2019_Formatted.csv"
INTO TABLE Commodity
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	name, year, month, pe_id, 
	@vproduction, @vconsumption
)
SET 
production = NULLIF(@vproduction,''),
consumption = NULLIF(@vconsumption,'')
;

/*Weather*/

LOAD DATA LOCAL INFILE "~/CIS550/commodify/data/weather.csv"
INTO TABLE Weather
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
	pe_id, year, month, temp,
    @vrainfall
)
SET rainfall = NULLIF(@vrainfall,'')
;
