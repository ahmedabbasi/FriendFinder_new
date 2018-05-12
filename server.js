var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
require('dotenv').config();

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log("You're now listening on port: " + PORT);
  });
});