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

## Technical challenges

Different commodities have different characteristics, and furthermore the data available concerning supply and demand of commodities vary from place to place in terms of the attributes available, their frequency and so on. Our database and website had to handle this diversity.
