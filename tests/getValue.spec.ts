import { describe, it, expect } from 'bun:test';
import { load } from 'cheerio';
import { type Config, type RawConfig } from '../src/config/types';
import parseSelector from '../src/config/parseSelector';
import getValue from '../src/parser/getValue';

const BLOCK_HTML = `
<div class="parent">
  <div class="first-child">First Child</div>
  <div class="second-child">Second Child</div>
  <div class="third-child">Third Child</div>
  <div class="full-child">Content</div>
  <div class="empty-child"></div>
  <div class="number-content-child">632</div>
  <div class="regex-test-child">Year 2021</div>
  <div class="trim-child"> Trim Content </div>
  <div class="html-child"><div class="content">Test</div></div>
  <div class="regex-template-test-child">https://example.com/ > example > test</div>
  <a class="link" href="https://example.com/" rel="noreferrer">Test Url</a>
</div>
`;

const SAMPLE_HTML = `
<body>
  <div class="blocks">
    <div class="unblock">Unblock</div>
    ${BLOCK_HTML.repeat(4)}
  </div>
</body>
`;

const $ = load(SAMPLE_HTML);

describe('getValue Tests', () => {
  it('Case 1:  { selector }', () => {
    const config: RawConfig = { selector: '.first-child' };
    const value = getValue({ $ }, config);
    expect('First Child').toEqual(value);
  });

  it('Case 2:  { [selector, selector] }', () => {
    const el = '.parent';
    const config: RawConfig = { selector: '.first-child, .second-child' };
    const value = getValue({ $, el }, config);
    expect('First Child').toEqual(value);
  });

  it('Case 3:  { [selector, selector], array }', () => {
    const el = $('.parent').first();
    const config: RawConfig = {
      selector: '.first-child, .second-child',
      type: 'array'
    };
    const value = getValue({ $, el }, config);
    expect(['First Child', 'Second Child']).toEqual(value);
  });

  it('Case 4:  { selector, schema }', () => {
    const el = $('.blocks').first();
    const config: RawConfig = {
      selector: '.parent',
      schema: {
        firstChild: '.first-child',
        secondChild: '.second-child'
      }
    };
    const value = getValue({ $, el }, config);

    expect({
      firstChild: 'First Child',
      secondChild: 'Second Child'
    }).toEqual(value);
  });

  it('Case 5:  { selector, schema, array }', () => {
    const el = $('.blocks');
    const config: RawConfig = {
      selector: '.parent',
      type: 'array',
      schema: {
        firstChild: '.first-child',
        secondChild: '.second-child'
      }
    };
    const value = getValue({ $, el }, config);
    expect([
      {
        firstChild: 'First Child',
        secondChild: 'Second Child'
      },
      {
        firstChild: 'First Child',
        secondChild: 'Second Child'
      },
      {
        firstChild: 'First Child',
        secondChild: 'Second Child'
      },
      {
        firstChild: 'First Child',
        secondChild: 'Second Child'
      }
    ]).toEqual(value);
  });

  it('Case 6:  { selector, schema: { selector: schema } }', () => {
    const config: RawConfig = {
      selector: '.blocks',
      schema: {
        parent: {
          selector: '.parent',
          type: 'array',
          schema: {
            firstChild: '.first-child',
            secondChild: '.second-child'
          }
        }
      }
    };
    const value = getValue({ $ }, config);
    expect({
      parent: [
        {
          firstChild: 'First Child',
          secondChild: 'Second Child'
        },
        {
          firstChild: 'First Child',
          secondChild: 'Second Child'
        },
        {
          firstChild: 'First Child',
          secondChild: 'Second Child'
        },
        {
          firstChild: 'First Child',
          secondChild: 'Second Child'
        }
      ]
    }).toEqual(value);
  });

  it('Case 7:  { selector, trim }', () => {
    const config = { selector: '.trim-child' };
    const value = getValue({ $ }, config);
    expect('Trim Content').toEqual(value);
  });

  it('Case 8:  { selector, trim: false }', () => {
    const config = { selector: '.trim-child', trim: false };
    const value = getValue({ $ }, config);
    expect(' Trim Content ').toEqual(value);
  });

  it('Case 9:  { selector, attr }', () => {
    const config = { selector: '.link', attr: 'href' };
    const value = getValue({ $ }, config);
    expect('https://example.com/').toEqual(value);
  });

  it('Case 9.1:  { selector, mulitple attrs }', () => {
    const config = { selector: '.link', attr: ['href', 'rel'] };
    const value = getValue({ $ }, config);
    expect({ href: 'https://example.com/', rel: 'noreferrer' }).toEqual(value);
  });

  it('Case 9.2:  { selector, all attrs }', () => {
    const config = { selector: '.link', attr: '$all' };
    const value = getValue({ $ }, config);
    expect({
      href: 'https://example.com/',
      rel: 'noreferrer',
      class: 'link'
    }).toEqual(value);
  });

  it('Case 10: { selector, html }', () => {
    const config = { selector: '.html-child', html: true };
    const value = getValue({ $ }, config);
    expect('<div class="content">Test</div>').toEqual(value);
  });

  it('Case 11: { selector, transform }', () => {
    const config: RawConfig = {
      selector: '.parent',
      type: 'array',
      schema: {
        link: {
          selector: 'a.link',
          attr: 'href',
          transform: (val) => 'Link: ' + val
        }
      }
    };
    const value = getValue({ $ }, config);
    expect([
      { link: 'Link: https://example.com/' },
      { link: 'Link: https://example.com/' },
      { link: 'Link: https://example.com/' },
      { link: 'Link: https://example.com/' }
    ]).toEqual(value);
  });

  it('Case 12: { selector, initial }', () => {
    const config = {
      selector: 'b.href',
      initial: 'link not found'
    };
    const value = getValue({ $ }, config);
    expect('link not found').toEqual(value);
  });

  it('Case 13: { selector, fill }', () => {
    const config = {
      selector: 'a.href',
      fill: 'link censored'
    };
    const value = getValue({ $ }, config);
    expect('link censored').toEqual(value);
  });

  it('Case 13: { selector, fill }', () => {
    const config = {
      selector: 'a.href',
      fill: null
    };
    const value = getValue({ $ }, config);
    expect(null).toEqual(value);
  });

  it('Case 13: { selector, fill }', () => {
    const config = {
      selector: 'a.href',
      fill: undefined
    };
    const value = getValue({ $ }, config);
    expect(null).toEqual(value);
  });

  it('Case 13: { selector, fill }', () => {
    const config = {
      selector: 'a.href',
      fill: false
    };
    const value = getValue({ $ }, config);
    expect(false).toEqual(value);
  });

  it('Case 13: { selector, fill() }', () => {
    const config: RawConfig = {
      selector: 'a.href',
      fill: () => 'link censored'
    };
    const value = getValue({ $ }, config);

    expect('link censored').toEqual(value);
  });

  it('Case 13: { selector, fill }', () => {
    const config: RawConfig = {
      selector: '.parent',
      type: 'array',
      schema: {
        link: {
          selector: 'a.link',
          fill: 'link censored'
        }
      }
    };
    const value = getValue({ $ }, config);
    expect([
      { link: 'link censored' },
      { link: 'link censored' },
      { link: 'link censored' },
      { link: 'link censored' }
    ]).toEqual(value);
  });

  it('Case 14: { selector, regex }', () => {
    const el = $('.parent');
    const selector = {
      selector: '.regex-test-child',
      regex: { pattern: '\\d+', flags: 'g' }
    };
    const value = getValue({ $, el }, selector);
    expect('2021').toEqual(value);
  });

  it('Case 15: { selector, regex/url }', () => {
    const el = $('.parent');
    const selector: RawConfig = {
      selector: '.regex-template-test-child',
      regex: 'url'
    };
    const value = getValue({ $, el }, selector);
    expect('https://example.com/').toEqual(value);
  });

  it('Case 16: { selector, exist }', () => {
    const el = $('.parent');
    const selector = '.empty-child | exist';
    const value = getValue({ $, el }, parseSelector(selector));

    expect(true).toEqual(value);
  });

  it('Case 17: { selector, non-exist }', () => {
    const el = $('.parent');
    const selector = '.non-exist-child';
    const value = getValue({ $, el }, { selector, exist: true });

    expect(value).toEqual(false);
  });

  it('Case 18:  { [selector, selector], array with elementFilter }', () => {
    const el = $('.parent').first();
    const config: RawConfig = {
      selector: '.first-child, .second-child',
      type: 'array',
      elementFilter: (index, el, $) => {
        return $(el).hasClass('first-child');
      }
    };
    const value = getValue({ $, el }, config);

    expect(value).toEqual(['First Child']);
  });
});

