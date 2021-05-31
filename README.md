# muninn

It parses the html and collects the requested data as desired.

## Docs

[Selector](https://github.com/aykutkardas/muninn/blob/main/docs/selector.md)

## Sample

### Data

```js
const { data } = await axios.get(
  'https://www.amazon.com/AMD-Ryzen-3700X-16-Thread-Processor/dp/B07SXMZLPK/'
);
```

### Config

```js
const config = {
  schema: {
    title: '#productTitle',
    price: '#priceblock_ourprice',
    rating: {
      selector: '#acrPopover span',
      regex: { pattern: '\\d+\\.?\\d?', flag: 'gim' }
    },
    features: {
      selector: '#productOverview_feature_div .a-spacing-small | array',
      schema: {
        name: 'td:nth-child(1)',
        value: 'td:nth-child(2)'
      }
    }
  }
};
```

### Parse

```js
import { parse } from 'muninn';

const result = parse(data, config);
```

### Output

```js
{
  "title": "AMD Ryzen 7 3700X 8-Core, 16-Thread Unlocked Desktop Processor with Wraith Prism LED Cooler",
  "price": "$308.99",
  "rating": "4.9",
  "features": [
    {
      "name": "Brand",
      "value": "AMD"
    },
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
