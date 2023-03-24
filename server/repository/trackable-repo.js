const pool = require("../config/db");

async function trackableRepo(name, limit) {
  return await pool`SELECT distinct on (user_id) 
  user_id, index2, * FROM persons WHERE 
  trackable_name = ${name} LIMIT ${limit}`;
}

module.exports = trackableRepo;
