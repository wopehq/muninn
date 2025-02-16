import { Cheerio, CheerioAPI } from 'cheerio';
import { type Element } from 'domhandler';

export type ElementPassArg = {
  $?: CheerioAPI;
  el?: Cheerio<Element> | string | Element;
};
