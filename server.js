const express = require("express");
const router = express.Router();
const sequelize = require('./config/connection');
const bodyParser = require('body-parser');
const allRoutes = require('./controllers/');
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/`, allRoutes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});