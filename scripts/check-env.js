// scripts/check-env.js
// Checks that every required variable is set in .env before tests run.
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const required = ['BASE_URL', 'STAGING_URL', 'PROD_URL', 'TEST_USERNAME', 'TEST_PASSWORD'];

if (!fs.existsSync(envPath)) {
  console.error('Missing .env file. Copy .env.example to .env and fill in the values.');
  process.exit(1);
}

const values = {};
for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [key, ...rest] = trimmed.split('=');
  values[key.trim()] = rest.join('=').trim();
}

const missing = required.filter((key) => !values[key]);
if (missing.length > 0) {
  console.error(`Missing values in .env: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('All required .env values are set.');