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
