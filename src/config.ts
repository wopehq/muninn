export type SelectorType = string | string[];

export type CollectionItemFieldSelector = {
  selector?: SelectorType,
  html?: boolean,
  attr?: string
  schema?: {
    [key: string]: CollectionItemFieldSelector
  }
}

export type CollectionItemType = {
  schema: {
    [key: string]: CollectionItemFieldSelector
  },
  detect: {
    withInnerSelector?: string;
  }
}

export type ConfigType = {
  selector: SelectorType;
  collection: {
    [name: string]: CollectionItemType;
  };
};

export type ConfigFileType = {
  [configName: string]: ConfigType;
};
