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

SELECT c.year, c.beginning_stocks, c.yield, c.production, c.imports, c.domestic_consumption, c.exports, c.ending_stocks
FROM Commodity c JOIN Political_Entity p ON c.pe_id = p.id
WHERE c.name = 'Corn' AND p.name = 'United States' AND c.year > 2010;

#### Query 2

##### Description

#### Query 3

##### Description

#### Query 4

##### Description

#### Query 5

##### Description




