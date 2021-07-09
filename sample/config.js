module.exports = {
  schema: {
    title: '#productTitle',
    price: '#priceblock_ourprice',
    rating: {
      selector: '#acrPopover span | float',
      regex: /\d+\.?\d?/
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
