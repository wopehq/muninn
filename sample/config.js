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
          title: 'div | html',
          translatable: '.fl.iUh30 span | boolean'
        },
        detect: {
          withInnerSelector: '.LC20lb.DKV0Md'
        }
      }
    }
  }
};

module.exports = Config;
