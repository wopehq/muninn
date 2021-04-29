export type Selector = string | string[];

export type CollectionItemSchema = {
  selector?: Selector,
  html?: boolean,
  attr?: string
  schema?: {
    [key: string]: CollectionItemSchema
  }
}

export type CollectionItem = {
  schema: {
    [key: string]: CollectionItemSchema
  },
  detect: {
    withInnerSelector?: string;
  }
}

export type ConfigItem = {
  selector: Selector;
  collection: {
    [name: string]: CollectionItem;
  };
};

export type Config = {
  [configName: string]: ConfigItem;
};
