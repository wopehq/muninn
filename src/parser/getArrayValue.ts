import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { RawConfig } from '../config/types';
import getValue from './getValue';
import { ElementPassArg } from './types';

function getArrayValue<Initial = unknown>(
  { $, el: element }: ElementPassArg,
  config: RawConfig<Initial>
): any[] {
  const values = [];
  let elems = $(element);

  function eachFunction(index, el) {
    const { selector, type, ...rest } = config;
    const value = getValue(
      { $, el: $(el) },
      {
        selector: '',
        ...rest
      }
    );

    values.push(value);
  }

  if (config?.elementFilter) {
    elems = elems.filter((index, el) => config.elementFilter(index, el, $));
  }

  if (config?.ignoreIntersectingElements) {
    elems = ignoreIntersectingElements(
      $,
      elems,
      config.ignoreIntersectingElements
    );
  }

  elems.each(eachFunction);

  return values;
}

function ignoreIntersectingElements(
  $: CheerioAPI,
  elems: Cheerio<Element>,
  ignoreStyle: RawConfig['ignoreIntersectingElements']
) {
  const reducer = makeUniqueElemsReducer($, ignoreStyle);
  const uniqElems = elems.toArray().reduce(reducer, []);

  return $(uniqElems);
}

function makeUniqueElemsReducer(
  $: CheerioAPI,
  ignoreStyle: RawConfig['ignoreIntersectingElements']
) {
  return (acc, current) => {
    const $current = $(current);
    let insertCurrIdx = acc.length;

    acc = acc.filter((elem, i) => {
      const currentWraps = elemWraps($current, elem);
      const elemWrapsCurrent = elemWraps(elem, $current);

      if (ignoreStyle === 'ignore-kids') {
        if (currentWraps) {
          insertCurrIdx = i;

          return false;
        }

        if (elemWrapsCurrent) {
          insertCurrIdx = -1; // do not insert current to the acc

          return true; // keep elem
        }
      } else {
        // ignoreStyle === 'ignore-parents'

        if (currentWraps) {
          insertCurrIdx = -1; // do not insert current to the acc

          return true; // keep elem
        }

        if (elemWrapsCurrent) {
          insertCurrIdx = i;

          return false; // replace this element with the $current
        }
      }

      return true;
    });

    if (insertCurrIdx !== -1) {
      const insertIdx = Math.min(insertCurrIdx, acc.length);

      acc.splice(insertIdx, 0, $current);
    }

    return acc;
  };
}

function elemWraps(first: Cheerio<Element>, second: Cheerio<Element>): boolean {
  return first.has(second).length > 0;
}

export default getArrayValue;
