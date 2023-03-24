const asyncHandler = require("express-async-handler");
const illnessRepo = require("../repository/illness-repo");

const illness = asyncHandler(async (req, res) => {
  const id = req.query.user_id;
  if (!id) {
    res.status(400);
    throw new Error("user_id not provided!");
  }
  const persons = await illnessRepo(id);
  res.status(200).json(persons);
});

module.exports = illness;
