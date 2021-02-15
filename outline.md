# Commodify

## CIS 550 Final Project Outline

### Motivation

We plan to build a database of commodity supply and demand statitistics. This will be augmented with features that allow the user to see the interaction between those variables and weather and climate, which are crucial determinants of commodity supply and demand. We will include functionality such as charts and maps to visualise the data.

Some online databases of supply and demand data already exist, such as the United States Department of Agriculture's "Production, Supply and Demand Online" tool, and the International Energy Agency's "Data Browser", available at the below links:

https://apps.fas.usda.gov/psdonline/app/index.html#/app/advQuery

https://www.iea.org/data-and-statistics?country=WORLD&fuel=Energy%20supply&indicator=TPESbySource

We plan to replicate some of the functionality of these sites. The user will be able to query historic and current data on commodity supply and demand to find, for example, production or consumption in a given region during a given period. However, our product will have several important features not available at any public website but potentially of considerable use to commodity analysts at banks, hedge funds and the like:

1. Data from multiple commodity sectors, i.e. not just agriculture or energy. This will facilitate cross-commodity analysis, for example comparison of differing rates of growth in consumption
2. Graphics such as charts and maps.
3. Most importantly, it will also incorporate weather data, which as stated above is a vital driver of commodity supply and demand. Thus our product will facilitate data science concerning the impact of climate and weather on commodity markets.

### Features that will be implemented

We will have at least one page that allows the user to perform queries on historical and current commodity supply and demand statistics, as well as climate and weather data pertinent to those commodities. There will also be a 'dashboard' page showing the most recent observations for various important commodity supply and demand and weather variables.

Initially we plan to include agricultural commodities, using various data from the US Department of Agriculture, and petroleum, using data from the US Department of Energy's Energy Information Agency. We Will include data for The United States as a whole and for individual states and regions of the United States.

The product will have graphics such as charts, for example the ability to chart production of a given commodity in different states.

### Features that might be implemented

If possible, we will extent the database to more commodities, such as natural gas and metals, and also international data.

More graphics such as maps.

Incorporation of prices into the database, allowing the user not only to explore the relationship between commodity supply and demand and climate, but also with market prices.

### High-level application design

### Entity-relationship diagram

### SQL DDL for creating database

### Data cleaning plan

### Dependencies of application

1. MySQL
2. React

### Team member responsibilities

|       Name       | Main Responsibilities |
|:-----------------|:----------------------|
|Iris Tiong        |                       |
|Francis Featherby |                       |
|Peter Brice       |                       |
|Steven Brooks     |                       |

