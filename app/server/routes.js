var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getTopCommodities(req, res) {
  var query = `
    SELECT pe.name as country, c.name as commodity, c.year, c.month, c.ending_stocks 
    FROM Commodity c JOIN Political_Entity pe ON c.pe_id = pe.id
    ORDER BY ending_stocks DESC
    LIMIT 10;
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
    SELECT year,
      SUM(IF(name ='Animal Numbers, Cattle', production, NULL )) AS cattle_supply,
      SUM(IF(name='Animal Numbers, Swine', production, NULL )) AS swine_supply,
      SUM(IF(name='Orange Juice', production, NULL )) AS oj_supply,
      SUM(IF(name='Corn', production, NULL )) AS corn_supply,
      SUM(IF(name='Wheat', production, NULL )) AS wheat_supply
    FROM commodify.Commodity 
    WHERE year < 2021 AND year > 2000
    GROUP BY year
    ORDER BY year;
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
  var sector = req.params.sector;

  var query = `
    SELECT DISTINCT C.name
    FROM Commodity C JOIN Commodity_Group G ON C.name=G.name
    WHERE G.group_name = '${sector}';
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
  var entityType = req.params.entityType

  console.log(entityType)

  var eT = -1
  if (entityType == "State") {
    eT = 0
  }
  if (entityType == "Country") {
    eT = 1
  }

  console.log(entityType)

  var query = `
    SELECT name
    FROM Political_Entity
    WHERE is_country = '${eT}';
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
	getAreaChartData: getAreaChartData,
  getAllCommodityGroups: getAllCommodityGroups,
  getCommodityList: getCommodityList,
  getEntityList: getEntityList,
  getHistData: getHistData,
  getWeatherData: getWeatherData
}
