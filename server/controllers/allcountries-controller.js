const allCountriesRepo = require("../repository/allcountries-repo");
const asyncHandler = require("express-async-handler");

const allCountries = asyncHandler(async (req, res) => {
  const name = req.query.name;
  if (!name) {
    res.status(400);
    throw new Error("No query provided!");
  }
  const persons = await allCountriesRepo(name);
  res.status(200).json(persons);
});

module.exports = allCountries;
