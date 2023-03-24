const pool = require("../config/db");

async function illnessRepo(id) {
  return await pool`SELECT * FROM persons WHERE index2 = ${id} ORDER BY trackable_value DESC`;
}

module.exports = illnessRepo;
