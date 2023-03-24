const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const persons = require("../controllers/persons-controllers");
const illness = require("../controllers/illness.controllers");
const trackable = require("../controllers/trackable-controllers");
const country = require("../controllers/country-controllers");
const stats = require("../controllers/stats-controller");
const allCountries = require("../controllers/allcountries-controller");

//Get all todos
router.get("/persons", persons);
router.get("/illness", illness);
router.get("/trackable", trackable);
router.get("/country", country);
router.get("/stats", stats);
router.get("/allcountries", allCountries);

module.exports = router;
