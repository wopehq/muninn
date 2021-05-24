const Config = {
  result: {
    selector: '.uEierd, .hlcw0c .g, #rso > div > div',
    type: 'array',
    schema: (el) => {
      if (el.hasClass('uEierd')) {
        return {
          title: '.c4Djg',
          link: {
            schema: {
              url: '.d5oMvf > a @ href',
              title: '.qzEoUe'
            }
          },
          phoneNumber: '.NVWord + .WZ8Tjf',
          siteLinks: {
            selector: '.fCBnFe | array',
            schema: {
              url: '.aLF0Z > a @ href',
              description: '.yDYNvb.aLF0Z'
            }
          },
          address: '.Qezod :nth-child(2)',
          availableHours: '.Qezod :nth-child(3)',
          shoppingRating: {
            selector: '.aLF0Z div:nth-child(2)'
          },
          leadForm: '.Qc4Zr'
        };
      } else {
        return {};
      }
    }
  }
};

module.exports = Config;
