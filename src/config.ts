export type CollectionItem = {
  schema: {
    [key: string]: {
      selector: string;
      html?: boolean;
      attr?: string;
    };
  };
  detect: {
    withInnerSelector?: string;
  };
};

export type ConfigType = {
  selector: string;
  collection: {
    [name: string]: CollectionItem;
  };
};
