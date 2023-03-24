const pool = require("../config/db");

async function statsRepo(name) {
  return await pool`SELECT distinct on (user_id) user_id, 
  trackable_name, country FROM persons WHERE trackable_name=${name} 
  AND country IS NOT NULL`;
}

module.exports = statsRepo;
