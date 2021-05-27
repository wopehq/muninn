import { Root, Cheerio } from 'cheerio';

export type ElementPassArg = {
  $?: Root;
  el?: Cheerio | Element | string;
};
