import mysql2 from 'mysql2';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mysecret-pw',
  database: 'varuosad',
};

const db = mysql2.createConnection(dbConfig).promise();

export default db;
