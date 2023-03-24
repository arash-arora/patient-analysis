const pool = require("../config/db");

async function allCountriesRepo(name) {
  return await pool`SELECT COUNT(DISTINCT user_id) FROM persons WHERE country = ${name}`;
}

module.exports = allCountriesRepo;
