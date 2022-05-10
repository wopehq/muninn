import { Cheerio, CheerioAPI } from 'cheerio';

export type Selector = string | string[];

export type PreDefinedRegex = 'email' | 'url';
export type RegexObject = { pattern: string; flags?: string };
export type RegexConfig = PreDefinedRegex | RegexObject | RegExp;

export type CustomFunction = (value: Cheerio<any>) => any;
export type ConditionFunction = ($: Cheerio<Element>) => boolean;
export type ConfigFunction = (el: Cheerio<any>) => {
  [key: string]: InputConfig;
};
export type ElementFilterFunction = (
  index: number,
  element: Cheerio<any>,
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
  elementFilter?: ElementFilterFunction;
  initial?: any;
  fill?: any;
  methods?: string[];
  regex?: RegexConfig;
  custom?: CustomFunction;
  condition?: ConditionFunction;
  schema?:
    | ConfigFunction
    | {
        [key: string]: InputConfig;
      };
}

export type InputConfig = ConfigFunction | RawConfig | Selector;

export class Config extends RawConfig {
  selector?: string;
}
