const asyncHandler = require("express-async-handler");
const countryRepo = require("../repository/country-repo");

const country = asyncHandler(async (req, res) => {
  const name = req.query.name;
  const limit = req.query.limit;
  if (!name || !limit) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const persons = await countryRepo(name, limit);
  res.status(200).json(persons);
});

module.exports = country;
