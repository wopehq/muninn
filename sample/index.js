const fs = require('fs');
const config = require('./config');

const { parse } = require('../build/index');

async function main() {
  const data = fs.readFileSync(__dirname + '/desktop.html', {
    encoding: 'utf-8'
  });

  console.time('parser');
  const results = parse(data, config);
  console.timeEnd('parser');

  fs.writeFileSync(
    __dirname + '/parse-sample.json',
    JSON.stringify(results, null, 2)
  );
}

main().catch((err) => {
  console.log('Error:', err);
});
