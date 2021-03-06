import { expect } from 'chai';

import getConfig from './getConfig';
import parseSelector from './parseSelector';

describe('getConfig Tests', () => {
  it('Case 1: string config: @ attr', () => {
    const config = { selector: '@ href' };
    const value = getConfig({}, config);
    const expected = { selector: '', attr: 'href' };

    expect(value).to.deep.equal(expected);
  });

  it('Case 2: string config: selector', () => {
    const config = { selector: 'a.link' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link' }).to.deep.equal(value);
  });

  it('Case 3: string config: selector @ attr', () => {
    const config = { selector: 'a.link @ href' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });

  it('Case 4:  array config: [selector, selector]', () => {
    const config = { selector: 'a.link, b.link' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link, b.link' }).to.deep.equal(value);
  });

  it('Case 5: object config: { selector, attr }', () => {
    const config = { selector: 'a.link', attr: 'href' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });

  it('Case 6: object config: { selector @ attr }', () => {
    const config = { selector: 'a.link @ href' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });

  it('Case 7: object config: { selector @ attr | method }', () => {
    const config = { selector: 'a.link @ href | url' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      attr: 'href',
      methods: ['url']
    }).to.deep.equal(value);
  });

  it('Case 8: object config: { selector @ attr | array* }', () => {
    const config = { selector: 'a.link @ href | array' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      attr: 'href',
      type: 'array',
      methods: []
    }).to.deep.equal(value);
  });

  it('Case 9: object config: { selector @ attr | html* }', () => {
    const config = { selector: 'a.link @ href | html' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      attr: 'href',
      html: true,
      methods: ['html']
    }).to.deep.equal(value);
  });

  it('Case 10: object config: () => ({ selector @ attr | html* })', () => {
    const config = {
      selector: 'a.link @ href | html'
    };
    const value = getConfig({}, config);
    const expected = {
      selector: 'a.link',
      attr: 'href',
      html: true,
      methods: ['html']
    };

    expect(value).to.deep.equal(expected);
  });

  it('Case 11: object config: () => ({ selector | exist })', () => {
    const config = { selector: 'a.link | exist' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      exist: true,
      methods: ['exist']
    }).to.deep.equal(value);
  });

  it('MultipleStringSelectors', () => {
    const selectors = ['a.link', 'b.link'];
    const result = getConfig({}, selectors);
    const expected = selectors.map((s) => parseSelector(s));

    expect(result).to.deep.equal(expected);
  });
});
