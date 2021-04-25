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

  if (sector == "Electricity") {
    var query = `
      SELECT DISTINCT name
      FROM CommodityNonAg;

    `;
    connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        console.log(rows);
        res.json(rows);
      }
    });
  } else {
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
  }
};

function getEntityList(req, res) {
  var entityType = req.params.entityType

  console.log(entityType)

  var eT = 0
  if (entityType == "Country") {
    eT = 1
  }

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

// The exported functions, which can be accessed in index.js.
module.exports = {
	getTopCommodities: getTopCommodities,
  getAllCommodityGroups: getAllCommodityGroups,
  getCommodityList: getCommodityList,
  getEntityList: getEntityList
}
