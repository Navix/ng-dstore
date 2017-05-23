const path = require('path');
const fs = require('fs-extra');

const pkg = require('./package.json');
const version = pkg.version;
const angularVersion = pkg.dependencies['@angular/core'];
const immutableVersion = pkg.dependencies['immutable'];
const rxjsVersion = pkg.dependencies['rxjs'];

// Copy sources
fs.copySync(path.resolve('package'), path.resolve('dist/package'));
// Generate package.json
const blueprint = fs.readFileSync(path.resolve('package/package.json'), 'utf-8');
const result = blueprint
    .replace(/0\.0\.0\-PLACEHOLDER/g, version)
    .replace(/0\.0\.0\-ANGULAR\-PLACEHOLDER/g, angularVersion)
    .replace(/0\.0\.0\-IMMUTABLE\-PLACEHOLDER/g, immutableVersion)
    .replace(/0\.0\.0\-RXJS\-PLACEHOLDER/g, rxjsVersion);
fs.writeFileSync(path.resolve('dist/package/package.json'), result);
// Copy README
fs.copySync(path.resolve('README.md'), path.resolve('dist/package/README.md'));

console.log('release.js finished!');