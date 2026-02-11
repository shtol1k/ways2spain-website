const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/migrations/index.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to find variable names starting with "migration_" followed by date/time
// capable of matching hyphens.
// We want to replace hyphens ONLY in the variable name.

// Function to replace hyphens with underscores in a string
const sanitize = (str) => str.replace(/-/g, '_');

// 1. Fix imports: import * as VARIABLE from 'PATH';
// Regex captures: (import * as )(VARIABLE)( from )
content = content.replace(/(import \* as )(migration_\d{8}_\d{6}_[\w-]+)( from )/g, (match, p1, p2, p3) => {
  return p1 + sanitize(p2) + p3;
});

// 2. Fix array usages: up: VARIABLE.up, down: VARIABLE.down
// Regex captures: (up: )(VARIABLE)(\.up)|(down: )(VARIABLE)(\.down)
content = content.replace(/(up: )(migration_\d{8}_\d{6}_[\w-]+)(\.up)/g, (match, p1, p2, p3) => {
  return p1 + sanitize(p2) + p3;
});

content = content.replace(/(down: )(migration_\d{8}_\d{6}_[\w-]+)(\.down)/g, (match, p1, p2, p3) => {
  return p1 + sanitize(p2) + p3;
});

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed src/migrations/index.ts');
