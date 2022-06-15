import { Cheerio, Element, load } from 'cheerio';
import { Schema } from '../config/types';
import getSchemaValue from './getSchemaValue';

const sample = `
  <div id="root">
    <div class="text">sample</div>
  </div>
`;

describe('getSchemaValue', () => {
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
