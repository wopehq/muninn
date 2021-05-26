import * as cheerio from 'cheerio';

export type Selector = string | string[];
export type CustomConfig = (value: any) => any;
export type RegexConfig = string | { pattern: string; flags?: string };
export type Schema = (el: cheerio.Cheerio) => SelectorConfig | SelectorConfig;

export type SelectorConfig = {
  selector?: Selector;
  html?: boolean;
  attr?: string;
  type?: string;
  trim?: boolean;
  custom?: CustomConfig;
  methods?: string[];
  rootScope?: boolean;
  regex?: RegexConfig;
  schema?: Schema;
};
