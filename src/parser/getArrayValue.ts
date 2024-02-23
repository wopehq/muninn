import { type Cheerio, type CheerioAPI, type Element } from 'cheerio';
import { type RawConfig } from '../config/types';
import { type ElementPassArg } from './types';
import getValue from './getValue';
import { omit } from '../utils/omit';

function getArrayValue<Initial = unknown>(
  { $, el: element }: ElementPassArg,
  config: RawConfig<Initial>
): any[] {
  const values = [];
  let elems: Cheerio<Element> | Cheerio<Element>[] = $(element);

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

  $(elems).each((index, el) => {
    const rest = omit(config, ['selector', 'type']);
    const value = getValue({ $, el: $(el) }, { selector: '', ...rest });

    values.push(value);
  });

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
  return (acc: Element[], current: Element) => {
    const $current = $(current);
    let insertCurrIdx = acc.length;

    acc = acc.filter((elem, i) => {
      const currentWraps = elemWraps($current, $(elem));
      const elemWrapsCurrent = elemWraps($(elem), $current);

      if (ignoreStyle === 'ignore-children') {
        if (currentWraps) {
          insertCurrIdx = i;
          return false;
        }

        if (elemWrapsCurrent) {
          // do not insert current to the acc
          insertCurrIdx = -1;
          // keep elem
          return true;
        }
      } else if (ignoreStyle === 'ignore-parents') {
        if (currentWraps) {
          // do not insert current to the acc
          insertCurrIdx = -1;
          // keep elem
          return true;
        }

        if (elemWrapsCurrent) {
          insertCurrIdx = i;
          // replace this element with the $current
          return false;
        }
      }

      return true;
    });

    if (insertCurrIdx !== -1) {
      const insertIdx = Math.min(insertCurrIdx, acc.length);
      acc.splice(insertIdx, 0, $current.get(0));
    }

    return acc;
  };
}

function elemWraps(first: Cheerio<Element>, second: Cheerio<Element>) {
  return first.has(second).length > 0;
}

export default getArrayValue;
