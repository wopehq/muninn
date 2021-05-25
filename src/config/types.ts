import * as cheerio from 'cheerio';

export type Selector = string | string[];

export type RegexConfig = string | { pattern: string; flags?: string };

export type CustomConfig = (value: any) => any;

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

export type SchemaConfig = {
  [configName: string]: ConfigItem;
};

export type Schema = (el: cheerio.Cheerio) => SchemaConfig | SchemaConfig;

export type ConfigItem = {
  selector?: Selector;
  type?: string;
  schema?: Schema;
};

export type ConfigSchema = {
  selector: string[];
  method: string;
  params?: string;
  type?: string;
  trim?: boolean;
  custom?: CustomConfig;
  methods?: string[];
  rootScope?: boolean;
  regex?: RegexConfig;
  schema?: Schema;
};
