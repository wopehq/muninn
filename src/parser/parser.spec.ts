import { expect } from 'chai';
import 'mocha';

import * as cheerio from 'cheerio';

import getValue from './getValue';

const SAMPLE_HTML = `
<div class="parent">
  <div class="first-child">First Child</div>
  <div class="second-child">Second Child</div>
  <div class="third-child">Third Child</div>
  <div class="full-child">Content</div>
  <div class="empty-child"></div>
  <div class="number-content-child">632</div>
  <div class="regex-test-child">Year 2021</div>
  <a class="link" href="https://example.com/">Test Url</a>
</div>
`;

const BLOCKS_SAMPLE_HTML = `<div class="blocks">${SAMPLE_HTML.repeat(4)}</div>`;

const $ = cheerio.load(BLOCKS_SAMPLE_HTML);

describe('Parser Tests', () => {
  it('getValue Method - Basic', () => {
    const el = $('.parent');
    const selector = { selector: '.first-child' };
    const value = getValue($, el, selector);
    expect('First Child').to.deep.equal(value);
  });

  it('getValue Method - One Of', () => {
    const el = $('.parent');
    const selector = { selector: ['.nonexistent', '.second-child'] };
    const value = getValue($, el, selector);
    expect('Second Child').to.deep.equal(value);
  });

  // [TODO: BUG]
  it('getValue Method - Multiple', () => {
    const el = $('.parent');
    const selector = {
      selector: ['.first-child', '.second-child', '.third-child'],
      type: 'array'
    };
    const value = getValue($, el, selector);
    expect(['First Child', 'Second Child', 'Third Child']).to.deep.equal(value);
  });

  it('getValue Method - Value Type: Number', () => {
    const el = $('.parent');
    const selector = {
      selector: '.number-content-child',
      type: 'number'
    };
    const value = getValue($, el, selector);
    expect(632).to.deep.equal(value);
  });

  it('getValue Method - Value Type: Boolean', () => {
    const el = $('.parent');
    const selector = {
      selector: '.full-child',
      type: 'boolean'
    };
    const value = getValue($, el, selector);
    expect(true).to.deep.equal(value);
  });

  it('getValue Method - Value Type: Boolean', () => {
    const el = $('.parent');
    const selector = {
      selector: '.empty-child',
      type: 'boolean'
    };
    const value = getValue($, el, selector);
    expect(false).to.deep.equal(value);
  });

  it('getValue Method - Regex', () => {
    const el = $('.parent');
    const selector = {
      selector: '.regex-test-child',
      regex: { pattern: '\\d+', flags: 'g' },
      type: 'number'
    };
    const value = getValue($, el, selector);
    expect(2021).to.deep.equal(value);
  });
});
