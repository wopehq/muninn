import { describe, it, expect } from 'bun:test';

import parseSelector from '../src/config/parseSelector';

describe('parseSelector Tests', () => {
  it('Case 1: @ attr', () => {
    const selector = '@ href';
    const value = parseSelector(selector);
    const expected = { selector: '', attr: 'href' };

    expect(value).toEqual(expected);
  });

  it('Case 1.1: | @ multiple attrs', () => {
    const selector = '@ href, rel';
    const value = parseSelector(selector);
    const expected = { selector: '', attr: ['href', 'rel'] };

    expect(value).toEqual(expected);
  });

  it('Case 1.2: @ all attrs', () => {
    const selector = '@ $all';
    const value = parseSelector(selector);
    const expected = { selector: '', attr: '$all' };

    expect(value).toEqual(expected);
  });

  it('Case 2: selector @ attr', () => {
    const selector = 'a.link @ href';
    const value = parseSelector(selector);
    const expected = { selector: 'a.link', attr: 'href' };

    expect(value).toEqual(expected);
  });

  it('Case 3: selector @ attr | method', () => {
    const selector = 'a.link @ href | url';
    const value = parseSelector(selector);
    expect(value).toEqual({
      selector: 'a.link',
      attr: 'href',
      methods: ['url']
    });
  });

  it('Case 4: selector @ attr | method | method', () => {
    const selector = 'a.link @ href | url | uppercase';
    const value = parseSelector(selector);
    expect(value).toEqual({
      selector: 'a.link',
      attr: 'href',
      methods: ['url', 'uppercase']
    });
  });

  it('Case 5: [selector, selector]', () => {
    const selector = 'a.link, b.link';
    const value = parseSelector(selector);
    expect(value).toEqual({
      selector: 'a.link, b.link'
    });
  });

  it('Case 6: selector, array*', () => {
    const selector = '.parent div | array';
    const value = parseSelector(selector);
    expect(value).toEqual({
      selector: '.parent div',
      type: 'array'
    });
  });

  it('only a method provided', () => {
    const selector = '| uppercase';
    const result = parseSelector(selector);
    const expected = {
      selector: '',
      methods: ['uppercase']
    };

    expect(result).toEqual(expected as any);
  });

  it('only two methods provided', () => {
    const selector = '| uppercase | lowercase';
    const result = parseSelector(selector);
    const expected = {
      selector: '',
      methods: ['uppercase', 'lowercase']
    };

    expect(result).toEqual(expected as any);
  });

  it('only an attribute provided', () => {
    const selector = '@ href';
    const result = parseSelector(selector);
    const expected = {
      selector: '',
      attr: 'href'
    };

    expect(result).toEqual(expected as any);
  });
});
