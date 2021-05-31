const fs = require('fs');
const axios = require('axios').default;
const config = require('./config');

const { parse } = require('../build/index');

const { data } = await axios.get(
  'https://www.amazon.com/AMD-Ryzen-3700X-16-Thread-Processor/dp/B07SXMZLPK/'
);

const result = parse(data, config);

fs.writeFileSync(__dirname + '/output.json', JSON.stringify(result, null, 2));
