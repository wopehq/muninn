import { describe, it, expect } from 'vitest';
import { load } from 'cheerio';
import getSimpleValue from '../src/parser/getSimpleValue';

const SAMPLE_HTML = `
  <div id="root"></div>
`;

describe('getSimpleValue', () => {
  it('ignoreNull', () => {
    const $ = load(SAMPLE_HTML);
    const el = $('#root');
    const config = {
      html: true,
      selector: '#non-existent'
    };
    const value = getSimpleValue({ $, el }, config);

    expect(value).to.eq(null);
  });
});
