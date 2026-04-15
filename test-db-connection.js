const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Connection string:', process.env.DATABASE_URL.replace(/:[^:]*@/, ':***@'));
    
    const client = await pool.connect();
    console.log('✓ Connected successfully!');
    
    const result = await client.query('SELECT NOW()');
    console.log('✓ Query executed:', result.rows[0]);
    
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('✗ Connection failed:', err.message);
    if (err.code) console.error('  Error code:', err.code);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
