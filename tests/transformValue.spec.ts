import { describe, it, expect } from 'bun:test';
import { load } from 'cheerio';
import transformValue from '../src/parser/transformValue';
import { type RawConfig } from '../src/config/types';

const SAMPLE_HTML = `
  <div id="root">
    <div class="text">sample</div>
  </div>
`;

const $ = load(SAMPLE_HTML);

describe('transformValue Tests', () => {
  it('should transform empty string to boolean false', () => {
    const config: RawConfig = { selector: '', methods: ['boolean'] };
    const value = '';
    const result = transformValue(value, config, $('div'));
    expect(false).toEqual(result);
  });

  it('should transform non-empty string to boolean true', () => {
    const config: RawConfig = { selector: '', methods: ['boolean'] };
    const value = 'Test';
    const result = transformValue(value, config, $('div'));
    expect(true).toEqual(result);
  });

  it('should transform string to number', () => {
    const config: RawConfig = { selector: '', methods: ['number'] };
    const value = '12';
    const result = transformValue(value, config, $('div'));
    expect(12).toEqual(result);
  });

  it('should transform string to float', () => {
    const config: RawConfig = { selector: '', methods: ['float'] };
    const value = '3.5';
    const result = transformValue(value, config, $('div'));
    expect(3.5).toEqual(result);
  });

  it('should trim the string', () => {
    const config: RawConfig = { selector: '', trim: true };
    const value = ' content ';
    const result = transformValue(value, config, $('div'));
    expect('content').toEqual(result);
  });

  it('should not trim the string', () => {
    const config: RawConfig = { selector: '', trim: false };
    const value = ' content ';
    const result = transformValue(value, config, $('div'));

    expect(result).toEqual(value);
  });

  it('should convert string to lowercase', () => {
    const config: RawConfig = { selector: '', methods: ['lowercase'] };
    const value = 'CONTENT';
    const result = transformValue(value, config, $('div'));
    expect('content').toEqual(result);
  });

  it('should convert string to uppercase', () => {
    const config: RawConfig = { selector: '', methods: ['uppercase'] };
    const value = 'content';
    const result = transformValue(value, config, $('div'));
    expect('CONTENT').toEqual(result);
  });

  it('should return the length of the string', () => {
    const config: RawConfig = { selector: '', methods: ['length'] };
    const value = 'content';
    const result = transformValue(value, config, $('div'));
    expect(7).toEqual(result);
  });
});
