import { Cheerio, Element, load } from 'cheerio';
import { Schema } from '../config/types';
import getSchemaValue from './getSchemaValue';

const sample = `
  <div id="root">
    <div class="text">sample</div>
    <a href="https://example.com">example.com</a>
  </div>
`;

describe('getSchemaValue', () => {
  it('ExtractBasicSchema', () => {
    const schema: Schema = {
      link: {
        selector: 'a',
        schema: { title: '', url: '@ href' }
      }
    };
    const $ = load(sample);
    const el = $('#root') as Cheerio<Element>;
    const result = getSchemaValue({ $, el }, schema);
    const expected = {
      link: { title: 'example.com', url: 'https://example.com' }
    };

    expect(result).toStrictEqual(expected);
  });

  it('SchemaValueConfigUnion', () => {
    const schema: Schema = {
      val: [
        {
          selector: '#fake-selector'
        },
        {
          selector: '.text'
        }
      ]
    };
    const $ = load(sample);
    const el = $('#root') as Cheerio<Element>;
    const result = getSchemaValue({ $, el }, schema);
    const expected = { val: 'sample' };

    expect(result).toStrictEqual(expected);
  });
});
