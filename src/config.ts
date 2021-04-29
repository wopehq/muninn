export type CollectionItemFieldSelector = {
    selector?: string,
    html?: boolean,
    attr?: string
    schema?: {
        [key: string]: CollectionItemFieldSelector
    }
}

export type CollectionItem = {
    schema: {
        [key: string]: CollectionItemFieldSelector
    },
    detect: {
        withInnerSelector?: string;
    }
}

export type ConfigType = {
    selector: string;
    collection: {
        [name: string]: CollectionItem;
    }
}
