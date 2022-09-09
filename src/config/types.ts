import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { Value } from '../parser/value';

export type Selector = string;

export type PreDefinedRegex = 'email' | 'url';
export type RegexObject = { pattern: string; flags?: string };
export type RegexConfig = PreDefinedRegex | RegexObject | RegExp;

export type TransformFunction<Initial = unknown> = (
  value: Value<Initial>
) => Value<Initial>;
export type ConditionFunction = ($: CheerioAPI | Cheerio<Element>) => boolean;
export interface Schema<Initial = unknown> {
  [key: string]: Config<Initial>;
}
export type SchemaGenerator<Initial = unknown> = (
  el: Cheerio<Element>
) => Schema<Initial>;
export type ElementFilterFunction = (
  index: number,
  element: Cheerio<Element> | Element,
  $: CheerioAPI
) => boolean;

export type ConfigTypeValues = 'number' | 'float' | 'boolean' | 'array';

export interface RawConfig<Initial = unknown> {
  selector?: Selector;
  html?: boolean;
  attr?: string | string[];
  type?: ConfigTypeValues;
  trim?: boolean;
  exist?: boolean;
  rootScope?: boolean;
  elementFilter?: ElementFilterFunction;
  initial?: Initial;
  fill?: any;
  methods?: string[];
  regex?: RegexConfig;
  transform?: TransformFunction<Initial>;
  condition?: ConditionFunction;
  schema?: SchemaGenerator<Initial> | Schema<Initial>;
  ignoreIntersectingElements?: 'ignore-children' | 'ignore-parents';
  ignoreExistenceChecks?: boolean;
}

export type Config<Initial = unknown> =
  | SchemaGenerator<Initial>
  | RawConfig<Initial>
  | RawConfig<Initial>[]
  | Selector
  | Selector[];
