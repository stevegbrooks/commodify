const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Test) ---- */
// The route localhost:5000/topcoms is registered to the function
// routes.getTopCommodities, specified in routes.js.
app.get('/topcoms', routes.getTopCommodities);

/* ---- Server ---- */
app.listen(5000, () => {
	console.log(`Server listening on PORT 5000`);
});