describe('ignoreExistenceChecks', () => {
  const el = $('.parent');

  it('ReturnNull', () => {
    const config: RawConfig = {
      selector: '.non-existent',
      ignoreExistenceChecks: false,
      schema: {
        selector: '.non-existent'
      }
    };
    const value = getValue({ $, el }, config);

    expect(null).toEqual(value);
  });

  it('ReturEmptyObject', () => {
    const config: RawConfig = {
      selector: '.non-existent',
      ignoreExistenceChecks: true,
      schema: {}
    };
    const value = getValue({ $, el }, config);

    expect({}).toEqual(value);
  });

  it('ReturObjectWithNullValues', () => {
    const config: RawConfig = {
      selector: '.non-existent',
      ignoreExistenceChecks: true,
      schema: {
        willBeNull: '#fake-selector'
      }
    };
    const value = getValue({ $, el }, config);
    const expected = {
      willBeNull: null
    };

    expect(value).toEqual(expected);
  });
});

describe('MultipleSchemas', () => {
  it('GetContentsOfTheFirstMatchingSelector', () => {
    const conf: Config = [
      { selector: '#non-existent' },
      { selector: '.first-child' }
    ];
    const el = $('.parent:first');
    const val = getValue({ $, el }, conf);
    const expected = $('.first-child:first').text();

    expect(val).toEqual(expected);
  });
});

describe('LengthUtils', () => {
  it('OnStringValue', () => {
    const conf: Config = {
      selector: '.first-child:first',
      methods: ['length']
    };
    const el = $('.parent');
    const val = getValue({ $, el }, conf);
    const expected = $('.first-child:first').text().length;

    expect(val).toEqual(expected);
  });

  it('OnArrayValue', () => {
    const conf: Config = {
      selector: '.first-child',
      type: 'array',
      methods: ['length']
    };
    const el = $('.parent');
    const val = getValue({ $, el }, conf);
    const expected = $('.first-child').length;

    expect(val).toEqual(expected);
  });

  it('ArrayTransform', () => {
    const config: RawConfig = {
      selector: 'a',
      attr: 'href',
      type: 'array',
      arrayTransform: (value) => (value as string[]).join('-')
    };
    const value = getValue({ $ }, config);
    expect(
      'https://example.com/-https://example.com/-https://example.com/-https://example.com/'
    ).toEqual(value);
  });
});
