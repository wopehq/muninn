import { expect } from 'chai';
import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';
import getArrayValue from './getArrayValue';

const SAMPLE_HTML = `
  <div id="root">
    <div class="nestable">First Child <div class="nestable">Second Child</div></div>

    <div class="nestable">
      Third Child
    </div>
  </div>
`;

describe('getArrayValue', () => {
  let $: CheerioAPI;

  beforeAll(() => {
    $ = cheerio.load(SAMPLE_HTML);
  });

  it('withoutIgnore', () => {
    const result = getArrayValue({ $, el: '#root div' }, { selector: '' });
    const expected = [
      'First Child Second Child',
      'Second Child',
      'Third Child'
    ];

    expect(result).to.be.deep.eq(expected);
  });

  it('withIgnoreChildren', () => {
    const result = getArrayValue(
      { $, el: '#root div' },
      { selector: '', ignoreIntersectingElements: 'ignore-children' }
    );
    const expected = ['First Child Second Child', 'Third Child'];

    expect(result).to.be.deep.eq(expected);
  });

  it('withIgnoreParents', () => {
    const result = getArrayValue(
      { $, el: '#root div' },
      { selector: '', ignoreIntersectingElements: 'ignore-parents' }
    );
    const expected = ['Second Child', 'Third Child'];

    expect(result).to.be.deep.eq(expected);
  });
});
