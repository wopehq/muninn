import { describe, it, expect } from 'vitest';

import getConfig from '../src/config/getConfig';
import { RawConfig } from '../src/config/types';

describe('getConfig Tests', () => {
  it('should return empty selector and "href" attribute when given a string config with "@ attr"', () => {
    const config: RawConfig = { selector: '@ href' };
    const value = getConfig({}, config);
    const expected = { selector: '', attr: 'href' };

    expect(value).to.deep.equal(expected);
  });

  it('should return the same selector when given a string config without "@ attr"', () => {
    const config: RawConfig = { selector: 'a.link' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link' }).to.deep.equal(value);
  });

  it('should return the selector and "href" attribute when given a string config with "selector @ attr"', () => {
    const config: RawConfig = { selector: 'a.link @ href' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });

  it('should return the same selector when given an array config with multiple selectors', () => {
    const config: RawConfig = { selector: 'a.link, b.link' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link, b.link' }).to.deep.equal(value);
  });

  it('should return the selector and attribute when given an object config with "selector" and "attr"', () => {
    const config: RawConfig = { selector: 'a.link', attr: 'href' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });

  it('should return the selector and attribute when given an object config with "selector @ attr"', () => {
    const config: RawConfig = { selector: 'a.link @ href' };
    const value = getConfig({}, config);
    expect({ selector: 'a.link', attr: 'href' }).to.deep.equal(value);
  });

  it('should return the selector, attribute, and methods when given an object config with "selector @ attr | method"', () => {
    const config: RawConfig = { selector: 'a.link @ href | url' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      attr: 'href',
      methods: ['url']
    }).to.deep.equal(value);
  });

  it('should return the selector, attribute, and type when given an object config with "selector @ attr | array"', () => {
    const config: RawConfig = { selector: 'a.link @ href | array' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      attr: 'href',
      type: 'array'
    }).to.deep.equal(value);
  });

  it('should return the selector, attribute, and html flag when given an object config with "selector @ attr | html"', () => {
    const config: RawConfig = { selector: 'a.link @ href | html' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      attr: 'href',
      html: true
    }).to.deep.equal(value);
  });

  it('should return the selector, attribute, and html flag when given an object config as a function', () => {
    const config: RawConfig = {
      selector: 'a.link @ href | html'
    };
    const value = getConfig({}, config);
    const expected = {
      selector: 'a.link',
      attr: 'href',
      html: true
    };

    expect(value).to.deep.equal(expected);
  });

  it('should return the selector and exist flag when given an object config as a function', () => {
    const config: RawConfig = { selector: 'a.link | exist' };
    const value = getConfig({}, config);
    expect({
      selector: 'a.link',
      exist: true
    }).to.deep.equal(value);
  });

  it('should return the parsed selectors when given an array of string selectors', () => {
    const selectors = ['a.link', 'b.link'];
    const result = getConfig({}, selectors);
    const expected = [{ selector: 'a.link' }, { selector: 'b.link' }];
    expect(result).to.deep.equal(expected);
  });
});
