import { expect } from 'chai';
import * as cheerio from 'cheerio';
import { RawConfig } from '../config/types';
import getValue from './getValue';

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
  <a class="link" href="https://example.com/">Test Url</a>
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

const $ = cheerio.load(SAMPLE_HTML);

describe('getValue Tests', () => {
  it('Case 1:  { selector }', () => {
    const config: RawConfig = { selector: '.first-child' };
    const value = getValue({ $ }, config);
    expect('First Child').to.deep.equal(value);
  });

  it('Case 2:  { [selector, selector] }', () => {
    const el = '.parent';
    const config: RawConfig = { selector: ['.first-child', '.second-child'] };
    const value = getValue({ $, el }, config);
    expect('First Child').to.deep.equal(value);
  });

  it('Case 3:  { [selector, selector], array }', () => {
    const el = $('.parent').first();
    const config: RawConfig = {
      selector: ['.first-child', '.second-child'],
      type: 'array'
    };
    const value = getValue({ $, el }, config);
    expect(['First Child', 'Second Child']).to.deep.equal(value);
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
    }).to.deep.equal(value);
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
    ]).to.deep.equal(value);
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
    }).to.deep.equal(value);
  });

  it('Case 7:  { selector, trim }', () => {
    const config = { selector: '.trim-child' };
    const value = getValue({ $ }, config);
    expect('Trim Content').to.deep.equal(value);
  });

  it('Case 8:  { selector, trim: false }', () => {
    const config = { selector: '.trim-child', trim: false };
    const value = getValue({ $ }, config);
    expect(' Trim Content ').to.deep.equal(value);
  });

  it('Case 9:  { selector, attr }', () => {
    const config = { selector: '.link', attr: 'href' };
    const value = getValue({ $ }, config);
    expect('https://example.com/').to.deep.equal(value);
  });

  it('Case 10: { selector, html }', () => {
    const config = { selector: '.html-child', html: true };
    const value = getValue({ $ }, config);
    expect('<div class="content">Test</div>').to.deep.equal(value);
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
    ]).to.deep.equal(value);
  });

  it('Case 12: { selector, initial }', () => {
    const config = {
      selector: 'b.href',
      initial: 'link not found'
    };
    const value = getValue({ $ }, config);
    expect('link not found').to.deep.equal(value);
  });

  it('Case 13: { selector, fill }', () => {
    const config = {
      selector: 'a.href',
      fill: 'link censored'
    };
    const value = getValue({ $ }, config);
    expect('link censored').to.deep.equal(value);
  });

  it('Case 13: { selector, fill() }', () => {
    const config = {
      selector: 'a.href',
      fill: () => 'link censored'
    };
    const value = getValue({ $ }, config);
    expect('link censored').to.deep.equal(value);
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
    ]).to.deep.equal(value);
  });

  it('Case 14: { selector, regex }', () => {
    const el = $('.parent');
    const selector = {
      selector: '.regex-test-child',
      regex: { pattern: '\\d+', flags: 'g' }
    };
    const value = getValue({ $, el }, selector);
    expect('2021').to.deep.equal(value);
  });

  it('Case 15: { selector, regex/url }', () => {
    const el = $('.parent');
    const selector: RawConfig = {
      selector: '.regex-template-test-child',
      regex: 'url'
    };
    const value = getValue({ $, el }, selector);
    expect('https://example.com/').to.deep.equal(value);
  });

  it('Case 16: { selector, exist }', () => {
    const el = $('.parent');
    const selector = '.empty-child | exist';
    const value = getValue({ $, el }, selector);
    expect(true).to.deep.equal(value);
  });

  it('Case 17: { selector, non-exist }', () => {
    const el = $('.parent');
    const selector = '.non-exist-child | exist';
    const value = getValue({ $, el }, selector);
    expect(false).to.deep.equal(value);
  });

  it('Case 18:  { [selector, selector], array with elementFilter }', () => {
    const el = $('.parent').first();
    const config: RawConfig = {
      selector: ['.first-child', '.second-child'],
      type: 'array',
      elementFilter: (index, el, $) => {
        return $(el).hasClass('first-child');
      }
    };
    const value = getValue({ $, el }, config);
    expect(['First Child']).to.deep.equal(value);
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

    expect(null).to.deep.equal(value);
  });

  it('ReturEmptyObject', () => {
    const config: RawConfig = {
      selector: '.non-existent',
      ignoreExistenceChecks: true,
      schema: {}
    };
    const value = getValue({ $, el }, config);

    expect({}).to.deep.equal(value);
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

    expect(value).to.deep.equal(expected);
  });
});
