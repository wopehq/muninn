import { Cheerio, CheerioAPI, Element } from 'cheerio';

export type Selector = string | string[];

export type PreDefinedRegex = 'email' | 'url';
export type RegexObject = { pattern: string; flags?: string };
export type RegexConfig = PreDefinedRegex | RegexObject | RegExp;

export type TransformFunction = (value: any) => any;
export type ConditionFunction = ($: CheerioAPI | Cheerio<Element>) => boolean;
export type ConfigFunction = (el: Cheerio<Element>) => {
  [key: string]: InputConfig;
};
export type ElementFilterFunction = (
  index: number,
  element: Cheerio<Element> | Element,
  $: CheerioAPI
) => boolean;

export type ConfigTypeValues = 'number' | 'float' | 'boolean' | 'array';

export class RawConfig {
  selector?: Selector;
  html?: boolean;
  attr?: string;
  type?: ConfigTypeValues;
  trim?: boolean;
  exist?: boolean;
  rootScope?: boolean;
  elementFilter?: ElementFilterFunction;
  initial?: any;
  fill?: any;
  methods?: string[];
  regex?: RegexConfig;
  transform?: TransformFunction;
  condition?: ConditionFunction;
  schema?:
    | ConfigFunction
    | {
        [key: string]: InputConfig;
      };
  ignoreIntersectingElements?: 'ignore-kids' | 'ignore-parents';
}

export type InputConfig = ConfigFunction | RawConfig | Selector;

export class Config extends RawConfig {
  selector?: string;
}

export type Schema = {
  [key: string]: InputConfig;
};
