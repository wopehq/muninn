v0.20.0

- Code refactor
- `TypeScript` upgrade to `v5.3.3`

v0.19.0

- The `fill` property now accepts falsy values other than `undefined`.

```ts
{
  fill: null;
}
{
  fill: false;
}
{
  fill: '';
}
```

v0.18.0

- Add `element` parameter to `transform`

v0.17.0

- Add `arrayTransform` support.

v0.16.0

- Add `CheerioAPI` as second parameter to `SchemaGenerator`

```ts
schema: (el: Cheerio<Element>, $: CheerioAPI) => {};
```

v0.15.0

- Remove unused `validateConfig` feature.
- Update dependencies.
- Update npmignore file.

v0.14.0

- Add multiple attribute support.

v0.13.0

- Rename `ignore-kids` option as `ignore-children`.

v0.12.4

- **Fix:** Empty selectors handled.

v0.12.3

- Make `selector` property optional and accept `Selector[]` as `Config`

v0.12.2

- Schema props are set to `null` when selectors do not return a match.

v0.12.1

- Added basic schema extract test.

v0.12.0:

- Rename `size` method with `length`.

v0.11.0:

- The `InputConfig` removed.
- The `Config` `interface` converted to a `type` and replaced the `InputConfig`.
- `Selector` can only be `string` (was `string | string[]`)
- `transform` function takes `Value<Initial>` as argument, instead of `any`.
- `ConfigFunction` renamed to `SchemaGenerator`.
- `RawConfig.schema`'s type is set to `SchemaGenerator | Schema`.
- `getSelector` renamed to `parseSelector`.

v0.9.1:

- Ignored `null` values returned from `cheerio.html()`.

v0.9.0:

- Added `ignoreIntersectingElements?: 'ignore-kids' | 'ignore-parents';` to `RawConfig`.
- Converted `RawConfig` and `Config` classes to `interface`.
