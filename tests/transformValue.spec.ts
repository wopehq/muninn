import { describe, it, expect } from 'vitest';
import { applyMethods } from '../src/config/applyMethods';

import transformValue from '../src/parser/transformValue';
import { load } from 'cheerio';

const SAMPLE_HTML = `
  <div id="root">
    <div class="text">sample</div>
  </div>
`;

const $ = load(SAMPLE_HTML);

describe('transformValue Tests', () => {
  it('Case 1: boolean - false', () => {
    const config = { selector: '', methods: ['boolean'] };
    const value = '';
    const result = transformValue(value, config, $('div'));
    expect(false).to.deep.equal(result);
  });

  it('Case 2: boolean - true', () => {
    const config = { selector: '', methods: ['boolean'] };
    const value = 'Test';
    const result = transformValue(value, config, $('div'));
    expect(true).to.deep.equal(result);
  });

  it('Case 3: number', () => {
    const config = { selector: '', methods: ['number'] };
    const value = '12';
    const result = transformValue(value, config, $('div'));
    expect(12).to.deep.equal(result);
  });

  it('Case 4: float', () => {
    const config = { selector: '', methods: ['float'] };
    const value = '3.5';
    const result = transformValue(value, config, $('div'));
    expect(3.5).to.deep.equal(result);
  });

  it('Case 5: trim', () => {
    const config = { selector: '', methods: ['trim'] };
    const value = ' content ';
    const result = transformValue(value, config, $('div'));
    expect('content').to.deep.equal(result);
  });

  it('Case 6: non-trim', () => {
    const config = applyMethods({ selector: '', methods: ['non-trim'] });
    const value = ' content ';
    const result = transformValue(value, config, $('div'));

    expect(result).to.deep.equal(value);
  });

  it('Case 7: lowercase', () => {
    const config = { selector: '', methods: ['lowercase'] };
    const value = 'CONTENT';
    const result = transformValue(value, config, $('div'));
    expect('content').to.deep.equal(result);
  });

  it('Case 8: uppercase', () => {
    const config = { selector: '', methods: ['uppercase'] };
    const value = 'content';
    const result = transformValue(value, config, $('div'));
    expect('CONTENT').to.deep.equal(result);
  });

  it('Case 9: length', () => {
    const config = { selector: '', methods: ['length'] };
    const value = 'content';
    const result = transformValue(value, config, $('div'));
    expect(7).to.deep.equal(result);
  });
});
