const asyncHandler = require("express-async-handler");
const statsRepo = require("../repository/stats-repo");

const stats = asyncHandler(async (req, res) => {
  const name = req.query.name;
  if (!name) {
    res.status(400);
    throw new Error("Name not provided!");
  }
  const persons = await statsRepo(name);
  res.status(200).json(persons);
});

module.exports = stats;
