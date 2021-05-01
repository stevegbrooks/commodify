var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getMapChartData(req, res) {
  var query = `
    SELECT PE.geo_id,
      ROUND(SUM(IF(C.name='Electricity', production, NULL ))/100000) AS elec_prod
    FROM commodify.Commodity C 
      JOIN commodify.Political_Entity PE ON C.pe_id = PE.id
    WHERE PE.is_country = 0 
    GROUP BY PE.geo_id
    ORDER BY PE.geo_id;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getAreaChartData(req, res) {
  var query = `
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
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getAllCommodityGroups(req, res) {
  var query = `
    SELECT DISTINCT group_name
    FROM Commodity_Group;
    `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getCommodityList(req, res) {
  var entAndSector = req.params.entAndSector;

  console.log(entAndSector)
  var n = entAndSector.search(";")
  var entityType = entAndSector.substring(0,n)
  var sector = entAndSector.substring(n+1,entAndSector.length)
  console.log(entityType)
  console.log(sector)

  var eT = -1
  if (entityType == "State") {
    eT = 0
  }
  if (entityType == "Country") {
    eT = 1
  }

  var query = `
    SELECT DISTINCT C.name
    FROM Commodity C JOIN Political_Entity P ON C.pe_id=P.id JOIN Commodity_Group G ON C.name = G.name
    WHERE P.is_country='${eT}' AND C.year=2019 AND G.group_name='${sector}' AND ((C.production != 0 OR C.production != null)
        OR (C.consumption != 0 OR C.consumption != null) OR (C.ending_stocks != 0 OR C.ending_stocks != null))
    ORDER BY C.name ASC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getEntityList(req, res) {
  var entAndCom = req.params.entAndCom

  console.log(entAndCom)
  var n = entAndCom.search(";")
  var entityType = entAndCom.substring(0,n)
  var commodity = entAndCom.substring(n+ 1,entAndCom.length)
  console.log(entityType)
  console.log(commodity)

  var eT = -1
  if (entityType == "State") {
    eT = 0
  }
  if (entityType == "Country") {
    eT = 1
  }

  var query = `
  SELECT name
  FROM Political_Entity
  WHERE is_country = '${eT}' and name IN (
    SELECT DISTINCT P.name
      FROM Commodity C JOIN Political_Entity P ON C.pe_id=P.id
      WHERE C.name = '${commodity}' AND ((C.production != 0 OR C.production != null)
      OR (C.consumption != 0 OR C.consumption != null) OR (C.ending_stocks != 0 OR C.ending_stocks != null)));
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getHistData(req, res) {
  var searchTerms = req.params.searchTerms
  console.log(searchTerms)
  var n = searchTerms.search(";")
  var commodity = searchTerms.substring(0,n)
  var entity = searchTerms.substring(n+ 1,searchTerms.length)
  console.log(commodity)
  console.log(entity)

  var query = `
  SELECT C.year, C.production, C.consumption, C.ending_stocks
  FROM Commodity C JOIN Political_Entity P on C.pe_id = P.id
  WHERE C.name = '${commodity}' and P.name = '${entity}' AND C.year > 2012;
    `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getWeatherData(req, res) {
  var state = req.params.state
  console.log(state)

  var query = `
  SELECT month, AVG(temp) AS temp, AVG(rainfall) AS rainfall
FROM Weather W JOIN Political_Entity P ON W.pe_id=P.id
WHERE P.name = '${state}' and W.Year > 1970
GROUP BY month
ORDER BY month ASC;
    `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  getMapChartData: getMapChartData,
	getAreaChartData: getAreaChartData,
  getAllCommodityGroups: getAllCommodityGroups,
  getCommodityList: getCommodityList,
  getEntityList: getEntityList,
  getHistData: getHistData,
  getWeatherData: getWeatherData
}
