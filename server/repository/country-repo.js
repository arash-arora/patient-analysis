const pool = require("../config/db");

async function countryRepo(name, limit) {
  return await pool`SELECT distinct on (user_id) user_id, 
  concat('patient-', SUBSTRING(user_id, 25, 2)) as user, * 
  FROM persons WHERE country = ${name} LIMIT ${limit}`;
}

module.exports = countryRepo;
