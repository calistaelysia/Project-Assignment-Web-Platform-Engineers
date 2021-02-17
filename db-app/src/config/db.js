const mysql = require('mysql2/promise');

let dbConnConfig = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'pokemon',
  }
  
  if (process.env.CLEARDB_DATABASE_URL) {
    const dbConnConfigUrl = new URL(process.env.CLEARDB_DATABASE_URL);
  
    dbConnConfig.host = dbConnConfigUrl.host;
    dbConnConfig.user = dbConnConfigUrl.username;
    dbConnConfig.password = dbConnConfigUrl.password;
  
    delete dbConnConfig.port;
  }
  
  const conn = mysql.createPool(dbConnConfig)

module.exports = conn;