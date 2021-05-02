
# Query Optimization

## Dashboard

### Area Chart Query

#### Original Query

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

