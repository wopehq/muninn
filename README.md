# muninn

[![npm](https://img.shields.io/npm/v/muninn?color=%234fc921)](https://www.npmjs.com/package/muninn)
[![Build Status](https://github.com/teamseodo/muninn/workflows/build/badge.svg?color=%234fc921)](https://github.com/teamseodo/muninn/actions)
[![License](https://img.shields.io/badge/License-MIT-green.svg?color=%234fc921)](https://opensource.org/licenses/MIT)

Muninn is an HTML parsing tool. It is fast. It allows you to create a configuration file. This makes it easy to keep parser settings up to date despite changing selectors. It takes very little time to learn thanks to the easy syntax. It uses the [cheerio](https://github.com/cheeriojs/cheerio) library for parsing. It is simple and flexible for various needs.

It also has a useful extension that visualizes your configuration files on the pages you will parse. See [Muninn Extension](https://github.com/aykutkardas/muninn-extension)

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
