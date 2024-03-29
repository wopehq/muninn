import { describe, it, expect } from 'bun:test';
import { load } from 'cheerio';
import getArrayValue from '../src/parser/getArrayValue';

const SAMPLE_HTML = `
  <div id="root">
    <div class="nestable">First Child <div class="nestable">Second Child</div></div>

    <div class="nestable">
      Third Child
    </div>
  </div>
`;

const $ = load(SAMPLE_HTML);

describe('getArrayValue', () => {
  it('withoutIgnore', () => {
    const result = getArrayValue({ $, el: '#root div' }, { selector: '' });
    const expected = [
      'First Child Second Child',
      'Second Child',
      'Third Child'
    ];

    expect(result).toEqual(expected);
  });

  it('withIgnoreChildren', () => {
    const result = getArrayValue(
      { $, el: '#root div' },
      { selector: '', ignoreIntersectingElements: 'ignore-children' }
    );
    const expected = ['First Child Second Child', 'Third Child'];

    expect(result).toEqual(expected);
  });

  it('withIgnoreParents', () => {
    const result = getArrayValue(
      { $, el: '#root div' },
      { selector: '', ignoreIntersectingElements: 'ignore-parents' }
    );
    const expected = ['Second Child', 'Third Child'];

    expect(result).toEqual(expected);
  });
});
