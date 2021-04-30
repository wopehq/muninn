const fs = require('fs');
const config = require('./config.json');

const { parse, validateConfig } = require('../build/index');

async function main() {
  const data = fs.readFileSync(__dirname + '/desktop.html', {
    encoding: 'utf-8'
  });

  const errors = validateConfig(config);

  console.log('errors', errors);

  console.time('parser');
  const results = parse(config, data);
  console.log(results);
  console.timeEnd('parser');
}

main().catch((err) => {
  console.log('Error:', err);
});
