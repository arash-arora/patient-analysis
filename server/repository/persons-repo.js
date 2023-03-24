const pool = require("../config/db");

async function personsRepo(search = "patient") {
  return await pool`SELECT index2 FROM patients WHERE index2 LIKE ${
    "%" + search + "%"
  } LIMIT 20`;
}

module.exports = personsRepo;
