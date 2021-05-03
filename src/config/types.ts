export type Selector = string | string[];

export type RegexConfig = { pattern: string; flags?: string };

export type SelectorSchema = {
  selector?: Selector;
  html?: boolean;
  attr?: string;
  type?: string;
  trim?: boolean;
  regex?: RegexConfig;
  schema?: {
    [key: string]: SelectorSchema;
  };
};

export type CollectionItem = {
  schema: {
    [key: string]: SelectorSchema;
  };
  detect: {
    withInnerSelector?: string;
  };
};

export type ConfigItem = {
  blocksSelector: Selector;
  collection: {
    [name: string]: CollectionItem;
  };
};

export type Config = {
  [configName: string]: ConfigItem;
};

export type ConfigSchema = {
  selector: string[];
  method: string;
  params?: string;
  type?: string;
  trim?: boolean;
  regex?: RegexConfig;
  schema?: SelectorSchema;
};
