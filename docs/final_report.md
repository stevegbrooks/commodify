# Commodify

## Introduction

Commodify is an app to visualize and interact with commodity market and weather data.

### The problem

Existing resources deal mostly with individual sectors like energy or agriculture, but not the the whole commodities space, and they are read only. In order to get an overview of the entire market, one needs to manually integrate data from many different resources, which is time intensive and technically difficult for most traders.

### The solution

Commodify provides a "one-stop-shop" for commodities and weather data, which can be a useful resource for trade houses, banks and hedge funds.

Commodify allows for seeing not only trends in the commodities markets, but also the interaction between weather and climate and prices, which are crucial determinants of commodity supply and demand. The app is divided into two pages, a "Dashboard" and a "Search" page.

The dashboard page gives the user a global overview of the commodities market, and also allows them to drill down into more specific markets and sectors.

The search page allows the user to select a commodity sector, for example 'grains', or 'petroleum'. After selecting one of these options the user will be presented with the option to search for country or state level data, and will then be shown drop-down menus for the data available. 

For example, these might be one drop-down menu for states, one for commodity attributes (e.g. acreage or yield), and one for the period to be selected. The will also be the option to add weather data to the search, so for example the user might request to see annual average temperatures for the selected states. Once the 'Search' button is pressed, the user will see the requested data in tabular form.

### Team Members

|       Name       |        Email          |   GitHub   |
|:-----------------|:----------------------|:-----------|
|Iris Tiong        |iristyx@seas.upenn.edu |iristyx     |
|Francis Featherby |ffrancis@seas.upenn.edu|ffeatherby  |
|Peter Brice       |pbrice@seas.upenn.edu  |briceybrit  |
|Steven Brooks     |sbr@seas.upenn.edu     |stevegbrooks|

## Architecture

## Data

## Database

## Queries

Building the search function involved devising numerous complex searches to ensure that at each stage of the selection process the user sees only options which will result in non-null results. For example, the following query ensures that once the user has selected a commodity sector and whether they want state or country-level data, they will only be able to choose from commodities for which the database holds data for some of the relevants attributes in 2019 (the last year with full data available):

  SELECT DISTINCT C.name
  FROM Commodity C JOIN Political_Entity P ON C.pe_id=P.id JOIN Commodity_Group G ON C.name = G.name
  WHERE P.is_country='${eT}' AND C.year=2019 AND G.group_name='${sector}' AND ((C.production != 0 OR C.production != null)
    OR (C.consumption != 0 OR C.consumption != null) OR (C.ending_stocks != 0 OR C.ending_stocks != null))
  ORDER BY C.name ASC;
    
 Likewise, the below query returns a list of only those states or countries for which there is data for 2019 for one of the relevent attributes for the commodity previously selected:
 
  SELECT name
  FROM Political_Entity
  WHERE is_country = '${eT}' and name IN (
    SELECT DISTINCT P.name
    FROM Commodity C JOIN Political_Entity P ON C.pe_id=P.id
    WHERE C.name = '${commodity}' AND ((C.production != 0 OR C.production != null)
      OR (C.consumption != 0 OR C.consumption != null) OR (C.ending_stocks != 0 OR C.ending_stocks != null)));
 
 
 Once a commodity and state or country have been selected, the below query returns the relevant production, consumption and ending stock data for recent years:
 
  SELECT C.year, C.production, C.consumption, C.ending_stocks
  FROM Commodity C JOIN Political_Entity P on C.pe_id = P.id
  WHERE C.name = '${commodity}' and P.name = '${entity}' AND C.year > 2012;
  
Finally, if the user selected a state, the below query returns climate data for that state, specifically average tempereature and rainfall for each month, based on data for the last fifty years:

  SELECT month, AVG(temp) AS temp, AVG(rainfall) AS rainfall
  FROM Weather W JOIN Political_Entity P ON W.pe_id=P.id
  WHERE P.name = '${state}' and W.Year > 1970
  GROUP BY month
  ORDER BY month ASC;

