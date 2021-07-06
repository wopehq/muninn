import * as cheerio from 'cheerio';

export type Selector = string | string[];

export type PreDefinedRegex = 'email' | 'url';
export type RegexObject = { pattern: string; flags?: string };
export type RegexConfig = PreDefinedRegex | RegexObject | RegExp;

export type CustomFunction = (value: any) => any;
export type ConditionFunction = ($: cheerio.Cheerio) => boolean;
export type ConfigFunction = (el: cheerio.Cheerio) => {
  [key: string]: InputConfig;
};

export type ConfigTypeValues = 'number' | 'float' | 'boolean' | 'array';

export class RawConfig {
  selector?: Selector;
  html?: boolean;
  attr?: string;
  type?: ConfigTypeValues;
  trim?: boolean;
  exist?: boolean;
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
