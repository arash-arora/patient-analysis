const Pool = require("pg").Pool;
const postgres = require("postgres");
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const url = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

const pool = postgres(url, { ssl: "require" });

module.exports = pool;

// async function getPostgresVersion() {
//   const result = await sql`SELECT COUNT(*) FROM patients;`;
//   console.log(result);
// }

// getPostgresVersion();

// const pool = new Pool({
//   user: "postgres",
//   password: "admin",
//   host: "localhost",
//   port: 5432,
//   database: "illness",
// });

// module.exports = pool;
