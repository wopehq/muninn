import { expect } from 'chai';
import * as cheerio from 'cheerio';
import getSimpleValue from './getSimpleValue';

const SAMPLE_HTML = `
  <div id="root"></div>
`;

describe('getSimpleValue', () => {
  it('ignoreNull', () => {
    const $ = cheerio.load(SAMPLE_HTML);
    const el = $('#root');
    const config = {
      html: true,
      selector: '#non-existent'
    };
    const value = getSimpleValue({ $, el }, config);

    expect(value).to.eq(null);
  });
});
