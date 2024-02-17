# Muninn

[![npm](https://img.shields.io/npm/v/muninn?color=%234fc921)](https://www.npmjs.com/package/muninn)
[![Build Status](https://github.com/teamseodo/muninn/workflows/build/badge.svg?color=%234fc921)](https://github.com/teamseodo/muninn/actions)
[![License](https://img.shields.io/badge/License-MIT-green.svg?color=%234fc921)](https://opensource.org/licenses/MIT)

Muninn is a fast and flexible HTML parsing tool that simplifies the process of extracting data from HTMLs. It allows you to create a configuration file, making it easy to keep parser settings up to date even when selectors change. With its easy-to-learn syntax and the power of the [cheerio](https://github.com/cheeriojs/cheerio) library for parsing, Muninn is a versatile solution for various parsing needs.

### Features

- Fast and efficient HTML parsing
- Easy-to-learn syntax for creating parser configurations
- Flexibility to handle changing selectors
- Powered by the popular [cheerio](https://github.com/cheeriojs/cheerio) library

<br />

### [Documentation](https://seodo.gitbook.io/muninn/) - [Changelog](/CHANGELOG.md)

<br />

## Sample

```js
import { parse } from 'muninn';

const config = {
  schema: {
    title: '#productTitle',
    price: '#priceblock_ourprice',
    rating: {
      selector: '#acrPopover span | float',
      regex: /\d+\.?\d?/
    },
    features: {
      selector: '#productOverview_feature_div tr.a-spacing-small | array',
      schema: {
        name: 'td:nth-child(1)',
        value: 'td:nth-child(2)'
      }
    }
  }
};

// The `data` is an HTML Content of type string.
// https://www.amazon.com/AMD-Ryzen-3700X-16-Thread-Processor/dp/B07SXMZLPK/
const data = '<html>...</html>';

const result = parse(data, config);
```

### Output

```js
{
  "title": "AMD Ryzen 7 3700X 8-Core, 16-Thread Unlocked Desktop Processor with Wraith Prism LED Cooler",
  "price": "$308.99",
  "rating": 4.9,
  "features": [
    {
      "name": "Brand",
      "value": "AMD"
    },
    {
      "name": "CPU Model",
      "value": "AMD Ryzen 7"
    },
    {
      "name": "CPU Speed",
      "value": "4.4 GHz"
    },
    {
      "name": "CPU Socket",
      "value": "Socket AM4"
    },
    {
      "name": "Processor Count",
      "value": "8"
    }
  ]
}
```

## License

Distributed under the MIT License. See LICENSE for more information.
