import { describe, it, expect } from 'bun:test';
import url from '../src/parser/methods/url';

describe('url Tests', () => {
  const testCases = [
    {
      description: 'Case 1: Articles and User Profiles',
      givenUrl: '/url?q=https://example.com/@user-name/best-travel-destinations-2025',
      expectedUrl: 'https://example.com/@user-name/best-travel-destinations-2025'
    },
    {
      description: 'Case 2: Comma Separated Values',
      givenUrl: '/url?q=https://example.com/train/los-angeles,california/san-francisco,california/',
      expectedUrl: 'https://example.com/train/los-angeles,california/san-francisco,california/'
    },
    {
      description: 'Case 3: Search Queries',
      givenUrl: "https://example.com/search?q=bilingual+children's+books",
      expectedUrl: "https://example.com/search?q=bilingual+children's+books"
    },
    {
      description: 'Case 4: Dynamic Routing',
      givenUrl: '/url?q=https://example.com/store/index.php?route=product/product&product_id=999',
      expectedUrl: 'https://example.com/store/index.php?route=product/product&product_id=999'
    },
    {
      description: 'Case 5: Wiki-style Pages with Parentheses',
      givenUrl: '/url?q=https://example.com/wiki/Toxic_(song)',
      expectedUrl: 'https://example.com/wiki/Toxic_(song)'
    },
    {
      description: 'Case 6: Hash Fragments',
      givenUrl: '/url?q=https://example.com/category/#!/electronics/laptops',
      expectedUrl: 'https://example.com/category/#!/electronics/laptops'
    },
    {
      description: 'Case 7: Special URL Encoded Characters',
      givenUrl: '/url?q=https://example.com/search?q=men%27s%20shoes',
      expectedUrl: 'https://example.com/search?q=men%27s%20shoes'
    },
    {
      description: 'Case 8: File Downloads',
      givenUrl: '/url?q=https://example.com/downloads/files/turkish-airlines-cargo-logo.svg',
      expectedUrl: 'https://example.com/downloads/files/turkish-airlines-cargo-logo.svg'
    },
    {
      description: 'Case 8.1: File Downloads',
      givenUrl: '/url?q=https://example.com/downloads/files/turkish-airlines-cargo-logo.pdf',
      expectedUrl: 'https://example.com/downloads/files/turkish-airlines-cargo-logo.pdf'
    },
    {
      description: 'Case 9: Query Parameters with Multiple Key-Value Pairs',
      givenUrl: '/url?q=https://example.com/search?query=books&id=123&sort=desc&page=2',
      expectedUrl: 'https://example.com/search?query=books&id=123&sort=desc&page=2'
    },
    {
      description: 'Case 10: Bracket Characters',
      givenUrl: '/url?q=https://example.com/PDR_908_HP_[MAR_2_AC_208-240V_60Hz]',
      expectedUrl: 'https://example.com/PDR_908_HP_[MAR_2_AC_208-240V_60Hz]'
    },
    {
      description: 'Case 11: Search Queries',
      givenUrl: '/search?query=books&id=123&sort=desc&page=2',
      expectedUrl: '/search?query=books&id=123&sort=desc&page=2'
    },
    {
      description: 'Case 12: Underscore Characters',
      givenUrl: '/url?q=https://ac_dc.example.com/highway/to/hell',
      expectedUrl: 'https://ac_dc.example.com/highway/to/hell'
    },
    {
      description: 'Case 13: Google Query Parameters',
      givenUrl: '/url?q=https://www.petcity.lt/e-parduotuve/kates/maistas-ir-skanestai/sausas-maistas&sa=U&sqi=2&ved=2ahUKEwiomvKLw7aLAxVvSjABHf95EVYQFnoECCsQAQ&usg=AOvVaw3YZEobGyCypkIVKjPrZV9l',
      expectedUrl: 'https://www.petcity.lt/e-parduotuve/kates/maistas-ir-skanestai/sausas-maistas'
    },
    {
      description: 'Case 14: Remove specific query parameters',
      givenUrl: '/url?q=https://www.example.com/page?param1=value1&sa=U&sqi=2&ved=abc&usg=xyz',
      expectedUrl: 'https://www.example.com/page?param1=value1'
    },
    {
      description: 'Case 20: URL without "/url?q=" prefix',
      givenUrl: 'https://www.example.com/page?param1=value1&sa=U',
      expectedUrl: 'https://www.example.com/page?param1=value1'
    },
    {
      description: 'Case 21: URL with ":~:text" fragment',
      givenUrl: '/url?q=https://www.ziraatkatilim.com.tr/ticari/uye-isyeri-pos/pos-urunlerimiz/SANAL-POS#:~:text%3DSanal%2520POS%2520Nedir%253F,ile%2520%25C3%25B6deme%2520yapmak%2520i%25C3%25A7in%2520kullan%25C4%25B1l%25C4%25B1r.\u0026sa=U\u0026sqi=2\u0026ved=2ahUKEwiOxNKphLGLAxULJBAIHe9qEoQQFnoECBkQBQ\u0026usg=AOvVaw2dhTIUd-oCP78ONmjEyuSv',
      expectedUrl: 'https://www.ziraatkatilim.com.tr/ticari/uye-isyeri-pos/pos-urunlerimiz/SANAL-POS',
    },
    {
      description: 'Case 22: URL with ":~:text" fragment encoded',
      givenUrl: '/url?q=https://www.ziraatkatilim.com.tr/ticari/uye-isyeri-pos/pos-urunlerimiz/SANAL-POS%23:~:text%3DSanal%2520POS%2520Nedir%253F,ile%2520%25C3%25B6deme%2520yapmak%2520i%25C3%25A7in%2520kullan%25C4%25B1l%25C4%25B1r.\u0026sa=U\u0026sqi=2\u0026ved=2ahUKEwiOxNKphLGLAxULJBAIHe9qEoQQFnoECBkQBQ\u0026usg=AOvVaw2dhTIUd-oCP78ONmjEyuSv',
      expectedUrl: 'https://www.ziraatkatilim.com.tr/ticari/uye-isyeri-pos/pos-urunlerimiz/SANAL-POS',
    },
    {
      description: 'Case 23: Invalid URLs',
      givenUrl: '/images?q=ticari/uye-isyeri-pos/pos-urunlerimiz/SANAL-POS',
      expectedUrl: null
    }
  ];

  testCases.forEach(({ description, givenUrl, expectedUrl }) => {
    it(description, () => {
      const result = url(givenUrl);
      expect(result).toEqual(expectedUrl);
    });
  });
});
