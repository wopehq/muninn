import { describe, it, expect } from 'vitest';
import { RawConfig } from '../src/config/types';
import { omit } from '../src/utils/omit';

describe('Utils Tests', () => {
  it('should omit properties from config object', () => {
    const config: RawConfig = {
      selector: '.first-child',
      exist: true,
      type: 'array'
    };

    const omitted = omit(config, ['type', 'exist']);

    expect({ selector: '.first-child' }).to.deep.equal(omitted);
  });
});
