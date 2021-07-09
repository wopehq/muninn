import { expect } from 'chai';
import 'mocha';
import getConfig from '../config/getConfig';

import transformValue from './transformValue';

describe('transformValue Tests', () => {
  it('Case 1: boolean - false', () => {
    const config = { methods: ['boolean'] };
    const value = '';
    const result = transformValue(value, config);
    expect(false).to.deep.equal(result);
  });

  it('Case 2: boolean - true', () => {
    const config = { methods: ['boolean'] };
    const value = 'Test';
    const result = transformValue(value, config);
    expect(true).to.deep.equal(result);
  });

  it('Case 3: number', () => {
    const config = { methods: ['number'] };
    const value = '12';
    const result = transformValue(value, config);
    expect(12).to.deep.equal(result);
  });

  it('Case 4: float', () => {
    const config = { methods: ['float'] };
    const value = '3.5';
    const result = transformValue(value, config);
    expect(3.5).to.deep.equal(result);
  });

  it('Case 5: trim', () => {
    const config = getConfig({}, { methods: ['trim'] });
    const value = ' content ';
    const result = transformValue(value, config);
    expect('content').to.deep.equal(result);
  });

  it('Case 6: non-trim', () => {
    const config = getConfig({}, { methods: ['non-trim'] });
    const value = ' content ';
    const result = transformValue(value, config);
    expect(' content ').to.deep.equal(result);
  });

  it('Case 7: lowercase', () => {
    const config = getConfig({}, { methods: ['lowercase'] });
    const value = 'CONTENT';
    const result = transformValue(value, config);
    expect('content').to.deep.equal(result);
  });

  it('Case 8: uppercase', () => {
    const config = getConfig({}, { methods: ['uppercase'] });
    const value = 'content';
    const result = transformValue(value, config);
    expect('CONTENT').to.deep.equal(result);
  });

  it('Case 9: length', () => {
    const config = getConfig({}, { methods: ['length'] });
    const value = 'content';
    const result = transformValue(value, config);
    expect(7).to.deep.equal(result);
  });
});
