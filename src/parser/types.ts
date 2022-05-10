import { Cheerio, CheerioAPI, Element } from 'cheerio';

export type ElementPassArg = {
  $?: CheerioAPI;
  el?: Cheerio<Element> | string | Element;
};
