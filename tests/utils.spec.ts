import { describe, it, expect } from 'bun:test';
import { omit } from '../src/utils/omit';
import { type RawConfig } from '../src/config/types';

describe('Utils Tests', () => {
  it('should omit properties from config object', () => {
    const config: RawConfig = {
      selector: '.first-child',
      exist: true,
      type: 'array'
    };

    const omitted = omit(config, ['type', 'exist']);

    expect({ selector: '.first-child' }).toEqual(omitted);
  });
});
