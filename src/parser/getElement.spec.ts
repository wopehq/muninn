import { expect } from 'chai';
import * as cheerio from 'cheerio';
import { Config } from '../config/types';
import getElement from './getElement';

const BLOCK_HTML = `
<div class="parent">
  <div class="first-child">First Child</div>
  <div class="second-child">Second Child</div>
  <div class="third-child">Third Child</div>
  <div class="full-child">Content</div>
  <div class="empty-child"></div>
  <div class="number-content-child">632</div>
  <div class="regex-test-child">Year 2021</div>
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

describe('getElement Tests', () => {
  it('Case 1: { selector } without `element`', () => {
    const config: Config = { selector: '.first-child' };
    const element = getElement({ $ }, config);
    expect('first-child').to.deep.equal(element.attr('class'));
  });

  it('Case 2: { selector }', () => {
    const el = '.blocks';
    const config: Config = { selector: '.first-child' };
    const element = getElement({ $, el }, config);
    expect('first-child').to.deep.equal(element.attr('class'));
    expect(1).to.deep.equal(element.length);
  });

  it('Case 3: { selector type: array }', () => {
    const el = $('.parent').first();
    const config: Config = { selector: 'div', type: 'array' };
    const element = getElement({ $, el }, config);
    expect(8).to.deep.equal(element.length);
  });
});
