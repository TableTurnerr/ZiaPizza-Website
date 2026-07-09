const fs = require('fs');

const filePath = process.argv[2] || 'package.json';
const bumpType = process.argv[3] || 'patch';

if (!['patch', 'major'].includes(bumpType)) {
  console.error('Usage: node bump_version.js [filePath] <patch|major>');
  process.exit(1);
}

try {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const version = data.version;
  if (!version) {
    console.error(`Error: No version field found in ${filePath}`);
    process.exit(1);
  }

  // Normalize to X.Y format used in this project.
  let parts = version.split('.').map(Number);
  parts = [parts[0] || 1, parts[1] || 0];

  if (bumpType === 'major') {
    parts[0] += 1;
    parts[1] = 0;
  } else {
    parts[1] += 1;
  }

  const newVersion = parts.join('.');
  data.version = newVersion;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`Updated ${filePath}: ${version} -> ${newVersion}`);
} catch (error) {
  console.error(`Error processing ${filePath}: ${error.message}`);
  process.exit(1);
}
