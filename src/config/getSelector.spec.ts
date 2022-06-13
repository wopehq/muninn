import { expect } from 'chai';

import getSelector from './getSelector';

describe('getSelector Tests', () => {
  it('Case 1: @ attr', () => {
    const selector = '@ href';
    const value = getSelector(selector);
    expect({ attr: 'href' }).to.deep.equal(value);
  });

  it('Case 2: selector @ attr', () => {
    const selector = 'a.link @ href';
    const value = getSelector(selector);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });

  it('Case 3: selector @ attr | method', () => {
    const selector = 'a.link @ href | url';
    const value = getSelector(selector);
    expect({
      selector: 'a.link',
      attr: 'href',
      methods: ['url']
    }).to.deep.equal(value);
  });

  it('Case 4: selector @ attr | method | method', () => {
    const selector = 'a.link @ href | url | uppercase';
    const value = getSelector(selector);
    expect({
      selector: 'a.link',
      attr: 'href',
      methods: ['url', 'uppercase']
    }).to.deep.equal(value);
  });

  it('Case 5: [selector, selector]', () => {
    const selector = 'a.link, b.link';
    const value = getSelector(selector);
    expect({
      selector: 'a.link, b.link'
    }).to.deep.equal(value);
  });

  it('Case 6: selector, array*', () => {
    const selector = '.parent div | array';
    const value = getSelector(selector);
    expect({
      selector: '.parent div',
      type: 'array',
      methods: []
    }).to.deep.equal(value);
  });
});
