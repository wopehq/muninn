import { expect } from 'chai';
import 'mocha';

import parseSelector from './parseSelector';

describe('Config Tests', () => {
  it('parseSelector Method', () => {
    const selector = 'a.link @ href';
    const value = parseSelector(selector);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });
});