## Performance evaluation

### Area Chart Original Query

```
SELECT C.year,
  SUM(IF(C.name ='Oilseed, Soybean', production, NULL )) AS soy_prod,
  SUM(IF(C.name='Corn', production, NULL )) AS corn_prod,
  SUM(IF(C.name='Wheat', production, NULL )) AS wheat_prod,
  ROUND(SUM(IF(C.name='Electricity', production, NULL ))/100000) AS elec_prod,
  ROUND(SUM(W.rainfall)) AS rainfall
FROM commodify.Commodity C 
  JOIN commodify.Political_Entity PE ON C.pe_id = PE.id
  JOIN commodify.Weather W ON PE.id = W.pe_id
WHERE C.year < 2020 AND C.year >= 1990 AND PE.is_country = 0 
GROUP BY C.year;
```

#### Benchmarking

We used the following to assess the performance of the original query:

```
set profiling=1;
FLUSH STATUS;
SELECT sql_no_cache ORIGINAL_QUERY;
SHOW profile;
```

Which showed us the following (average of 10 runs):

| Status	         | Duration |
|:-------------------|:--------:|
|Opening tables|	0.000616|
|init|	0.000008|
|System lock|	0.00001|
|optimizing|	0.000019|
|statistics|	0.000061|
|preparing|	0.000031|
|Creating tmp table|	0.000042|
|executing|	4.651374|
|end|	0.000013|
|query end|	0.000005|

Clearly, the most expensive thing is the actual execution. 

To look at number of page I/Os, we used:

```
FLUSH STATUS;
SELECT sql_no_cache ORIGINAL_QUERY;
SHOW STATUS LIKE 'last_query_cost';
```

Which showed us that there are around 200,000 page reads for this query.


#### Optimization

- Instead of using `Commodity.year` for the selection and grouping, we used `Weather.year`.
    
    - Commodity is a much bigger table: about 175,000 rows vs. 50,000 rows.
    
    - This reduced the page reads by half, but did not affect the query speed.

- We then investigated further and found that we only have Commodity data *by year* in the US, but we have Weather data *by month*. So when the JOIN happens, it basically does a cartesian product of the cardinality of `Commodity` times the cardinality of `Weather`. The solution then became obvious - use a subquery for Weather that groups it by year before the the JOIN:

        ```
        SELECT W.year,
            SUM(IF(C.name ='Oilseed, Soybean', C.production, NULL )) AS soy_prod,
            SUM(IF(C.name='Corn', C.production, NULL )) AS corn_prod,
            SUM(IF(C.name='Wheat', C.production, NULL )) AS wheat_prod,
            ROUND(SUM(IF(C.name='Electricity', C.production, NULL ))/100000) AS elec_prod,
            W.rainfall AS rainfall
        FROM (SELECT * FROM (
                SELECT year, ROUND(SUM(rainfall)) AS rainfall
                FROM commodify.Weather
                GROUP BY year
                ) AS wby
            ) AS W
            JOIN commodify.Commodity C ON W.year = C.year
            JOIN commodify.Political_Entity PE ON PE.id = C.pe_id
        WHERE PE.is_country = 0
        GROUP BY C.year;
        ```
    
    - The page reads fell to just over 5,000, and the query time fell to around half a second - a 10x improvement.

Below is the profile table after making the optimization (average of 10 runs):

| Status	         | Duration |
|:-------------------|:--------:|
|Opening tables|	0.000091|
|init|	0.000007|
|System lock|	0.000009|
|optimizing|	0.000004|
|statistics|	0.000017|
|preparing|	0.000010|
|Creating tmp table|	0.000029|
|executing|	0.055620|
|end|	0.000012|
|query end|	0.000005|

## Technical challenges

Different commodities have different characteristics, and furthermore the data available concerning supply and demand of commodities vary from place to place in terms of the attributes available, their frequency and so on. Our database and website had to handle this diversity.
