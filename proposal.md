# Commodify

## CIS 550 Final Project Proposal

To create the PDF for submission, open in Word and then export as ".pdf".

### Team Members

|       Name       |        Email          |   GitHub   |
|:-----------------|:----------------------|:-----------|
|Iris Tiong        |iristyx@seas.upenn.edu |iristyx     |
|Francis Featherby |ffrancis@seas.upenn.edu|ffeatherby  |
|Peter Brice       |pbrice@seas.upenn.edu  |briceybrit  |
|Steven Brooks     |sbr@seas.upenn.edu     |stevegbrooks|

### Description of project

We will build a database containing supply and demand information for various commodities (metals, other minerals, oil and gas, agricultural commodities etc.), containing historical information as well as projections, and we have a feature that allows the user to input their own estimates for various values - for US crude oil production in 2021, for example - to see the implications for supply and demand. 

We plan to use charts and maps to visualize the data.

Our project is an innovation because existing resources deal mostly with individual sectors like energy or agriculture, but not the the whole commodities space, and they are read only. Our project provides a useful resource for trade houses, banks and hedge funds. 

### Datasets

1. [Current and historical agricultural commodities data from the USDA Foreign Agricultural Service](https://apps.fas.usda.gov/psdonline/app/index.html#/app/downloads)

  * Description: a dataset containing commodities and their prices around the world, including trading value at the beginning and end of each month.

  * Size: ~200 MB with ~2 million rows and 12 features.

  * A commodity is identified by "Commodity_Code", and also has location, time, and various attributes attached to its value.
  
  * A quick peek at the first 5 rows of the data shows the following: 
  
	|    |   Commodity_Code | Commodity_Description   | Country_Code   | Country_Name   |   Market_Year |   Calendar_Year |   Month |   Attribute_ID | Attribute_Description   |   Unit_ID | Unit_Description   |   Value |
	|---:|-----------------:|:------------------------|:---------------|:---------------|--------------:|----------------:|--------:|---------------:|:------------------------|----------:|:-------------------|--------:|
	|  0 |           577400 | Almonds, Shelled Basis  | AF             | Afghanistan    |          2010 |            2018 |      10 |             20 | Beginning Stocks        |        21 | (MT)               |       0 |
	|  1 |           577400 | Almonds, Shelled Basis  | AF             | Afghanistan    |          2010 |            2018 |      10 |            125 | Domestic Consumption    |        21 | (MT)               |       0 |
	|  2 |           577400 | Almonds, Shelled Basis  | AF             | Afghanistan    |          2010 |            2018 |      10 |            176 | Ending Stocks           |        21 | (MT)               |       0 |
	|  3 |           577400 | Almonds, Shelled Basis  | AF             | Afghanistan    |          2010 |            2018 |      10 |             88 | Exports                 |        21 | (MT)               |       0 |
	|  4 |           577400 | Almonds, Shelled Basis  | AF             | Afghanistan    |          2010 |            2018 |      10 |             57 | Imports                 |        21 | (MT)               |       0 |

  * Number of unique values for each column:
  
	|                       |     0 |
	|:----------------------|------:|
	| Commodity_Code        |    63 |
	| Commodity_Description |    63 |
	| Country_Code          |   212 |
	| Country_Name          |   213 |
	| Market_Year           |    62 |
	| Calendar_Year         |    62 |
	| Month                 |    13 |
	| Attribute_ID          |    71 |
	| Attribute_Description |    71 |
	| Unit_ID               |    11 |
	| Unit_Description      |    11 |
	| Value                 | 44725 |
	
  * Summary statistics for numeric columns:

	| Market_Year |Calendar_Year |   Unit_ID     |    Value        |
	|:------------|:-------------|:--------------|:----------------|
	|Min.   :1960 |Min.   :1959  |Min.   : 2.000 |Min.   :   -9510 |
	|1st Qu.:1979 |1st Qu.:2006  |1st Qu.: 8.000 |1st Qu.:       0 |
	|Median :1992 |Median :2006  |Median : 8.000 |Median :      15 |
	|Mean   :1992 |Mean   :2006  |Mean   : 9.833 |Mean   :   11937 |
	|3rd Qu.:2007 |3rd Qu.:2014  |3rd Qu.: 8.000 |3rd Qu.:     212 |
	|Max.   :2021 |Max.   :2021  |Max.   :29.000 |Max.   :42528700 |



2. TODO: find a global oil production dataset

### Data Queries

1. Top almond producers around the world in countries that consume the highest amount of oil.

2. Ending stock prices for March 2020 of the top commodities produced by metric ton of that month.

3. 

4.

5. 
