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
// The exported functions, which can be accessed in index.js.
module.exports = {
	getTopCommodities: getTopCommodities
}
