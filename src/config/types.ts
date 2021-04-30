export type Selector = string | string[];

export type SelectorSchema = {
  selector?: Selector;
  html?: boolean;
  attr?: string;
  type?: string;
  trim?: boolean;
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
  selector: Selector;
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
  schema?: SelectorSchema;
};
