import { expect } from 'chai';
import { applyMethods } from '../config/applyMethods';

import transformValue from './transformValue';

describe('transformValue Tests', () => {
  it('Case 1: boolean - false', () => {
    const config = { selector: '', methods: ['boolean'] };
    const value = '';
    const result = transformValue(value, config);
    expect(false).to.deep.equal(result);
  });

  it('Case 2: boolean - true', () => {
    const config = { selector: '', methods: ['boolean'] };
    const value = 'Test';
    const result = transformValue(value, config);
    expect(true).to.deep.equal(result);
  });

  it('Case 3: number', () => {
    const config = { selector: '', methods: ['number'] };
    const value = '12';
    const result = transformValue(value, config);
    expect(12).to.deep.equal(result);
  });

  it('Case 4: float', () => {
    const config = { selector: '', methods: ['float'] };
    const value = '3.5';
    const result = transformValue(value, config);
    expect(3.5).to.deep.equal(result);
  });

  it('Case 5: trim', () => {
    const config = { selector: '', methods: ['trim'] };
    const value = ' content ';
    const result = transformValue(value, config);
    expect('content').to.deep.equal(result);
  });

  it('Case 6: non-trim', () => {
    const config = applyMethods({ selector: '', methods: ['non-trim'] });
    const value = ' content ';
    const result = transformValue(value, config);

    expect(result).to.deep.equal(value);
  });

  it('Case 7: lowercase', () => {
    const config = { selector: '', methods: ['lowercase'] };
    const value = 'CONTENT';
    const result = transformValue(value, config);
    expect('content').to.deep.equal(result);
  });

  it('Case 8: uppercase', () => {
    const config = { selector: '', methods: ['uppercase'] };
    const value = 'content';
    const result = transformValue(value, config);
    expect('CONTENT').to.deep.equal(result);
  });

  it('Case 9: length', () => {
    const config = { selector: '', methods: ['length'] };
    const value = 'content';
    const result = transformValue(value, config);
    expect(7).to.deep.equal(result);
  });
});
