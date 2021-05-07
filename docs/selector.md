### Selector

```ts
type Selector = string | string[];

type SelectorConfig = {
  selector?: Selector;
  html?: boolean;
  attr?: string;
  type?: string;
  trim?: boolean;
  rootScope?: boolean;
  regex?: RegexConfig;
  schema?: {
    [key: string]: SelectorConfig;
  };
};
```

---

### Sample HTML

```html
<div class="parent">
  <div class="first-child">First Child</div>
  <div class="second-child">Second Child</div>
  <div class="third-child">Third Child</div>
  <div class="full-child">Content</div>
  <div class="empty-child"></div>
  <div class="number-content-child">632</div>
  <div class="regex-test-child">Year 2021</div>
  <a class="link" href="https://example.com/">Test Url</a>
</div>
```

---

#### Shorthand

```json
{
    "firstChildContent": ".first-child"
}

// Output
{
    "firsthChild": "First Child"
}
```

#### One Of Selector

```json
{
    "childContent": [".nonexistent", ".second-child"]
}

// Output
{
    "childContent": "Second Child"
}
```

#### SelectorConfig

```json
{
    "thirdChild": {
        "selector": ".third-child"
    }
}

// Output
{
    "thirdChild": "Third Child"
}
```

#### Multiple Selector

```json
{
    "children": {
        "selector": [".first-child", ".second-child", ".third-child"],
        "type": "array"
    }
}

// Output
{
    "children": ["First Child", "Second Child" , "Third Child"]
}
```

#### Define Value Type

```json
{
    "number": {
        "selector": ".number-content-child",
        "type": "number"
    },
    "testBoolean": {
        "selector": ".full-child",
        "type": "boolean"
    },
    "testBoolean2": {
        "selector": ".empty-child",
        "type": "boolean"
    },

}

// Output
{
    "number": 632,
    "testBoolean": true,
    "testBoolean2": false
}
```

#### Use Regex on Value

```json
{
    "testRegex": {
        "selector": ".regex-test-child",
        "regex": { "pattern": "\\d+", "flags": "g" },
        "type": "number"
    }
}

// Output
{
    "testRegex": 2021
}
```

#### Get Attribute

```json
{
    "url": {
        "selector": "a.link",
        "attr": "href"
    }
}

// Output
{
    "url": "https://example.com/"
}
```

#### Nested Schema

```json
{
    "link": {
        "schema": {
            "title": "a.link",
            "url": {
                "selector": "a.link",
                "attr": "href"
            },
        }
    }
}

// Output
{
    "link": {
        "title": "Test Url",
        "url": "https://example.com/"
    }
}
```

#### Custom Method

```js
{
    url: {
        selector: "a.link",
        attr: "href",
        custom: function(value) {
            return 'Link: ' + value;
        }
    }
}

// Output
{
    "url": "Link: https://example.com/"
}
```
