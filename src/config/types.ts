export type Selector = string | string[];

export type RegexConfig = { pattern: string; flags?: string };

export type CustomConfig = (value: any) => any;

export type SelectorConfig = {
  selector?: Selector;
  html?: boolean;
  attr?: string;
  type?: string;
  trim?: boolean;
  self?: boolean;
  custom?: CustomConfig;
  rootScope?: boolean;
  regex?: RegexConfig;
  schema?: {
    [key: string]: SelectorConfig;
  };
};

export type CollectionItem = {
  schema: {
    [key: string]: SelectorConfig;
  };
  detect?: {
    hasClassName?: string;
    withInnerSelector?: string;
  };
};

export type ConfigItem = {
  blocksSelector?: Selector;
  collection?: {
    [name: string]: CollectionItem;
  };
  selector?: Selector;
  schema?: {
    [key: string]: SelectorConfig;
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
  self?: boolean;
  custom?: CustomConfig;
  rootScope?: boolean;
  regex?: RegexConfig;
  schema?: SelectorConfig;
};
