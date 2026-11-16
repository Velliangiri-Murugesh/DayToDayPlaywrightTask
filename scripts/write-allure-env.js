// scripts/write-allure-env.js
// Writes allure-results/environment.properties for the Environment panel.
// Never add credentials here.
require('dotenv/config');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'allure-results');
fs.mkdirSync(dir, { recursive: true });

const props = {
  'Base URL': process.env.BASE_URL ?? 'not set',
  'Staging URL': process.env.STAGING_URL ?? 'not set',
  'Production URL': process.env.PROD_URL ?? 'not set',
  'Node version': process.version,
  'OS': process.platform,
  'CI': process.env.CI ? 'yes' : 'no',
};

const lines = Object.entries(props).map(([key, value]) => `${key}=${value}`);
fs.writeFileSync(path.join(dir, 'environment.properties'), lines.join('\n') + '\n');
console.log('Wrote allure-results/environment.properties');