import { describe, it, expect } from 'bun:test';
import execRegex from '../src/parser/regex/execRegex';

describe('url Tests', () => {
  const testCases = [
    {
      description: 'Case 1: Articles and User Profiles',
      url: 'https://example.com/@user-name/best-travel-destinations-2025'
    },
    {
      description: 'Case 2: Comma Separated Values',
      url: 'https://example.com/train/los-angeles,california/san-francisco,california/'
    },
    {
      description: 'Case 3: Search Queries',
      url: "https://example.com/search?q=bilingual+children's+books"
    },
    {
      description: 'Case 4: Dynamic Routing',
      url: 'https://example.com/store/index.php?route=product/product&product_id=999'
    },
    {
      description: 'Case 5: Wiki-style Pages with Parentheses',
      url: 'https://example.com/wiki/Toxic_(song)'
    },
    {
      description: 'Case 6: Hash Fragments',
      url: 'https://example.com/category/#!/electronics/laptops'
    },
    {
      description: 'Case 7: Special URL Encoded Characters',
      url: 'https://example.com/search?q=men%27s%20shoes'
    },
    {
      description: 'Case 8: File Downloads',
      url: 'https://example.com/downloads/files/turkish-airlines-cargo-logo.svg'
    },
    {
      description: 'Case 8.1: File Downloads',
      url: 'https://example.com/downloads/files/turkish-airlines-cargo-logo.pdf'
    },
    {
      description: 'Case 9: Query Parameters with Multiple Key-Value Pairs',
      url: 'https://example.com/search?query=books&id=123&sort=desc&page=2'
    }
  ];

  testCases.forEach(({ description, url }) => {
    it(description, () => {
      const result = execRegex(url, 'url');
      expect(result).toEqual(url);
    });
  });
});
