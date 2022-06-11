const { Pool } = require('pg')

async function query(sql) {
  // const pool = new Pool({
  //   user: process.env.DB_USER,
  //   host: process.env.DB_HOST,
  //   database: process.env.DB,
  //   password: process.env.DB_PASSWORD,
  //   port: process.env.DB_PORT,
  // })
  const pool = new Pool({connectionString: process.env.DB_CONNECTION_STRING})

  const res = await pool.query(sql)
  await pool.end()

  return res;
}

module.exports = {
  query,
};