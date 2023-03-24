const personsRepo = require("../repository/persons-repo");
const asyncHandler = require("express-async-handler");

const persons = asyncHandler(async (req, res) => {
  const searchTerm = req.query.search;
  const persons = await personsRepo(searchTerm);
  res.status(200).json(persons);
});

module.exports = persons;
