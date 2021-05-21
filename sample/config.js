const Config = {
  result: {
    blocksSelector: '.hlcw0c .g, #rso > div > div',
    collection: {
      relatedQuestion: {
        schema: {},
        detect: {
          withInnerSelector: '.ygGdYd.related-question-pair'
        }
      },
      organic: {
        schema: {
          title: '.LC20lb.DKV0Md @ href',
          testRegex: {
            selector: '.LC20lb.DKV0Md',
            regex: { pattern: '\\d+', flags: 'g' },
            type: 'number'
          },
          description: '.IsZvec',
          translatable: '.fl.iUh30 span | number',
          link: {
            selector: '.yuRUbf',
            schema: {
              title: 'a',
              url: 'a @ href'
            }
          },
          customTest: {
            selector: '.yuRUbf a',
            attr: 'href',
            custom: function (value) {
              return 'Link: ' + value;
            }
          }
        },
        detect: {
          withInnerSelector: '.LC20lb.DKV0Md'
        }
      }
    }
  }
};

module.exports = Config;
