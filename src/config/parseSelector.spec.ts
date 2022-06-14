import { expect } from 'chai';

import parseSelector from './parseSelector';

describe('parseSelector Tests', () => {
  it('Case 1: @ attr', () => {
    const selector = '@ href';
    const value = parseSelector(selector);
    const expected = { selector: '', attr: 'href' };

    expect(value).to.deep.equal(expected);
  });

  it('Case 2: selector @ attr', () => {
    const selector = 'a.link @ href';
    const value = parseSelector(selector);
    const expected = { selector: 'a.link', attr: 'href' };

    expect(value).to.deep.equal(expected);
  });

  it('Case 3: selector @ attr | method', () => {
    const selector = 'a.link @ href | url';
    const value = parseSelector(selector);
    expect({
      selector: 'a.link',
      attr: 'href',
      methods: ['url']
    }).to.deep.equal(value);
  });

  it('Case 4: selector @ attr | method | method', () => {
    const selector = 'a.link @ href | url | uppercase';
    const value = parseSelector(selector);
    expect({
      selector: 'a.link',
      attr: 'href',
      methods: ['url', 'uppercase']
    }).to.deep.equal(value);
  });

  it('Case 5: [selector, selector]', () => {
    const selector = 'a.link, b.link';
    const value = parseSelector(selector);
    expect({
      selector: 'a.link, b.link'
    }).to.deep.equal(value);
  });

  it('Case 6: selector, array*', () => {
    const selector = '.parent div | array';
    const value = parseSelector(selector);
    expect({
      selector: '.parent div',
      type: 'array',
      methods: []
    }).to.deep.equal(value);
  });
});
