const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');

const baseRouts = require('./routs/basePackageRouts.js');

app.use('/', baseRouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(8080)