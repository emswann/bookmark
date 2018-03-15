const express = require('express');
const bodyParser = require('body-parser');

const env = require('dotenv').config();
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./controllers/bookmarks_controller')(app);

const db = require("./models");

db.sequelize.sync({}).then(() => 
  app.listen(port, () => 
    console.log("Server listening on: http://localhost:" + port))
);