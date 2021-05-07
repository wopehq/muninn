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
          title: '.LC20lb.DKV0Md',
          testRegex: {
            selector: '.LC20lb.DKV0Md',
            regex: { pattern: '\\d+', flags: 'g' },
            type: 'number'
          },
          description: '.IsZvec',
          translatable: {
            selector: '.fl.iUh30 span',
            type: 'boolean'
          },
          url: {
            selector: '.yuRUbf a',
            attr: 'href'
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
