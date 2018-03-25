const express      = require('express');
const bodyParser   = require('body-parser');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const passport     = require('passport');

const app = express();

const env = require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('view engine', 'ejs');

const db = require("./models");
require('./config/passport')(passport, db);
require('./controllers/bookmarks_controller')(app);
require('./controllers/login_controller')(app, passport);

db.sequelize.sync({}).then(() => 
  app.listen(port, () => 
    console.log("Server listening on: http://localhost:" + port))
);

// Exports application for testing
module.exports = app;