import { expect } from 'chai';
import 'mocha';

import execRegex from './execRegex';
import transformValueType from './transformValueType';

describe('Utils Tests', () => {
  it('execRegex Method', () => {
    const regex = { pattern: '\\d+', flags: 'g' };
    const value = execRegex('Lorem Ipsum 21 Temp', regex);
    expect('21').to.deep.equal(value);
  });

  it('transformValueType Method - Number', () => {
    const value = transformValueType('21', 'number');
    expect(21).to.deep.equal(value);
  });

  it('transformValueType Method - Boolean', () => {
    const value = transformValueType('lorem', 'boolean');
    expect(true).to.deep.equal(value);
  });

  it('transformValueType Method - Boolean', () => {
    const value = transformValueType('', 'boolean');
    expect(false).to.deep.equal(value);
  });

  it('transformValueType Method - Undefined Type', () => {
    const value = transformValueType('lorem', '');
    expect(value).to.deep.equal(value);
  });
});
