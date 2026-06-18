const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('--- Version Status ---');
  console.log(`${(data.name || 'project').padEnd(20)}: ${data.version || 'No version'}`);
  console.log('----------------------');
} catch (e) {
  console.error(`Error reading package.json: ${e.message}`);
  process.exit(1);
}
