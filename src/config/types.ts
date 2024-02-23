import { type Cheerio, type CheerioAPI, type Element } from 'cheerio';
import { type Value } from '../parser/value';

export type Selector = string;

export type PreDefinedRegex = 'email' | 'url';
export type RegexObject = { pattern: string; flags?: string };
export type RegexConfig = PreDefinedRegex | RegexObject | RegExp;

export type TransformFunction<Initial = unknown> = (
  value: Value<Initial>,
  element?: Cheerio<Element>
) => Value<Initial>;
export type ConditionFunction = ($: CheerioAPI | Cheerio<Element>) => boolean;
export interface Schema<Initial = unknown> {
  [key: string]: Config<Initial>;
}
export type SchemaGenerator<Initial = unknown> = (
  el: Cheerio<Element>,
  $: CheerioAPI
) => Schema<Initial>;
export type ElementFilterFunction = (
  index: number,
  element: Cheerio<Element> | Element,
  $: CheerioAPI
) => boolean;

export type Method =
  | 'boolean'
  | 'number'
  | 'float'
  | 'length'
  | 'lowercase'
  | 'uppercase'
  | 'email'
  | 'url';

export type Types = 'number' | 'float' | 'boolean' | 'array';

export interface RawConfig<Initial = unknown> {
  selector?: Selector;
  html?: boolean;
  attr?: string | string[];
  type?: Types;
  trim?: boolean;
  exist?: boolean;
  rootScope?: boolean;
  elementFilter?: ElementFilterFunction;
  initial?: Initial;
  fill?: any;
  methods?: Method[];
  regex?: RegexConfig;
  transform?: TransformFunction<Initial>;
  arrayTransform?: TransformFunction<any[]>;
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
