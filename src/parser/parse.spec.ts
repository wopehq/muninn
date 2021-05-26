import { expect } from 'chai';
import 'mocha';

import parse from './parse';

const BLOCK_HTML = `
<div class="parent">
  <div class="first-child">First Child</div>
  <div class="second-child">Second Child</div>
  <div class="third-child">Third Child</div>
  <div class="full-child">Content</div>
  <div class="empty-child"></div>
  <div class="number-content-child">632</div>
  <div class="regex-test-child">Year 2021</div>
  <div class="trim-child"> Trim Content </div>
  <div class="html-child"><div class="content">Test</div></div>
  <div class="regex-template-test-child">https://example.com/ > example > test</div>
  <a class="link" href="https://example.com/">Test Url</a>
</div>
`;

const SAMPLE_HTML = `
<body>
  <div class="blocks">
    <div class="unblock">
        ${`
        <div>
            <h4>Unblock</h4>
            <p>Description</p>
        </div>
        `.repeat(2)}
    </div>
    ${BLOCK_HTML.repeat(4)}
  </div>
</body>
`;

describe('parse Tests', () => {
  it('Case 1:  { selector }', () => {
    const data = SAMPLE_HTML;
    const config = { selector: '.first-child' };
    const value = parse(data, config);
    expect('First Child').to.deep.equal(value);
  });

  it('Case 2:  { selector, array* }', () => {
    const data = SAMPLE_HTML;
    const config = '.unblock div h4 | array';
    const value = parse(data, config);
    expect(['Unblock', 'Unblock']).to.deep.equal(value);
  });

  it('Case 2:  { selector, array*, schema }', () => {
    const data = SAMPLE_HTML;
    const config = {
      selector: '.blocks @ href',
      schema: {
        unblock: {
          selector: '.unblock div',
          type: 'array',
          schema: { title: 'h4', description: 'p' }
        }
      }
    };
    const value = parse(data, config);
    expect({
      unblock: [
        {
          title: 'Unblock',
          description: 'Description'
        },
        {
          title: 'Unblock',
          description: 'Description'
        }
      ]
    }).to.deep.equal(value);
  });
});
