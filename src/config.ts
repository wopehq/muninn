export type SelectorType = string | string[];

export type CollectionItemType = {
  schema: {
    [key: string]: {
      selector: SelectorType;
      html?: boolean;
      attr?: string;
    };
  };
  detect: {
    withInnerSelector?: string;
  };
};

export type ConfigType = {
  selector: SelectorType;
  collection: {
    [name: string]: CollectionItemType;
  };
};

export type ConfigFileType = {
  [configName: string]: ConfigType;
};
