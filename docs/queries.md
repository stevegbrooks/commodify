# Commodify

## Database Population and Queries

### Guest User

Follow these steps for connecting to "commodify-db" on AWS with READ ONLY access:

Username: guest
Password: wheat

Port: 3306
Endpoint: commodify-db.cn5sga8k6aq8.us-east-1.rds.amazonaws.com

Run `mysql --host=commodify-db.cn5sga8k6aq8.us-east-1.rds.amazonaws.com --port=3306 --user=guest -p`.

Input password at prompt.

### Queries

#### Query 1

##### Analysts and traders dealing with commodity statistics will most commonly use a resource such as this to obtain a schedule of the major supply and demand attributes for a given commodity, for a given country or region, over a given period. For example the below query requests beginning stocks, yield, production, imports, domestic consumption, exports, and ending stocks, for corn, in the United States, year by year from from 2011 to the most recent year.

`SELECT c.year, c.beginning_stocks, c.yield, c.production, c.imports, c.domestic_consumption, c.exports, c.ending_stocks
FROM Commodity c JOIN Political_Entity p ON c.pe_id = p.id
WHERE c.name = 'Corn' AND p.name = 'United States' AND c.year > 2010;`

#### Query 2

##### Users may want to obtain information on the largest producers of commodities. For instance, the query belows requests for the 10 biggest producers of soybeans in 2020, counting states as well as countries.

`SELECT p.name, c.production
FROM Political_Entity p JOIN Commodity c on p.id = c.pe_id
WHERE c.name = 'Oilseed, Soybean' AND c. year = 2020
ORDER BY c.production DESC
LIMIT 10;`

This one finds all the states with wheat yields smaller than Canada's last year:

`SELECT p.name
FROM Political_Entity p JOIN Commodity c on p.id = c.pe_id
WHERE c.name = 'Wheat' AND c. year = 2019 AND p.is_country = 0 AND c.yield < (
	SELECT c2.yield
	FROM Political_Entity p2 JOIN Commodity c2 on p2.id = c2.pe_id
	WHERE p2.name = 'Canada' AND c2.year = 2020 AND c2.name = 'Wheat');`

#### Query 3

##### In view of the threat of climate change, analysts and traders may wish to identify extreme weather-resistant commodities for which the yield/production levels increase with the occurrence of harsh weather. The query below requests for a list of commodities that 'thrive' in harsh weather conditions - experienced increase in yield OR production in years of extreme weather (i.e. temperature or rainfall greater than 95% of all data or smaller than 5% of all data)

`SELECT ...`

#### Query 4

##### Weather conditions may be useful in the prediction of production and consumption levels of commodities. For instance, the query below requests for the average temperature and rainfall at locations with the top 5 highest domestic production of almonds in any year. 

`SELECT ...`

#### Query 5

##### Somewhat the reverse of query 2, users may wish to identify the largest consumers of certain commodities at specific period of time. The query below returns a list of countries that were in the top 50 of total crude oil consumed and renewables produced from 2000-2010.

`SELECT ...`

#### Query 6

##### What states are in the top 10 largest one year growth's in beginning_stocks?

`SELECT ...`

#### Query 7

##### For each state, in their largest %growth year in electricity consumed, what was the commodity that had the largest yield growth % from the previous year

`SELECT ...`

#### Query 8

##### What commodity had the highest yield in the top 5 and bottom 5 of electricity producing states for 2015. Only include commodities which have the same units of measurements for yield.

`SELECT ...`

#### Query 9

##### What were the countries and their average renewables production which consumed the least amount fossil fuels from 1995-2005?

`SELECT ...`

#### Query 10 

##### For the 10 countries with the largest yield of "oil" agriculture (has oil in the name and is an agricultural commodity), what was their average electricity production and consumption in 2015?

`SELECT ...`




