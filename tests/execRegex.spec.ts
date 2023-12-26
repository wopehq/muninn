import { describe, it, expect } from 'vitest';
import execRegex from '../src/parser/regex/execRegex';

describe('execRegex Tests', () => {
  it('Case 1: Pre-defined Regex - url', () => {
    const value = 'test https://google.com/ ';
    const result = execRegex(value, 'url');
    expect('https://google.com/').to.deep.equal(result);
  });

  it('Case 1.1: Pre-defined Regex - url', () => {
    const value = 'test https://google.com/images test ';
    const result = execRegex(value, 'url');
    expect('https://google.com/images').to.deep.equal(result);
  });

  it('Case 1.2: Pre-defined Regex - url', () => {
    const value = 'test https://google.com/images?q=sunset test ';
    const result = execRegex(value, 'url');
    expect('https://google.com/images?q=sunset').to.deep.equal(result);
  });

  it('Case 2: Pre-defined Regex - email', () => {
    const value = 'test test@email.com ';
    const result = execRegex(value, 'email');
    expect('test@email.com').to.deep.equal(result);
  });

  it('Case 3: As Object', () => {
    const value = 'test 26';
    const result = execRegex(value, { pattern: '\\d+' });
    expect('26').to.deep.equal(result);
  });

  it('Case 4: As Regex Object ', () => {
    const value = 'test 26';
    const result = execRegex(value, /\d+/);
    expect('26').to.deep.equal(result);
  });
});
